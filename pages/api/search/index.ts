import { NextApiRequest, NextApiResponse } from 'next';
import {
  BASE_URL,
  getCPDLPageQuery,
  getCPDLTextSeachQuery,
} from '../../../src/lib/supabase/cpdl/API';
import Wikiapi from 'wikiapi';
import supabase from '../../../src/lib/supabase';
import { Language } from '../../../src/lib/supabase/models/Language';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (!req.query.text) {
  //     res.status(400).end();
  //   }

  const text = (req.query.text as string) || 'Agnus Dei';

  const textResult = await fetch(getCPDLTextSeachQuery(text));
  const textData = await textResult.json();

  const languages = await supabase.from('languages').select('*');
  console.log(languages.data);

  const wiki = new Wikiapi(BASE_URL);

  const pagePromises: any[] = textData.query.search.map(async (result) => {
    let page_data = await wiki.page(result.title);

    const checkForLanguageText = (line: string) => {
      let label = '';
      let type = 'none';
      (languages.data as Language[]).forEach((language) => {
        if (line.includes(`{{Text|${language.label}`)) {
          label = language.label;
          type = 'text';
        } else if (line.includes(`{{Translation|${language.label}`)) {
          label = language.label;
          type = 'translation';
        }
      });
      return {
        language: label,
        type,
      };
    };

    const relevantLines = [];
    let textBlock = '';
    let isRelevantText = false;
    let isFirstLine = false;
    let currentLanguage = {
      language: '',
      type: '',
    };

    page_data.wikitext.split('\n').forEach((line: string) => {
      const languageOfText = checkForLanguageText(line);

      if (languageOfText.language) {
        isRelevantText = true;
        isFirstLine = true;
        currentLanguage = languageOfText;
      } else if (line.includes(`}}`) && isRelevantText) {
        isRelevantText = false;

        if (textBlock.length > 20) {
          relevantLines.push({
            language: currentLanguage.language,
            type: currentLanguage.type,
            text: textBlock,
          });
        }
        textBlock = '';
        currentLanguage = {
          language: '',
          type: '',
        };
      } else if (isRelevantText) {
        if (!isFirstLine) {
          textBlock += '\n';
        } else isFirstLine = false;
        textBlock += line;
      }
    });
    console.log({
      title: result.title,
      variations: relevantLines,
    });

    return {
      title: result.title,
      variations: relevantLines,
    };
  });

  const pageResult = await Promise.all(pagePromises);

  console.log(pageResult);

  res.json({
    result: pageResult.filter((r) => r.variations.length > 0),
  });
};
