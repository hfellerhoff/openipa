import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import { isConsonant, isEndOfSentence, isVowel } from '../../../util/Helper';
import {
  isNasalCanceling,
  isPronouncedConsonant,
  isGlideFollowing,
} from '../FrenchHelper';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseZ = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  // -oin nasal
  if (
    nextletter[1] === 'i' &&
    nextletter[2] === 'n' &&
    ((isConsonant(nextletter[3]) && !isNasalCanceling(nextletter[3])) ||
      isEndOfSentence(nextletter[3]))
  ) {
    phoneme = {
      text: 'oin',
      ipa: IPA.W_GLIDE + IPA.NASAL_E,
      rule: Rules.NASAL_ONM_CONSONANT,
    };
  }
  // -om and -on nasal
  else if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    isConsonant(nextletter[2]) &&
    !isNasalCanceling(nextletter[2])
  ) {
    phoneme = {
      text: 'o' + nextletter[1],
      ipa: IPA.NASAL_O,
      rule: Rules.NASAL_ONM_CONSONANT,
    };
  }
  // Final -om and -on nasal
  else if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    isEndOfSentence(nextletter[2])
  ) {
    phoneme = {
      text: 'o' + nextletter[1],
      ipa: IPA.NASAL_O,
      rule: Rules.FINAL_ONM_CONSONANT,
    };
  }
  // final -oeu + final silent consonant
  else if (
    nextletter[1] === 'e' &&
    nextletter[2] === 'u' &&
    nextletter[3] !== 'c' &&
    nextletter[3] !== 'r' &&
    nextletter[3] !== 'f' &&
    nextletter[3] !== 'l' &&
    isEndOfSentence(nextletter[4])
  ) {
    phoneme = {
      text: 'oeu' + nextletter[3],
      ipa: IPA.CLOSED_MIXED_O,
      rule: Rules.FINAL_EU_SILENTCONSONANT,
    };
  }
  // oeu + pronounced consonant
  else if (
    nextletter[1] === 'e' &&
    nextletter[2] === 'u' &&
    (isPronouncedConsonant(nextletter[3], isEndOfSentence(nextletter[3])) ||
      isGlideFollowing(
        nextletter[2],
        nextletter[3],
        nextletter[4],
        nextletter[5],
        nextletter[6]
      ))
  ) {
    phoneme = {
      text: 'oeu',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.EU_PRONOUNCEDCONSONSANT,
    };
  }
  // oe + pronounced consonant
  else if (
    nextletter[1] === 'e' &&
    (isPronouncedConsonant(nextletter[2], isEndOfSentence(nextletter[3])) ||
      isGlideFollowing(
        nextletter[1],
        nextletter[2],
        nextletter[3],
        nextletter[4],
        nextletter[5]
      ))
  ) {
    phoneme = {
      text: 'oe',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.EU_PRONOUNCEDCONSONSANT,
    };
  }
  // ou + vowel
  else if (
    nextletter[1] === 'u' &&
    isVowel(nextletter[2]) &&
    !(
      (nextletter[2] === 'e' && isEndOfSentence(nextletter[3])) ||
      (nextletter[2] === 'e' &&
        nextletter[3] === 's' &&
        isEndOfSentence(nextletter[4]))
    )
  ) {
    phoneme = {
      text: 'ou',
      ipa: IPA.W_GLIDE,
      rule: Rules.OU_VOWEL,
    };
  }
  // o + tion
  else if (
    nextletter[1] + nextletter[2] + nextletter[3] + nextletter[4] ===
    'tion'
  ) {
    phoneme = {
      text: 'o',
      ipa: IPA.CLOSED_O,
      rule: Rules.O_TION,
    };
  }
  // Spelling 'oi'
  else if (nextletter[1] === 'i') {
    phoneme = {
      text: 'oi',
      ipa: IPA.W_GLIDE + IPA.BRIGHT_A,
      rule: Rules.OI,
    };
  }
  // Spelling 'oy'
  else if (nextletter[1] === 'y') {
    phoneme = {
      text: 'oy',
      ipa: IPA.W_GLIDE + IPA.BRIGHT_A + IPA.J_GLIDE,
      rule: Rules.OY,
    };
  }
  // If next sound is [z]
  else if (nextletter[1] === 's' && isVowel(nextletter[2])) {
    phoneme = {
      text: 'o',
      ipa: IPA.CLOSED_O,
      rule: Rules.O_Z_SOUND,
    };
  }
  // o + final silent consonant
  else if (
    isConsonant(nextletter[1]) &&
    isEndOfSentence(nextletter[2]) &&
    nextletter[1] !== 'c' &&
    nextletter[1] !== 'r' &&
    nextletter[1] !== 'f' &&
    nextletter[1] !== 'l'
  ) {
    phoneme = {
      text: 'o' + nextletter[1],
      ipa: IPA.CLOSED_O,
      rule: Rules.FINAL_O_SILENTCONSONANT,
    };
  }
  // o + final silent consonant + s
  // o + final silent consonant
  else if (
    isConsonant(nextletter[1]) &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3]) &&
    nextletter[1] !== 'c' &&
    nextletter[1] !== 'r' &&
    nextletter[1] !== 'f' &&
    nextletter[1] !== 'l'
  ) {
    phoneme = {
      text: 'o' + nextletter[1] + 's',
      ipa: IPA.CLOSED_O,
      rule: Rules.FINAL_O_SILENTCONSONANT,
    };
  }
  // ou
  else if (nextletter[1] === 'u') {
    phoneme = {
      text: 'ou',
      ipa: IPA.CLOSED_U,
      rule: Rules.OU,
    };
  }
  // où
  else if (nextletter[1] === 'ù') {
    phoneme = {
      text: 'où',
      ipa: IPA.CLOSED_U,
      rule: Rules.OU,
    };
  }
  // oû
  else if (nextletter[1] === 'û') {
    phoneme = {
      text: 'oû',
      ipa: IPA.CLOSED_U,
      rule: Rules.OU,
    };
  }
  // If followed by pronounced consonant
  else if (isConsonant(nextletter[1]) && nextletter[1] !== 'h') {
    phoneme = {
      text: 'o',
      ipa: IPA.OPEN_O,
      rule: Rules.SINGLE_O_PRONOUNCED_CONSONANT,
    };
  }

  phoneme = transcribeLetter(phoneme, nextletter, 'ô', IPA.CLOSED_O);

  // --- Default ---
  return phoneme;
};

export default parseZ;
