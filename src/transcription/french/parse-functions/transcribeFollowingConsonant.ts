import { Phoneme } from '../../../constants/Interfaces';
import { isConsonant } from '../../../util/Helper';

const getRule = (letter: string, ipa: string): string => {
  return `'${letter}' consonants followed by a consonant are transcribed as [${ipa}].`;
};

const transcribeFollowingConsonant = (
  phoneme: Phoneme,
  letters: string[],
  ipa: string
): Phoneme => {
  if (isConsonant(letters[1])) {
    return {
      text: letters[0],
      ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeFollowingConsonant;
