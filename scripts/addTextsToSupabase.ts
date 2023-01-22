import * as fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

import { Dictionary } from '../src/hooks/useSupabaseTable';
import cpdlGetTexts from '../src/lib/cpdl/cpdlGetTexts';
import supabase from '../src/lib/supabase';
import {
  DatabaseLanguage,
  DatabaseTextToInsert,
} from '../src/lib/supabase/types';

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
    const { data: languages } = await supabase.from('languages').select('*');

    if (!languages) return;

    const languageDictionary: Dictionary<DatabaseLanguage> = {};
    languages.forEach((element) => {
      languageDictionary[element['id']] = element;
    });

    // Search for work
    const fetchPromises = worksToFetch.map((work) => cpdlGetTexts(work));

    const works = await Promise.all(fetchPromises);

    const worksToAdd: DatabaseTextToInsert[] = [];

    works.forEach((w) => {
      w?.forEach((e) => {
        const variationsByLanguage: Record<string, number> = {};
        e.variations.forEach(
          async (v: { language: string; text: string; type: string }) => {
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
          }
        );
      });
    });

    // === ADD TO SUPABASE ===
    await supabase.from('texts').delete();

    await supabase.from('texts').upsert(worksToAdd);
  });

  return;
};

export default fetchWorks;
