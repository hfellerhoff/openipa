import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';

const parseD = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.D);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  // --- Default ---
  return phoneme;
};

export default parseD;
