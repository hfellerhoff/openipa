import useSupabaseTable from "./useSupabaseTable";
import createRuleDictionary from "../lib/supabase/createRuleDictionary";

export default function useSupabaseRulesTable() {
  const rules = useSupabaseTable("rules");

  return createRuleDictionary(Object.values(rules));
}
