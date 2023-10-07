import { Metadata } from "next";

import RootLayout from "./RootLayout";
import AppLayout from "../src/components/layout/Layout";
import AuthProvider from "../src/state/AuthProvider";

import "../src/styles/app.scss";

export const metadata: Metadata = {
  title: "Open IPA - Free, informative IPA transcription for Lyric Diction",
  description:
    "Free, informative IPA transcription for Lyric Diction. Transcribe any Latin or French text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.",
};

export default function PrimaryAppLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <AppLayout>
        <AuthProvider>{children}</AuthProvider>
      </AppLayout>
    </RootLayout>
  );
}
