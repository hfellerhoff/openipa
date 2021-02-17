import { Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isBackVowel } from '../../../util/Helper';

const getRule = (letter: string, ipa: string): string => {
  return `'${letter}' consonants followed by a back vowel are transcribed as [${ipa}].`;
};

const transcribeFollowingBackVowel = (
  phoneme: Phoneme,
  letters: string[],
  ipa: IPA
): Phoneme => {
  if (isBackVowel(letters[1])) {
    return {
      text: letters[0],
      ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeFollowingBackVowel;
