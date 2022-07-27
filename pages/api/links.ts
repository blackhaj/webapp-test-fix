import { NextApiRequest, NextApiResponse } from 'next';
import { linkModel } from 'models';
import { isAuthenticated } from '~/utils';

/* 
200 - ok. GET = fetched PUT/POST = action result in body
201 - created
301 - redirect (moved permenantly, new url in Location response header)
400 - bad request
401 - unauthorized (actually unauthenticated)
403 - forbidden (actually not authorized)
404 - not found
429 - too many requests
500 - internal server error
*/

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

    let chosenLink;
    if (id && typeof id === 'string') {
      chosenLink = await linkModel.getOne({
        id,
      });
    }

    const { orderBy } = req.query;

    switch (req.method) {
      case 'GET': {
        if (chosenLink?.userId === userId) {
          res.status(200).json({ data: chosenLink });
        } else {
          const links = await linkModel.getAll({
            userId,
            orderBy: orderBy as string,
          });

          res.status(200).json({ data: links });
        }
        break;
      }
      case 'POST': {
        const { url, tags } = req.body;
        const newLink = await linkModel.createOne({
          userId,
          url,
          tags,
        });
        res.status(201).json({ data: newLink });
        break;
      }
      case 'PUT': {
        const { url, tags, deletedAt } = req.body;
        if (chosenLink && chosenLink.userId === userId) {
          const updatedLink = await linkModel.updateOne({
            userId,
            id: chosenLink.id,
            url,
            tags,
            deletedAt,
          });
          res.status(200).json({ data: updatedLink });
        } else {
          res.status(401).end();
        }
        break;
      }
      case 'DELETE': {
        if (chosenLink && chosenLink.userId === userId) {
          const deletedLink = await linkModel.deleteOne({
            id: chosenLink.id,
            userId,
          });
          res.status(200).json({ data: deletedLink });
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
