import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';

const parseQ = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  // --- 'qu' ---
  phoneme = transcribeFollowingLetter(phoneme, nextletter, ['u'], IPA.K);

  // --- Default ---
  return phoneme;
};

export default parseQ;
