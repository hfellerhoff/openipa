import Demonstration from "../src/components/landing-page/Demonstration";
import Description from "../src/components/landing-page/Description";
import Hero from "../src/components/landing-page/Hero";
import getTranscriptionPageStaticProps from "../src/components/transcription-page/getTranscriptionPageStaticProps";
import { Languages } from "../src/constants/Interfaces";

export default async function RootPage() {
  const props = await getTranscriptionPageStaticProps(Languages.Latin);

  return (
    <>
      <Hero />
      <Description />
      <Demonstration {...props} />
    </>
  );
}
