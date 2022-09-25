import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

import setupLegacyFrenchTest from '../util/setupLegacyFrenchTest';

const testFrench = (input: string, output: string) => {
  test(input, async () => {
    const expectTranscription = await setupLegacyFrenchTest();
    expectTranscription(input, output);
  });
};

testFrench('calme', 'kalmə');
testFrench('éclate', 'eklatə');
testFrench('docile', 'dɔsilə');
testFrench('céleste', 'selɛstə');
testFrench('descends', 'd(e)sɑ̃');
testFrench('garçon', 'gaɾsõ');
