import { Dictionary } from '../../hooks/useSupabaseTable';
import { DatabaseIPA } from '../../lib/supabase/types';

const idsToIPAString = (
  ids: number[],
  ipa: Dictionary<DatabaseIPA>,
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
