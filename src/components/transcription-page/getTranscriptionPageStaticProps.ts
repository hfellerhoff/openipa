import { Dictionary } from "../../hooks/useSupabaseTable";
import supabase from "../../lib/supabase";
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
  DatabaseIPATag,
  DatabaseLanguage,
  DatabaseRowFromTableName,
  DatabaseTableName,
  TransformedRule,
} from "../../lib/supabase/types";
import { isKeyInObject } from "../../util/typeUtils";

export interface TranscriptionPageStaticProps {
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
  tags: Dictionary<DatabaseIPATag>;
  rules: Dictionary<TransformedRule>;
  languages: Dictionary<DatabaseLanguage>;
}

const fetchFromTable = async <T extends DatabaseTableName>(
  table: T,
  language?: DatabaseLanguage
) => {
  if (!language) {
    return await supabase
      .from(table)
      .select("*")
      .order("id", { ascending: true });
  }

  return await supabase
    .from(table)
    .select("*")
    .eq("language_id", language.id)
    .order("id", { ascending: true });
};

export const fetchSupabaseTableAsDict = async <T extends DatabaseTableName>(
  table: T,
  language?: DatabaseLanguage
) => {
  const { data, error } = await fetchFromTable(table, language);

  if (error) console.error(`${error.code}: ${error.message}`);

  if (!data) return {};

  return data.reduce(
    (dictionary, row) => {
      if (isKeyInObject("id", row)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dictionary[row["id"]] = row;
      }
      return dictionary;
    },
    {} as Dictionary<DatabaseRowFromTableName<T>>
  );
};

export default async function getTranscriptionPageStaticProps(
  language: string
): Promise<TranscriptionPageStaticProps> {
  const { data } = await supabase
    .from("languages")
    .select("*")
    .eq("slug", language)
    .limit(1);

  if (!data) {
    return {
      ipa: {},
      subcategories: {},
      categories: {},
      tags: {},
      rules: {},
      languages: {},
    };
  }

  const supabaseLanguage = data[0];

  const tableDictionaries = await Promise.all([
    fetchSupabaseTableAsDict("ipa"),
    fetchSupabaseTableAsDict("ipa_subcategory"),
    fetchSupabaseTableAsDict("ipa_category"),
    fetchSupabaseTableAsDict("ipa_tags"),
    fetchSupabaseTableAsDict(
      "rules",
      supabaseLanguage
    ) as unknown as Dictionary<TransformedRule>,
    fetchSupabaseTableAsDict("languages"),
  ]);

  const [ipa, subcategories, categories, tags, rules, languages] =
    tableDictionaries;

  return {
    ipa,
    subcategories,
    categories,
    tags,
    rules,
    languages,
  };
}
