import React, { useState, useEffect } from 'react';
import TextInput from '../input/TextInput';
import ResultDisplay from '../display/ResultDisplay';
import parseLatin from '../../transcription/latin/ParseLatin';
import parseFrench from '../../transcription/french/ParseFrench';
import { Result, Languages } from '../../constants/Interfaces';
import styles from './TranscriptionEditor.module.scss';
import HideButton from '../buttons/HideButton';
import { Rule } from '../../constants/Rule';
import supabase from '../../lib/supabase';
import supabaseParseLatin from '../../transcription/latin/SupabaseParseLatin';
import useSupabaseIPA from '../../hooks/useSupabaseIPA';

interface Props {
  language: string;
  shouldAnalyzeElision: boolean;
  shouldAnalyzeLiason: boolean;
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
}

const TranscriptionEditor: React.FC<Props> = ({
  language,
  shouldAnalyzeElision,
  shouldAnalyzeLiason,
  result,
  setResult,
}) => {
  const [inputText, setInputText] = useState('');
  const [shouldShowInput, setShouldShowInput] = useState(true);
  const [shouldShowOutput, setShouldShowOutput] = useState(true);

  const [resultHeight, setResultHeight] = useState(0);

  const { categories, subcategories, ipa } = useSupabaseIPA();
  const [rules, setRules] = useState<Rule[]>([]);

  const parseText = (text: string) => {
    switch (language as Languages) {
      case Languages.Latin:
        return supabaseParseLatin(text, rules, categories, subcategories, ipa);
      case Languages.French:
        return parseFrench(text, shouldAnalyzeElision, shouldAnalyzeLiason);
      default:
        return supabaseParseLatin(text, rules, categories, subcategories, ipa);
    }
  };

  useEffect(() => {
    setResult(parseText(inputText));
  }, [inputText, shouldAnalyzeElision, shouldAnalyzeLiason, language]);

  useEffect(() => {
    const updateRules = async () => {
      const rulesQuery = await supabase.from('rules').select('*');
      setRules(rulesQuery.data);
    };

    updateRules();
  }, [language]);

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
