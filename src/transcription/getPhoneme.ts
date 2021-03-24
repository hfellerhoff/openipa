import { Phoneme, Result } from '../constants/Interfaces';
import { Dictionary } from '../hooks/useSupabaseTable';
import { IPA, IPACategory, IPASubcategory } from '../lib/supabase/models/IPA';
import {
  Rule,
  RuleInputCategory,
  RuleInputString,
  RuleInputSubcategory,
  RuleInputType,
} from '../lib/supabase/models/Rule';
import idsToIPAString from '../util/supabase/idsToIPAString';
import parseIPASymbolString from '../util/supabase/parseIPASymbolString';
import { isLetterIn, isPhonemeIn } from './helper/isLetterIn';
import matchStringInput from './steps/matchStringInput';

const getPhoneme = (
  text: string,
  charArray: string[],
  index: number,
  result: Result,
  rules: Rule[],
  ipa: Dictionary<IPA>,
  subcategories: Dictionary<IPASubcategory>,
  categories: Dictionary<IPACategory>,
  recursive: boolean = false
) => {
  const char = charArray[index];
  let phoneme: Phoneme = {
    text: char,
    ipa: char,
    rule: 'Could not find a transcription rule for this character.',
  };

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
      rule.input.steps.forEach((s, i) => {
        if (s.replace && !offsetFound) {
          indexOffset += i;
          offsetFound = true;
        }
      });
      let adjustedIndex = index - indexOffset;

      const doesStepMatch = rule.input.steps.map((step) => {
        switch (step.type) {
          case RuleInputType.String:
            const stringMatch = matchStringInput(step, text, adjustedIndex);
            if (stringMatch) {
              phonemeText += stringMatch;
              adjustedIndex += stringMatch.length - 1;
            }

            return !!stringMatch;
          case RuleInputType.Subcategories:
          case RuleInputType.Categories:
            // Sometimes, getPhoneme will be called from within itself.
            // This check is to prevent an infinite recursive depth.
            if (recursive) return false;

            const ids = (step as RuleInputCategory | RuleInputSubcategory).ids;

            if (
              rule.description.includes(
                'When followed by a front vowel, "c" is transcribed as [23,38]'
              )
            ) {
              console.log(step.type, ids);
            }

            let phonemeToCheck: Phoneme;
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
            console.log(phonemeToCheck);

            if (!phonemeToCheck) return false;
            phonemeToCheck = fetchedPhoneme.phoneme;
            // if (adjustedIndex >= index) {
            //   const fetchedPhoneme = getPhoneme(
            //     text,
            //     charArray,
            //     adjustedIndex,
            //     result,
            //     rules,
            //     ipa,
            //     subcategories,
            //     categories,
            //     true
            //   );
            //   if (!phonemeToCheck) return false;
            //   phonemeToCheck = fetchedPhoneme.phoneme;
            // } else {
            //   phonemeToCheck = lastPhoneme;
            // }

            if (
              rule.description.includes(
                'When followed by a front vowel, "c" is transcribed as [23,38]'
              )
            ) {
              console.log(
                phonemeToCheck,
                ids,
                step.type,
                isPhonemeIn(phonemeToCheck, ids, ipa, step.type)
              );
            }

            if (isPhonemeIn(phonemeToCheck, ids, ipa, step.type)) {
              adjustedIndex += 1;
              return true;
            }
            return false;
          default:
            return false;
        }
      });

      if (
        rule.description.includes(
          'When followed by a front vowel, "c" is transcribed as [23,38]'
        )
      ) {
        console.log(doesStepMatch, rule.description);
      }

      const matchingSteps = doesStepMatch.filter((s) => !!s);
      if (matchingSteps.length < doesStepMatch.length) return;

      return {
        text: phonemeText,
        ipa: idsToIPAString(rule.output, ipa, false),
        rule: parseIPASymbolString(rule.description, ipa),
        steps: rule.input.steps.length,
      };
    })
    .filter((p) => !!p);

  if (matchingPhonemes.length > 0) {
    matchingPhonemes.sort((a, b) => {
      const a_specificity = a.steps * a.text.length;
      const b_specificity = b.steps * b.text.length;

      if (a_specificity > b_specificity) return -1;
      else return 1;
    });

    phoneme = {
      text: matchingPhonemes[0].text,
      ipa: matchingPhonemes[0].ipa,
      rule: matchingPhonemes[0].rule,
    };
    index += matchingPhonemes[0].text.length - 1;
  }

  return { phoneme, index };
};

export default getPhoneme;
