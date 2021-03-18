import {
  IPA,
  IPACategory,
  IPASubcategory,
  IPATag,
} from '../lib/supabase/models/IPA';
import { Rule } from '../lib/supabase/models/Rule';
import useSupabaseTable from './useSupabaseTable';

const useSupabaseIPA = () => {
  const ipa = useSupabaseTable<IPA>('ipa');
  const subcategories = useSupabaseTable<IPASubcategory>('ipa_subcategory');
  const categories = useSupabaseTable<IPACategory>('ipa_category');
  const tags = useSupabaseTable<IPATag>('ipa_tags');
  const rules = useSupabaseTable<Rule>('rules');

  return { ipa, subcategories, categories, tags, rules };
};

export default useSupabaseIPA;
