import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeDefault from '../parse-functions/transcribeDefault';

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
  console.log(phoneme);

  return phoneme;
};

export default parseB;
