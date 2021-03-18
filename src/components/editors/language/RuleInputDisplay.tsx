import React from 'react';
import ipa from '../../../../pages/editor/ipa';
import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../../lib/supabase/models/IPA';
import {
  Rule,
  RuleInput,
  RuleInputString,
} from '../../../lib/supabase/models/Rule';
import IPADisplay from './IPADisplay';
import RuleInputStep from './RuleInputStep';

interface Props {
  input: Rule['input'];
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
}

const RuleInputDisplay = ({ input, ipa, subcategories, categories }: Props) => {
  return (
    <div className='flex flex-col'>
      {input.steps.map((step, i) => (
        <div key={i} className='flex mb-1'>
          <input
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
