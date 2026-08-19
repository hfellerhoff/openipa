import { Fragment } from "react";

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

type Reason = {
  reason: string;
};
type Props = {
  reasons: Reason[];
  selected: Reason;
  setSelected: (r: Reason) => void;
};

export default function FeedbackSelect({
  reasons,
  selected,
  setSelected,
}: Props) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxLabel className="text-gray-600">
          I am sending feedback because...
        </ListboxLabel>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full py-2 pl-3 pr-10 text-left bg-white border-2 border-gray-200 border-solid rounded-lg cursor-default focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.reason}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              modal={false}
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
            >
              {reasons.map((person, personIdx) => (
                <ListboxOption
                  key={personIdx}
                  className={({ focus }) =>
                    `${focus ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-blue-100`
                  }
                  value={person}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {person.reason}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            focus ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
