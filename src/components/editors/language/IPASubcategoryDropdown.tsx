import { useMemo } from "react";

import { ReactDropdownProps } from "react-dropdown";

import IdSelectionDropdown from "./IdSelectionDropdown";
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

  const displayValue =
    result.length > 0
      ? `${prefix ? `${prefix} ` : ""}${idsToSubcategoryString(
          result,
          subcategories,
        )}`
      : "";

  return (
    <IdSelectionDropdown
      accessibleName="Add IPA subcategory"
      displayTitle="Subcategory display"
      displayValue={displayValue}
      inputClassName="w-64 text-center bg-gray-200"
      menuClassName="w-64 right-0 rounded-md border-none shadow-md"
      options={options}
      result={result}
      setResult={setResult}
    />
  );
};

export default IPASubcategoryDropdown;
