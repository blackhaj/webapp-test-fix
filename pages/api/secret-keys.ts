import { NextApiRequest, NextApiResponse } from 'next';
import { secretKeyModel } from 'models';
import { isAuthenticated } from '~/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await isAuthenticated({ req });
    if (!user) {
      console.log('Unauthorized', { user });
      res.status(401).end();
      return;
    }

    switch (req.method) {
      case 'GET': {
        const { secretKey } = req.body;
        if (secretKey) {
          const key = await secretKeyModel.getOne({ apiKey: secretKey });
          res.status(200).json({ data: key });
          break;
        } else {
          const keys = await secretKeyModel.getAll({ userId: user.id });
          res.status(200).json({ data: keys });
          break;
        }
        break;
      }
      case 'POST': {
        const createdKey = await secretKeyModel.createOne({ userId: user.id });
        res.status(200).json({ data: createdKey });
        break;
      }
      case 'DELETE': {
        const { id } = req.body;
        const deletedKey = await secretKeyModel.deleteOne({ id });
        res.status(200).json({ data: deletedKey });
        break;
      }
      default:
        res.status(404).end();
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).end();
  }
  return;
};

export default handler;
