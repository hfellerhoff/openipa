import { NextApiRequest, NextApiResponse } from 'next';

import addTextsToSupabase from '../../../scripts/addTextsToSupabase';

export default async function updateTextsAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await addTextsToSupabase();

  res.end();
}
