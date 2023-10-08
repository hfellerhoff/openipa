"use client";

import { useState } from "react";

import Link from "next/link";

import Button from "../../src/components/buttons/Button";
import TextInput from "../../src/components/input/TextInput";
import { Dictionary } from "../../src/hooks/useSupabaseTable";
import { DatabaseLanguage, DatabaseText } from "../../src/lib/supabase/types";
import { capitalizeFirstLetter } from "../../src/util/StringHelper";

interface ITextSelectionProps {
  languages: Dictionary<DatabaseLanguage>;
  texts: Dictionary<DatabaseText>;
}
export default function TextSelection({
  languages,
  texts,
}: ITextSelectionProps) {
  const [selectedText, setSelectedText] = useState<DatabaseText>();

  return (
    <div className="flex flex-col-reverse w-full max-w-6xl px-4 py-4 mx-auto md:py-6 lg:py-12 lg:grid lg:grid-cols-2">
      <div>
        {Object.values(languages).map((language) => (
          <div key={language.id} className="mb-8">
            <h2 className="mb-4 ml-4">{language.label}</h2>
            {Object.values(texts)
              .filter((t) => t.language === language.id)
              .sort((a, b) => {
                if (a.title < b.title) return -1;
                else return 1;
              })
              .map((text) => (
                <button
                  key={text.id}
                  className={`block text-left w-full hover:shadow-inner hover:bg-gray-200 my-0.5 py-2 px-4 rounded ${
                    selectedText
                      ? selectedText.id === text.id
                        ? "shadow-inner bg-gray-200"
                        : ""
                      : ""
                  }`}
                  onClick={() => {
                    if (!process.browser) return;
                    if (window.innerWidth < 1024) window.scrollTo(0, 0);
                    setSelectedText(text);
                  }}
                >
                  <h3 className="text-lg font-normal">{text.title}</h3>
                  <p className="text-sm font-normal">
                    {language.label} {capitalizeFirstLetter(text.type)}
                  </p>
                </button>
              ))}
          </div>
        ))}
      </div>
      <div className="pb-8 mx-4 lg:p-0">
        <div className="sticky top-24">
          {selectedText && languages[selectedText.language] ? (
            <>
              <div className="flex justify-between mb-4 align-center">
                <div>
                  <h2 className="text-lg">{selectedText.title}</h2>
                  <p className="text-sm font-normal">
                    {languages[selectedText.language].label}{" "}
                    {capitalizeFirstLetter(selectedText.type)}
                  </p>
                </div>
                <Link
                  href={`/transcription/${languages[
                    selectedText.language
                  ].label.toLowerCase()}/${selectedText.slug}`}
                  className="mt-1"
                >
                  <Button className="h-10">Transcribe</Button>
                </Link>
              </div>
              <TextInput inputText={selectedText.text} displayHeight={500} />
            </>
          ) : (
            <p className="text-lg quote">
              No text selected. Pick a piece to transcribe it!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
