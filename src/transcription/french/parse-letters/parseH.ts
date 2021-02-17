import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseH = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  return transcribeLetter(phoneme, nextletter, 'h', '');
};

export default parseH;
