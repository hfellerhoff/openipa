import * as deepl from "deepl-node";
import { NextApiRequest, NextApiResponse } from "next";

import { Result } from "../../../src/constants/Interfaces";

export interface TranslationResponse {
  translations: {
    originalText: string;
    translatedText: string;
    sourceLanguage: string;
  }[];
}

const AUTH_KEY = process.env.DEEPL_API_KEY;
if (!AUTH_KEY) {
  throw new Error("Missing DEEPL_API_KEY");
}

const deeplClient = new deepl.DeepLClient(AUTH_KEY);

export default async function translateAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const transcriptionResult: Result = req.body.result;
  const language: string = req.body.language;

  const lines = transcriptionResult.lines.reduce((acc, cur) => {
    const line = cur.words.reduce((accwords, curwords) => {
      const word = curwords.syllables.reduce((accsyll, cursyll) => {
        const syllable = cursyll.text.trim().split("\n");

        return `${accsyll}${syllable}`;
      }, "");

      if (accwords !== "") return `${accwords} ${word}`;
      return word;
    }, "");

    return [...acc, line];
  }, [] as string[]);

  const parsedLanguage = language.toLowerCase();
  const languageCode = parsedLanguage === "french" ? "fr" : "en";

  try {
    const data = await deeplClient.translateText(
      lines.join("\n"),
      languageCode,
      "en-US",
    );

    res.json({
      translations: data.text.split("\n").map((translation, i) => ({
        originalText: lines[i],
        translatedText: translation,
        sourceLanguage: data.detectedSourceLang.toUpperCase(),
      })),
    } as TranslationResponse);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
