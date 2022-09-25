import { fetchSupabaseTableAsDict } from '../../components/transcription-page/getTranscriptionPageStaticProps';
import { Languages } from '../../constants/Interfaces';
import supabase from '../../lib/supabase';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import { Language } from '../../lib/supabase/models/Language';
import { Rule } from '../../lib/supabase/models/Rule';
import parseFrench from '../../transcription/french/ParseFrench';
import flattenResult from './flattenResult';
import handleExpectTranscription from './handleExpectTranscription';

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
  expect(expectedOutput).toBe(flattenedResult);
};

const setupLegacyFrenchTest = async () => {
  return expectLegacyFrenchTranscription;
};

export default setupLegacyFrenchTest;
