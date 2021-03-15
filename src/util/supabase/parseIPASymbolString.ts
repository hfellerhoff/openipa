import { Dictionary } from '../../hooks/useSupabaseTable';
import { IPA } from '../../lib/supabase/models/IPA';

const parseIPASymbolString = (string: string, ipa: Dictionary<IPA>) => {
  let parsed = '';
  let unparsedID = '';
  let isSymbol = false;

  if (!string || !ipa) return '';

  for (const char of string) {
    if (char === '[') isSymbol = true;
    else if (char === ']') {
      isSymbol = false;
      const ipaElementID = parseInt(unparsedID);
      parsed += ipaElementID ? `[${ipa[ipaElementID].symbol}]` : '';
      unparsedID = '';
    } else if (isSymbol) unparsedID += char;
    else parsed += char;
  }

  return parsed;
};

export default parseIPASymbolString;
