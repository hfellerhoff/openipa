import { Phoneme, Result } from '../constants/Interfaces';
import { Dictionary } from '../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
  TransformedRule,
} from '../lib/supabase/types';
import {
  isRuleInputString,
  isRuleInputCategory,
  isRuleInputSubcategory,
} from '../lib/supabase/types/rules';
import idsToIPAString from '../util/supabase/idsToIPAString';
import parseIPASymbolString from '../util/supabase/parseIPASymbolString';
import { isPhonemeIn } from './helper/isLetterIn';
import matchStringInput from './steps/matchStringInput';

const getPhoneme = (
  text: string,
  charArray: string[],
  index: number,
  result: Result,
  rules: TransformedRule[],
  ipa: Dictionary<DatabaseIPA>,
  subcategories: Dictionary<DatabaseIPASubcategory>,
  categories: Dictionary<DatabaseIPACategory>,
  recursive = false
) => {
  const char = charArray[index];
  let phoneme: Phoneme = {
    text: char,
    ipa: char,
    rule: 'Could not find a transcription rule for this character.',
  };

  console.log('hi');

  if (!char) return undefined;

  // Helper constants
  const lastLine = result.lines[result.lines.length - 1];
  const lastWord = lastLine.words[lastLine.words.length - 1];
  const lastPhoneme = lastWord.syllables[lastWord.syllables.length - 1];

  // Parse with rules here
  const matchingPhonemes = rules
    .map((rule) => {
      let phonemeText = '';
      let indexOffset = 0;
      let offsetFound = false;
      rule.input.steps.forEach((step, i) => {
        if (step.replace && !offsetFound) {
          indexOffset += i;
          offsetFound = true;
        }
      });
      let adjustedIndex = index - indexOffset;

      // Check step validity
      let matched = true;
      for (
        let stepIndex = 0;
        stepIndex < rule.input.steps.length;
        stepIndex++
      ) {
        const step = rule.input.steps[stepIndex];

        const processStep = () => {
          let stringMatch: string | undefined;
          let phonemeToCheck: Phoneme | undefined;

          if (isRuleInputString(step)) {
            stringMatch = matchStringInput(step, text, adjustedIndex);
            if (stringMatch) {
              if (step.replace) phonemeText += stringMatch;
              adjustedIndex += stringMatch.length;
            }

            return !!stringMatch;
          }

          if (isRuleInputCategory(step) || isRuleInputSubcategory(step)) {
            // Sometimes, getPhoneme will be called from within itself.
            // This check is to prevent an infinite recursive depth.
            if (recursive) return false;

            if (adjustedIndex >= index) {
              const fetchedPhoneme = getPhoneme(
                text,
                charArray,
                adjustedIndex,
                result,
                rules,
                ipa,
                subcategories,
                categories,
                true
              );

              phonemeToCheck = fetchedPhoneme?.phoneme;
            } else {
              phonemeToCheck = lastPhoneme;
            }

            if (isPhonemeIn(phonemeToCheck, ipa, step)) {
              adjustedIndex += 1;
              return true;
            }
            return false;
          }
          return false;
        };

        matched = processStep();

        if (!matched) return;
      }

      if (!matched) return;

      return {
        text: phonemeText,
        ipa: idsToIPAString(rule.output, ipa, false),
        rule: parseIPASymbolString(rule.description, ipa),
        steps: rule.input.steps.length,
      };
    })
    .filter((p) => !!p);

  console.log(matchingPhonemes);

  if (matchingPhonemes.length > 0) {
    matchingPhonemes.sort((prevPhoneme, nextPhoneme) => {
      if (!prevPhoneme || !nextPhoneme) return 0;

      const prevPhonemeSpecificity =
        prevPhoneme.steps * prevPhoneme.text.length;
      const nextPhonemeSpecificity =
        nextPhoneme.steps * nextPhoneme.text.length;

      if (prevPhonemeSpecificity > nextPhonemeSpecificity) return -1;
      else return 1;
    });

    if (matchingPhonemes[0]) {
      phoneme = {
        text: matchingPhonemes[0].text,
        ipa: matchingPhonemes[0].ipa,
        rule: matchingPhonemes[0].rule,
      };

      index += matchingPhonemes[0].text.length - 1;
    }
  }

  return { phoneme, index };
};

export default getPhoneme;
