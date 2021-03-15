import React, { useEffect, useState } from 'react';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../../lib/supabase/models/IPA';
import Dropdown from 'react-dropdown';
import IPADisplay from './IPADisplay';
import idsToIPAString from '../../../util/supabase/idsToIPAString';
import { Dictionary } from '../../../hooks/useSupabaseTable';

interface Props {
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  categories: Dictionary<IPACategory>;
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
        ...Object.values(categories).map((category: IPACategory) => {
          const section = {
            type: 'group',
            name: category.label,
            key: `category-${category.id}`,
            items: Object.values(ipa)
              .filter((i: IPA) => i.category === category.id)
              .map((element: IPA) => {
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

  const handleChange = (selectedOption) => {
    if (selectedOption.value == 0) {
      setResult([]);
    } else {
      setResult([...result, selectedOption.value]);
      console.log(`Option selected:`, selectedOption);
    }
    setSelectedElement(null);
  };

  return (
    <div className='flex'>
      <IPADisplay>
        <input
          className='bg-gray-200 w-16 text-center'
          value={idsToIPAString(result, ipa)}
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

export default IPADropdown;
