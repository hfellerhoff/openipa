import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import wretch from "wretch";

import { useTranscriptionEditorContext } from "./TranscriptionEditorProvider";
import { TranslationResponse } from "../../../pages/api/translate";
import { Languages } from "../../constants/Interfaces";
import { trackAnalyticsEvent } from "../../lib/umami";
import { useEditorStore } from "../../state/editor";
import { TranslationQuota, useQuotaStore } from "../../state/quota";
import { useTranslationStore } from "../../state/translation";
import copyResult from "../../util/CopyResult";
import createPDFFromResult from "../../util/CreatePDF";
import ExportButton from "../buttons/ExportButton";
import Blockquote from "../core/Blockquote";

const getQuotaText = (translationsLeft: number, quota: TranslationQuota) => {
  if (translationsLeft > 0) {
    return `You have ${translationsLeft} translation${
      translationsLeft === 1 ? "" : "s"
    } left this week.`;
  }

  return `Your translation quota will reset on ${dayjs(quota.resetOn).format(
    "MMMM D"
  )}.`;
};

const TranscriptionActionButtons = () => {
  const { language, result } = useTranscriptionEditorContext();
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

  const shouldHideOriginalText = useEditorStore((store) =>
    store?.options[language]?.shouldHideOriginalText
      ? store.options[language].shouldHideOriginalText.value
      : false
  );

  const translationsLeft = translationQuota.limit - translationQuota.count;

  const handleCreatePDF = () => {
    trackAnalyticsEvent("click", "Create PDF");
    trackAnalyticsEvent("click", "Create PDF", { language });

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
        resetQuota("translation");
      }
    };

    checkForQuotaReset();
  }, [resetQuota, translationQuota.resetOn]);

  const handleTranslate = async () => {
    if (translationsLeft <= 0) return;

    trackAnalyticsEvent("click", "Translate", { language });

    setIsTranslating(true);

    const data: TranslationResponse = await wretch("/api/translate")
      .post({ result, language })
      .json();

    data.translations.forEach((translation) =>
      addTranslation(
        translation.sourceLanguage,
        translation.originalText,
        translation.translatedText
      )
    );

    updateQuota("translation", 1);
    setIsTranslating(false);
  };

  const isNotLatin = language.toLowerCase() !== "latin";

  const quotaText = getQuotaText(translationsLeft, translationQuota);

  const handleCopy = () => {
    trackAnalyticsEvent("click", "Copy", { language });

    copyResult(result, shouldHideOriginalText);
  };

  return (
    <>
      {isNotLatin && (
        <Blockquote>
          Open IPA uses the{" "}
          <a
            href="https://www.deepl.com/translator"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            DeepL API
          </a>{" "}
          for language translation. Since this is a paid service, each user is
          limited to a certain amount of translations. {quotaText}
        </Blockquote>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {isNotLatin && (
          <ExportButton
            title="Translate"
            onClick={handleTranslate}
            isLoading={isTranslating}
            isDisabled={translationsLeft <= 0}
          ></ExportButton>
        )}
        <ExportButton
          title="Export as PDF"
          onClick={handleCreatePDF}
          isLoading={!isPDFCreated}
        ></ExportButton>
        <ExportButton title="Copy" onClick={handleCopy}></ExportButton>
      </div>
    </>
  );
};

export default TranscriptionActionButtons;
