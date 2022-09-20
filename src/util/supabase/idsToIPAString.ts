import { Dictionary } from '../../hooks/useSupabaseTable';
import { IPA } from '../../lib/supabase/models/IPA';

const idsToIPAString = (
  ids: number[],
  ipa: Dictionary<IPA>,
  writeOutSilence = true
) => {
  let string = '';

  ids.forEach((id) => {
    if (ipa[id]) {
      if (id === 51 && writeOutSilence) string += '[silent]';
      else string += ipa[id].symbol;
    }
  });

  return string;
};

export default idsToIPAString;
