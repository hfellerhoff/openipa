import useSupabaseRulesTable from "./useSupabaseRulesTable";
import useSupabaseTable from "./useSupabaseTable";

const useSupabaseIPA = () => {
  const ipa = useSupabaseTable("ipa");
  const subcategories = useSupabaseTable("ipa_subcategory");
  const categories = useSupabaseTable("ipa_category");
  const tags = useSupabaseTable("ipa_tags");
  const rules = useSupabaseRulesTable();
  const languages = useSupabaseTable("languages");

  return { ipa, subcategories, categories, tags, rules, languages };
};

export default useSupabaseIPA;
