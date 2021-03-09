import { IPADictionary } from '../../hooks/useSupabaseIPA';
import { IPA } from '../../lib/supabase/models/IPA';

const idsToIPAString = (ids: number[], ipa: IPADictionary) => {
  let string = '';
  ids.forEach((id) => {
    string += ipa[id].symbol;
  });

  return string;
};

export default idsToIPAString;
