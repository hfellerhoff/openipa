import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

import { Languages } from '../../constants/Interfaces';
import parseWordListCSV from '../util/parseWordListCSV';
import setupTranscriptionTest from '../util/setupTranscriptionTest';

const words = parseWordListCSV(__dirname);
let expectTranscription: (inputText: string, expectedOutput: string) => void;

beforeAll(async () => {
  expectTranscription = await setupTranscriptionTest(Languages.Latin);
});

test.each(words)('%p → %p', (word, ipa) => {
  expectTranscription(word, ipa);
});
