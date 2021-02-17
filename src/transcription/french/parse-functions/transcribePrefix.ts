import { Phoneme } from '../../../constants/Interfaces';
import { isEndOfSentence } from '../../../util/Helper';

const getRule = (text: string, ipa: string): string => {
  return `'${text}-' prefixes are transcribed as [${ipa}].`;
};

const transcribePrefix = (
  phoneme: Phoneme,
  letters: string[],
  prefix: string,
  previousIPA: string,
  ipa: string
): Phoneme => {
  let letterPrefix = '';
  for (let i = 0; i < prefix.length; i++) {
    letterPrefix += letters[i];
  }
  if (isEndOfSentence(previousIPA) && letterPrefix === prefix) {
    return {
      text: letterPrefix,
      ipa: ipa,
      rule: getRule(letterPrefix, ipa),
    };
  }
  return phoneme;
};

export default transcribePrefix;
