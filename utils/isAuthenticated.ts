import type { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { secretKeyModel, userModel } from 'models';
import type { User } from '@prisma/client';

export const isAuthenticated = async ({
  req,
}: {
  req: NextApiRequest;
  // ? Here is where the type wasn't inferred when moving over to the DB package
  // ? Check out how to better export types from the DB package
}): Promise<User | undefined | false | null> => {
  // if there is a secretKey in the body
  // Check against secret key table and get user
  // "cl2190tfo0009tyzjhxuxbaqw"
  const secretKey = req.body.secretKey || req.query.secretKey;
  if (secretKey) {
    const keyAndUser = await secretKeyModel.getOne({ apiKey: secretKey });
    return keyAndUser?.user;
  }

  // Try to get from session
  const session = await getSession({ req });
  if (session?.user) {
    const user = await userModel.getOne({ email: session.user.email || '' });
    return user;
  }

  return false;
};

export default isAuthenticated;
