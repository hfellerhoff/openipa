import { notFound } from "next/navigation";

import { Languages } from "../../constants/Interfaces";
import { Dictionary } from "../../hooks/useSupabaseTable";
import supabase from "../../lib/supabase";
import createRuleDictionary from "../../lib/supabase/createRuleDictionary";
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

const fetchFromTable = async <T extends DatabaseTableName>(table: T) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error(`${error.code}: ${error.message}`);

  return data as DatabaseRowFromTableName<T>[] | null;
};

export const fetchSupabaseTableAsDict = async <T extends DatabaseTableName>(
  table: T,
) => {
  const data = await fetchFromTable(table);

  if (!data) return {};

  return data.reduce(
    (dictionary, row) => {
      if (isKeyInObject("id", row)) {
        dictionary[row.id as number] = row;
      }
      return dictionary;
    },
    {} as Dictionary<DatabaseRowFromTableName<T>>,
  );
};

export const fetchRulesForLanguageAsDict = async (
  language: DatabaseLanguage,
) => {
  const { data, error } = await supabase
    .from("rules")
    .select("*")
    .eq("language_id", language.id)
    .order("id", { ascending: true });

  if (error) console.error(`${error.code}: ${error.message}`);
  if (!data) return {};

  return createRuleDictionary(data);
};

export default async function getTranscriptionPageStaticProps(
  language: Languages,
): Promise<TranscriptionPageStaticProps> {
  const { data } = await supabase
    .from("languages")
    .select("*")
    .eq("slug", language)
    .limit(1);

  if (!data?.[0]) notFound();

  const supabaseLanguage = data[0];

  const tableDictionaries = await Promise.all([
    fetchSupabaseTableAsDict("ipa"),
    fetchSupabaseTableAsDict("ipa_subcategory"),
    fetchSupabaseTableAsDict("ipa_category"),
    fetchSupabaseTableAsDict("ipa_tags"),
    fetchRulesForLanguageAsDict(supabaseLanguage),
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
