import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeFollowingConsonant from '../parse-functions/transcribeFollowingConsonant';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';
import transcribeFollowingVowel from '../parse-functions/transcribeFollowingVowel';

const parseX = ({ nextletter, phoneme }: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.K + IPA.S);
  phoneme = transcribeFollowingConsonant(phoneme, nextletter, IPA.K + IPA.S);
  phoneme = transcribeFollowingVowel(phoneme, nextletter, IPA.G + IPA.Z);
  phoneme = transcribeFollowingLetter(
    phoneme,
    nextletter,
    ['h'],
    IPA.G + IPA.Z
  );

  return phoneme;
};

export default parseX;
