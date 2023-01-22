import { Phoneme } from '../../constants/Interfaces';
import { Dictionary } from '../../hooks/useSupabaseTable';
import { DatabaseIPA } from '../../lib/supabase/types';
import {
  RuleInputCategory,
  RuleInputSubcategory,
  isRuleInputCategory,
} from '../../lib/supabase/types/rules';

export const isPhonemeIn = (
  phoneme: Phoneme | undefined,
  ipa: Dictionary<DatabaseIPA>,
  step: RuleInputCategory | RuleInputSubcategory
) => {
  const possibleMatches: string[] = Object.values(ipa)
    .filter((e: DatabaseIPA) =>
      step.ids.includes(
        (isRuleInputCategory(step) ? e.category : e.subcategory) || -1
      )
    )
    .map((e: DatabaseIPA) => e.symbol);

  if (!phoneme || phoneme?.ipa === undefined || phoneme?.ipa === null) {
    return possibleMatches.includes('');
  }

  const regex = possibleMatches.join('');
  const symbolToMatch = phoneme.ipa.charAt(phoneme.ipa.length - 1);

  const isPhonemeInRegex = !!symbolToMatch.match(RegExp(`[${regex}]`, 'i'));

  return isPhonemeInRegex;
};

// export const isLetterInSubcategory = (
//   char: string,
//   subcategoryIds: number[],
//   subcategories: Dictionary<IPASubcategory>
// ) => {
//   if (!char) return false;

//   let hasMatch = false;
//   subcategoryIds.forEach((id) => {
//     if (!subcategories[id]) return;

//     const regex = subcategories[id].letters.join('');

//     if (!!char.match(RegExp(`[${regex}]`, 'i'))) {
//       hasMatch = true;
//     }
//   });

//   return hasMatch;
// };
