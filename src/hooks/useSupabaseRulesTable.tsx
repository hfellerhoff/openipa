import useSupabaseTable, { Dictionary } from './useSupabaseTable';
import { TransformedRule } from '../lib/supabase/types';

export default function useSupabaseRulesTable() {
  const rules = useSupabaseTable('rules');

  return rules as unknown as Dictionary<TransformedRule>;
}
