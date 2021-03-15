import { Dictionary } from '../../hooks/useSupabaseTable';
import { IPA } from '../../lib/supabase/models/IPA';

const idsToIPAString = (ids: number[], ipa: Dictionary<IPA>) => {
  let string = '';
  ids.forEach((id) => {
    string += ipa[id].symbol;
  });

  return string;
};

export default idsToIPAString;
