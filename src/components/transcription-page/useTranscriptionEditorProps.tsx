import { useState } from 'react';

import Template from '../../constants/Template';

export default function useTranscriptionEditorProps(
  initialLanguage: string,
  initialText = ''
) {
  const [language, setLanguage] = useState(initialLanguage);
  const [inputText, setInputText] = useState(initialText);
  const [result, setResult] = useState(Template.Result);

  return {
    language,
    setLanguage,
    inputText,
    setInputText,
    result,
  };
}
