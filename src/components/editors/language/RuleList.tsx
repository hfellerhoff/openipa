import React, { useState } from 'react';
import {
  Rule,
  RuleInputString,
  RuleInputType,
} from '../../../lib/supabase/models/Rule';
import supabase from '../../../lib/supabase';
import idsToIPAString from '../../../util/supabase/idsToIPAString';
import parseIPASymbolString from '../../../util/supabase/parseIPASymbolString';
import Button from '../../buttons/Button';
import Card from '../../cards/Card';
import IPADisplay from './IPADisplay';
import IPADropdown from './IPADropdown';
import IPAInput from './IPAInput';
import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../../lib/supabase/models/IPA';
import RuleInputDisplay from './RuleInputDisplay';
import AddRuleCard from './AddRuleCard';

interface Props {
  rules: Rule[];
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
  languageId: number;
}

const RuleList = ({
  rules,
  ipa,
  subcategories,
  categories,
  languageId,
}: Props) => {
  const [idToBeEdited, setIdToBeEdited] = useState(0);

  if (
    Object.values(ipa).length === 0 ||
    Object.values(subcategories).length === 0 ||
    Object.values(categories).length === 0
  )
    return <></>;
  return (
    <ul>
      {rules.map((rule) =>
        rule.id === idToBeEdited ? (
          <AddRuleCard
            key={rule.id}
            rules={rules}
            ipa={ipa}
            subcategories={subcategories}
            categories={categories}
            languageId={languageId}
            editProps={{
              rule: rule,
              onCancel: () => setIdToBeEdited(0),
            }}
          />
        ) : (
          <Card key={rule.id}>
            <div className='flex w-full align-center justify-between mb-2'>
              <div className='flex'>
                <RuleInputDisplay
                  input={rule.input}
                  ipa={ipa}
                  subcategories={subcategories}
                  categories={categories}
                />
              </div>
              <IPADisplay className='h-10'>
                {idsToIPAString(rule.output, ipa)}
              </IPADisplay>
            </div>
            <div className='flex align-center justify-between'>
              <p>{parseIPASymbolString(rule.description, ipa)}</p>
              <Button
                colorScheme='grayscale'
                onClick={() => setIdToBeEdited(rule.id)}
              >
                Edit
              </Button>
            </div>
          </Card>
        )
      )}
      <AddRuleCard
        rules={rules}
        ipa={ipa}
        subcategories={subcategories}
        categories={categories}
        languageId={languageId}
      />
    </ul>
  );
};

export default RuleList;
