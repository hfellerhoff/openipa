import React, { useState } from 'react';
import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../../lib/supabase/models/IPA';
import {
  Rule,
  RuleInput,
  RuleInputCategory,
  RuleInputString,
  RuleInputSubcategory,
  RuleInputType,
} from '../../../lib/supabase/models/Rule';
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
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
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
    setInput((input) => {
      input.steps[index] = {
        ...input.steps[index],
        ids,
      } as RuleInputCategory | RuleInputSubcategory;
      return { ...input };
    });
  };

  switch (step.type) {
    case RuleInputType.String:
      return (
        <>
          {(step as RuleInputString).text.map((e, i) => (
            <IPAInput
              className='mr-1'
              key={i}
              value={(step as RuleInputString).text[i]}
              setValue={(newValue) => updateText(newValue, i)}
            />
          ))}
          {editable ? (
            <>
              <Button colorScheme='primary' onClick={addTextOption}>
                +
              </Button>
              {(step as RuleInputString).text.length > 1 ? (
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
    case RuleInputType.Categories:
      return editable ? (
        <IPACategoryDropdown
          ipa={ipa}
          subcategories={subcategories}
          categories={categories}
          prefix='Any'
          result={(step as RuleInputCategory).ids}
          setResult={(r) => updateIds(r)}
        />
      ) : (
        <IPADisplay>
          {idsToCategoryString((step as RuleInputCategory).ids, categories)}
        </IPADisplay>
      );
    case RuleInputType.Subcategories:
      return editable ? (
        <IPASubcategoryDropdown
          ipa={ipa}
          subcategories={subcategories}
          categories={categories}
          prefix='Any'
          result={(step as RuleInputSubcategory).ids}
          setResult={(r) => updateIds(r)}
        />
      ) : (
        <IPADisplay>
          {idsToSubcategoryString(
            (step as RuleInputSubcategory).ids,
            subcategories
          )}
        </IPADisplay>
      );
    default:
      return <></>;
  }
};

export default RuleInputStep;
