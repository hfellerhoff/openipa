import { Metadata } from "next";

import TranscriptionPage from "../../../../src/components/transcription-page";
import getTranscriptionPageStaticProps from "../../../../src/components/transcription-page/getTranscriptionPageStaticProps";
import supabase from "../../../../src/lib/supabase";
import { capitalizeFirstLetter } from "../../../../src/util/StringHelper";

interface ITranscriptionTextPageProps {
  params: {
    language?: string;
    slug?: string;
  };
}

const getTranscriptionTextPageProps = async ({
  params,
}: ITranscriptionTextPageProps) => {
  const language = params?.language as string;
  const transcriptionProps = await getTranscriptionPageStaticProps(language);

  const { data: languages } = await supabase.from("languages").select("*");

  if (!languages) {
    throw new Error("something went wrong fetching from supabase");
  }

  const currentLanguage = languages.filter(
    (l) => l.label.toLowerCase() === params?.language
  )[0];

  let { data: texts } = await supabase
    .from("texts")
    .select("*")
    .eq("slug", params?.slug as string);

  if (!texts) {
    throw new Error("something went wrong fetching from supabase");
  }

  texts = texts?.filter((t) => t.language === currentLanguage.id);

  if (texts.length > 0) {
    const text = texts[0];
    if (languages.length > 0) {
      return {
        transcriptionProps,
        text,
        language: languages.find((language) => language.id === text.language),
      };
    }
    return {
      transcriptionProps,
      text: texts[0],
      language: undefined,
    };
  }
  return {
    transcriptionProps,
    text: undefined,
  };
};

export async function generateStaticParams(): Promise<
  ITranscriptionTextPageProps["params"][]
> {
  // Call an external API endpoint to get posts
  const { data: texts } = await supabase.from("texts").select("*");
  const { data: languages } = await supabase.from("languages").select("*");

  if (!texts || !languages) {
    throw new Error("something went wrong fetching from supabase");
  }

  const languageDictionary: Record<string, string> = {};
  languages.forEach((language) => {
    languageDictionary[language.id] = language.label;
  });

  // Get the paths we want to pre-render based on posts
  const pagePropArray = texts.map((text) => ({
    language: languageDictionary[text.language].toLowerCase(),
    text: text.slug,
  }));

  return pagePropArray;
}

export async function generateMetadata({
  params,
}: ITranscriptionTextPageProps): Promise<Metadata> {
  if (!params?.language || !params?.slug) return {};

  const languageLabel = capitalizeFirstLetter(params.language);

  const { data: texts } = await supabase
    .from("texts")
    .select("*")
    .eq("slug", params.slug);

  const text = texts?.[0];
  if (!text) return {};

  return {
    title: `"${text.title}" ${languageLabel} Transcription - Open IPA`,
    description: `Free, informative IPA transcription for Lyric Diction. Transcribe "${text.title}" text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.`,
  };
}

export default async function TextPage(pageProps: ITranscriptionTextPageProps) {
  const { transcriptionProps, text } =
    await getTranscriptionTextPageProps(pageProps);

  return (
    <TranscriptionPage
      text={text}
      transcriptionProps={transcriptionProps}
      lockLanguage
    />
  );
}
