import { BASE_URL, getCPDLTextSeachQuery } from './API';
import { Language } from '../models/Language';
import Wikiapi from 'wikiapi';

const cpdlGetTexts = async (text: string) => {
  const textResult = await fetch(getCPDLTextSeachQuery(text));
  const textData = await textResult.json();

  const languages = await supabase.from('languages').select('*');

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

  return pageResult.filter((r) => r.variations.length > 0);
};

export default cpdlGetTexts;
