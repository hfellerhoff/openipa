import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeIntervocalic from '../parse-functions/transcribeIntervocalic';

const parseS = ({
  nextletter,
  previousIPA,
  phoneme,
}: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.S);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);
  phoneme = transcribeIntervocalic(phoneme, nextletter, previousIPA, IPA.Z);

  return phoneme;
};

export default parseS;
