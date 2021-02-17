import { Phoneme } from '../../../constants/Interfaces';

const getRule = (
  text: string,
  ipa: string,
  followingLettersGroup: string[]
): string => {
  let followingLettersText = '';
  followingLettersGroup.forEach((followingLetters, index) => {
    followingLettersText += `'${followingLetters}'`;
    if (index !== followingLettersGroup.length - 1) {
      followingLettersText += ` or `;
    }
  });
  if (
    followingLettersGroup.length === 1 &&
    text.length === (text.substring(0, 1) + followingLettersGroup[0]).length
  ) {
    return `'${text}' letter groups are transcribed as [${ipa}].`;
  }
  if (text.length === 1) {
    return `'${text}' letters followed by ${followingLettersText} are transcribed as [${ipa}].`;
  }
  followingLettersText = '';
  followingLettersGroup.forEach((followingLetters, index) => {
    followingLettersText += `'${followingLetters.substring(
      text.length,
      followingLetters.length
    )}'`;
    if (index !== followingLettersGroup.length - 1) {
      followingLettersText += ` or `;
    }
  });
  return `'${text}' letter groups followed by '${followingLettersText}' are transcribed as [${ipa}].`;
};

const transcribeFollowingLetter = (
  phoneme: Phoneme,
  letters: string[],
  followingLettersGroup: string[],
  ipa: string,
  text?: string
): Phoneme => {
  followingLettersGroup.forEach(followingLetters => {
    let comparedLetters = '';
    for (let i = 0; i < followingLetters.length; i++) {
      comparedLetters += letters[i + 1];
    }
    console.log(comparedLetters, followingLetters);
    if (comparedLetters === followingLetters) {
      if (text === undefined) text = letters[0] + comparedLetters;
      phoneme = {
        text,
        ipa,
        rule: getRule(text, ipa, followingLettersGroup),
      };
    }
  });
  return phoneme;
};

export default transcribeFollowingLetter;
