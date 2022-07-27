import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';
import { FolderIcon } from '@heroicons/react/outline';
import { classNames } from 'utils/classNames';
import { Project } from '../KBar';

export const Result = ({ result }: { result: Project }) => {
  return (
    <Combobox.Option
      value={result}
      className={({ active }) =>
        classNames(
          'flex cursor-default select-none items-center rounded-md px-3 py-2',
          active && 'bg-gray-800 text-white'
        )
      }
    >
      {({ active }) => (
        <>
          <FolderIcon
            className={classNames(
              'h-6 w-6 flex-none',
              active ? 'text-white' : 'text-gray-500'
            )}
            aria-hidden="true"
          />
          <span className="flex-auto ml-3 truncate">{result.name}</span>
          {active && (
            <span className="flex-none ml-3 text-gray-400">Jump to...</span>
          )}
        </>
      )}
    </Combobox.Option>
  );
};
