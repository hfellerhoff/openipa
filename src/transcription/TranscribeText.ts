import { Phoneme, Result } from '../constants/Interfaces';
import { getCharArray } from '../util/Helper';
import {
  Rule,
  RuleInputCategory,
  RuleInputString,
  RuleInputSubcategory,
  RuleInputType,
} from '../lib/supabase/models/Rule';
import { IPA, IPACategory, IPASubcategory } from '../lib/supabase/models/IPA';
import idsToIPAString from '../util/supabase/idsToIPAString';
import parseIPASymbolString from '../util/supabase/parseIPASymbolString';
import { Dictionary } from '../hooks/useSupabaseTable';
import { isLetterInCategory, isLetterInSubcategory } from './helper/isLetterIn';

const transcribeText = (
  text: string,
  rules: Rule[],
  categories: Dictionary<IPACategory>,
  subcategories: Dictionary<IPASubcategory>,
  ipa: Dictionary<IPA>
) => {
  const charArray: string[] = getCharArray(text);

  let result: Result = {
    lines: [
      {
        words: [
          {
            syllables: [],
          },
        ],
      },
    ],
  };

  for (let index = 0; index < charArray.length; index += 1) {
    const char = charArray[index];
    let phoneme: Phoneme = {
      text: char,
      ipa: char,
      rule: 'Could not find a transcription rule for this character.',
    };

    // PUNCTUATION
    switch (char) {
      case ',':
      case ';':
      case '!':
      case '.':
      case '(':
      case ')':
        phoneme = {
          text: char,
          ipa: char,
          rule: '',
        };
        break;
      case ' ':
        result.lines[result.lines.length - 1].words.push({
          syllables: [],
        });
        break;
      case '\n':
        result.lines.push({
          words: [
            {
              syllables: [],
            },
          ],
        });
        break;
      default:
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
                  // Loop through possible string matches
                  const stringMatches = (step as RuleInputString).text
                    .map((possibleMatch) => {
                      const characters = text
                        .substring(
                          adjustedIndex,
                          adjustedIndex + possibleMatch.length
                        )
                        .toLowerCase();

                      if (characters === possibleMatch) return characters;
                    })
                    .filter((m) => !!m);

                  // If there is a string match
                  if (stringMatches.length > 0) {
                    if (step.replace) phonemeText += stringMatches[0];
                    adjustedIndex += stringMatches[0].length;
                    return true;
                  }

                  return false;
                case RuleInputType.Subcategories:
                  const subcategoryLetter = charArray[adjustedIndex]
                    ? charArray[adjustedIndex].toLowerCase()
                    : '\n';

                  if (
                    isLetterInSubcategory(
                      subcategoryLetter,
                      (step as RuleInputSubcategory).ids,
                      subcategories
                    )
                  ) {
                    adjustedIndex += 1;
                    if (step.replace) phonemeText += subcategoryLetter;
                    return true;
                  }
                  return false;
                case RuleInputType.Categories:
                  const categoryLetter = charArray[adjustedIndex]
                    ? charArray[adjustedIndex].toLowerCase()
                    : '\n';

                  if (
                    isLetterInCategory(
                      categoryLetter,
                      (step as RuleInputCategory).ids,
                      categories
                    )
                  ) {
                    adjustedIndex += 1;
                    if (step.replace) phonemeText += categoryLetter;
                    return true;
                  }
                  return false;
                default:
                  return false;
              }
            });

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
        break;
    }

    // word.syllables.push(phoneme);
    // line.words[line.words.length - 1].syllables = phenome;
    const currentLine = result.lines[result.lines.length - 1];
    const currentWord = currentLine.words[currentLine.words.length - 1];
    currentWord.syllables.push(phoneme);
  }

  return result;
};

export default transcribeText;
