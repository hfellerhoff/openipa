import { useState } from 'react';
import { useMemo } from 'react';

import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
  TransformedRule,
} from '../../../lib/supabase/types';
import idsToIPAString from '../../../util/supabase/idsToIPAString';
import parseIPASymbolString from '../../../util/supabase/parseIPASymbolString';
import Button from '../../buttons/Button';
import Card from '../../cards/Card';
import AddRuleCard from './AddRuleCard';
import IPADisplay from './IPADisplay';
import RuleInputDisplay from './RuleInputDisplay';

interface Props {
  rules: TransformedRule[];
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
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

  const languageRules = useMemo(() => {
    if (!languageId || !rules) return [];
    return rules.filter(
      (rule) => rule.language_id === languageId
    ) as unknown as TransformedRule[];
  }, [languageId, rules]);

  if (
    Object.values(ipa).length === 0 ||
    Object.values(subcategories).length === 0 ||
    Object.values(categories).length === 0
  )
    return <></>;

  return (
    <div>
      {languageRules.map((rule) =>
        rule.id === idToBeEdited ? (
          <AddRuleCard
            key={rule.id}
            rules={languageRules}
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
            <div className='flex justify-between w-full mb-2 align-center'>
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
            <div className='flex justify-between align-center'>
              <p>{parseIPASymbolString(rule.description, ipa)}</p>
              <Button
                colorClassName='bg-gray-600 hover:bg-gray-700 focus:ring-gray-700'
                onClick={() => setIdToBeEdited(rule.id || -1)}
              >
                Edit
              </Button>
            </div>
          </Card>
        )
      )}
      <AddRuleCard
        rules={languageRules}
        ipa={ipa}
        subcategories={subcategories}
        categories={categories}
        languageId={languageId}
      />
    </div>
  );
};

export default RuleList;
