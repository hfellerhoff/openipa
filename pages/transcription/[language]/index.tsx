import TranscriptionPage from '../../../src/components/transcription-page';
import getTranscriptionPageStaticProps, {
  TranscriptionPageStaticProps,
} from '../../../src/components/transcription-page/getTranscriptionPageStaticProps';
import { Languages } from '../../../src/constants/Interfaces';

export default function TranscriptionLanguagePage(
  props: TranscriptionPageStaticProps
) {
  return <TranscriptionPage transcriptionProps={props} />;
}

export async function getStaticProps() {
  const props = await getTranscriptionPageStaticProps();

  return {
    props,
  };
}

export async function getStaticPaths() {
  const languages = Object.values(Languages);
  const paths = languages.map((language) => `/transcription/${language}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
