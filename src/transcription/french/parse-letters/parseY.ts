import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isConsonant, isEndOfSentence, isVowel } from '../../../util/Helper';
import { isNasalCanceling } from '../FrenchHelper';
import Rules from '../FrenchRules';

const parseY = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  // yn and ym nasal
  if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    ((isConsonant(nextletter[2]) && !isNasalCanceling(nextletter[2])) ||
      isEndOfSentence(nextletter[2]))
  ) {
    phoneme = {
      text: 'y' + nextletter[1],
      ipa: IPA.NASAL_E,
      rule: Rules.NASAL_IY,
    };
  } else if (isVowel(nextletter[1])) {
    phoneme = {
      text: 'y',
      ipa: IPA.J_GLIDE,
      rule: Rules.IY_VOWEL,
    };
  } else {
    phoneme = {
      text: 'y',
      ipa: IPA.CLOSED_I,
      rule: Rules.SINGLE_I_OR_Y,
    };
  }

  // --- Default ---
  return phoneme;
};

export default parseY;
