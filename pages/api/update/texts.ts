import { NextApiRequest, NextApiResponse } from 'next';
import addTextsToSupabase from '../../../scripts/addTextsToSupabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await addTextsToSupabase();

  res.end();
};
