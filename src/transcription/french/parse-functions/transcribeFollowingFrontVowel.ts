import { Phoneme } from '../../../constants/Interfaces';
import { isFrontVowel } from '../../../util/Helper';

const getRule = (letter: string, ipa: string): string => {
  return `'${letter}' consonants followed by a front vowel are transcribed as [${ipa}].`;
};

const transcribeFollowingFrontVowel = (
  phoneme: Phoneme,
  letters: string[],
  ipa: string
): Phoneme => {
  if (isFrontVowel(letters[1])) {
    return {
      text: letters[0],
      ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeFollowingFrontVowel;
