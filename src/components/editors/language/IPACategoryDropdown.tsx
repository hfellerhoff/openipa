import { useEffect, useState } from 'react';

import Dropdown, { Option, ReactDropdownProps } from 'react-dropdown';

import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../../lib/supabase/models/IPA';
import idsToCategoryString from '../../../util/supabase/idsToCategoryString';
import IPADisplay from './IPADisplay';

interface Props {
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
  result: number[];
  setResult: (r: number[]) => void;
  prefix: string;
}

const IPADropdown = ({
  ipa,
  subcategories,
  categories,
  result,
  setResult,
  prefix,
}: Props) => {
  const [options, setOptions] = useState<unknown[]>([]);

  useEffect(() => {
    if (ipa && subcategories && categories) {
      setOptions([
        {
          key: `clear`,
          value: '0',
          label: 'Clear Result',
        },
        ...Object.values(categories).map((category: IPACategory) => {
          const block = {
            key: `ipa-${category.id}`,
            value: category.id.toString(),
            label: category.label,
          };
          return block;
        }),
      ]);
    }
  }, [ipa, subcategories, categories]);

  const handleChange = (selectedOption: Option) => {
    if (selectedOption.value == '0') {
      setResult([]);
    } else {
      setResult([...result, parseInt(selectedOption.value)]);
    }
  };

  return (
    <div className='flex h-10'>
      <IPADisplay>
        <input
          title='IPA category display'
          className='w-64 text-center bg-gray-200'
          value={
            result.length > 0
              ? `${prefix ? prefix + ' ' : ''}${idsToCategoryString(
                  result,
                  categories
                )}`
              : ''
          }
          readOnly
        ></input>
      </IPADisplay>
      <Dropdown
        // really strange hacky typescript assertion to get around type error
        // in useState
        options={options as ReactDropdownProps['options']}
        onChange={handleChange}
        placeholder='...'
        className={`rounded-md`}
        controlClassName='bg-gray-200 shadow-inner border-none h-10 w-4'
        menuClassName='w-64 right-0 rounded-md border-none shadow-md'
      />
    </div>
  );
};

export default IPADropdown;
