import React from 'react';

import IPADisplay from './IPADisplay';

interface Props {
  value: string;
  setValue: (v: string) => void;
  className?: string;
  inputClassName?: string;
}

const IPAInput = ({ value, setValue, className }: Props) => {
  return (
    <IPADisplay className={className}>
      <input
        className={`bg-gray-200 w-10 text-center`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </IPADisplay>
  );
};

export default IPAInput;
