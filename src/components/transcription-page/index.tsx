"use client";

import dayjs from "dayjs";

import { TranscriptionPageStaticProps } from "./getTranscriptionPageStaticProps";
import TranscriptionActionButtons from "./TranscriptionActionButtons";
import TranscriptionDescription from "./TranscriptionDescription";
import TranscriptionEditor from "./TranscriptionEditor";
import TranscriptionEditorProvider from "./TranscriptionEditorProvider";
import { Languages } from "../../constants/Interfaces";
import { DatabaseText } from "../../lib/supabase/types";
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
  language: Languages;
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
  const supabaseText = typeof text === "string" ? undefined : text;
  const initialText = typeof text === "string" ? text : (text?.text ?? "");

  return (
    <>
      <PageHeader
        title="Transcription"
        subtitle="Type or paste your text below to transcribe it into the International Phonetic Alphabet."
        colorClassName="bg-blue-900/75"
      />
      <div className="w-full px-4 py-4 mx-auto max-w-7xl lg:py-8">
        <TranscriptionEditorProvider
          language={language}
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
