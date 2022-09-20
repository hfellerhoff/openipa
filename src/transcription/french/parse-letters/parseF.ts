import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isVowel } from '../../../util/Helper';
import Rules from '../FrenchRules';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';

const parseF = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.F);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  // --- 'fais' + vowel ---
  if (
    nextletter[1] === 'a' &&
    nextletter[2] === 'i' &&
    nextletter[3] === 's' &&
    isVowel(nextletter[4])
  ) {
    phoneme = {
      text: 'fais',
      ipa: IPA.F + IPA.SCHWA + IPA.Z,
      rule: Rules.FAIS_VOWEL,
    };
  }

  // --- Default ---
  return phoneme;
};

export default parseF;
