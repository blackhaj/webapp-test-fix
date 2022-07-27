import { prisma } from '~/prisma';
import type { SecretKey, User } from '@prisma/client';
import { createApiKey, createHash } from './utils';

const createOne = async ({ userId }: { userId: User['id'] }) => {
  // Add a limit of say 5 keys per person
  const { apiKey, hash } = await createApiKey();
  const dbKey = await prisma.secretKey.create({
    data: {
      hash,
      firstFive: apiKey.slice(0, 5),
      userId,
    },
  });

  return {
    apiKey,
    dbKey,
  };
};

const getOne = async ({ apiKey }: { apiKey: string }) => {
  const hash = await createHash({ apiKey });
  const secretKey = await prisma.secretKey.findUnique({
    where: {
      hash,
    },
    include: {
      user: true,
    },
  });
  return secretKey;
};

const getAll = async ({ userId }: { userId: User['id'] }) => {
  const secretKeys = await prisma.secretKey.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  return secretKeys;
};

const deleteOne = async ({ id }: { id: SecretKey['id'] }) => {
  const deletedKey = await prisma.secretKey.delete({
    where: {
      id,
    },
  });
  return deletedKey;
};

const secretKeyModel = {
  createOne,
  getOne,
  getAll,
  deleteOne,
};

export default secretKeyModel;
