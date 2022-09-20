import { escape } from 'querystring';

import { NextApiRequest, NextApiResponse } from 'next';
import wretch from 'wretch';

import { Result } from '../../../src/constants/Interfaces';

const deeplAPI = wretch('https://api-free.deepl.com/v2');

interface DeepLTranslation {
  translations: {
    detected_source_language: string;
    text: string;
  }[];
}

export interface TranslationResponse {
  translations: {
    originalText: string;
    translatedText: string;
    sourceLanguage: string;
  }[];
}

export default async function translateAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transcriptionResult: Result = req.body.result;
  const language: string = req.body.language;

  const lines = transcriptionResult.lines.reduce((acc, cur) => {
    const line = cur.words.reduce((accwords, curwords) => {
      const word = curwords.syllables.reduce((accsyll, cursyll) => {
        const syllable = cursyll.text.trim().split('\n');

        return `${accsyll}${syllable}`;
      }, '');

      if (accwords !== '') return `${accwords} ${word}`;
      return word;
    }, '');

    return [...acc, line];
  }, [] as string[]);

  const textVariables = lines.reduce((acc, line) => {
    const lineText = escape(line);

    if (acc) return `${acc}&text=${lineText}`;
    return `text=${lineText}`;
  }, '');

  const parsedLanguage = language.toLowerCase();
  const languageCode = parsedLanguage === 'french' ? 'FR' : 'EN';

  try {
    const data: DeepLTranslation = await deeplAPI
      .url(
        `/translate?auth_key=${process.env.DEEPL_API_KEY}&source_lang=${languageCode}&target_lang=EN&${textVariables}`
      )
      .post()
      .json();

    res.json({
      translations: data.translations.map((translation, i) => ({
        originalText: lines[i],
        translatedText: translation.text,
        sourceLanguage: translation.detected_source_language,
      })),
    } as TranslationResponse);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
