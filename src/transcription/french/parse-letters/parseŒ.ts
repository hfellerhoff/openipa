import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import { isEndOfSentence } from '../../../util/Helper';
import { isPronouncedConsonant, isGlideFollowing } from '../FrenchHelper';

const parseŒ = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  // final -œu + final silent consonant
  if (
    nextletter[1] === 'u' &&
    nextletter[2] !== 'c' &&
    nextletter[2] !== 'r' &&
    nextletter[2] !== 'f' &&
    nextletter[2] !== 'l' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'œu' + nextletter[2],
      ipa: IPA.CLOSED_MIXED_O,
      rule: Rules.FINAL_EU_SILENTCONSONANT,
    };
  }
  // œu + pronounced consonant
  else if (
    nextletter[1] === 'u' &&
    (isPronouncedConsonant(nextletter[2], isEndOfSentence(nextletter[3])) ||
      isGlideFollowing(
        nextletter[0],
        nextletter[1],
        nextletter[2],
        nextletter[3],
        nextletter[4]
      ))
  ) {
    phoneme = {
      text: 'œu',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.EU_PRONOUNCEDCONSONSANT,
    };
  } else if (
    nextletter[1] === 'u' &&
    isGlideFollowing(
      nextletter[1],
      nextletter[2],
      nextletter[3],
      nextletter[4],
      nextletter[5]
    )
  ) {
    phoneme = {
      text: 'œu',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.EU_PRONOUNCEDCONSONSANT,
    };
  }
  // œ + pronounced consonant
  else if (
    isPronouncedConsonant(
      nextletter[2],
      isEndOfSentence(nextletter[3]) ||
        isGlideFollowing(
          nextletter[0],
          nextletter[1],
          nextletter[2],
          nextletter[3],
          nextletter[4]
        )
    )
  ) {
    phoneme = {
      text: 'œ',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.EU_PRONOUNCEDCONSONSANT,
    };
  }

  // --- Default ---
  return phoneme;
};

export default parseŒ;
