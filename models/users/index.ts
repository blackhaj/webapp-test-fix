import { User } from '@prisma/client';
import { prisma } from '~/prisma';

const getOne = async ({
  id,
  email,
}: {
  id?: User['id'];
  email?: User['email'];
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
      email: email || '',
    },
  });

  return user;
};

const userModel = {
  getOne,
};

export default userModel;
