import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import { isEndOfSentence, isConsonant, isVowel } from '../../../util/Helper';
import { isNasalCanceling } from '../FrenchHelper';
import transcribeLetter from '../parse-functions/transcribeLetter';
import transcribeDefault from '../parse-functions/transcribeDefault';

const parseI = ({
  nextletter,
  phoneme,
  previousIPA,
}: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.CLOSED_I);

  // --- Initial -ill, -irr, -inn, -mm ---
  if (isEndOfSentence(previousIPA)) {
    if (
      nextletter[1] + nextletter[2] === 'll' ||
      nextletter[1] + nextletter[2] === 'rr' ||
      nextletter[1] + nextletter[2] === 'nn' ||
      nextletter[1] + nextletter[2] === 'mm'
    ) {
      phoneme = {
        text: 'i' + nextletter[1] + nextletter[2],
        ipa: IPA.CLOSED_I + nextletter[1] + nextletter[2],
        rule: Rules.INITIAL_ILRNM,
      };
    }
  }

  // --- Final -ient verb ---
  if (
    nextletter[1] === 'e' &&
    nextletter[2] === 'n' &&
    nextletter[3] === 't' &&
    isEndOfSentence(nextletter[4])
  ) {
    phoneme = {
      text: 'ient',
      ipa: IPA.J_GLIDE + IPA.NASAL_E,
      rule: Rules.FINAL_VERB_IENT,
    };
  }

  // --- in and im nasal ---
  if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    ((isConsonant(nextletter[2]) && !isNasalCanceling(nextletter[2])) ||
      isEndOfSentence(nextletter[2]))
  ) {
    phoneme = {
      text: 'i' + nextletter[1],
      ipa: IPA.NASAL_E,
      rule: Rules.NASAL_IY,
    };
  }

  // vowel + il
  if (isVowel(previousIPA) && nextletter[1] === 'l') {
    phoneme = {
      text: 'il',
      ipa: IPA.J_GLIDE,
      rule: Rules.VOWEL_IL,
    };
  }

  // Medial ill
  if (
    !isEndOfSentence(previousIPA) &&
    nextletter[1] === 'l' &&
    nextletter[2] === 'l' &&
    !isEndOfSentence(nextletter[3])
  ) {
    if (isConsonant(previousIPA)) {
      phoneme = {
        text: 'ill',
        ipa: IPA.CLOSED_I + IPA.J_GLIDE,
        rule: Rules.MEDIAL_ILL_CONSONANT,
      };
    } else if (isVowel(previousIPA)) {
      phoneme = {
        text: 'ill',
        ipa: IPA.J_GLIDE,
        rule: Rules.MEDIAL_ILL_VOWEL,
      };
    }
  }

  // Final -ie
  if (nextletter[1] === 'e' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ie',
      ipa: IPA.CLOSED_I,
      rule: Rules.FINAL_IE,
    };
  }
  if (isVowel(nextletter[1])) {
    phoneme = {
      text: 'i',
      ipa: IPA.J_GLIDE,
      rule: Rules.IY_VOWEL,
    };
  }

  phoneme = transcribeLetter(phoneme, nextletter, 'î', IPA.CLOSED_I);
  phoneme = transcribeLetter(phoneme, nextletter, 'ï', IPA.CLOSED_I);

  // --- Default ---
  return phoneme;
};

export default parseI;
