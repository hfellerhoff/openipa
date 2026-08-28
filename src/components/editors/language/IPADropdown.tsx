import { useMemo } from "react";

import { ReactDropdownProps } from "react-dropdown";

import IdSelectionDropdown from "./IdSelectionDropdown";
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

  return (
    <IdSelectionDropdown
      accessibleName="Add IPA symbol"
      displayTitle="IPA Display"
      displayValue={idsToIPAString(result, ipa)}
      inputClassName="w-16 text-center bg-gray-200"
      menuClassName="w-96 right-0 rounded-md border-none shadow-md h-96 max-h-64"
      options={options}
      result={result}
      setResult={setResult}
    />
  );
};

export default IPADropdown;
