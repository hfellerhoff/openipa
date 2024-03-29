"use client";

import React, { useEffect, useState } from "react";

import styles from "./Demonstration.module.scss";
import { Languages, Result } from "../../constants/Interfaces";
import Template from "../../constants/Template";
import transcribeText from "../../transcription/transcribeText";
import { capitalizeFirstLetter } from "../../util/StringHelper";
import { getObjectValues } from "../../util/typeUtils";
import ResultDisplay from "../display/ResultDisplay";
import TextInput from "../input/TextInput";
import { TranscriptionPageStaticProps } from "../transcription-page/getTranscriptionPageStaticProps";

export default function Demonstration({
  rules,
  languages,
  categories,
  subcategories,
  ipa,
}: TranscriptionPageStaticProps) {
  const [inputText, setInputText] = useState("Ave maria, gratia plena.");
  const [language] = useState(Languages.Latin);
  const [resultHeight, setResultHeight] = useState(0);
  const [result, setResult] = useState<Result>(Template.Result);

  useEffect(() => {
    const parseText = (text: string) => {
      // Filter rules for given language
      const languageRules = getObjectValues(rules).filter((r) =>
        languages[r.language_id]
          ? languages[r.language_id].label.toLowerCase() === language
          : false
      );

      // Transcribe text based on those rules
      return transcribeText(
        text,
        languageRules,
        categories,
        subcategories,
        ipa
      );
    };

    setResult(parseText(inputText));
  }, [inputText, language, rules, languages, categories, ipa, subcategories]);

  return (
    <div className={styles.container}>
      <div className={styles["container-left"]}>
        <h2 className={styles.title}>Why Open IPA?</h2>
        <p className={styles.description}>
          Open IPA features text to IPA transcription in real-time. That means
          you can type out text, and Open IPA will transcribe it live in front
          of you, without having to wait for a transcription to be procesed. Try
          it out in the boxes!
        </p>
        <p className={styles.description}>
          In addition to live transcription, Open IPA gives you nuanced feedback
          about each transcription. Try hovering over the syllables in the IPA
          result to see!
        </p>
      </div>
      <div className="w-10 h-10" />
      <div className={styles["container-right"]}>
        <div className={styles["container-right-container-left"]}>
          <TextInput
            inputText={inputText}
            setInputText={setInputText}
            theme="dark"
            displayHeight={resultHeight}
          />
          <h3 className={styles["input-title"]}>
            {`${capitalizeFirstLetter(language)} Text Input`}
          </h3>
        </div>
        <div className={styles["container-right-container-right"]}>
          <ResultDisplay
            result={result}
            theme="dark"
            setHeight={(height) => setResultHeight(height)}
            language={language}
            hideFeedback
          />
          <h3 className={styles["input-title"]}>IPA Result</h3>
        </div>
      </div>
    </div>
  );
}
