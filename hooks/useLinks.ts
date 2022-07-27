import useSWR from 'swr';
import { fetcher } from './utils';

export type Link = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  url: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  metaType: string | null;
  userId: string;
};

export const useLinks = () => {
  const { data, error } = useSWR<Link[]>('/api/links', fetcher);

  return {
    links: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};
