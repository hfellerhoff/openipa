require('dotenv').config();
import * as fs from 'fs';

import cpdlGetTexts from '../src/lib/cpdl/cpdlGetTexts';
import supabase from '../src/lib/supabase/index';
import { Language } from '../src/lib/supabase/models/Language';

const getSlug = (text: string) => {
  text = text.replace(/[(),.`]/g, '');
  text = text.replace(/[ /\\]/g, '-');
  return text.toLowerCase();
};

const fetchWorks = async () => {
  // Get works to fetch from file
  const filename = './scripts/textsToAdd.txt';
  fs.readFile(filename, 'utf8', async function (err, data) {
    if (err) throw err;

    const worksToFetch = data.split('\n');

    // Get current texts
    const res = await supabase.from('languages').select('*');
    const languages: Language[] = res.body;

    const languageDictionary = {};
    languages.forEach((element) => {
      languageDictionary[element['id']] = element;
    });

    // Search for work
    const fetchPromises = worksToFetch.map((work) => cpdlGetTexts(work));

    const works = await Promise.all(fetchPromises);

    const worksToAdd = [];

    works.forEach((w) => {
      w.forEach((e) => {
        const variationsByLanguage = {};
        e.variations.forEach(async (v) => {
          const language = languages.filter(
            (l) => l.label.toLowerCase() === v.language.toLowerCase()
          )[0].id;

          worksToAdd.push({
            slug: `${getSlug(e.title)}${
              +variationsByLanguage[v.language]
                ? `-${variationsByLanguage[v.language]}`
                : ''
            }`,
            title: e.title,
            text: v.text,
            language,
            source: e.url,
            updated_at: 'now()',
            type: v.type,
          });

          if (variationsByLanguage[v.language])
            variationsByLanguage[v.language] += 1;
          else variationsByLanguage[v.language] = 1;
        });
      });
    });

    // === ADD TO SUPABASE ===
    await supabase.from('texts').delete();

    await supabase.from('texts').insert(worksToAdd, { upsert: true });
  });

  return;
};

export default fetchWorks;
