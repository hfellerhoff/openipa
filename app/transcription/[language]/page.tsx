import { Metadata } from "next";
import { notFound } from "next/navigation";

import TranscriptionPage from "../../../src/components/transcription-page";
import getTranscriptionPageStaticProps from "../../../src/components/transcription-page/getTranscriptionPageStaticProps";
import { isLanguage, Languages } from "../../../src/constants/Interfaces";
import { capitalizeFirstLetter } from "../../../src/util/StringHelper";

type TranscriptionPageParams = {
  language: string;
};

export interface ITranscriptionPageProps {
  params: Promise<TranscriptionPageParams>;
}

export async function generateStaticParams(): Promise<
  TranscriptionPageParams[]
> {
  const languages = Object.values(Languages);
  const languageMap = languages.map((language) => ({
    language,
  }));

  return languageMap;
}

export async function generateMetadata({
  params,
}: ITranscriptionPageProps): Promise<Metadata> {
  const { language } = await params;
  if (!isLanguage(language)) return {};

  const languageLabel = capitalizeFirstLetter(language);

  return {
    title: `${languageLabel} Language Transcription - Open IPA`,
    description: `Free, informative IPA transcription for Lyric Diction. Transcribe any ${languageLabel} text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.`,
  };
}

export default async function TranscriptionLanguagePage({
  params,
}: ITranscriptionPageProps) {
  const { language } = await params;
  if (!isLanguage(language)) notFound();

  const props = await getTranscriptionPageStaticProps(language);

  return <TranscriptionPage language={language} transcriptionProps={props} />;
}
