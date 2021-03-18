export enum RuleInputType {
  String = 'string',
  Subcategories = 'subcategories',
  Categories = 'categories',
}

// Types of rule inputs
export interface RuleInput {
  type: RuleInputType;
  replace?: boolean;
}

export interface RuleInputString extends RuleInput {
  text: string[];
}

export interface RuleInputSubcategory extends RuleInput {
  ids: number[];
  tags: number[];
}

export interface RuleInputCategory extends RuleInput {
  ids: number[];
  tags: number[];
}

// Total rule
export interface Rule {
  id?: number;
  language: number;
  input: {
    steps: RuleInput[];
  };
  output: number[];
  description: string;
}
