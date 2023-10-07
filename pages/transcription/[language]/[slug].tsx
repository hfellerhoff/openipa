import { GetStaticProps } from "next";

import TranscriptionPage from "../../../src/components/transcription-page";
import getTranscriptionPageStaticProps, {
  TranscriptionPageStaticProps,
} from "../../../src/components/transcription-page/getTranscriptionPageStaticProps";
import { Dictionary } from "../../../src/hooks/useSupabaseTable";
import supabase from "../../../src/lib/supabase";
import {
  DatabaseLanguage,
  DatabaseText,
} from "../../../src/lib/supabase/types";

interface Props {
  text?: DatabaseText;
  language?: DatabaseLanguage;
  transcriptionProps: TranscriptionPageStaticProps;
}

const TextPage = ({ text, transcriptionProps }: Props) => {
  return (
    <TranscriptionPage text={text} transcriptionProps={transcriptionProps} />
  );
};

export default TextPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
        props: {
          transcriptionProps,
          text,
          language: languages.find((language) => language.id === text.language),
        },
      };
    }
    return {
      props: {
        transcriptionProps,
        text: texts[0],
        language: undefined,
      },
    };
  }
  return {
    props: {
      transcriptionProps,
      text: undefined,
    },
  };
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data: texts } = await supabase.from("texts").select("*");
  const { data: languages } = await supabase.from("languages").select("*");

  if (!texts || !languages) {
    throw new Error("something went wrong fetching from supabase");
  }

  const languageDictionary: Dictionary<string> = {};
  languages.forEach((language) => {
    languageDictionary[language.id] = language.label;
  });

  // Get the paths we want to pre-render based on posts
  const paths = texts.map(
    (text) =>
      `/transcription/${languageDictionary[text.language].toLowerCase()}/${
        text.slug
      }`
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
