import RuleInputStep from './RuleInputStep';
import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
  TransformedRule,
} from '../../../lib/supabase/types';

interface Props {
  input: TransformedRule['input'];
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
}

const RuleInputDisplay = ({ input, ipa, subcategories, categories }: Props) => {
  return (
    <div className='flex flex-col'>
      {input.steps.map((step, i) => (
        <div key={i} className='flex mb-1'>
          <input
            title='Should replace text during transcription'
            type='checkbox'
            checked={!!step.replace}
            className='mr-2'
            readOnly
          />
          <RuleInputStep
            step={step}
            ipa={ipa}
            subcategories={subcategories}
            categories={categories}
          />
        </div>
      ))}
    </div>
  );
};

export default RuleInputDisplay;
