import { Metadata } from "next";

import TextSelection from "./TextSelection";
import PageHeader from "../../src/components/header/PageHeader";
import { Dictionary } from "../../src/hooks/useSupabaseTable";
import supabase from "../../src/lib/supabase";
import { DatabaseLanguage, DatabaseText } from "../../src/lib/supabase/types";
import { Database } from "../../src/schema";

interface PageProps {
  languages: Dictionary<DatabaseLanguage>;
  texts: Dictionary<DatabaseText>;
}

async function fetchPageProps(): Promise<PageProps> {
  // Call an external API endpoint to get posts
  const languages: Dictionary<DatabaseLanguage> = {};
  const { data: languagesArray } = await supabase.from("languages").select("*");

  if (!languagesArray) {
    return {
      languages: [],
      texts: [],
    };
  }

  languagesArray.forEach((language) => (languages[language.id] = language));

  const texts: Record<number, Database["public"]["Tables"]["texts"]["Row"]> =
    {};
  const { data: textsArray } = await supabase.from("texts").select("*");

  if (!textsArray) {
    return {
      languages,
      texts: [],
    };
  }

  textsArray.forEach((text) => (texts[text.id] = text));

  if (languages && texts) {
    return {
      languages,
      texts,
    };
  } else {
    return {
      languages: [],
      texts: [],
    };
  }
}

export const metadata: Metadata = {
  title: "Texts - Open IPA",
  description:
    "Browse a number of popular collected texts from all the languages we can transcribe. Get real-time, informative foreign language text to IPA transcription for lyric diction.",
};

export default async function TextsPage() {
  const { texts, languages } = await fetchPageProps();

  return (
    <>
      <PageHeader
        title="Texts"
        subtitle="Browse a number of popular collected texts from all the languages we can transcribe."
        colorClassName="bg-green-900 bg-opacity-75"
      />
      <TextSelection texts={texts} languages={languages} />
    </>
  );
}
