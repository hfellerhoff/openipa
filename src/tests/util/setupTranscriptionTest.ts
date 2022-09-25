import { fetchSupabaseTableAsDict } from '../../components/transcription-page/getTranscriptionPageStaticProps';
import { Languages } from '../../constants/Interfaces';
import supabase from '../../lib/supabase';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import { Language } from '../../lib/supabase/models/Language';
import { Rule } from '../../lib/supabase/models/Rule';
import handleExpectTranscription from './handleExpectTranscription';

const setupTranscriptionTest = async (language: Languages) => {
  const { data } = await supabase
    .from<Language>('languages')
    .select('*')
    .eq('slug', language)
    .limit(1);

  if (!data) throw new Error('oh no');

  const supabaseLanguage = data[0];

  const [ipa, subcategories, categories, rules] = await Promise.all([
    fetchSupabaseTableAsDict<IPA>('ipa', 'id'),
    fetchSupabaseTableAsDict<IPASubcategory>('ipa_subcategory', 'id'),
    fetchSupabaseTableAsDict<IPACategory>('ipa_category', 'id'),
    fetchSupabaseTableAsDict<Rule>('rules', 'id', supabaseLanguage),
  ]);

  return handleExpectTranscription({
    ipa,
    subcategories,
    categories,
    rules: Object.values(rules),
  });
};

export default setupTranscriptionTest;
