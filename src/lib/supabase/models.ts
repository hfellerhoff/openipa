import { Database } from '../../schema';

export enum RuleInputType {
  String = 'string',
  Subcategories = 'subcategories',
  Categories = 'categories',
}

export type RuleInput =
  | RuleInputString
  | RuleInputSubcategory
  | RuleInputCategory;

// Types of rule inputs
interface BaseRuleInput {
  type: RuleInputType;
  replace?: boolean;
}

export interface RuleInputString extends BaseRuleInput {
  type: RuleInputType.String;
  text: string[];
}

export interface RuleInputSubcategory extends BaseRuleInput {
  type: RuleInputType.Subcategories;
  ids: number[];
  tags: number[];
}

export interface RuleInputCategory extends BaseRuleInput {
  type: RuleInputType.Categories;
  ids: number[];
  tags: number[];
}

export type DatabaseAuthor = Database['public']['Tables']['authors']['Row'];
export type DatabaseIPA = Database['public']['Tables']['ipa']['Row'];
export type DatabaseIPACategory =
  Database['public']['Tables']['ipa_category']['Row'];
export type DatabaseIPASubcategory =
  Database['public']['Tables']['ipa_subcategory']['Row'];
export type DatabaseIPATag = Database['public']['Tables']['ipa_tags']['Row'];
export type DatabaseLanguage = Database['public']['Tables']['languages']['Row'];
export type DatabaseRule = Omit<
  Database['public']['Tables']['rules']['Row'],
  'input'
> & {
  input: {
    steps: RuleInput;
  };
};
export type DatabaseText = Database['public']['Tables']['texts']['Row'];
