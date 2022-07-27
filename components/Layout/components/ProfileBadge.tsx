import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';

type Props = {
  user?: User | null;
};

export const ProfileBadge = ({ user }: Props) => {
  return (
    <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
      <div className="flex items-center max-w-full">
        <div>
          {user?.imageUrl && (
            <img
              className="inline-block w-10 h-10 rounded-full"
              src={user.imageUrl}
              alt="Profile picture"
            />
          )}
        </div>
        <div className="ml-3 truncate">
          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
            {user?.name || user?.email || 'Welcome'}
          </p>
          <p
            className="text-sm font-medium text-gray-500 group-hover:text-gray-700"
            onClick={() => signOut()}
          >
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
};
