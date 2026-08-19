import useSupabaseTable, { Dictionary } from "./useSupabaseTable";
import { TransformedRule } from "../lib/supabase/types";
import { RuleInputDocument } from "../lib/supabase/types/rules";

export default function useSupabaseRulesTable() {
  const rules = useSupabaseTable("rules");

  return Object.values(rules).reduce((dictionary, rule) => {
    const input = RuleInputDocument.safeParse(rule.input);
    if (input.success) {
      dictionary[rule.id] = { ...rule, input: input.data };
    }
    return dictionary;
  }, {} as Dictionary<TransformedRule>);
}
