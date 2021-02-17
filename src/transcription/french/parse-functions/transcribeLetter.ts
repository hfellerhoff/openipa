import { Phoneme } from '../../../constants/Interfaces';

const getRule = (text: string, ipa: string): string => {
  return `'${text}' letters are transcribed as [${ipa}].`;
};

const getRuleSilent = (text: string): string => {
  return `'${text}' letters are silent, so they are not transcribed.`;
};

const transcribeLetter = (
  phoneme: Phoneme,
  letters: string[],
  letter: string,
  ipa: string
): Phoneme => {
  if (ipa === '') {
    if (letters[0] === letter) {
      return {
        text: letters[0],
        ipa: ipa,
        rule: getRuleSilent(letters[0]),
      };
    }
  }
  if (letters[0] === letter) {
    return {
      text: letters[0],
      ipa: ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeLetter;
