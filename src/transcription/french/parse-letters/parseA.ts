import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isEndOfSentence, isConsonant } from '../../../util/Helper';
import { isNasalCanceling, isGlideFollowing } from '../FrenchHelper';
import Rules from '../FrenchRules';
import Notes from '../FrenchNotes';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseA = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  // -aim and -ain nasal
  if (
    nextletter[1] === 'i' &&
    (nextletter[2] === 'm' || nextletter[2] === 'n') &&
    ((isConsonant(nextletter[3]) && !isNasalCanceling(nextletter[3])) ||
      isEndOfSentence(nextletter[3]))
  ) {
    phoneme = {
      text: 'ai' + nextletter[2],
      ipa: IPA.NASAL_E,
      rule: Rules.NASAL_AIM,
    };
  }
  // -am and -an nasal
  else if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    isConsonant(nextletter[2]) &&
    !isNasalCanceling(nextletter[2])
  ) {
    phoneme = {
      text: 'a' + nextletter[1],
      ipa: IPA.NASAL_A,
      rule: Rules.NASAL_EAMN_CONSONANT,
    };
  }
  // final -an nasal
  else if (nextletter[1] === 'n' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'an',
      ipa: IPA.NASAL_A,
      rule: Rules.NASAL_EAMN_CONSONANT,
    };
  }

  // Final -aient verb
  else if (
    nextletter[1] === 'i' &&
    nextletter[2] === 'e' &&
    nextletter[3] === 'n' &&
    nextletter[4] === 't' &&
    isEndOfSentence(nextletter[5])
  ) {
    phoneme = {
      text: 'aient',
      ipa: IPA.OPEN_E,
      rule: Rules.FINAL_VERB_AIENT,
    };
  } else if (
    isGlideFollowing(
      nextletter[0],
      nextletter[1],
      nextletter[2],
      nextletter[3],
      nextletter[4]
    )
  ) {
    phoneme = {
      text: 'a',
      ipa: IPA.BRIGHT_A,
      rule: Rules.SINGLE_A + Notes.GLIDE_FOLLOWING,
    };
  } else if (nextletter[1] === 'i' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ai',
      ipa: IPA.CLOSED_E,
      rule: Rules.FINAL_AI,
    };
  } else if (nextletter[1] === 'i' || nextletter[1] === 'î') {
    phoneme = {
      text: 'a' + nextletter[1],
      ipa: IPA.OPEN_E,
      rule: Rules.AI,
    };
  } else if (nextletter[1] === 'y') {
    phoneme = {
      text: 'ay',
      ipa: IPA.OPEN_E + IPA.J_GLIDE,
      rule: Rules.AY,
    };
  } else if (nextletter[1] === 's' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'as',
      ipa: IPA.BRIGHT_A,
      rule: Rules.FINAL_AS,
    };
  } else if (nextletter[1] === 'u' && nextletter[2] === 'x') {
    phoneme = {
      text: 'aux',
      ipa: IPA.CLOSED_O,
      rule: Rules.AU_EAU,
    };
  } else if (nextletter[1] === 'u' && nextletter[2] === 'r') {
    phoneme = {
      text: 'au',
      ipa: IPA.OPEN_O,
      rule: Rules.AUR,
    };
  } else if (nextletter[1] === 'u') {
    phoneme = {
      text: 'au',
      ipa: IPA.CLOSED_O,
      rule: Rules.AU_EAU,
    };
  } else {
    phoneme = {
      text: 'a',
      ipa: IPA.BRIGHT_A,
      rule: Rules.SINGLE_A,
    };
  }

  phoneme = transcribeLetter(phoneme, nextletter, 'à', IPA.BRIGHT_A);
  phoneme = transcribeLetter(phoneme, nextletter, 'â', IPA.DARK_A);

  // --- Default ---
  return phoneme;
};

export default parseA;
