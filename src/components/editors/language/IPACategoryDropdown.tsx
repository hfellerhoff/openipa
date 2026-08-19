import { useMemo } from "react";

import { ReactDropdownProps } from "react-dropdown";

import IdSelectionDropdown from "./IdSelectionDropdown";
import { Dictionary } from "../../../hooks/useSupabaseTable";
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
} from "../../../lib/supabase/types";
import idsToCategoryString from "../../../util/supabase/idsToCategoryString";

interface Props {
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  categories: Dictionary<DatabaseIPACategory>;
  result: number[];
  setResult: (r: number[]) => void;
  prefix: string;
}

const IPADropdown = ({ categories, result, setResult, prefix }: Props) => {
  const options = useMemo<ReactDropdownProps["options"]>(
    () => [
      {
        value: "0",
        label: "Clear Result",
      },
      ...Object.values(categories).map((category: DatabaseIPACategory) => {
        const block = {
          value: category.id.toString(),
          label: category.label,
        };
        return block;
      }),
    ],
    [categories],
  );

  const displayValue =
    result.length > 0
      ? `${prefix ? `${prefix} ` : ""}${idsToCategoryString(
          result,
          categories,
        )}`
      : "";

  return (
    <IdSelectionDropdown
      accessibleName="Add IPA category"
      displayTitle="IPA category display"
      displayValue={displayValue}
      inputClassName="w-64 text-center bg-gray-200"
      menuClassName="w-64 right-0 rounded-md border-none shadow-md"
      options={options}
      result={result}
      setResult={setResult}
    />
  );
};

export default IPADropdown;
