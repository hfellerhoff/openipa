import { Phoneme } from '../../../constants/Interfaces';
import { isVowel } from '../../../util/Helper';

const getRule = (letter: string, ipa: string): string => {
  return `Intervocalic '${letter}' consonants are transcribed as [${ipa}].`;
};

const transcribeIntervocalic = (
  phoneme: Phoneme,
  letters: string[],
  previousIPA: string,
  ipa: string
): Phoneme => {
  if (isVowel(previousIPA) && isVowel(letters[1])) {
    return {
      text: letters[0],
      ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeIntervocalic;
