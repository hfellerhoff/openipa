export interface IPA {
  id: number;
  symbol: string;
  subcategory: number;
}

export interface IPACategory {
  id: number;
  label: string;
}

export interface IPASubcategory {
  id: number;
  label: string;
  category: number;
}
