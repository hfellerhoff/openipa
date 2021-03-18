import React, { useState, useEffect } from 'react';
import TextInput from '../input/TextInput';
import ResultDisplay from '../display/ResultDisplay';
import parseFrench from '../../transcription/french/ParseFrench';
import { Result, Languages } from '../../constants/Interfaces';
import styles from './TranscriptionEditor.module.scss';
import HideButton from '../buttons/HideButton';
import { Rule } from '../../lib/supabase/models/Rule';
import useSupabaseIPA from '../../hooks/useSupabaseIPA';
import transcribeText from '../../transcription/TranscribeText';

interface Props {
  language: string;
  shouldAnalyzeElision: boolean;
  shouldAnalyzeLiason: boolean;
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  text?: string;
}

const TranscriptionEditor: React.FC<Props> = ({
  language,
  shouldAnalyzeElision,
  shouldAnalyzeLiason,
  result,
  setResult,
  text,
}) => {
  const [inputText, setInputText] = useState(text || '');
  const [shouldShowInput, setShouldShowInput] = useState(true);
  const [shouldShowOutput, setShouldShowOutput] = useState(true);

  const [resultHeight, setResultHeight] = useState(0);

  const { categories, subcategories, ipa, rules, languages } = useSupabaseIPA();

  const parseText = (text: string) => {
    switch (language as Languages) {
      case Languages.French:
        return parseFrench(text, shouldAnalyzeElision, shouldAnalyzeLiason);
      case Languages.Latin:
      default:
        // Filter rules for given language
        const languageRules = Object.values(rules).filter(
          (r: Rule) => languages[r.language].label.toLowerCase() === language
        );

        // Transcribe text based on those rules
        return transcribeText(
          text,
          languageRules,
          categories,
          subcategories,
          ipa
        );
    }
  };

  useEffect(() => {
    setResult(parseText(inputText));
  }, [inputText, shouldAnalyzeElision, shouldAnalyzeLiason, language, rules]);

  return (
    <div className={styles.container}>
      <div className={styles['container-left']}>
        <div className={styles['container-top']}>
          <h2>Text Input</h2>
          <HideButton
            shouldShow={shouldShowInput}
            setShouldShow={setShouldShowInput}
          />
        </div>
        <TextInput
          inputText={inputText}
          setInputText={setInputText}
          displayHeight={resultHeight}
          shouldHide={!shouldShowInput}
          autofocus
        />
      </div>
      <div className={styles['container-right']}>
        <div className={styles['container-top']}>
          <h2>Transcription Result</h2>
          <HideButton
            shouldShow={shouldShowOutput}
            setShouldShow={setShouldShowOutput}
          />
        </div>
        <ResultDisplay
          result={result}
          setHeight={(height) => setResultHeight(height)}
          shouldHide={!shouldShowOutput}
        />
      </div>
    </div>
  );
};

export default TranscriptionEditor;
