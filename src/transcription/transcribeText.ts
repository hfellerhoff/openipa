import { Result } from '../constants/Interfaces';
import { Dictionary } from '../hooks/useSupabaseTable';
import { IPA, IPACategory, IPASubcategory } from '../lib/supabase/models/IPA';
import { Rule } from '../lib/supabase/models/Rule';
import { getCharArray } from '../util/Helper';
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

    const mostRecentLineIndex = result.lines.length - 1;

    const currentLine = result.lines[mostRecentLineIndex];
    const mostRecentWordIndex = currentLine.words.length - 1;

    // If punctuation was found, use that phoneme and continue the loop
    if (punctuationResult.phoneme) {
      result.lines[mostRecentLineIndex].words[
        mostRecentWordIndex
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
        result.lines[mostRecentLineIndex].words[
          mostRecentWordIndex
        ].syllables.push(transcriptionResult.phoneme);

        index = transcriptionResult.index;
      }
    }

    index += 1;
  }

  return result;
};

export default transcribeText;
