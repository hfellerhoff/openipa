import React, { useState } from 'react';
import { Rule, RuleInputType } from '../../../lib/supabase/models/Rule';
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
  const [showAddNewRule, setShowAddNewRule] = useState(false);
  const [input, setInput] = useState<string[]>(['']);
  const [result, setResult] = useState<number[]>([]);
  const [description, setDescription] = useState('');

  const handleCreateRule = async () => {
    console.log(input, result);

    const { data, error } = await supabase.from('rules').insert([
      {
        language: languageId,
        output: result,
        input: {
          text: input,
        },
        inputType: RuleInputType.String,
        description: `${description} [${result.join(',')}].`,
      },
    ]);

    setInput(['']);
    setResult([]);
    setDescription('');

    setShowAddNewRule(false);
  };

  return (
    <ul>
      {rules.map((rule) => (
        <Card key={rule.id}>
          <div className='flex w-full align-center justify-between mb-2'>
            <div className='flex'>
              <RuleInputDisplay input={rule.input} />
            </div>
            <IPADisplay>{idsToIPAString(rule.output, ipa)}</IPADisplay>
          </div>
          <p>{parseIPASymbolString(rule.description, ipa)}</p>
        </Card>
      ))}
      {!showAddNewRule ? (
        <Button
          colorScheme='primary'
          variant='wide'
          onClick={() => setShowAddNewRule(true)}
          key='new-rule-button'
        >
          Add New Rule
        </Button>
      ) : (
        <Card key='new-rule-card'>
          <div className='flex w-full align-center justify-between mb-2'>
            <div className='flex'>
              {input.map((value, i) => (
                <IPAInput
                  value={value}
                  setValue={(v) => {
                    setInput((oldInput) => {
                      oldInput[i] = v;
                      return [...oldInput];
                    });
                  }}
                  className='mr-1'
                />
              ))}
              <Button
                colorScheme='primary'
                onClick={() => setInput([...input, ''])}
              >
                +
              </Button>
              {Object.keys(input).length > 1 ? (
                <Button
                  colorScheme='grayscale'
                  onClick={() => {
                    setInput((oldInput) => {
                      oldInput.pop();
                      return [...oldInput];
                    });
                  }}
                  className='ml-1'
                >
                  -
                </Button>
              ) : (
                <></>
              )}
            </div>
            <IPADropdown
              ipa={ipa}
              subcategories={subcategories}
              categories={categories}
              result={result}
              setResult={setResult}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='rule-description'>Rule Description</label>
            <div>
              <IPADisplay className='flex'>
                <input
                  name='rule-description'
                  className={`bg-gray-200 font-sans w-full flex-1`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                {result.length > 0 ? (
                  <p>[{idsToIPAString(result, ipa)}].</p>
                ) : (
                  <></>
                )}
              </IPADisplay>
            </div>
            <div className='flex align-center justify-end mt-4'>
              <Button
                colorScheme='error'
                onClick={() => setShowAddNewRule(false)}
                className='mr-1'
              >
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>Create</Button>
            </div>
          </div>
        </Card>
      )}
    </ul>
  );
};

export default RuleList;
