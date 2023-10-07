import { useEffect, useState } from 'react';

import Dropdown, { Option, ReactDropdownProps } from 'react-dropdown';

import IPADisplay from './IPADisplay';
import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
} from '../../../lib/supabase/types';
import idsToIPAString from '../../../util/supabase/idsToIPAString';

interface Props {
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
  result: number[];
  setResult: (r: number[]) => void;
}

const IPADropdown = ({
  ipa,
  subcategories,
  categories,
  result,
  setResult,
}: Props) => {
  const [options, setOptions] = useState<unknown[]>([]);

  useEffect(() => {
    if (ipa && subcategories && categories) {
      setOptions([
        {
          key: `clear`,
          value: 0,
          label: 'Clear Result',
        },
        ...Object.values(categories).map((category: DatabaseIPACategory) => {
          const section = {
            type: 'group',
            name: category.label,
            key: `category-${category.id}`,
            items: Object.values(ipa)
              .filter((i: DatabaseIPA) => i.category === category.id)
              .map((element: DatabaseIPA) => {
                const block = {
                  key: `ipa-${element.id}`,
                  value: element.id,
                  label: element.symbol,
                };
                return block;
              }),
          };
          return section;
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
          title='IPA Display'
          className='w-16 text-center bg-gray-200'
          value={idsToIPAString(result, ipa)}
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
        menuClassName='w-96 right-0 rounded-md border-none shadow-md h-96 max-h-64'
      />
    </div>
  );
};

export default IPADropdown;
