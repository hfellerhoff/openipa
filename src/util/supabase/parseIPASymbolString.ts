import { IPADictionary } from '../../hooks/useSupabaseIPA';

const parseIPASymbolString = (string: string, ipa: IPADictionary) => {
  let parsed = '';
  let unparsedID = '';
  let isSymbol = false;

  for (const char of string) {
    if (char === '[') isSymbol = true;
    else if (char === ']') {
      isSymbol = false;
      parsed += `[${ipa[parseInt(unparsedID)].symbol}]`;
      unparsedID = '';
    } else if (isSymbol) unparsedID += char;
    else parsed += char;
  }

  return parsed;
};

export default parseIPASymbolString;
