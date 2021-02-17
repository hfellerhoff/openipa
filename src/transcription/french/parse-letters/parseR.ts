import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isNasalCanceling } from '../FrenchHelper';
import transcribePrefix from '../parse-functions/transcribePrefix';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeDefault from '../parse-functions/transcribeDefault';

const parseR = ({
  phoneme,
  nextletter,
  previousIPA,
}: ParseLetterProps): Phoneme => {
  phoneme = transcribeDefault(nextletter, IPA.FLIPPED_R);
  phoneme = transcribeDoubleLetter(phoneme, nextletter);
  phoneme = transcribeFinalConsonant(phoneme, nextletter, IPA.FLIPPED_R);

  // --- Initial '-re' ---
  if (
    !(
      nextletter[2] === 'n' ||
      (nextletter[2] === 'm' && !isNasalCanceling(nextletter[3]))
    )
  ) {
    phoneme = transcribePrefix(
      phoneme,
      nextletter,
      're',
      previousIPA,
      IPA.FLIPPED_R + IPA.SCHWA
    );
  }

  // --- Initial '-rest' ---
  phoneme = transcribePrefix(
    phoneme,
    nextletter,
    'rest',
    previousIPA,
    IPA.FLIPPED_R + IPA.OPEN_E + IPA.S + IPA.T
  );

  // --- Initial '-resp' ---
  phoneme = transcribePrefix(
    phoneme,
    nextletter,
    'resp',
    previousIPA,
    IPA.FLIPPED_R + IPA.OPEN_E + IPA.S + IPA.P
  );

  return phoneme;
};

export default parseR;
