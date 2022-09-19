import { Dictionary } from '../../hooks/useSupabaseTable';
import { IPACategory } from '../../lib/supabase/models/IPA';

const idsToCategoryString = (ids: number[], ipa: Dictionary<IPACategory>) => {
  let string = '';
  ids.forEach((id, i) => {
    string += ipa[id].label.substring(0, ipa[id].label.length - 1);
    if (i < ids.length - 1) string += ', ';
  });

  return string;
};

export default idsToCategoryString;
