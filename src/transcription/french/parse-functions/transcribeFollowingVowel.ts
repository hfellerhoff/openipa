import { Phoneme } from '../../../constants/Interfaces';
import { isVowel } from '../../../util/Helper';

const getRule = (letter: string, ipa: string): string => {
  return `'${letter}' consonants followed by a vowel are transcribed as [${ipa}].`;
};

const transcribeFollowingVowel = (
  phoneme: Phoneme,
  letters: string[],
  ipa: string
): Phoneme => {
  if (isVowel(letters[1])) {
    return {
      text: letters[0],
      ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeFollowingVowel;
