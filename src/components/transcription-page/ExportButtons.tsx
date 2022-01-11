import React, { useEffect, useState } from 'react';
import ExportButton from '../buttons/ExportButton';
import { Result, Languages } from '../../constants/Interfaces';
import createPDFFromResult from '../../util/CreatePDF';
import copyResult from '../../util/CopyResult';
import styles from './ExportButtons.module.scss';
import wretch from 'wretch';
import { useTranslationStore } from '../../state/translation';
import { TranslationResponse } from '../../../pages/api/translate';
import { useQuotaStore } from '../../state/quota';
import dayjs from 'dayjs';

interface Props {
  language: string;
  result: Result;
  shouldHideOriginalText: boolean;
}

const ExportButtons: React.FC<Props> = ({
  language,
  result,
  shouldHideOriginalText,
}) => {
  const [isPDFCreated, setIsPDFCreated] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const { addTranslation } = useTranslationStore((store) => ({
    translations: store.translations,
    addTranslation: store.addTranslation,
  }));

  const { translationQuota, updateQuota, resetQuota } = useQuotaStore(
    (store) => ({
      updateQuota: store.updateQuota,
      resetQuota: store.resetQuota,
      translationQuota: store.translation,
    })
  );

  const translationsLeft = translationQuota.limit - translationQuota.count;

  const handleCreatePDF = () => {
    setIsPDFCreated(false);
    setTimeout(() => {
      createPDFFromResult(language as Languages, result).then(() =>
        setIsPDFCreated(true)
      );
    }, 400);
    // I know this whole function is kinda gross, but for some reason
    // this is more responsive than having no delay whatsoever
  };

  useEffect(() => {
    const checkForQuotaReset = () => {
      if (dayjs().diff(dayjs(translationQuota.resetOn)) >= 0) {
        resetQuota('translation');
      }
    };

    checkForQuotaReset();
  }, []);

  const handleTranslate = async () => {
    if (translationsLeft <= 0) return;

    setIsTranslating(true);

    const data: TranslationResponse = await wretch('/api/translate')
      .post({ result, language })
      .json();

    data.translations.forEach((translation) =>
      addTranslation(
        translation.sourceLanguage,
        translation.originalText,
        translation.translatedText
      )
    );

    updateQuota('translation', 1);
    setIsTranslating(false);
  };

  const isNotLatin = language.toLowerCase() !== 'latin';

  return (
    <>
      {isNotLatin && (
        <blockquote className='quote mt-8'>
          Open IPA uses the{' '}
          <a
            href='https://www.deepl.com/translator'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold'
          >
            DeepL API
          </a>{' '}
          for language translation. Since this is a paid service, each user is
          limited to a certain amount of translations.{' '}
          {translationsLeft > 0
            ? `You have ${translationsLeft} translation${
                translationsLeft === 1 ? '' : 's'
              } left this week.`
            : `Your translation quota will reset on ${dayjs(
                translationQuota.resetOn
              ).format('MMMM D')}.`}
        </blockquote>
      )}
      <div className={styles['export-container']}>
        {isNotLatin && (
          <ExportButton
            title='Translate'
            onClick={handleTranslate}
            isLoading={isTranslating}
            isDisabled={translationsLeft <= 0}
          ></ExportButton>
        )}
        <div style={{ width: 15, height: 15 }}></div>
        <ExportButton
          title='Export as PDF'
          onClick={handleCreatePDF}
          isLoading={!isPDFCreated}
        ></ExportButton>
        <div style={{ width: 15, height: 15 }}></div>
        <ExportButton
          title='Copy'
          onClick={() => copyResult(result, shouldHideOriginalText)}
        ></ExportButton>
      </div>
    </>
  );
};

export default ExportButtons;
