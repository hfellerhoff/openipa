import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

import getWiktionaryWord from "../../../server/getWiktionaryWord";

const Language = z.enum(["latin", "french"]);
type Language = z.infer<typeof Language>;

export interface SearchWordQuery {
  words: string;
  language: Language;
}

export interface SearchWordResponse {
  words: string[];
  part_of_speech?: string;
  pronounciation?: string;
}

export default async function searchWordAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const wordsQueryString = z.string().parse(req.query.words);
    const words = wordsQueryString.split(",").map((word) => word.toLowerCase());

    const language = Language.parse(req.query.language);

    const wordPromises = words.map((word) => getWiktionaryWord(language, word));
    const wordDataList = await Promise.all(wordPromises);

    const wordDataMap = new Map<string, object>();
    wordDataList.forEach((wordData) => {
      wordDataMap.set(wordData.word, wordData);
    });

    res.json(Object.fromEntries(wordDataMap));
  } catch (error) {
    res.statusCode = 400;
    if (error instanceof ZodError) {
      return res.json({
        error: z.flattenError(error).formErrors[0],
      });
    }
    return res.json({
      error,
    });
  }
}
