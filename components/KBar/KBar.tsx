import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import {
  DocumentAddIcon,
  FolderAddIcon,
  FolderIcon,
  HashtagIcon,
  TagIcon,
} from '@heroicons/react/outline';
import { classNames } from 'utils/classNames';
import { Result } from './components';

export type Project = {
  id: number;
  name: string;
  url: string;
};

const projects: Project[] = [
  { id: 1, name: 'Workflow Inc. / Website Redesign', url: '#' },
  // More projects...
];
const recent = [projects[0]];

export type Action = {
  name: string;
  icon: JSX.Element;
  url: string;
  shortcut: string;
};
const quickActions = [
  { name: 'Add new file...', icon: DocumentAddIcon, shortcut: 'N', url: '#' },
  { name: 'Add new folder...', icon: FolderAddIcon, shortcut: 'F', url: '#' },
  { name: 'Add hashtag...', icon: HashtagIcon, shortcut: 'H', url: '#' },
  { name: 'Add label...', icon: TagIcon, shortcut: 'L', url: '#' },
];

export const KBar = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(true);

  const filteredProjects =
    query === ''
      ? []
      : projects.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 p-4 overflow-y-auto sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="max-w-2xl mx-auto overflow-hidden transition-all transform bg-gray-900 divide-y divide-gray-500 shadow-2xl divide-opacity-20 rounded-xl">
              {/* @ts-ignore */}
              <Combobox
                // @ts-ignore
                onChange={(item) => (window.location = item.url)}
              >
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="w-full h-12 pr-4 text-white placeholder-gray-500 bg-transparent border-0 pl-11 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === '' || filteredProjects.length > 0) && (
                  <Combobox.Options
                    static
                    className="overflow-y-auto divide-y divide-gray-500 max-h-80 scroll-py-2 divide-opacity-20"
                  >
                    <li className="p-2">
                      {query === '' && (
                        <h2 className="px-3 mt-4 mb-2 text-xs font-semibold text-gray-200">
                          Recent searches
                        </h2>
                      )}
                      <ul className="text-sm text-gray-400">
                        {(query === '' ? recent : filteredProjects).map(
                          (project) => (
                            <Result key={project.id} result={project} />
                          )
                        )}
                      </ul>
                    </li>
                    {/* Default state */}
                    {query === '' && (
                      <li className="p-2">
                        <h2 className="sr-only">Quick actions</h2>
                        <ul className="text-sm text-gray-400">
                          {quickActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                  active && 'bg-gray-800 text-white'
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={classNames(
                                      'h-6 w-6 flex-none',
                                      active ? 'text-white' : 'text-gray-500'
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="flex-auto ml-3 truncate">
                                    {action.name}
                                  </span>
                                  <span className="flex-none ml-3 text-xs font-semibold text-gray-400">
                                    <kbd className="font-sans">???</kbd>
                                    <kbd className="font-sans">
                                      {action.shortcut}
                                    </kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {/* Empty State */}
                {query !== '' && filteredProjects.length === 0 && (
                  <div className="px-6 text-center py-14 sm:px-14">
                    <FolderIcon
                      className="w-6 h-6 mx-auto text-gray-500"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-200">
                      We couldn&apos;t find any projects with that term. Please
                      try again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
