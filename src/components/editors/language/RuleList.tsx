import React, { useState } from 'react';
import { Rule } from '../../../constants/Rule';
import {
  IPACategoryDictionary,
  IPADictionary,
  IPASubcategoryDictionary,
} from '../../../hooks/useSupabaseIPA';
import idsToIPAString from '../../../util/supabase/idsToIPAString';
import parseIPASymbolString from '../../../util/supabase/parseIPASymbolString';
import Button from '../../buttons/Button';
import IPADisplay from './IPADisplay';
import IPADropdown from './IPADropdown';

interface Props {
  rules: Rule[];
  ipa: IPADictionary;
  subcategories: IPASubcategoryDictionary;
  categories: IPACategoryDictionary;
}

const RuleListCard = (props) => (
  <li className='bg-gray-50 p-4 mb-2 rounded-md shadow'>{props.children}</li>
);

const RuleList = ({ rules, ipa, subcategories, categories }: Props) => {
  const [showAddNewRule, setShowAddNewRule] = useState(false);

  return (
    <ul>
      {rules.map((rule) => (
        <RuleListCard key={rule.id}>
          <div className='flex w-full align-center justify-between mb-2'>
            <div className='flex'>
              {rule.input.text.map((t, i) => (
                <div className='mr-1' key={i}>
                  <IPADisplay>{t}</IPADisplay>
                </div>
              ))}
            </div>
            <IPADisplay>{idsToIPAString(rule.output, ipa)}</IPADisplay>
          </div>
          <p>{parseIPASymbolString(rule.description, ipa)}</p>
        </RuleListCard>
      ))}
      {!showAddNewRule ? (
        <Button
          colorScheme='primary'
          variant='wide'
          onClick={() => setShowAddNewRule(true)}
        >
          Add New Rule
        </Button>
      ) : (
        <RuleListCard>
          <div className='flex w-full align-center justify-between mb-2'>
            <IPADisplay>
              <input className='bg-gray-200 w-10 text-center'></input>
            </IPADisplay>
            <IPADropdown
              ipa={ipa}
              subcategories={subcategories}
              categories={categories}
            />
          </div>
          <div className='flex align-center justify-end mt-4'>
            <Button
              colorScheme='error'
              onClick={() => setShowAddNewRule(false)}
              className='mr-1'
            >
              Cancel
            </Button>
            <Button onClick={() => setShowAddNewRule(false)}>Create</Button>
          </div>
        </RuleListCard>
      )}
    </ul>
  );
};

export default RuleList;
