import { useMemo } from "react";

import Dropdown, { Option, ReactDropdownProps } from "react-dropdown";

import IPADisplay from "./IPADisplay";
import { Dictionary } from "../../../hooks/useSupabaseTable";
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
} from "../../../lib/supabase/types";
import idsToIPAString from "../../../util/supabase/idsToIPAString";

interface Props {
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
  result: number[];
  setResult: (r: number[]) => void;
}

const IPADropdown = ({ ipa, categories, result, setResult }: Props) => {
  const options = useMemo<ReactDropdownProps["options"]>(
    () => [
      {
        value: 0,
        label: "Clear Result",
      },
      ...Object.values(categories).map((category: DatabaseIPACategory) => {
        const section = {
          type: "group" as const,
          name: category.label,
          items: Object.values(ipa)
            .filter((i: DatabaseIPA) => i.category === category.id)
            .map((element: DatabaseIPA) => {
              const block = {
                value: element.id,
                label: element.symbol,
              };
              return block;
            }),
        };
        return section;
      }),
    ],
    [ipa, categories],
  );

  const handleChange = (selectedOption: Option) => {
    if (selectedOption.value == "0") {
      setResult([]);
    } else {
      setResult([...result, Number(selectedOption.value)]);
    }
  };

  return (
    <div className="flex h-10">
      <IPADisplay>
        <input
          title="IPA Display"
          className="w-16 text-center bg-gray-200"
          value={idsToIPAString(result, ipa)}
          readOnly
        ></input>
      </IPADisplay>
      <Dropdown
        options={options}
        onChange={handleChange}
        placeholder="..."
        className={`rounded-md`}
        controlClassName="bg-gray-200 shadow-inner border-none h-10 w-4"
        menuClassName="w-96 right-0 rounded-md border-none shadow-md h-96 max-h-64"
      />
    </div>
  );
};

export default IPADropdown;
