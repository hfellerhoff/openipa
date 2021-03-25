import { Result } from '../constants/Interfaces';
import { getCharArray } from '../util/Helper';
import { Rule } from '../lib/supabase/models/Rule';
import { IPA, IPACategory, IPASubcategory } from '../lib/supabase/models/IPA';
import { Dictionary } from '../hooks/useSupabaseTable';
import getPhoneme from './getPhoneme';
import processPunctuation from './processPunctuation';

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

  // Loop through text
  let index = 0;
  while (index < charArray.length) {
    // STEP 1: Check for punctuation
    const punctuationResult = processPunctuation(charArray, index, result);
    result = punctuationResult.result;

    // If punctuation was found, use that phoneme and continue the loop
    if (punctuationResult.phoneme) {
      const currentLine = result.lines[result.lines.length - 1];

      result.lines[result.lines.length - 1].words[
        currentLine.words.length - 1
      ].syllables.push(punctuationResult.phoneme);
    }
    // Otherwise:
    // STEP 2: Check rules against current character
    else {
      const transcriptionResult = getPhoneme(
        text,
        charArray,
        index,
        result,
        rules,
        ipa,
        subcategories,
        categories
      );

      if (transcriptionResult) {
        const currentLine = result.lines[result.lines.length - 1];

        result.lines[result.lines.length - 1].words[
          currentLine.words.length - 1
        ].syllables.push(transcriptionResult.phoneme);

        index = transcriptionResult.index;
      }
    }

    index += 1;
  }

  return result;
};

export default transcribeText;
