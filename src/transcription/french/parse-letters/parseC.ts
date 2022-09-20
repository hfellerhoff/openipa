import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeFollowingBackVowel from '../parse-functions/transcribeFollowingBackVowel';
import transcribeFollowingFrontVowel from '../parse-functions/transcribeFollowingFrontVowel';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseC = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.K);
  phoneme = transcribeDoubleLetter(phoneme, nextletter, IPA.K);
  phoneme = transcribeFinalConsonant(phoneme, nextletter, IPA.K);
  phoneme = transcribeFollowingFrontVowel(phoneme, nextletter, IPA.S);
  phoneme = transcribeFollowingBackVowel(phoneme, nextletter, IPA.K);

  // --- 'ch' ---
  phoneme = transcribeFollowingLetter(
    phoneme,
    nextletter,
    ['h'],
    IPA.FRICATIVE_C
  );

  // --- 'ç' ---
  phoneme = transcribeLetter(phoneme, nextletter, 'ç', IPA.S);

  // --- Default ---
  return phoneme;
};

export default parseC;
