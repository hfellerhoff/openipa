import React, { useEffect } from "react";
import { useRef } from "react";

import clsx from "clsx";

import styles from "./ResultDisplay.module.scss";
import ResultEditButton from "./ResultEditButton";
import { Word, Line, Result } from "../../constants/Interfaces";
import IPA from "../../constants/IPA";
import useWindowDimensions from "../../hooks/UseWindowDimensions";
import { useTranslationStore } from "../../state/translation";
import { resultToLines } from "../../util/resultToLines";
import FeedbackModal from "../feedback/FeedbackModal";

type PhonemeProps = {
  text: string;
  rule: string;
  isIPA?: boolean;
  theme: "light" | "dark";
};

const PhonemeElement = ({ text, rule, isIPA = false, theme }: PhonemeProps) => {
  const textClassName = isIPA
    ? styles[`display-ipa--${theme}`]
    : styles[`display-text--${theme}`];
  const tooltipClassName = `${styles["tooltip"]} ${
    styles[`tooltip--${theme}`]
  }`;
  const tooltipTextClassName = `${styles["tooltip-text"]} ${
    styles[`tooltip-text--${theme}`]
  }`;

  if (rule)
    return (
      <div className={tooltipClassName}>
        <span className={textClassName}>{text}</span>
        <span className={tooltipTextClassName}>{rule}</span>
      </div>
    );
  else return <span className={textClassName}>{text}</span>;
};

type WordProps = {
  word: Word;
  theme: "light" | "dark";
  shouldHideOriginalText: boolean;
};
const WordElement = ({ word, theme, shouldHideOriginalText }: WordProps) => {
  const originalSyllableElements: JSX.Element[] = [];
  const syllableElements: JSX.Element[] = [];
  word.syllables.forEach((phoneme, index) => {
    const phonemeElement = (
      <PhonemeElement
        isIPA
        text={phoneme.ipa}
        rule={phoneme.rule}
        key={index}
        theme={theme}
      />
    );
    syllableElements.push(phonemeElement);

    const originalPhonemeElement = (
      <PhonemeElement
        text={phoneme.text}
        rule={phoneme.rule}
        key={index}
        theme={theme}
      />
    );
    originalSyllableElements.push(originalPhonemeElement);
  });
  return (
    <div
      className={clsx("inline-block flex-col", {
        "my-2.5": !shouldHideOriginalText,
      })}
    >
      {!shouldHideOriginalText && <div>{originalSyllableElements}</div>}
      <div>{syllableElements}</div>
    </div>
  );
};

type LineProps = {
  line: Line;
  lineText: string;
  theme: "light" | "dark";
  shouldHideOriginalText: boolean;
  translations: Map<string, string>;
};
const LineElement = ({
  line,
  lineText,
  translations,
  theme,
  shouldHideOriginalText,
}: LineProps) => {
  const wordElements: JSX.Element[] = [];
  line.words.forEach((word, index) => {
    const wordElement = (
      <WordElement
        word={word}
        key={index}
        theme={theme}
        shouldHideOriginalText={shouldHideOriginalText}
      />
    );
    let foundUndertie = false;
    word.syllables.forEach((syllable) => {
      if (syllable.ipa.indexOf(IPA.UNDERTIE) >= 0) {
        foundUndertie = true;
      }
    });
    const spaceElement = (
      <span className="mx-1" key={(index + 0.5).toString()}></span>
    );
    wordElements.push(wordElement);
    if (!foundUndertie) wordElements.push(spaceElement);
  });
  return (
    <div
      className={clsx({
        "mt-2 mb-4": !shouldHideOriginalText,
        "mt-1": shouldHideOriginalText,
      })}
    >
      {translations && (
        <span className={`${styles[`translated-text--${theme}`]}`}>
          {translations.get(lineText)}
        </span>
      )}
      <div className="flex flex-wrap">{wordElements}</div>
    </div>
  );
};

type DisplayProps = {
  result: Result;
  language: string;
  shouldHideOriginalText?: boolean;
  theme?: "light" | "dark";
  setHeight?: (height: number) => void;
  shouldHide?: boolean;
  hideFeedback?: boolean;
};
const ResultElement = ({
  result,
  language,
  shouldHideOriginalText = false,
  theme = "light",
  setHeight,
  shouldHide,
  hideFeedback = false,
}: DisplayProps) => {
  const displayRef = useRef<HTMLDivElement>(null);
  const { allTranslations } = useTranslationStore((store) => ({
    allTranslations: store.translations,
  }));

  const countryCode = language.toLowerCase() === "french" ? "FR" : "EN";
  const translations = allTranslations[countryCode] || null;

  const { width } = useWindowDimensions();
  const isWidthSmallEnough = width <= 800 ? true : false;

  const lines = resultToLines(result);
  const lineElements: JSX.Element[] = [];

  result.lines.forEach((line, index) => {
    const lineElement = (
      <LineElement
        line={line}
        lineText={lines[index]}
        key={index}
        theme={theme}
        translations={translations}
        shouldHideOriginalText={shouldHideOriginalText}
      />
    );
    lineElements.push(lineElement);
  });

  const className = `${styles[`display--${theme}`]}`;

  useEffect(() => {
    if (displayRef.current && setHeight) {
      const height = displayRef.current?.offsetHeight;
      if (height !== 0) setHeight(height);
    }
  }, [result, displayRef, setHeight, shouldHideOriginalText]);

  return (
    <div
      id="result"
      className={clsx("relative", {
        [className]: !!className,
      })}
      ref={displayRef}
      hidden={isWidthSmallEnough ? shouldHide : false}
    >
      {lineElements}
      {!hideFeedback && <FeedbackModal result={result} language={language} />}
      <ResultEditButton />
    </div>
  );
};

export default ResultElement;
