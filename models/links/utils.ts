import { User } from '@prisma/client';
import type { NewTag } from './types';
import urlMetadata from 'url-metadata';

export const parseTagsToAdd = ({
  tags,
  userId,
}: {
  tags?: NewTag[];
  userId: User['id'];
}) => {
  return tags
    ? {
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: {
              id: tag.id || '',
            },
            create: {
              name: tag?.name?.toLowerCase() || '',
              userId,
            },
          })),
        },
      }
    : {};
};

export const getMetaData = async ({ url }: { url: string }) => {
  try {
    const metadata = await urlMetadata(url);
    return {
      metaTitle: metadata.title,
      metaDescription: metadata.description,
      metaImage: metadata.image,
      metaType: metadata['og:type'],
    };
  } catch (error) {
    return {};
  }
};

const linkUtils = {
  parseTagsToAdd,
  getMetaData,
};

export default linkUtils;
