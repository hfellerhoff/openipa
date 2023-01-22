import { TransformedRule } from '../lib/supabase/types';
import useSupabaseTable, { Dictionary } from './useSupabaseTable';

export default function useSupabaseRulesTable() {
  const rules = useSupabaseTable('rules');

  return rules as unknown as Dictionary<TransformedRule>;
}
