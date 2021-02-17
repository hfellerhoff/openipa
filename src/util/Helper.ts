import Letters from '../constants/Letters';

export const isVowel = (char: string) => {
  if (!char) return false;
  return Letters.vowels.indexOf(char.toLowerCase()) !== -1;
};

export const isConsonant = (char: string) => {
  if (!char) return false;
  return Letters.consonants.indexOf(char.toLowerCase()) !== -1;
};

export const isFrontVowel = (char: string) => {
  if (!char) return false;
  return ['e', 'é', 'è', 'ê', 'i', 'y'].indexOf(char.toLowerCase()) !== -1;
};

export const isBackVowel = (char: string) => {
  if (!char) return false;
  return ['a', 'â', 'o', 'ô', 'u', 'œ', 'æ'].indexOf(char.toLowerCase()) !== -1;
};

export const getCharArray = (text: string) => {
  return text.toLowerCase().split('');
};

export const isSpace = (char: string) => {
  if (!char) return false;
  return char === ' ' || char === '' || char === '\n' || char === '	';
};

export const isEndingPunctuation = (char: string) => {
  if (!char) return false;
  return Letters.endingpunctuation.indexOf(char.toLowerCase()) !== -1;
};

export const isPunctuation = (char: string) => {
  if (!char) return false;
  return (
    Letters.endingpunctuation.indexOf(char.toLowerCase()) !== -1 ||
    Letters.middlepunctuation.indexOf(char.toLowerCase()) !== -1
  );
};

export const isEndOfSentence = (char: string) => {
  if (!char) return true;
  return isSpace(char) || isEndingPunctuation(char);
};

export const getNextWord = (
  index: number,
  charArray: string[]
): [string, number] => {
  let word = '';
  if (isSpace(charArray[index]) || isPunctuation(charArray[index])) index++;
  while (
    !isSpace(charArray[index]) &&
    !isPunctuation(charArray[index]) &&
    index < charArray.length
  ) {
    word += charArray[index];
    index++;
  }
  return [word, index - 1];
};

// TODO: this
export const getStressedSyllableItalian = (word: string, letter: string) => {
  for (let i = word.length; i >= 0; i--) {}
};
