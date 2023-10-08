import { Metadata } from "next";

import TranscriptionPage from "../../../src/components/transcription-page";
import getTranscriptionPageStaticProps from "../../../src/components/transcription-page/getTranscriptionPageStaticProps";
import { Languages } from "../../../src/constants/Interfaces";
import { capitalizeFirstLetter } from "../../../src/util/StringHelper";

export interface ITranscriptionPageProps {
  params: {
    language?: string;
  };
}

export async function generateStaticParams(): Promise<
  ITranscriptionPageProps["params"][]
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
  if (!params?.language) return {};

  const languageLabel = capitalizeFirstLetter(params.language);

  return {
    title: `${languageLabel} Language Transcription - Open IPA`,
    description: `Free, informative IPA transcription for Lyric Diction. Transcribe any ${languageLabel} text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.`,
  };
}

export default async function TranscriptionLanguagePage({
  params,
}: ITranscriptionPageProps) {
  const language = params?.language as string;
  const props = await getTranscriptionPageStaticProps(language);

  return <TranscriptionPage transcriptionProps={props} />;
}
