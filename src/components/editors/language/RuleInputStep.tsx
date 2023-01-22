import React from 'react';

import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
} from '../../../lib/supabase/types';
import {
  RuleInput,
  RuleInputCategory,
  RuleInputString,
  RuleInputSubcategory,
  isRuleInputCategory,
  isRuleInputString,
  isRuleInputSubcategory,
} from '../../../lib/supabase/types/rules';
import idsToCategoryString from '../../../util/supabase/idsToCategoryString';
import idsToSubcategoryString from '../../../util/supabase/idsToSubcategoryString';
import Button from '../../buttons/Button';
import IPACategoryDropdown from './IPACategoryDropdown';
import IPADisplay from './IPADisplay';
import IPAInput from './IPAInput';
import IPASubcategoryDropdown from './IPASubcategoryDropdown';

interface Props {
  step: RuleInput;
  index?: number;
  setInput?: React.Dispatch<
    React.SetStateAction<{
      steps: RuleInput[];
    }>
  >;
  editable?: boolean;
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
}

const RuleInputStep = ({
  step,
  index,
  setInput,
  editable = false,
  ipa,
  subcategories,
  categories,
}: Props) => {
  // ==== Input Type: Text ====
  const updateText = (value: string, i: number) => {
    if (!setInput || index === undefined) return;

    setInput((input) => {
      const text = (input.steps[index] as RuleInputString).text;
      text[i] = value;
      input.steps[index] = {
        type: step.type,
        text,
        replace: step.replace,
      } as RuleInputString;
      return { ...input };
    });
  };

  const addTextOption = () => {
    if (!setInput || index === undefined) return;

    setInput((input) => {
      const text = (input.steps[index] as RuleInputString).text;
      text.push('');
      input.steps[index] = {
        type: step.type,
        text,
      } as RuleInputString;
      return { ...input };
    });
  };

  const removeTextOption = () => {
    if (!setInput || index === undefined) return;

    setInput((input) => {
      const text = (input.steps[index] as RuleInputString).text;
      text.pop();
      input.steps[index] = {
        type: step.type,
        text,
      } as RuleInputString;
      return { ...input };
    });
  };

  // ==== Input Type: Category, Subcategory ====
  const updateIds = (ids: number[]) => {
    if (!setInput || index === undefined) return;

    setInput((input) => {
      input.steps[index] = {
        ...input.steps[index],
        ids,
      } as RuleInputCategory | RuleInputSubcategory;
      return { ...input };
    });
  };

  if (isRuleInputString(step)) {
    return (
      <>
        {step.text.map((e, i) => (
          <IPAInput
            className='mr-1'
            key={i}
            value={step.text[i]}
            setValue={(newValue) => updateText(newValue, i)}
          />
        ))}
        {editable ? (
          <>
            <Button colorScheme='primary' onClick={addTextOption}>
              +
            </Button>
            {step.text.length > 1 ? (
              <Button colorScheme='grayscale' onClick={removeTextOption}>
                -
              </Button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (isRuleInputCategory(step)) {
    return editable ? (
      <IPACategoryDropdown
        ipa={ipa}
        subcategories={subcategories}
        categories={categories}
        prefix='Any'
        result={step.ids}
        setResult={(r) => updateIds(r)}
      />
    ) : (
      <IPADisplay>{idsToCategoryString(step.ids, categories)}</IPADisplay>
    );
  }

  if (isRuleInputSubcategory(step)) {
    return editable ? (
      <IPASubcategoryDropdown
        ipa={ipa}
        subcategories={subcategories}
        categories={categories}
        prefix='Any'
        result={step.ids}
        setResult={(r) => updateIds(r)}
      />
    ) : (
      <IPADisplay>{idsToSubcategoryString(step.ids, subcategories)}</IPADisplay>
    );
  }

  return <></>;
};

export default RuleInputStep;
