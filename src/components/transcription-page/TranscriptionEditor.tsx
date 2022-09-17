import React, { useState, useEffect } from 'react';
import TextInput from '../input/TextInput';
import ResultDisplay from '../display/ResultDisplay';
import parseFrench from '../../transcription/french/ParseFrench';
import { Result, Languages } from '../../constants/Interfaces';
import styles from './TranscriptionEditor.module.scss';
import HideButton from '../buttons/HideButton';
import { Rule } from '../../lib/supabase/models/Rule';
import useSupabaseIPA from '../../hooks/useSupabaseIPA';
import transcribeText from '../../transcription/transcribeText';
import {
  FrenchTranscriptionOptions,
  GlobalTranscriptionOptions,
  useEditorStore,
} from '../../state/editor';
import clsx from 'clsx';
import { useMemo } from 'react';

interface Props {
  language: Languages;
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  text?: string;
  editorView?: boolean;
}

const TranscriptionEditor: React.FC<Props> = ({
  language,
  result,
  setResult,
  text,
  editorView,
}) => {
  const languageOptions: GlobalTranscriptionOptions = useEditorStore(
    (store) => store.options[language]
  );

  const [inputText, setInputText] = useState(text || '');
  const [shouldShowInput, setShouldShowInput] = useState(true);
  const [shouldShowOutput, setShouldShowOutput] = useState(true);

  const [resultHeight, setResultHeight] = useState(0);

  const { categories, subcategories, ipa, rules, languages } = useSupabaseIPA();

  const languageRules = useMemo(
    () =>
      Object.values(rules).filter((r: Rule) =>
        languages[r.language]
          ? languages[r.language].label.toLowerCase() === language
          : false
      ),
    [rules, languages]
  );

  useEffect(() => {
    const parseText = (text: string) => {
      if (editorView) {
        return transcribeText(
          text,
          languageRules,
          categories,
          subcategories,
          ipa
        );
      }

      switch (language as Languages) {
        case Languages.French:
          return parseFrench(
            text,
            languageOptions as any as FrenchTranscriptionOptions
          );
        case Languages.Latin:
        default:
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

    setResult(parseText(inputText));
  }, [
    inputText,
    language,
    languageOptions,
    categories,
    subcategories,
    ipa,
    rules,
    languages,
    languageRules,
  ]);

  return (
    <div
      className={clsx('grid grid-cols-1 gap-4', {
        'md:grid-cols-2 md:gap-2': !editorView,
      })}
    >
      <div className='relative'>
        <div className={styles['container-top']}>
          <h2 className='text-lg'>Text Input</h2>
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
      <div className='relative'>
        <div className={styles['container-top']}>
          <h2 className='text-lg'>Transcription Result</h2>
          <HideButton
            shouldShow={shouldShowOutput}
            setShouldShow={setShouldShowOutput}
          />
        </div>
        <ResultDisplay
          result={result}
          setHeight={(height) => setResultHeight(height)}
          shouldHide={!shouldShowOutput}
          shouldHideOriginalText={languageOptions.shouldHideOriginalText.value}
          language={language}
        />
      </div>
    </div>
  );
};

export default TranscriptionEditor;
