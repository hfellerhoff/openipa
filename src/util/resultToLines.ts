import { Result } from '../constants/Interfaces';

export const resultToLines = (result: Result) => {
  return result.lines.reduce((acc, cur) => {
    const line = cur.words.reduce((accwords, curwords) => {
      const word = curwords.syllables.reduce((accsyll, cursyll) => {
        const syllable = cursyll.text.trim().split('\n');

        return `${accsyll}${syllable}`;
      }, '');

      if (accwords !== '') return `${accwords} ${word}`;
      return word;
    }, '');

    return [...acc, line];
  }, [] as string[]);
};
