import { Phoneme } from '../../constants/Interfaces';
import { Dictionary } from '../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import { RuleInput, RuleInputType } from '../../lib/supabase/models/Rule';

export const isPhonemeIn = (
  phoneme: Phoneme,
  ids: number[],
  ipa: Dictionary<IPA>,
  step: RuleInput,
  rule: any
) => {
  if (!phoneme) return false;
  if (!phoneme.ipa) return false;

  const possibleMatches: string[] = Object.values(ipa)
    .filter((e: IPA) =>
      ids.includes(
        step.type === RuleInputType.Categories ? e.category : e.subcategory
      )
    )
    .map((e: IPA) => e.symbol);

  const regex = possibleMatches.join('');
  const symbolToMatch = phoneme.ipa.charAt(phoneme.ipa.length - 1);

  return !!symbolToMatch.match(RegExp(`[${regex}]`, 'i'));
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
