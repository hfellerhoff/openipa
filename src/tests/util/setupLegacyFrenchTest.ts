import flattenResult from './flattenResult';
import parseFrench from '../../transcription/french/ParseFrench';

const expectLegacyFrenchTranscription = (
  inputText: string,
  expectedOutput: string
) => {
  const result = parseFrench(inputText, {
    shouldAnalyzeElision: {
      label: '',
      value: true,
    },
    shouldAnalyzeLiason: {
      label: '',
      value: true,
    },
  });

  const flattenedResult = flattenResult(result);
  expect(flattenedResult).toBe(expectedOutput);
};

const setupLegacyFrenchTest = async () => {
  return expectLegacyFrenchTranscription;
};

export default setupLegacyFrenchTest;
