import { DatabaseRule, TransformedRule } from "./types";
import { RuleInputDocument } from "./types/rules";

export type RuleDictionary = Record<number, TransformedRule>;

export default function createRuleDictionary(
  rules: readonly DatabaseRule[],
): RuleDictionary {
  return rules.reduce<RuleDictionary>((dictionary, rule) => {
    const input = RuleInputDocument.safeParse(rule.input);

    if (input.success) {
      dictionary[rule.id] = { ...rule, input: input.data };
    } else {
      console.error(`Skipping rule ${rule.id}: invalid input data`);
    }

    return dictionary;
  }, {});
}
