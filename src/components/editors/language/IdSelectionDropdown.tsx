import Dropdown, { Option, ReactDropdownProps } from "react-dropdown";

import IPADisplay from "./IPADisplay";

interface Props {
  accessibleName: string;
  displayTitle: string;
  displayValue: string;
  inputClassName: string;
  menuClassName: string;
  options: ReactDropdownProps["options"];
  result: number[];
  setResult: (result: number[]) => void;
}

const IdSelectionDropdown = ({
  accessibleName,
  displayTitle,
  displayValue,
  inputClassName,
  menuClassName,
  options,
  result,
  setResult,
}: Props) => {
  const handleChange = (selectedOption: Option) => {
    if (typeof selectedOption.value === "boolean") return;

    const selectedId = Number(selectedOption.value);
    if (!Number.isInteger(selectedId) || selectedId < 0) return;

    setResult(selectedId === 0 ? [] : [...result, selectedId]);
  };

  return (
    <div className="flex h-10">
      <IPADisplay>
        <input
          title={displayTitle}
          className={inputClassName}
          value={displayValue}
          readOnly
        />
      </IPADisplay>
      <Dropdown
        aria-label={accessibleName}
        options={options}
        onChange={handleChange}
        placeholder="..."
        className="rounded-md"
        controlClassName="bg-gray-200 shadow-inner border-none h-10 w-4"
        menuClassName={menuClassName}
      />
    </div>
  );
};

export default IdSelectionDropdown;
