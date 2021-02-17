import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseP = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeLetter(phoneme, nextletter, 'p', IPA.P);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);
  return phoneme;
};

export default parseP;
