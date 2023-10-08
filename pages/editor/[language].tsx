import Head from "next/head";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";

import RuleList from "../../src/components/editors/language/RuleList";
import EditorLayout from "../../src/components/layout/EditorLayout";
import TranscriptionDescription from "../../src/components/transcription-page/TranscriptionDescription";
import TranscriptionEditor from "../../src/components/transcription-page/TranscriptionEditor";
import TranscriptionEditorProvider from "../../src/components/transcription-page/TranscriptionEditorProvider";
import { Languages } from "../../src/constants/Interfaces";
import useSupabaseIPA from "../../src/hooks/useSupabaseIPA";

const LanguageEditor = () => {
  const router = useRouter();

  const { categories, subcategories, ipa, rules, tags, languages } =
    useSupabaseIPA();

  const languageSlug = router.query.language as string;
  const language = Object.values(languages).find(
    (language) => language.slug === languageSlug
  );

  if (!language) {
    return (
      <EditorLayout>
        <Head>
          <title>Language Editor - Open IPA</title>
        </Head>
        <div className="flex items-center justify-center p-16">
          <PulseLoader color="gray" />
        </div>
      </EditorLayout>
    );
  }

  const typedLanguage = router.query.language as unknown as Languages;

  return (
    <EditorLayout
      rightSidebar={
        <div className="grid flex-1 gap-4 p-6">
          <TranscriptionEditorProvider language={typedLanguage}>
            <TranscriptionDescription lockLanguage editorView />
            <TranscriptionEditor
              editorView
              transcriptionProps={{
                ipa,
                subcategories,
                categories,
                tags,
                rules,
                languages,
              }}
            />
          </TranscriptionEditorProvider>
        </div>
      }
    >
      <Head>
        <title>{language.label} Editor - Open IPA</title>
      </Head>
      <div className="p-8">
        <h3 className="mb-4">{language.label} Transcription Rules</h3>
        <RuleList
          rules={Object.values(rules)}
          ipa={ipa}
          subcategories={subcategories}
          categories={categories}
          languageId={language.id}
        />
      </div>
    </EditorLayout>
  );
};

export default LanguageEditor;
