import React, { useState, useEffect } from 'react';
import Rules from '../../transcription/latin/LatinRules';
import { Word, Line, Result } from '../../constants/Interfaces';

import styles from './ResultDisplay.module.scss';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import IPA from '../../constants/IPA';

type PhonemeProps = {
  text: string;
  rule: string;
  isIPA?: boolean;
  theme: 'light' | 'dark';
};

const PhonemeElement = ({ text, rule, isIPA = false, theme }: PhonemeProps) => {
  const textClassName = isIPA
    ? styles[`display-ipa--${theme}`]
    : styles[`display-text--${theme}`];
  const tooltipClassName = `${styles['tooltip']} ${
    styles[`tooltip--${theme}`]
  }`;
  const tooltipTextClassName = `${styles['tooltip-text']} ${
    styles[`tooltip-text--${theme}`]
  }`;

  const getText = () => {
    return isIPA ? (
      <span className={textClassName}>{text}</span>
    ) : (
      <span className={textClassName}>{text}</span>
    );
  };

  if (rule !== Rules.NONE)
    return (
      <div className={tooltipClassName}>
        {getText()}
        <span className={tooltipTextClassName}>{rule}</span>
      </div>
    );
  else return getText();
};

type WordProps = {
  word: Word;
  theme: 'light' | 'dark';
};
const WordElement = ({ word, theme }: WordProps) => {
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
    <div className={styles['phoneme-block']}>
      <div>{originalSyllableElements}</div>
      <div>{syllableElements}</div>
    </div>
  );
};

type LineProps = {
  line: Line;
  theme: 'light' | 'dark';
};
const LineElement = ({ line, theme }: LineProps) => {
  const wordElements: JSX.Element[] = [];
  line.words.forEach((word, index) => {
    const wordElement = <WordElement word={word} key={index} theme={theme} />;
    let foundUndertie = false;
    word.syllables.forEach((syllable) => {
      if (syllable.ipa.indexOf(IPA.UNDERTIE) >= 0) {
        foundUndertie = true;
      }
    });
    const spaceElement = (
      <span style={{ margin: '0px 5px' }} key={(index + 0.5).toString()}></span>
    );
    wordElements.push(wordElement);
    if (!foundUndertie) wordElements.push(spaceElement);
  });
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>{wordElements}</div>
  );
};

type DisplayProps = {
  result: Result;
  theme?: 'light' | 'dark';
  setHeight?: (height: number) => void;
  shouldHide?: boolean;
};
const ResultElement = ({
  result,
  theme = 'light',
  setHeight,
  shouldHide,
}: DisplayProps) => {
  const [displayRef, setDisplayRef] = useState<HTMLDivElement>();

  const { width } = useWindowDimensions();
  const isWidthSmallEnough = width <= 800 ? true : false;

  const lineElements: JSX.Element[] = [];
  result.lines.forEach((line, index) => {
    const lineElement = <LineElement line={line} key={index} theme={theme} />;
    lineElements.push(lineElement);
  });

  const className = `${styles[`display--${theme}`]}`;

  useEffect(() => {
    if (displayRef && setHeight) {
      const height = displayRef.offsetHeight;
      if (height !== 0) setHeight(height);
    }
  }, [result, displayRef, setHeight]);

  return (
    <div
      id='result'
      className={className}
      ref={(display) => setDisplayRef(display ? display : displayRef)}
      hidden={isWidthSmallEnough ? shouldHide : false}
    >
      {lineElements}
    </div>
  );
};

export default ResultElement;
