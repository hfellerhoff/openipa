import {
  IPA,
  IPACategory,
  IPASubcategory,
  IPATag,
} from '../lib/supabase/models/IPA';
import useSupabaseTable from './useSupabaseTable';

const useSupabaseIPA = () => {
  const ipa = useSupabaseTable<IPA>('ipa');
  const subcategories = useSupabaseTable<IPASubcategory>('ipa_subcategory');
  const categories = useSupabaseTable<IPACategory>('ipa_category');
  const tags = useSupabaseTable<IPATag>('ipa_tags');

  return { ipa, subcategories, categories, tags };
};

export default useSupabaseIPA;
