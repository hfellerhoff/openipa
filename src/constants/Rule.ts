export enum RuleInputType {
  String = 'string',
  Subcategory = 'subcategory',
}

export interface RuleInput {}

export interface RuleInputString extends RuleInput {
  text: string[];
}

export interface RuleInputSubcategory extends RuleInput {
  subcategoryId: number;
}

export interface Rule {
  id: number;
  language: number;
  inputType: RuleInputType;
  input: RuleInput;
  output: number[];
  description: string;
}
