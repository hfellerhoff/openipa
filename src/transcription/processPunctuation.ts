import { Phoneme, Result } from '../constants/Interfaces';

const processPunctuation = (
  charArray: string[],
  index: number,
  result: Result
) => {
  const char = charArray[index];

  let phoneme: Phoneme | undefined;

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
      break;
  }

  return { phoneme, result };
};

export default processPunctuation;
