import { prisma } from '~/prisma';
import type { Link, User } from '@prisma/client';
import type { NewTag } from './types';
import { getMetaData, parseTagsToAdd } from './utils';

const getOne = async ({
  id,
  includeTags = true,
}: {
  id: Link['id'];
  includeTags?: boolean;
}) => {
  const result = await prisma.link.findUnique({
    where: {
      id: id,
    },
    include: {
      tags: includeTags,
    },
  });

  return result;
};

const getOrderByQuery = (orderBy?: string) => {
  if (!orderBy) {
    return undefined;
  }

  const [field, direction] = orderBy.split('_');
  return { [field]: direction.toLowerCase() };
};

const getAll = async ({
  userId,
  includeTags = true,
  orderBy,
}: {
  userId: User['id'];
  includeTags?: boolean;
  orderBy?: string;
}) => {
  // Maybe update to not get those with deletedAt values
  const links = await prisma.link.findMany({
    where: {
      userId,
    },
    include: {
      tags: includeTags,
    },
    orderBy: getOrderByQuery(orderBy),
  });
  return links;
};

const createOne = async ({
  userId,
  url,
  tags,
}: {
  userId: User['id'];
  url: Link['url'];
  tags?: NewTag[];
}) => {
  url = url.startsWith('http') ? url : `https://${url}`;
  const { metaTitle, metaDescription, metaImage, metaType } = await getMetaData(
    { url }
  );

  let newLink;
  try {
    newLink = await prisma.link.create({
      data: {
        url,
        metaTitle,
        metaDescription,
        metaImage,
        metaType,
        tags: tags && {
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
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        tags: true,
      },
    });
  } catch (error) {
    console.log('SHIT DAM ERROR', error);
  }

  return newLink;
};

const updateOne = async ({
  userId,
  id,
  url,
  deletedAt,
  tags,
}: {
  id: Link['id'];
  userId: User['id'];
  url?: Link['url'];
  deletedAt?: Link['deletedAt'];
  tags?: NewTag[];
}) => {
  console.log('DELETE AT ', deletedAt);
  const updatedLink = await prisma.link.update({
    where: {
      id: id,
    },
    data: {
      url: url,
      deletedAt: deletedAt,
      ...parseTagsToAdd({ tags, userId }),
    },
    include: {
      tags: true,
    },
  });
  return updatedLink;
};

const deleteOne = async ({
  id,
  softDelete = true,
  userId,
}: {
  id: Link['id'];
  userId: User['id'];
  softDelete?: boolean;
}) => {
  if (softDelete) {
    const deletedLink = await updateOne({
      id,
      userId,
      deletedAt: new Date(),
    });
    return deletedLink;
  } else {
    const deletedLink = await prisma.link.delete({
      where: {
        id,
      },
    });
    return deletedLink;
  }
};

const linkModel = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
};

export default linkModel;
