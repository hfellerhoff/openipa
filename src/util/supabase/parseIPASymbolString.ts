import { Dictionary } from '../../hooks/useSupabaseTable';
import { DatabaseIPA } from '../../lib/supabase/types';

const parseIPASymbolString = (string: string, ipa: Dictionary<DatabaseIPA>) => {
  let parsed = '';
  let unparsedID = '';
  let isSymbol = false;

  if (!string || !ipa) return '';

  for (const char of string) {
    if (char === '[') {
      parsed += '[';
      isSymbol = true;
    } else if (char === ',' && isSymbol) {
      const ipaElementID = parseInt(unparsedID);
      if (!ipa[ipaElementID]) continue;

      parsed += ipaElementID ? ipa[ipaElementID].symbol : '';
      unparsedID = '';
    } else if (char === ']') {
      isSymbol = false;
      const ipaElementID = parseInt(unparsedID);
      if (!ipa[ipaElementID]) continue;

      parsed += ipaElementID ? ipa[ipaElementID].symbol : '';
      parsed += ']';
      unparsedID = '';
    } else if (isSymbol) unparsedID += char;
    else parsed += char;
  }

  return parsed;
};

export default parseIPASymbolString;
