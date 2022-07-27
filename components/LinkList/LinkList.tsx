import { ExternalLinkIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/classNames';
import { useLinks, useToast } from '~/hooks';

export const LinkList = () => {
  const { links, isError, isLoading, error } = useLinks();
  const { fireToast } = useToast();

  if (isError) {
    fireToast({
      message: 'Error loading data',
      type: 'error',
    });
    console.error(error);
  }

  return (
    <div>
      <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
        Links
      </h2>
      {isLoading && <p>Loading...</p>}
      <ul
        role="list"
        className="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {links?.map((link) => (
          <li key={link.id} className="flex col-span-1 rounded-md shadow-sm">
            <div
              style={{
                backgroundImage: link.metaImage ? `url(${link.metaImage})` : '',
              }}
              className={classNames(
                link.metaImage
                  ? 'bg-center bg-no-repeat bg-cover'
                  : 'bg-gradient-to-r  from-indigo-500 to-green-500',
                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md border-t border-b border-l border-gray-200'
              )}
            />
            <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a
                  href={link.url}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {link.metaTitle || link.url}
                </a>
                {link.metaTitle && <p className="text-gray-500">{link.url}</p>}
              </div>
              <div className="flex-shrink-0 pr-2">
                <a
                  className="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Open link</span>
                  <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
