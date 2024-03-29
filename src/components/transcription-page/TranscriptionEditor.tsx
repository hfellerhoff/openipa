import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import clsx from "clsx";

import { TranscriptionPageStaticProps } from "./getTranscriptionPageStaticProps";
import styles from "./TranscriptionEditor.module.scss";
import { useTranscriptionEditorContext } from "./TranscriptionEditorProvider";
import { Languages } from "../../constants/Interfaces";
import {
  FrenchTranscriptionOptions,
  GlobalTranscriptionOptions,
  useEditorStore,
} from "../../state/editor";
import parseFrench from "../../transcription/french/ParseFrench";
import transcribeText from "../../transcription/transcribeText";
import { getObjectValues } from "../../util/typeUtils";
import HideButton from "../buttons/HideButton";
import ResultDisplay from "../display/ResultDisplay";
import TextInput from "../input/TextInput";

interface Props {
  text?: string;
  editorView?: boolean;
  transcriptionProps: TranscriptionPageStaticProps;
}

const TranscriptionEditor: React.FC<Props> = ({
  text,
  editorView,
  transcriptionProps,
}) => {
  const { language, result, setResult, inputText, setInputText } =
    useTranscriptionEditorContext();
  const languageOptions: GlobalTranscriptionOptions = useEditorStore(
    (store) => store.options[language]
  );

  const [shouldShowInput, setShouldShowInput] = useState(true);
  const [shouldShowOutput, setShouldShowOutput] = useState(true);

  const [resultHeight, setResultHeight] = useState(0);

  const { ipa, subcategories, categories, rules, languages } =
    transcriptionProps;

  const languageRules = useMemo(
    () =>
      getObjectValues(rules).filter((r) =>
        languages[r.language_id]
          ? languages[r.language_id].label.toLowerCase() === language
          : false
      ),
    [rules, languages, language]
  );

  useEffect(() => {
    if (text) setInputText(text);
  }, [setInputText, text]);

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
            languageOptions as unknown as FrenchTranscriptionOptions
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
    editorView,
    setResult,
  ]);

  return (
    <div
      className={clsx("grid grid-cols-1 gap-4", {
        "md:grid-cols-2 md:gap-2": !editorView,
      })}
    >
      <div className="relative">
        <div className={styles["container-top"]}>
          <h2 className="text-lg">Text Input</h2>
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
      <div className="relative">
        <div className={styles["container-top"]}>
          <h2 className="text-lg">Transcription Result</h2>
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
