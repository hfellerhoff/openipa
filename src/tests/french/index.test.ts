import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "../../../.env.local"),
  quiet: true,
});

import parseWordListCSV from "../util/parseWordListCSV";
import setupLegacyFrenchTest from "../util/setupLegacyFrenchTest";

const words = parseWordListCSV(__dirname);
let expectTranscription: (inputText: string, expectedOutput: string) => void;

beforeAll(async () => {
  expectTranscription = await setupLegacyFrenchTest();
});

test.each(words)("%p", (word, ipa) => {
  expectTranscription(word, ipa);
});
