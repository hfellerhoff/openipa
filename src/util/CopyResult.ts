import { Result } from '../constants/Interfaces';

const copyResult = (result: Result) => {
  let textToCopy = ``;
  result.lines.forEach(line => {
    let textLine = '';
    let ipaLine = '';
    line.words.forEach(word => {
      word.syllables.forEach(syllable => {
        if (syllable.text !== '\n') {
          textLine += syllable.text;
          ipaLine += syllable.ipa;
        }
      });
    });
    textToCopy += textLine + '\n';
    textToCopy += ipaLine + '\n';
  });
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  } else {
    navigator.clipboard.writeText(textToCopy);
  }
};

export default copyResult;
