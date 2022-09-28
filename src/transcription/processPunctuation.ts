import { Phoneme, Result } from '../constants/Interfaces';

const PUNCTUATION = [',', ';', '!', '.', '(', ')'];
const END_OF_WORD_CHARACTERS = [' '];
const END_OF_LINE_CHARACTERS = ['\n'];

const processPunctuation = (
  charArray: string[],
  index: number,
  result: Result
) => {
  const char = charArray[index];
  let phoneme: Phoneme | undefined;

  if (PUNCTUATION.includes(char)) {
    phoneme = {
      text: char,
      ipa: char,
      rule: '',
    };
  }

  if (END_OF_WORD_CHARACTERS.includes(char)) {
    result.lines[result.lines.length - 1].words.push({
      syllables: [],
    });
  }

  if (END_OF_LINE_CHARACTERS.includes(char)) {
    result.lines.push({
      words: [
        {
          syllables: [],
        },
      ],
    });
  }

  return { phoneme, result };
};

export default processPunctuation;
