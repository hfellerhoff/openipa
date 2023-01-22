import { Dictionary } from '../../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
  TransformedRule,
} from '../../lib/supabase/types';
import transcribeText from '../../transcription/transcribeText';
import flattenResult from './flattenResult';

type Props = {
  rules: TransformedRule[];
  categories: Dictionary<DatabaseIPACategory>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  ipa: Dictionary<DatabaseIPA>;
};

const handleExpectTranscription =
  (props: Props) => (inputText: string, expectedOutput: string) => {
    const { rules, categories, subcategories, ipa } = props;

    const result = transcribeText(
      inputText,
      rules,
      categories,
      subcategories,
      ipa
    );

    const flattenedResult = flattenResult(result);
    expect(flattenedResult).toBe(expectedOutput);
  };

export default handleExpectTranscription;
