import globby from 'globby';
import React from 'react';
import { Dictionary } from '../src/hooks/useSupabaseTable';
import supabase from '../src/lib/supabase';
import { Language } from '../src/lib/supabase/models/Language';

const createSitemap = (
  routes
  // texts,
  // languageDictionary
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${
        routes
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('.js', '')
              .replace('.mdx', '');
            const route = path === '/index' ? '' : path;

            return `
                  <url>
                      <loc>${`https://openipa.org${route}`}</loc>
                  </url>
              `;
          })
          .join('')

        // ${
        // texts
        //   .map(({ text }) => {
        //     console.log(text);
        //     console.log(languageDictionary);
        //     console.log(languageDictionary[text.language]);

        //     return `
        //             <url>
        //                 <loc>${`https://openipa.org/transcription/${
        //                   languageDictionary[text.language]
        //                 }/${text.slug}`}</loc>
        //             </url>
        //         `;
        //   })
        //   .join('')}
        // ${Object.values(languageDictionary)
        //   .map(({ language }) => {
        //     return `
        //             <url>
        //                 <loc>${`https://openipa.org/transcription/${language.slug}`}</loc>
        //             </url>
        //         `;
        //   })
        //   .join('')
      }
    </urlset>
    `;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    let { data: texts } = await supabase.from('texts').select('*');
    let { data: languages } = await supabase.from('languages').select('*');

    let languageDictionary: Dictionary<Language> = {};
    languages.forEach((language: Language) => {
      languageDictionary[language.id] = language;
    });

    // Get the paths we want to pre-render based on posts
    const textPaths = texts.map(
      (text) =>
        `/transcription/${languageDictionary[text.language].slug}/${text.slug}`
    );
    const languagePaths = languages.map(
      (language) => `/transcription/${language.slug}`
    );

    const routes = [
      '/',
      '/sitemap.xml',
      '/editor',
      '/support',
      '/transcription',
      '/editor/ipa',
    ];

    routes.push(...languagePaths, ...textPaths);
    console.log(routes);

    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(routes));
    res.end();
  }
}

export default Sitemap;
