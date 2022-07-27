import { NextApiRequest, NextApiResponse } from 'next';
import { tagModel } from 'models';
import { isAuthenticated } from '~/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await isAuthenticated({ req });

    if (!user) {
      console.log('Unauthorized', { body: req.body, query: req.query });
      res.status(401).end();
      return;
    }

    const { id } = req.body;
    const userId = user.id;

    let chosenTag;
    if (id && typeof id === 'string') {
      chosenTag = await tagModel.getOne({
        id,
      });
    }

    switch (req.method) {
      case 'GET': {
        if (chosenTag?.userId === userId) {
          res.status(200).json({ data: chosenTag });
        } else {
          const tags = await tagModel.getAll({
            userId,
          });

          res.status(200).json({ data: tags });
        }
        break;
      }
      case 'POST': {
        const { name } = req.body;
        const newLink = await tagModel.createOne({
          userId,
          name,
        });
        res.status(201).json({ data: newLink });
        break;
      }
      case 'PUT': {
        const { name, deletedAt } = req.body;
        if (chosenTag && chosenTag.userId === userId) {
          const updatedTag = await tagModel.updateOne({
            id: chosenTag.id,
            name,
            deletedAt,
          });
          res.status(200).json({ data: updatedTag });
        } else {
          res.status(401).end();
        }
        break;
      }
      case 'DELETE': {
        if (chosenTag && chosenTag.userId === userId) {
          const deletedTag = await tagModel.deleteOne({
            id: chosenTag.id,
          });
          res.status(200).json({ data: deletedTag });
        } else {
          res.status(401).end();
        }
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
