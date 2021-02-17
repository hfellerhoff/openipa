import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isConsonant, isVowel, isEndOfSentence } from '../../../util/Helper';
import Rules from '../FrenchRules';
import {
  isNasalCanceling,
  isGlideFollowing,
  isPronouncedConsonant,
} from '../FrenchHelper';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseE = ({
  nextletter,
  phoneme,
  previousIPA,
}: ParseLetterProps): Phoneme => {
  if (
    isConsonant(previousIPA) &&
    isConsonant(nextletter[1]) &&
    isVowel(nextletter[2])
  ) {
    phoneme = {
      text: 'e',
      ipa: IPA.SCHWA,
      rule: Rules.INTERCONSONANT_SCHWA,
    };
  }
  // FINAL -ent
  else if (
    nextletter[1] === 'n' &&
    nextletter[2] === 't' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'ent',
      ipa: IPA.SCHWA,
      rule: Rules.FINAL_ENT,
    };
  }
  // FINAL -en(s)
  else if (
    nextletter[1] === 'n' &&
    (isEndOfSentence(nextletter[2]) ||
      (nextletter[2] === 's' && isEndOfSentence(nextletter[3])))
  ) {
    phoneme = {
      text: 'en' + (nextletter[2] === 's' ? 's' : ''),
      ipa: IPA.NASAL_E,
      rule: Rules.FINAL_ENS,
    };
  }
  // -ein nasal
  else if (
    nextletter[1] === 'i' &&
    nextletter[2] === 'n' &&
    ((isConsonant(nextletter[3]) && !isNasalCanceling(nextletter[3])) ||
      isEndOfSentence(nextletter[3]))
  ) {
    phoneme = {
      text: 'ein',
      ipa: IPA.NASAL_E,
      rule: Rules.NASAL_AIM,
    };
  }
  // -em and -en nasal
  else if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    isConsonant(nextletter[2]) &&
    !isNasalCanceling(nextletter[2])
  ) {
    phoneme = {
      text: 'e' + nextletter[1],
      ipa: IPA.NASAL_A,
      rule: Rules.NASAL_EAMN_CONSONANT,
    };
  }
  // ei
  else if (
    nextletter[1] === 'i' &&
    !isGlideFollowing(
      nextletter[0],
      nextletter[1],
      nextletter[2],
      nextletter[3],
      nextletter[4]
    )
  ) {
    phoneme = {
      text: 'ei',
      ipa: IPA.OPEN_E,
      rule: Rules.EI,
    };
  }

  // eu + s + vowel
  else if (
    nextletter[1] === 'u' &&
    nextletter[2] === 's' &&
    isVowel(nextletter[3])
  ) {
    phoneme = {
      text: 'eu',
      ipa: IPA.CLOSED_MIXED_O,
      rule: Rules.EU_S_VOWEL,
    };
  }
  // final -eu
  else if (nextletter[1] === 'u' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'eu',
      ipa: IPA.CLOSED_MIXED_O,
      rule: Rules.FINAL_EU,
    };
  }
  // final verb ending -ent
  else if (
    nextletter[1] === 'n' &&
    nextletter[2] === 't' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'ent',
      ipa: IPA.SCHWA,
      rule: Rules.FINAL_VERB_ENT,
    };
  }
  // final -eu + final silent consonant
  else if (
    nextletter[1] === 'u' &&
    nextletter[2] !== 'c' &&
    nextletter[2] !== 'r' &&
    nextletter[2] !== 'f' &&
    nextletter[2] !== 'l' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'eu' + nextletter[2],
      ipa: IPA.CLOSED_MIXED_O,
      rule: Rules.FINAL_EU_SILENTCONSONANT,
    };
  }
  // eau and eaux
  else if (
    nextletter[1] === 'a' &&
    nextletter[2] === 'u' &&
    nextletter[3] === 'x'
  ) {
    phoneme = {
      text: 'eaux',
      ipa: IPA.CLOSED_O,
      rule: Rules.AU_EAU,
    };
  } else if (nextletter[1] === 'a' && nextletter[2] === 'u') {
    phoneme = {
      text: 'eau',
      ipa: IPA.CLOSED_O,
      rule: Rules.AU_EAU,
    };
  }
  // eu + pronounced consonant
  else if (
    nextletter[1] === 'u' &&
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
      text: 'eu',
      ipa: IPA.OPEN_MIXED_O,
      rule: Rules.EU_PRONOUNCEDCONSONSANT,
    };
  }
  // FINAL -ed(s)
  else if (nextletter[1] === 'd' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ed',
      ipa: IPA.CLOSED_E,
      rule: Rules.FINAL_E_DRZ,
    };
  } else if (
    nextletter[1] === 'd' &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'eds',
      ipa: IPA.CLOSED_E,
      rule: Rules.FINAL_E_DRZ,
    };
  }
  // FINAL -er(s)
  else if (nextletter[1] === 'r' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'er',
      ipa: IPA.CLOSED_E,
      rule: Rules.FINAL_E_DRZ,
    };
  } else if (
    nextletter[1] === 'r' &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'ers',
      ipa: IPA.CLOSED_E,
      rule: Rules.FINAL_E_DRZ,
    };
  }
  // FINAL -ez(s)
  else if (nextletter[1] === 'z' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ez',
      ipa: IPA.CLOSED_E,
      rule: Rules.FINAL_E_DRZ,
    };
  }
  // FINAL -ec(s)
  else if (nextletter[1] === 'c' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ec',
      ipa: IPA.OPEN_E + IPA.K,
      rule: Rules.FINAL_EC,
    };
  } else if (
    nextletter[1] === 'c' &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'ecs',
      ipa: IPA.OPEN_E + IPA.K,
      rule: Rules.FINAL_EC,
    };
  }
  // FINAL -ef(s)
  else if (nextletter[1] === 'f' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ef',
      ipa: IPA.OPEN_E + IPA.F,
      rule: Rules.FINAL_EF,
    };
  } else if (
    nextletter[1] === 'f' &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'efs',
      ipa: IPA.OPEN_E + IPA.F,
      rule: Rules.FINAL_EF,
    };
  }
  // FINAL -el(s)
  else if (nextletter[1] === 'l' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'el',
      ipa: IPA.OPEN_E + IPA.L,
      rule: Rules.FINAL_EL,
    };
  } else if (
    nextletter[1] === 'l' &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'els',
      ipa: IPA.OPEN_E + IPA.L,
      rule: Rules.FINAL_EL,
    };
  }
  // FINAL -et(s)
  else if (nextletter[1] === 't' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'et',
      ipa: IPA.OPEN_E,
      rule: Rules.FINAL_ET,
    };
  } else if (
    nextletter[1] === 't' &&
    nextletter[2] === 's' &&
    isEndOfSentence(nextletter[3])
  ) {
    phoneme = {
      text: 'ets',
      ipa: IPA.OPEN_E,
      rule: Rules.FINAL_ET,
    };
  }
  // FINAL -e and -es
  else if (
    isEndOfSentence(nextletter[1]) ||
    (nextletter[1] === 's' && isEndOfSentence(nextletter[2]))
  ) {
    phoneme = {
      text: 'e' + (nextletter[1] === 's' ? 's' : ''),
      ipa: IPA.SCHWA,
      rule: Rules.FINAL_E_ES,
    };
  }
  // e + DOUBLE CONSONANT
  else if (isConsonant(nextletter[1]) && isConsonant(nextletter[2])) {
    phoneme = {
      text: 'e',
      ipa: IPA.OPEN_E,
      rule: Rules.SINGLE_E_DOUBLE_CONSONANT,
    };
  } else {
    phoneme = {
      text: 'e',
      ipa: IPA.OPEN_E,
      rule: Rules.DEFAULT_E,
    };
  }

  phoneme = transcribeLetter(phoneme, nextletter, 'é', IPA.CLOSED_E);
  phoneme = transcribeLetter(phoneme, nextletter, 'è', IPA.OPEN_E);
  phoneme = transcribeLetter(phoneme, nextletter, 'ê', IPA.OPEN_E);
  phoneme = transcribeLetter(phoneme, nextletter, 'ë', IPA.OPEN_E);

  // --- Default ---
  return phoneme;
};

export default parseE;
