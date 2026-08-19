import { useMemo } from "react";

import Dropdown, { Option, ReactDropdownProps } from "react-dropdown";

import IPADisplay from "./IPADisplay";
import { Dictionary } from "../../../hooks/useSupabaseTable";
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
} from "../../../lib/supabase/types";
import idsToSubcategoryString from "../../../util/supabase/idsToSubcategoryString";

interface Props {
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
  result: number[];
  setResult: (r: number[]) => void;
  prefix: string;
}

const IPASubcategoryDropdown = ({
  subcategories,
  result,
  setResult,
  prefix,
}: Props) => {
  const options = useMemo<ReactDropdownProps["options"]>(
    () => [
      {
        value: 0,
        label: "Clear Result",
      },
      ...Object.values(subcategories).map(
        (subcategory: DatabaseIPASubcategory) => {
          const block = {
            value: subcategory.id,
            label: subcategory.label,
          };
          return block;
        },
      ),
    ],
    [subcategories],
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
          title="Subcategory display"
          className="w-64 text-center bg-gray-200"
          value={
            result.length > 0
              ? `${prefix ? prefix + " " : ""}${idsToSubcategoryString(
                  result,
                  subcategories,
                )}`
              : ""
          }
          readOnly
        ></input>
      </IPADisplay>
      <Dropdown
        options={options}
        onChange={handleChange}
        placeholder="..."
        className={`rounded-md`}
        controlClassName="bg-gray-200 shadow-inner border-none h-10 w-4"
        menuClassName="w-64 right-0 rounded-md border-none shadow-md"
      />
    </div>
  );
};

export default IPASubcategoryDropdown;
