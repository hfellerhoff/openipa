import { Phoneme, Result } from '../../constants/Interfaces';
import { getCharArray } from '../../util/Helper';
import Rules from './LatinRules';
import { Rule, RuleInputString, RuleInputType } from '../../constants/Rule';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import idsToIPAString from '../../util/supabase/idsToIPAString';
import {
  IPACategoryDictionary,
  IPADictionary,
  IPASubcategoryDictionary,
} from '../../hooks/useSupabaseIPA';
import parseIPASymbolString from '../../util/supabase/parseIPASymbolString';

const supabaseParseLatin = (
  text: string,
  rules: Rule[],
  categories: IPACategoryDictionary,
  subcategories: IPASubcategoryDictionary,
  ipa: IPADictionary
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

  let previousPhoneme = '';
  for (let index = 0; index < charArray.length; index += 1) {
    const char = charArray[index];
    let phoneme: Phoneme = {
      text: char,
      ipa: char,
      rule: Rules.UNKNOWN,
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
          rule: Rules.NONE,
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
        rules.forEach((rule) => {
          switch (rule.inputType) {
            case RuleInputType.String:
              const input = rule.input as RuleInputString;

              input.text.forEach((possibleMatch) => {
                const characters = text.substring(
                  index,
                  index + possibleMatch.length
                );
                if (characters === possibleMatch) {
                  index += possibleMatch.length - 1;
                  phoneme = {
                    text: characters,
                    ipa: idsToIPAString(rule.output, ipa),
                    rule: parseIPASymbolString(rule.description, ipa),
                  };
                }
              });
              break;
            case RuleInputType.Subcategory:
              break;
            default:
              break;
          }
        });
        break;
    }

    // word.syllables.push(phoneme);
    // line.words[line.words.length - 1].syllables = phenome;
    const currentLine = result.lines[result.lines.length - 1];
    const currentWord = currentLine.words[currentLine.words.length - 1];
    currentWord.syllables.push(phoneme);
    previousPhoneme = phoneme.ipa[phoneme.ipa.length - 1];
  }

  return result;
};

export default supabaseParseLatin;
