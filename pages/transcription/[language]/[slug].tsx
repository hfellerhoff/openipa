import TranscriptionPage from '../../../src/components/transcription-page';
import getTranscriptionPageStaticProps, {
  TranscriptionPageStaticProps,
} from '../../../src/components/transcription-page/getTranscriptionPageStaticProps';
import { Dictionary } from '../../../src/hooks/useSupabaseTable';
import supabase from '../../../src/lib/supabase';
import { Language } from '../../../src/lib/supabase/models/Language';
import { Text } from '../../../src/lib/supabase/models/Text';

interface Props {
  text?: Text;
  language?: Language;
  author?: any;
  transcriptionProps: TranscriptionPageStaticProps;
}

const TextPage = ({ text, transcriptionProps }: Props) => {
  return (
    <TranscriptionPage text={text} transcriptionProps={transcriptionProps} />
  );
};

export default TextPage;

export async function getStaticProps({ params }) {
  const language = params.language;
  const transcriptionProps = await getTranscriptionPageStaticProps(language);

  const { data: languages } = await supabase.from('languages').select('*');

  const currentLanguage = languages.filter(
    (l) => l.label.toLowerCase() === params.language
  )[0];

  let { data: texts } = await supabase
    .from('texts')
    .select('*')
    .eq('slug', params.slug);

  texts = texts.filter((t) => t.language === currentLanguage.id);

  if (texts.length > 0) {
    let { data: languages } = await supabase
      .from('languages')
      .select('*')
      .eq('id', texts[0].language);

    let { data: authors } = await supabase
      .from('authors')
      .select('*')
      .eq('id', texts[0].author);

    if (languages.length > 0 && authors.length > 0) {
      return {
        props: {
          transcriptionProps,
          text: texts[0],
          language: languages[0],
          author: authors[0],
        },
      };
    }
    return {
      props: {
        transcriptionProps,
        text: texts[0],
        language: undefined,
      },
    };
  }
  return {
    props: {
      transcriptionProps,
      text: undefined,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let { data: texts } = await supabase.from('texts').select('*');
  let { data: languages } = await supabase.from('languages').select('*');

  let languageDictionary: Dictionary<string> = {};
  languages.forEach((language: Language) => {
    languageDictionary[language.id] = language.label;
  });

  // Get the paths we want to pre-render based on posts
  const paths = texts.map(
    (text) =>
      `/transcription/${languageDictionary[text.language].toLowerCase()}/${
        text.slug
      }`
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
