import { prisma } from '~/prisma';
import type { Tag, User } from '@prisma/client';

const getOne = async ({ id }: { id: Tag['id'] }) => {
  const result = await prisma.tag.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const getAll = async ({ userId }: { userId: User['id'] }) => {
  const tags = await prisma.tag.findMany({
    where: {
      userId,
    },
  });
  return tags;
};

const createOne = async ({
  userId,
  name,
}: {
  userId: User['id'];
  name: Tag['name'];
}) => {
  // TODO - make uppercase
  // TODO - use upsert instead
  const newTag = await prisma.tag.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newTag;
};

const updateOne = async ({
  id,
  name,
  deletedAt,
}: {
  id: Tag['id'];
  name?: Tag['name'];
  deletedAt?: Tag['deletedAt'];
}) => {
  const updatedTag = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      name,
      deletedAt,
    },
  });
  return updatedTag;
};

const deleteOne = async ({
  id,
  softDelete = true,
}: {
  id: Tag['id'];
  softDelete?: boolean;
}) => {
  if (softDelete) {
    const deletedTag = await updateOne({
      id,
      deletedAt: new Date(),
    });
    return deletedTag;
  } else {
    const deletedTag = await prisma.tag.delete({
      where: {
        id,
      },
    });
    return deletedTag;
  }
};

const tagModel = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
};

export default tagModel;
