import { z } from 'zod';

import { createSchemaMatcher } from '../../../util/typeUtils';

const BaseRuleInput = z.object({
  replace: z.optional(z.boolean()),
});

// String
export const RuleInputString = BaseRuleInput.extend({
  type: z.literal('string'),
  text: z.array(z.string()),
});
export type RuleInputString = z.infer<typeof RuleInputString>;
export const isRuleInputString = createSchemaMatcher(RuleInputString);

// Category
export const RuleInputCategory = BaseRuleInput.extend({
  type: z.literal('category'),
  ids: z.array(z.number()),
  tags: z.array(z.number()),
});
export type RuleInputCategory = z.infer<typeof RuleInputCategory>;
export const isRuleInputCategory = createSchemaMatcher(RuleInputCategory);

// Subcategory
export const RuleInputSubcategory = BaseRuleInput.extend({
  type: z.literal('subcategory'),
  ids: z.array(z.number()),
  tags: z.array(z.number()),
});
export type RuleInputSubcategory = z.infer<typeof RuleInputSubcategory>;
export const isRuleInputSubcategory = createSchemaMatcher(RuleInputSubcategory);

// Base rule input
export const RuleInput = z.discriminatedUnion('type', [
  RuleInputString,
  RuleInputCategory,
  RuleInputSubcategory,
]);
export type RuleInput = z.infer<typeof RuleInput>;
