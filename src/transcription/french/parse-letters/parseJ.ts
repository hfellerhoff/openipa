import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';

const parseJ = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.FRICATIVE_G);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  return phoneme;
};

export default parseJ;
