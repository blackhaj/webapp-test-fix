import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('Holy smokes it works!');
    res.status(200).json({ data: '🌴' });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).end();
  }
  return;
};

export default handler;
