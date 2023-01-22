import { Result } from '../constants/Interfaces';
import { Dictionary } from '../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
  TransformedRule,
} from '../lib/supabase/types';
import { getCharArray } from '../util/Helper';
import getPhoneme from './getPhoneme';
import processPunctuation from './processPunctuation';

const transcribeText = (
  text: string,
  rules: TransformedRule[],
  categories: Dictionary<DatabaseIPACategory>,
  subcategories: Dictionary<DatabaseIPASubcategory>,
  ipa: Dictionary<DatabaseIPA>
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
    const processedPunctuation = processPunctuation(charArray, index, result);
    result = processedPunctuation.result;

    const mostRecentLineIndex = result.lines.length - 1;

    const currentLine = result.lines[mostRecentLineIndex];
    const mostRecentWordIndex = currentLine.words.length - 1;

    // If punctuation was found, use that phoneme and continue the loop
    if (processedPunctuation.phoneme) {
      result.lines[mostRecentLineIndex].words[
        mostRecentWordIndex
      ].syllables.push(processedPunctuation.phoneme);
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
