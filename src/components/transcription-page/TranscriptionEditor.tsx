import React, { useState, useEffect } from 'react';
import TextInput from '../input/TextInput';
import ResultDisplay from '../display/ResultDisplay';
import parseLatin from '../../transcription/latin/ParseLatin';
import parseFrench from '../../transcription/french/ParseFrench';
import { Result, Languages } from '../../constants/Interfaces';
import styles from './TranscriptionEditor.module.scss';
import HideButton from '../buttons/HideButton';
import { Rule } from '../../lib/supabase/models/Rule';
import supabase from '../../lib/supabase';
import supabaseParseLatin from '../../transcription/latin/SupabaseParseLatin';
import useSupabaseIPA from '../../hooks/useSupabaseIPA';

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

  const { categories, subcategories, ipa, rules } = useSupabaseIPA();

  const parseText = (text: string) => {
    switch (language as Languages) {
      case Languages.Latin:
        // return parseLatin(text);
        return supabaseParseLatin(
          text,
          Object.values(rules),
          categories,
          subcategories,
          ipa
        );
      case Languages.French:
        return parseFrench(text, shouldAnalyzeElision, shouldAnalyzeLiason);
      default:
        return parseLatin(text);
      // return supabaseParseLatin(text, rules, categories, subcategories, ipa);
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
