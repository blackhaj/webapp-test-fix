import { useState } from 'react';

import {
  BookOpenIcon,
  ChartBarIcon,
  HomeIcon,
  LinkIcon,
  MapIcon,
  NewspaperIcon,
  PresentationChartBarIcon,
  UsersIcon,
} from '@heroicons/react/outline';

import { Hamburger, SideBar, SidebarMobile } from './components';
import { NavItem } from '~/types';
import { signIn, useSession } from 'next-auth/react';

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Links', href: '/links', icon: LinkIcon },
  { name: 'Books', href: '/books', icon: BookOpenIcon },
  { name: 'Courses', href: '/courses', icon: PresentationChartBarIcon },
  { name: 'Articles', href: '/articles', icon: NewspaperIcon },
  { name: 'Finances', href: '/finances', icon: ChartBarIcon },
  { name: 'Locations', href: '/locations', icon: MapIcon },
  { name: 'Contacts', href: '/contacts', icon: UsersIcon },
];

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    signIn();
    return <div>Redirecting to login..</div>;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const user = {
    name: session?.user?.name,
    email: session?.user?.email,
  };

  return (
    <>
      <div>
        <SidebarMobile
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navItems={navItems}
          user={user}
        />

        <SideBar navItems={navItems} user={user} />
        <div className="flex flex-col flex-1 md:pl-64">
          <Hamburger setSidebarOpen={setSidebarOpen} />
          {/* Main Content Panel */}
          <main className="flex-1">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};
