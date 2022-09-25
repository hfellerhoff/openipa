import { Result } from '../../constants/Interfaces';

export default function flattenResult(result: Result) {
  return result.lines.reduce((resultInProgress, line) => {
    const flattenedLine = line.words.reduce((lineInProgress, word) => {
      const flattenedWord = word.syllables.reduce(
        (wordInProgress, syllable) => {
          return wordInProgress + syllable.ipa;
        },
        ''
      );

      return lineInProgress + flattenedWord;
    }, '');

    return resultInProgress + flattenedLine;
  }, '');
}
