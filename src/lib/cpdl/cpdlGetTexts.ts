import Wikiapi from 'wikiapi';

import supabase from '../supabase';
import { Language } from '../supabase/models/Language';
import { BASE_URL, getCPDLTextSeachQuery } from './API';

const cpdlGetTexts = async (text: string) => {
  const textResult = await fetch(getCPDLTextSeachQuery(text));
  const textData = await textResult.json();

  const languages = await supabase.from('languages').select('*');

  if (!textData.query) return;

  const wiki = new Wikiapi(BASE_URL);

  const pagePromises = textData.query.search.map(
    async (result: { title: string }) => {
      const page_data = await wiki.page(result.title);

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

      const relevantLines: {
        language: string;
        type: string;
        text: string;
      }[] = [];
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

          if (textBlock && textBlock.length > 20) {
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

      const url = result.title.replace(/[ ]/g, '_');

      return {
        title: result.title,
        variations: relevantLines,
        url: `https://www.cpdl.org/wiki/index.php/${url}`,
      };
    }
  );

  const pageResult = await Promise.all(pagePromises);
  const filtered = pageResult.filter(
    (r) => r.variations && r.variations.length > 0
  );

  return filtered;
};

export default cpdlGetTexts;
