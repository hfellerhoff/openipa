import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isConsonant, isEndOfSentence, isVowel } from '../../../util/Helper';
import { isNasalCanceling, isGlideFollowing } from '../FrenchHelper';
import Rules from '../FrenchRules';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseU = ({
  nextletter,
  phoneme,
  previousIPA,
}: ParseLetterProps): Phoneme => {
  // Nasal um and un
  if (
    (nextletter[1] === 'n' || nextletter[1] === 'm') &&
    ((isConsonant(nextletter[2]) && !isNasalCanceling(nextletter[2])) ||
      isEndOfSentence(nextletter[2]))
  ) {
    phoneme = {
      text: 'u' + nextletter[1],
      ipa: IPA.NASAL_MIXED_O,
      rule: Rules.NASAL_UMN,
    };
  } else if (
    nextletter[1] === 'e' &&
    !isEndOfSentence(previousIPA) &&
    !isEndOfSentence(nextletter[2])
  ) {
    phoneme = {
      text: 'ue',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.MEDIAL_UE,
    };
  } else if (
    isVowel(nextletter[1]) &&
    !isGlideFollowing(
      nextletter[0],
      nextletter[1],
      nextletter[2],
      nextletter[3],
      nextletter[4]
    )
  ) {
    phoneme = {
      text: 'u',
      ipa: IPA.Y_GLIDE,
      rule: Rules.U_VOWEL,
    };
  } else {
    phoneme = {
      text: 'u',
      ipa: IPA.CLOSED_Y,
      rule: Rules.SINGLE_U,
    };
  }

  phoneme = transcribeLetter(phoneme, nextletter, 'û', IPA.CLOSED_Y);

  // --- Default ---
  return phoneme;
};

export default parseU;
