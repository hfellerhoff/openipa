import { getCharArray, isConsonant } from '../../util/Helper';
import IPA from '../../constants/IPA';

const ParseGerman = (text: string) => {
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
      case 'e':
        if (isConsonant(nextLetter) && isConsonant(nextlettersecond)) {
          ipaToAdd = IPA.OPEN_E;
        } else {
          ipaToAdd = IPA.CLOSED_E;
        }
    }

    parsedIPA += ipaToAdd;
  }
  return parsedIPA;
};

export default ParseGerman;
