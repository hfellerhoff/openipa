import Letters from '../../constants/Letters';
import { isConsonant, isEndOfSentence, isVowel } from '../../util/Helper';

const PRONOUNCED_CONSONANTS = ['c', 'r', 'f', 'l'];

export const isPronouncedConsonant = (consonant: string, isFinal: boolean) => {
  if (!consonant) return false;
  if (isFinal) {
    return PRONOUNCED_CONSONANTS.indexOf(consonant.toLowerCase()) !== -1;
  } else {
    return isConsonant(consonant);
  }
};

export const isGlideFollowing = (
  letter: string,
  nextletter: string,
  nextlettersecond: string,
  nextletterthird: string,
  nextletterfourth: string
) => {
  const isMedialILL =
    nextletter === 'i' &&
    nextlettersecond === 'l' &&
    nextletterthird === 'l' &&
    !isEndOfSentence(nextletterfourth);

  const isVowelIL =
    isVowel(letter) && nextletter === 'i' && nextlettersecond === 'l';

  return isMedialILL || isVowelIL;
};

export const isNasalCanceling = (char: string) => {
  if (!char) return false;
  return ['m', 'n', 'h', ...Letters.vowels].indexOf(char.toLowerCase()) !== -1;
};

export const areNoMorePronouncedConsonants = (
  charArray: string[],
  index: number
) => {
  let currentIndex = index;
  while (
    !isPronouncedConsonant(charArray[currentIndex], true) &&
    (isConsonant(charArray[currentIndex]) ||
      isEndOfSentence(charArray[currentIndex]))
  ) {
    if (isEndOfSentence(charArray[currentIndex])) return true;
    currentIndex++;
  }
  return false;
};
