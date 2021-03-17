import React from 'react';
import {
  Rule,
  RuleInput,
  RuleInputString,
} from '../../../lib/supabase/models/Rule';
import IPADisplay from './IPADisplay';

interface Props {
  input: Rule['input'];
}

const RuleInputDisplay = ({ input }: Props) => {
  console.log(input);

  //   const parsedItems = input.options.map(option => {
  //       option.map(step => {
  //           switch (step.type)
  //       })
  //   })

  return (
    <div className='flex'>
      {input.options.map((option, index1) => (
        <div key={index1}>
          {option.map((step, index2) => (
            <div key={index2} className='flex'>
              {(step as RuleInputString).text.map((e) => (
                <IPADisplay key={e} className='mr-1'>
                  {e}
                </IPADisplay>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RuleInputDisplay;
