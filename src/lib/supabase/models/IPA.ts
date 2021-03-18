export interface IPA {
  id: number;
  symbol: string;
  subcategory: number;
  category: number;
  tags: string[];
}

export interface IPACategory {
  id: number;
  label: string;
  letters: string[];
}

export interface IPASubcategory {
  id: number;
  label: string;
  category: number;
  letters: string[];
}

export interface IPATag {
  id: number;
  label: string;
  categories: number[];
}
