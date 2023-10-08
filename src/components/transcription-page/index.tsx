"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { TranscriptionPageStaticProps } from "./getTranscriptionPageStaticProps";
import TranscriptionActionButtons from "./TranscriptionActionButtons";
import TranscriptionDescription from "./TranscriptionDescription";
import TranscriptionEditor from "./TranscriptionEditor";
import { Languages, Result } from "../../constants/Interfaces";
import Template from "../../constants/Template";
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
  text?: DatabaseText | string;
  transcriptionProps: TranscriptionPageStaticProps;
}

export default function TranscriptionPage({ text, transcriptionProps }: Props) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Result>(Template.Result);

  const supabaseText = text as DatabaseText | undefined;
  const queryParamsText = searchParams?.get("text") as string;

  const initialText = supabaseText?.text || queryParamsText || "";

  const language = (params?.language ?? "") as string as Languages;
  const languageLabel = capitalizeFirstLetter(language);
  const isLanguageSupported = languageLabel in Languages;

  useEffect(() => {
    if (!!language && !isLanguageSupported) router.replace("/transcription");
  }, [isLanguageSupported, language, router]);

  if (!isLanguageSupported) return null;

  const setLanguage = (updatedLanguage: Languages) => {
    if (!supabaseText) {
      router.push(`/transcription/${updatedLanguage}`);
    }
  };

  return (
    <>
      <PageHeader
        title="Transcription"
        subtitle="Type or paste your text below to transcribe it into the International Phonetic Alphabet."
        colorClassName="bg-blue-900 bg-opacity-75"
      />
      <div className="w-full px-4 py-4 mx-auto max-w-7xl lg:py-8">
        <TranscriptionDescription
          language={language}
          setLanguage={setLanguage}
        />
        <TranscriptionEditor
          language={language}
          result={result}
          setResult={setResult}
          text={initialText}
          transcriptionProps={transcriptionProps}
        />
        {!!supabaseText && <PredefinedTextInformation text={supabaseText} />}
        <TranscriptionActionButtons language={language} result={result} />
      </div>
    </>
  );
}
