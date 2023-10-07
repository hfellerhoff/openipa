import handleExpectTranscription from './handleExpectTranscription';
import { fetchSupabaseTableAsDict } from '../../components/transcription-page/getTranscriptionPageStaticProps';
import { Languages } from '../../constants/Interfaces';
import supabase from '../../lib/supabase';

const setupTranscriptionTest = async (language: Languages) => {
  const { data } = await supabase
    .from('languages')
    .select('*')
    .eq('slug', language)
    .limit(1);

  if (!data) throw new Error('oh no');

  const supabaseLanguage = data[0];

  const [ipa, subcategories, categories, rules] = await Promise.all([
    fetchSupabaseTableAsDict('ipa'),
    fetchSupabaseTableAsDict('ipa_subcategory'),
    fetchSupabaseTableAsDict('ipa_category'),
    fetchSupabaseTableAsDict('rules', supabaseLanguage),
  ]);

  return handleExpectTranscription({
    ipa,
    subcategories,
    categories,
    rules: Object.values(rules),
  });
};

export default setupTranscriptionTest;
