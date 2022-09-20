import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';

const parseB = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.B);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  // --- bst ---
  phoneme = transcribeFollowingLetter(
    phoneme,
    nextletter,
    ['t', 's'],
    IPA.P,
    'b'
  );

  return phoneme;
};

export default parseB;
