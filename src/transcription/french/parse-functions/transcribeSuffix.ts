import { Phoneme } from '../../../constants/Interfaces';
import { isEndOfSentence } from '../../../util/Helper';

const getRule = (text: string, ipa: string): string => {
  return `Final '-${text}' letter groups are transcribed as [${ipa}].`;
};

const transcribeSuffix = (
  phoneme: Phoneme,
  letters: string[],
  suffixes: string[],
  ipa: string,
  text?: string
): Phoneme => {
  suffixes.forEach(suffix => {
    let letterSuffix = '';
    for (let i = 0; i < suffix.length; i++) {
      letterSuffix += letters[i];
    }
    if (letterSuffix === suffix && isEndOfSentence(letters[suffix.length])) {
      if (text === undefined) text = suffix;
      phoneme = {
        text,
        ipa: ipa,
        rule: getRule(letterSuffix, ipa),
      };
    }
  });
  return phoneme;
};

export default transcribeSuffix;
