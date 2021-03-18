import { Dictionary } from '../../hooks/useSupabaseTable';
import { IPACategory, IPASubcategory } from '../../lib/supabase/models/IPA';

export const isLetterInCategory = (
  char: string,
  categoryIds: number[],
  categories: Dictionary<IPACategory>
) => {
  if (!char) return false;

  let hasMatch = false;
  categoryIds.forEach((id) => {
    if (!categories[id]) return;

    const regex = categories[id].letters.join('');

    if (!!char.match(RegExp(`[${regex}]`, 'i'))) {
      hasMatch = true;
    }
  });

  return hasMatch;
};

export const isLetterInSubcategory = (
  char: string,
  subcategoryIds: number[],
  subcategories: Dictionary<IPASubcategory>
) => {
  if (!char) return false;

  let hasMatch = false;
  subcategoryIds.forEach((id) => {
    if (!subcategories[id]) return;

    const regex = subcategories[id].letters.join('');

    if (!!char.match(RegExp(`[${regex}]`, 'i'))) {
      hasMatch = true;
    }
  });

  return hasMatch;
};
[
  'a',
  'à',
  'á',
  'â',
  'ä',
  'æ',
  'ã',
  'å',
  'ā',
  'e',
  'è',
  'é',
  'ê',
  'ë',
  'ē',
  'ė',
  'ę',
  'i',
  'î',
  'ï',
  'í',
  'ī',
  'į',
  'ì',
  'o',
  'ô',
  'ö',
  'ò',
  'ó',
  'œ',
  'ø',
  'ō',
  'õ',
  'u',
  'û',
  'ü',
  'ù',
  'ú',
  'ū',
  'y',
  'ÿ',
];
