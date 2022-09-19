import { Dictionary } from '../../hooks/useSupabaseTable';
import supabase from '../../lib/supabase';
import {
  IPA,
  IPACategory,
  IPASubcategory,
  IPATag,
} from '../../lib/supabase/models/IPA';
import { Language } from '../../lib/supabase/models/Language';
import { Rule } from '../../lib/supabase/models/Rule';

export interface TranscriptionPageStaticProps {
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
  tags: Dictionary<IPATag>;
  rules: Dictionary<Rule>;
  languages: Dictionary<Language>;
}

const fetchFromTable = async <T extends unknown>(
  table: string,
  primaryKeyColumn = 'id',
  language?: Language
) => {
  if (!language) {
    return await supabase
      .from<T>(table)
      .select('*')
      .order(primaryKeyColumn as any, { ascending: true });
  }

  return await supabase
    .from<T>(table)
    .select('*')
    .eq('language_id' as any, language.id as any)
    .order(primaryKeyColumn as any, { ascending: true });
};

const fetchSupabaseTableAsDict = async <T extends unknown>(
  table: string,
  primaryKeyColumn = 'id',
  language?: Language
) => {
  const { data, error } = await fetchFromTable<T>(
    table,
    primaryKeyColumn,
    language
  );

  if (error) console.error(`${error.code}: ${error.message}`);

  return data.reduce((dictionary, row) => {
    dictionary[row[primaryKeyColumn]] = row;
    return dictionary;
  }, {} as Dictionary<T>);
};

export default async function getTranscriptionPageStaticProps(
  language: string
): Promise<TranscriptionPageStaticProps> {
  const { data } = await supabase
    .from<Language>('languages')
    .select('*')
    .eq('slug', language)
    .limit(1);
  const supabaseLanguage = data[0];

  const tableDictionaries = await Promise.all([
    fetchSupabaseTableAsDict<IPA>('ipa'),
    fetchSupabaseTableAsDict<IPASubcategory>('ipa_subcategory'),
    fetchSupabaseTableAsDict<IPACategory>('ipa_category'),
    fetchSupabaseTableAsDict<IPATag>('ipa_tags'),
    fetchSupabaseTableAsDict<Rule>('rules', 'id', supabaseLanguage),
    fetchSupabaseTableAsDict<Language>('languages'),
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
