import { useState } from 'react';

import IPADisplay from './IPADisplay';
import IPADropdown from './IPADropdown';
import RuleInputStep from './RuleInputStep';
import { Dictionary } from '../../../hooks/useSupabaseTable';
import supabase from '../../../lib/supabase';
import {
  DatabaseIPASubcategory,
  DatabaseIPACategory,
  DatabaseIPA,
  TransformedRule,
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
import { Json } from '../../../schema';
import idsToIPAString from '../../../util/supabase/idsToIPAString';
import Button from '../../buttons/Button';
import Card from '../../cards/Card';

interface Props {
  rules: TransformedRule[];
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
  languageId: number;
  editProps?: {
    rule: TransformedRule;
    onCancel: () => void;
  };
}

const AddRuleCard = ({
  ipa,
  subcategories,
  categories,
  languageId,
  editProps,
}: Props) => {
  const [showAddNewRule, setShowAddNewRule] = useState(
    editProps ? true : false
  );
  const [input, setInput] = useState<TransformedRule['input']>(
    editProps
      ? (editProps.rule.input as unknown as TransformedRule['input'])
      : {
          steps: [],
        }
  );
  const [result, setResult] = useState<number[]>(
    editProps ? editProps.rule.output : []
  );

  const [description, setDescription] = useState(
    editProps ? editProps.rule.description.split('[')[0] : ''
  );

  const handleCreateRule = async () => {
    const isSilent = result.includes(51);

    const transformedDescription = isSilent
      ? description
      : `${description} [${result.join(',')}].`;

    if (editProps) {
      await supabase
        .from('rules')
        .update({
          language_id: languageId,
          output: result,
          input: input as unknown as Json,
          description: transformedDescription,
        })
        .eq('id', editProps.rule.id);

      editProps.onCancel();
    } else {
      await supabase.from('rules').insert({
        language_id: languageId,
        output: result,
        input: input as unknown as Json,
        description: transformedDescription,
      });

      setInput({
        steps: [],
      });
      setResult([]);
      setDescription('');

      setShowAddNewRule(false);
    }
  };

  const handleAddStep = (type: RuleInput['type']) => () => {
    setInput((oldInput) => {
      if (isRuleInputString(oldInput)) {
        oldInput.steps.push({
          type,
          text: [''],
          replace: true,
        } as RuleInputString);
      } else if (isRuleInputCategory(oldInput)) {
        oldInput.steps.push({
          type,
          ids: [],
          replace: false,
        } as unknown as RuleInputCategory);
      } else if (isRuleInputSubcategory(oldInput)) {
        oldInput.steps.push({
          type,
          ids: [],
          replace: false,
        } as unknown as RuleInputSubcategory);
      }

      return { ...oldInput };
    });
  };

  const removeStep = (index: number) => {
    setInput((oldInput) => {
      return { steps: oldInput.steps.filter((step, i) => i !== index) };
    });
  };

  const toggleReplace = (index: number) => {
    setInput((oldInput) => {
      oldInput.steps[index].replace = !oldInput.steps[index].replace;
      return { ...oldInput };
    });
  };

  return (
    <div>
      {!showAddNewRule ? (
        <Button
          variant='wide'
          onClick={() => setShowAddNewRule(true)}
          key='new-rule-button'
        >
          Add New DatabaseRule
        </Button>
      ) : (
        <Card key='new-rule-card'>
          <div className='flex justify-between w-full mb-2 align-center'>
            <div className='flex'>
              <div>
                {input.steps.map((step, i) => (
                  <div className='flex mb-1' key={i}>
                    <input
                      title='Should replace during transcription'
                      type='checkbox'
                      checked={!!step.replace}
                      onChange={() => toggleReplace(i)}
                      className='mr-2'
                    />
                    <RuleInputStep
                      step={step}
                      index={i}
                      setInput={setInput}
                      editable
                      ipa={ipa}
                      subcategories={subcategories}
                      categories={categories}
                    />
                    <Button
                      colorClassName='bg-red-600 hover:bg-red-700 focus:ring-red-700'
                      onClick={() => removeStep(i)}
                      className='ml-1'
                    >
                      x
                    </Button>
                  </div>
                ))}
                <div className='flex items-center gap-1'>
                  <Button onClick={handleAddStep('string')}>+ Text</Button>
                  <Button onClick={handleAddStep('subcategories')}>
                    + Subcategory
                  </Button>
                  <Button onClick={handleAddStep('categories')}>
                    + Category
                  </Button>
                </div>
              </div>
            </div>
            <IPADropdown
              ipa={ipa}
              subcategories={subcategories}
              categories={categories}
              result={result}
              setResult={setResult}
            />
          </div>
          <div></div>
          <div className='mt-4'>
            <label htmlFor='rule-description'>DatabaseRule Description</label>
            <div>
              <IPADisplay className='flex'>
                <input
                  title='DatabaseRule description'
                  name='rule-description'
                  className={`bg-gray-200 font-sans w-full flex-1`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                {result.length > 0 &&
                idsToIPAString(result, ipa) !== '[silent]' ? (
                  <p>[{idsToIPAString(result, ipa)}].</p>
                ) : (
                  <></>
                )}
              </IPADisplay>
            </div>
            <div className='flex justify-end mt-4 align-center'>
              <Button
                colorClassName='bg-red-600 hover:bg-red-700 focus:ring-red-700'
                onClick={() => {
                  editProps ? editProps.onCancel() : setShowAddNewRule(false);
                }}
                className='mr-1'
              >
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>
                {editProps ? 'Save' : 'Create'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AddRuleCard;
