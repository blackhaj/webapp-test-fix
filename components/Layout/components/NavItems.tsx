import { useRouter } from 'next/router';
import { classNames } from 'utils/classNames';
import { DocumentIcon } from '@heroicons/react/outline';
import { NavItem } from '~/types';
import Link from 'next/link';

type Props = {
  navItems: NavItem[];
};

export const NavItems = ({ navItems }: Props) => {
  const { pathname } = useRouter();
  return (
    <nav className="px-2 mt-5 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon || DocumentIcon;

        return (
          <Link key={item.name} href={item.href}>
            <a
              className={classNames(
                pathname === item.href
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
              )}
            >
              <Icon
                className={classNames(
                  pathname === item.href
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-4 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          </Link>
        );
      })}
    </nav>
  );
};
