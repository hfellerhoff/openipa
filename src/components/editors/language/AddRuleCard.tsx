import { useState } from 'react';

import { Dictionary } from '../../../hooks/useSupabaseTable';
import supabase from '../../../lib/supabase';
import {
  IPASubcategory,
  IPACategory,
  IPA,
} from '../../../lib/supabase/models/IPA';
import {
  Rule,
  RuleInputCategory,
  RuleInputString,
  RuleInputSubcategory,
  RuleInputType,
} from '../../../lib/supabase/models/Rule';
import idsToIPAString from '../../../util/supabase/idsToIPAString';
import Button from '../../buttons/Button';
import Card from '../../cards/Card';
import IPADisplay from './IPADisplay';
import IPADropdown from './IPADropdown';
import RuleInputStep from './RuleInputStep';

interface Props {
  rules: Rule[];
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
  languageId: number;
  editProps?: {
    rule: Rule;
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
  const [input, setInput] = useState<Rule['input']>(
    editProps
      ? editProps.rule.input
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
        .update([
          {
            language_id: languageId,
            output: result,
            input,
            description: transformedDescription,
          } as Rule,
        ])
        .eq('id', editProps.rule.id);

      editProps.onCancel();
    } else {
      console.log('Creating rule...');

      await supabase.from('rules').insert([
        {
          language_id: languageId,
          output: result,
          input,
          description: transformedDescription,
        } as Rule,
      ]);

      setInput({
        steps: [],
      });
      setResult([]);
      setDescription('');

      setShowAddNewRule(false);
    }
  };

  const addStep = (type: RuleInputType) => {
    setInput((oldInput) => {
      switch (type) {
        case RuleInputType.String:
          oldInput.steps.push({
            type,
            text: [''],
            replace: true,
          } as RuleInputString);
          break;
        case RuleInputType.Categories:
          oldInput.steps.push({
            type,
            ids: [],
            replace: false,
          } as RuleInputCategory);
          break;
        case RuleInputType.Subcategories:
          oldInput.steps.push({
            type,
            ids: [],
            replace: false,
          } as RuleInputSubcategory);
          break;
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
          Add New Rule
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
                <div>
                  <Button onClick={() => addStep(RuleInputType.String)}>
                    + Text
                  </Button>
                  <Button
                    onClick={() => addStep(RuleInputType.Subcategories)}
                    className='ml-1'
                  >
                    + Subcategory
                  </Button>
                  <Button
                    onClick={() => addStep(RuleInputType.Categories)}
                    className='ml-1'
                  >
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
            <label htmlFor='rule-description'>Rule Description</label>
            <div>
              <IPADisplay className='flex'>
                <input
                  title='Rule description'
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
