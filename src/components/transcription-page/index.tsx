"use client";

import { useEffect } from "react";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { TranscriptionPageStaticProps } from "./getTranscriptionPageStaticProps";
import TranscriptionActionButtons from "./TranscriptionActionButtons";
import TranscriptionDescription from "./TranscriptionDescription";
import TranscriptionEditor from "./TranscriptionEditor";
import TranscriptionEditorProvider from "./TranscriptionEditorProvider";
import { Languages } from "../../constants/Interfaces";
import { DatabaseText } from "../../lib/supabase/types";
import { capitalizeFirstLetter } from "../../util/StringHelper";
import PageHeader from "../header/PageHeader";

const PredefinedTextInformation = ({ text }: { text: DatabaseText }) => {
  if (!text.source) return <></>;
  return (
    <p className="mt-2">
      This text is originally from{" "}
      <a
        href={text.source}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        this source.
      </a>{" "}
      It was last updated on {dayjs(text.updated_at).format("MMMM DD, YYYY")}.
    </p>
  );
};

interface Props {
  language: string;
  text?: DatabaseText | string;
  transcriptionProps: TranscriptionPageStaticProps;
  lockLanguage?: boolean;
}

export default function TranscriptionPage({
  language,
  text,
  transcriptionProps,
  lockLanguage = false,
}: Props) {
  const router = useRouter();
  const supabaseText = typeof text === "string" ? undefined : text;
  const initialText = typeof text === "string" ? text : (text?.text ?? "");

  const languageLabel = capitalizeFirstLetter(language);
  const isLanguageSupported = languageLabel in Languages;

  useEffect(() => {
    if (!!language && !isLanguageSupported) router.replace("/transcription");
  }, [isLanguageSupported, language, router]);

  if (!isLanguageSupported) return null;

  return (
    <>
      <PageHeader
        title="Transcription"
        subtitle="Type or paste your text below to transcribe it into the International Phonetic Alphabet."
        colorClassName="bg-blue-900/75"
      />
      <div className="w-full px-4 py-4 mx-auto max-w-7xl lg:py-8">
        <TranscriptionEditorProvider
          language={language as Languages}
          initialText={initialText}
        >
          <TranscriptionDescription lockLanguage={lockLanguage} />
          <TranscriptionEditor transcriptionProps={transcriptionProps} />
          {!!supabaseText && <PredefinedTextInformation text={supabaseText} />}
          <TranscriptionActionButtons />
        </TranscriptionEditorProvider>
      </div>
    </>
  );
}
