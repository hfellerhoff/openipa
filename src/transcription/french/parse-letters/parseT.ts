import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';
import transcribeSuffix from '../parse-functions/transcribeSuffix';

const parseT = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.T);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  // --- th ---
  phoneme = transcribeFollowingLetter(phoneme, nextletter, ['h'], IPA.T);

  // --- t + ion/iel/ieux ---
  phoneme = transcribeSuffix(
    phoneme,
    nextletter,
    ['tion', 'tiel', 'tieux'],
    IPA.S,
    't'
  );

  return phoneme;
};

export default parseT;
