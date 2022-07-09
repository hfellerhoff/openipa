import { Languages } from '../../constants/Interfaces';
import { TranscriptionOption, useEditorStore } from '../../state/editor';
import CheckboxButton from '../buttons/CheckboxButton';

type OptionCheckboxProps = {
  id: string;
  label: string;
  isChecked: boolean;
  setIsChecked: (v: boolean) => void;
};

function OptionCheckbox({
  id,
  label,
  isChecked,
  setIsChecked,
}: OptionCheckboxProps) {
  return (
    <div className='flex flex-wrap items-center justify-start gap-2 text-sm md:flex-row md:justify-center'>
      <CheckboxButton
        id={id}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

type Props = {
  language: Languages;
};

export default function TranscriptionEditorOptions({ language }: Props) {
  const { options, handleSetOption } = useEditorStore((store) => ({
    options: store.options,
    handleSetOption: store.handleSetOption,
  }));

  const languageOptions: [
    string,
    TranscriptionOption<boolean>
  ][] = Object.entries(options[language]);

  return (
    <div className='flex flex-col flex-1 gap-4 md:flex-row'>
      {languageOptions.map(([optionName, option]) => (
        <OptionCheckbox
          key={optionName}
          id={`checkbox-${option.label}`}
          label={option.label}
          isChecked={option.value}
          setIsChecked={handleSetOption(language, optionName)}
        />
      ))}
    </div>
  );
}
