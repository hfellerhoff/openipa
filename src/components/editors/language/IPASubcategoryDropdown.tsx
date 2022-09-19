import React, { useEffect, useState } from 'react';

import Dropdown from 'react-dropdown';

import { Dictionary } from '../../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../../lib/supabase/models/IPA';
import idsToSubcategoryString from '../../../util/supabase/idsToSubcategoryString';
import IPADisplay from './IPADisplay';

interface Props {
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
  result: number[];
  setResult: (r: number[]) => void;
  prefix: string;
}

const IPASubcategoryDropdown = ({
  ipa,
  subcategories,
  categories,
  result,
  setResult,
  prefix,
}: Props) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (ipa && subcategories && categories) {
      setOptions([
        {
          key: `clear`,
          value: 0,
          label: 'Clear Result',
        },
        ...Object.values(subcategories).map((subcategory: IPASubcategory) => {
          const block = {
            key: `ipa-${subcategory.id}`,
            value: subcategory.id,
            label: subcategory.label,
          };
          return block;
        }),
      ]);
    }
  }, [ipa, subcategories, categories]);

  const handleChange = (selectedOption) => {
    if (selectedOption.value == 0) {
      setResult([]);
    } else {
      setResult([...result, selectedOption.value]);
    }
    setSelectedElement(null);
  };

  return (
    <div className='flex h-10'>
      <IPADisplay>
        <input
          className='w-64 text-center bg-gray-200'
          value={
            result.length > 0
              ? `${prefix ? prefix + ' ' : ''}${idsToSubcategoryString(
                  result,
                  subcategories
                )}`
              : ''
          }
          readOnly
        ></input>
      </IPADisplay>
      <Dropdown
        options={options}
        onChange={handleChange}
        value={selectedElement}
        placeholder='...'
        className={`rounded-md`}
        controlClassName='bg-gray-200 shadow-inner border-none h-10 w-4'
        menuClassName='w-64 right-0 rounded-md border-none shadow-md'
      />
    </div>
  );
};

export default IPASubcategoryDropdown;
