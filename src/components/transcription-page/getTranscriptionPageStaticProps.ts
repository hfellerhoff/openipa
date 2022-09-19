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

const fetchSupabaseTableAsDict = async <T extends unknown>(
  table: string,
  primaryKeyColumn = 'id'
) => {
  const { data, error } = await supabase
    .from<T>(table)
    .select('*')
    .order(primaryKeyColumn as any, { ascending: true });

  if (error) console.error(`${error.code}: ${error.message}`);

  return data.reduce((dictionary, row) => {
    dictionary[row[primaryKeyColumn]] = row;
    return dictionary;
  }, {} as Dictionary<T>);
};

export default async function getTranscriptionPageStaticProps(): Promise<TranscriptionPageStaticProps> {
  const tableDictionaries = await Promise.all([
    fetchSupabaseTableAsDict<IPA>('ipa'),
    fetchSupabaseTableAsDict<IPASubcategory>('ipa_subcategory'),
    fetchSupabaseTableAsDict<IPACategory>('ipa_category'),
    fetchSupabaseTableAsDict<IPATag>('ipa_tags'),
    fetchSupabaseTableAsDict<Rule>('rules'),
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
