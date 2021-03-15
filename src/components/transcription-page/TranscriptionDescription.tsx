import React, { useState } from 'react';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import { capitalizeFirstLetter } from '../../util/StringHelper';
import { Languages } from '../../constants/Interfaces';
import styles from './TranscriptionDescription.module.scss';
import HideButton from '../buttons/HideButton';
import CheckboxButton from '../buttons/CheckboxButton';
import { useRouter } from 'next/router';

interface Props {
  language: string;
  setLanguage: (language: Languages) => void;
  shouldAnalyzeElision: boolean;
  setShouldAnalyzeElision: React.Dispatch<React.SetStateAction<boolean>>;
  shouldAnalyzeLiason: boolean;
  setShouldAnalyzeLiason: React.Dispatch<React.SetStateAction<boolean>>;
  lockLanguage?: boolean;
}

const TranscriptionDescription: React.FC<Props> = ({
  language,
  setLanguage,
  shouldAnalyzeElision,
  setShouldAnalyzeElision,
  shouldAnalyzeLiason,
  setShouldAnalyzeLiason,
  lockLanguage = false,
}) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWidthSmallEnough = width <= 800 ? true : false;

  return (
    <div>
      <blockquote className='quote py-2 mb-4 bg-gray-200 italic'>
        Tip: Open IPA gives in-depth transcription guidelines for each character
        it transcribes. Try hovering over a letter in the IPA result to try it
        out!
      </blockquote>
      <div className={styles['container']}>
        <div className={styles['language-select']}>
          {lockLanguage ? (
            <h2>{capitalizeFirstLetter(language)} to IPA Text Transcription</h2>
          ) : (
            <h2>
              Transcribe from
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value as Languages);
                  router.push(
                    `/transcription/${language}`,
                    `/transcription/${e.target.value}`
                  );
                }}
              >
                <option value='latin'>Latin</option>
                <option value='french'>French</option>
              </select>
              into IPA
            </h2>
          )}
        </div>
        {language === Languages.French ? (
          <div className={styles['options-container']}>
            <div className={styles['option-container']}>
              <CheckboxButton
                isChecked={shouldAnalyzeElision}
                setIsChecked={setShouldAnalyzeElision}
              />
              <h5 className={styles['option-title']}>Analyze Elision</h5>
            </div>
            <div style={{ height: 10 }}></div>
            <div className={styles['option-container']}>
              <CheckboxButton
                isChecked={shouldAnalyzeLiason}
                setIsChecked={setShouldAnalyzeLiason}
              />
              <h5 className={styles['option-title']}>Analyze Liason</h5>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TranscriptionDescription;
