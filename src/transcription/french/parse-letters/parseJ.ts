import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeDefault from '../parse-functions/transcribeDefault';

const parseJ = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.FRICATIVE_G);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  return phoneme;
};

export default parseJ;
