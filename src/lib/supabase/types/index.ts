import { Database } from '../../../schema';
import { RuleInput } from './rules';

// DATABASE HELPERS
export type DatabaseTableName = keyof Database['public']['Tables'];
export type DatabaseRowFromTableName<T extends DatabaseTableName> =
  Database['public']['Tables'][T]['Row'];

// MODELS
export type DatabaseAuthor = Database['public']['Tables']['authors']['Row'];
export type DatabaseIPA = Database['public']['Tables']['ipa']['Row'];
export type DatabaseIPACategory =
  Database['public']['Tables']['ipa_category']['Row'];
export type DatabaseIPASubcategory =
  Database['public']['Tables']['ipa_subcategory']['Row'];
export type DatabaseIPATag = Database['public']['Tables']['ipa_tags']['Row'];
export type DatabaseLanguage = Database['public']['Tables']['languages']['Row'];
type DatabaseRule = Database['public']['Tables']['rules']['Row'];
export type TransformedRule = Omit<DatabaseRule, 'input'> & {
  input: {
    steps: RuleInput[];
  };
};
export type DatabaseText = Database['public']['Tables']['texts']['Row'];
export type DatabaseTextToInsert =
  Database['public']['Tables']['texts']['Insert'];
