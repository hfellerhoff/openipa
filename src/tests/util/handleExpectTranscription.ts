import { Dictionary } from '../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import { Rule } from '../../lib/supabase/models/Rule';
import transcribeText from '../../transcription/transcribeText';
import flattenResult from './flattenResult';
import flattenedResult from './flattenResult';

type Props = {
  rules: Rule[];
  categories: Dictionary<IPACategory>;
  subcategories: Dictionary<IPASubcategory>;
  ipa: Dictionary<IPA>;
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
    expect(expectedOutput).toBe(flattenedResult);
  };

export default handleExpectTranscription;
