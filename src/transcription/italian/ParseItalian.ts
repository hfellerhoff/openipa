import { getCharArray, isVowel } from '../../util/Helper';
import IPA from '../../constants/IPA';

const ParseItalian = (text: string) => {
  const charArray = getCharArray(text);
  let parsedIPA = '';
  const firstLetter = charArray[0];
  const lastLetter = charArray[charArray.length - 1];
  for (let index = 0; index < charArray.length; index += 1) {
    const letter = charArray[index];
    let ipaToAdd = letter;

    let previousLetter = '';
    if (index > 0) {
      previousLetter = charArray[index - 1];
    }

    let nextLetter = '';
    if (index < charArray.length - 1) {
      nextLetter = charArray[index + 1];
    }

    let nextlettersecond = '';
    if (index < charArray.length - 2) {
      nextlettersecond = charArray[index + 2];
    }

    switch (letter) {
      case 'a':
        ipaToAdd = IPA.BRIGHT_A;
        break;
      case 'e':
        ipaToAdd = IPA.CLOSED_E;
        // TODO: dictionary search implementation
        break;
      case 'o':
        ipaToAdd = IPA.CLOSED_O;
        break;
      case 'i':
        if (isVowel(nextLetter)) ipaToAdd = IPA.J_GLIDE;
        else ipaToAdd = IPA.CLOSED_I;
        break;
      case 'u':
        if (isVowel(nextLetter)) ipaToAdd = IPA.W_GLIDE;
        else ipaToAdd = IPA.CLOSED_U;
        break;

      // CONSONANTS
      case 'h':
        ipaToAdd = '';
        break;
    }

    parsedIPA += ipaToAdd;
  }
  return parsedIPA;
};

export default ParseItalian;
