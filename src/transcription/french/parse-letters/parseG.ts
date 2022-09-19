import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeFollowingBackVowel from '../parse-functions/transcribeFollowingBackVowel';
import transcribeFollowingFrontVowel from '../parse-functions/transcribeFollowingFrontVowel';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';

const parseG = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.G);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFollowingFrontVowel(phoneme, nextletter, IPA.FRICATIVE_G);
  phoneme = transcribeFollowingBackVowel(phoneme, nextletter, IPA.G);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  // --- 'gn' ---
  phoneme = transcribeFollowingLetter(
    phoneme,
    nextletter,
    ['n'],
    IPA.BACK_SWOOP_N
  );

  // --- 'gu' ---
  phoneme = transcribeFollowingLetter(phoneme, nextletter, ['u'], IPA.G);

  return phoneme;
};

export default parseG;
