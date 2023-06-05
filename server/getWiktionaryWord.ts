import Wikiapi from "wikiapi";
import { z } from "zod";

const Language = z.enum(["latin", "french"]);
type Language = z.infer<typeof Language>;

const languageToBaseURL = (language: Language) => {
  switch (language) {
    case "latin":
      return "https://la.wiktionary.org/w/api.php";
    case "french":
      return "https://fr.wiktionary.org/w/api.php";
    default:
      return null;
  }
};

const WIKITEXT_PARAMS_BY_LANGUAGE: Record<
  Language,
  {
    match: Record<number, string | string[]>;
    select: Record<number, string>;
  }[]
> = {
  latin: [],
  french: [
    {
      match: {
        0: "pron",
        2: "fr",
      },
      select: {
        1: "pronounciation",
      },
    },
    {
      match: {
        0: "S",
        1: [
          "adverbe",
          "nom",
          "article",
          "article défini",
          "conjonction",
          "interjection",
          "locution prépositive",
          "préposition",
          "pronom",
          "verbe",
        ],
        2: "fr",
      },
      select: {
        1: "part_of_speech",
      },
    },
  ],
};

const WIKITEXT_REGEX = /{{[^}]*}}/g;
const wikitextToMap = (wikitext: string, language: Language) => {
  const possibleMatches = WIKITEXT_PARAMS_BY_LANGUAGE[language];

  const namedParameters = new Map<string, string>();
  Array.from(wikitext.matchAll(WIKITEXT_REGEX)).flat().forEach((result) => {
    const params = result.substring(2, result.length - 2).split("|");
    if (!params.length) return [];

    for (let i = 0; i < possibleMatches.length; i++) {
      const { match, select } = possibleMatches[i];
      const toMatch = Object.entries(match).map(
        (matcher) => [parseInt(matcher[0]), matcher[1]] as const
      );

      const matches = toMatch.reduce(
        (doesMatch, [matchIndex, matchVariable]) => {
          if (!doesMatch) return doesMatch;

          const paramValue = params[matchIndex];
          if (!paramValue) return false;

          if (typeof matchVariable === "string") {
            return paramValue === matchVariable;
          }
          if (Array.isArray(matchVariable)) {
            return matchVariable.includes(paramValue);
          }

          return true;
        },
        true
      );

      if (matches) {
        const indicies = Object.keys(select).map(parseInt);
        const names = Object.values(select);

        indicies.forEach((index, nameIndex) => {
          if (!namedParameters.has(names[nameIndex])) {
            namedParameters.set(names[nameIndex], params[index]);
          }
        });

        break;
      }
    }
  });

  return Object.fromEntries(namedParameters);
};

export default async function getWiktionaryWord(
  language: Language,
  word: string
) {
  const baseUrl = languageToBaseURL(language);
  const wiktionary = new Wikiapi(baseUrl);
  const pageData = await wiktionary.page(word);

  return {
    word,
    ...wikitextToMap(pageData.wikitext, language),
  };
}
