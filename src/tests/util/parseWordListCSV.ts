import { readFileSync } from 'fs';
import path from 'path';

export type WordListCSVRow = [word: string, ipa: string];

export default function parseWordListCSV(directory: string): WordListCSVRow[] {
  const file = readFileSync(path.resolve(directory, './_words.csv'));
  const rows = file.toString('utf-8').split('\n');

  return rows.slice(1, rows.length).reduce((wordList, row) => {
    const [word, ipa] = row.split(',');

    wordList.push([word, ipa]);

    return wordList;
  }, [] as WordListCSVRow[]);
}
