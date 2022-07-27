import { LogoAndTitle, NavItems, ProfileBadge } from '.';
import { SidebarProps } from './SidebarMobile';

export const SideBar = ({
  navItems,
  user,
}: Pick<SidebarProps, 'navItems' | 'user'>) => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <LogoAndTitle />
          <NavItems navItems={navItems} />
        </div>
        <ProfileBadge user={user} />
      </div>
    </div>
  );
};
