"use client";

import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Languages, Result } from "../../constants/Interfaces";
import Template from "../../constants/Template";
import { DatabaseText } from "../../lib/supabase/types";

interface ITranscriptionEditorContext {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  language: Languages;
  changeLanguage: (language: Languages) => void;
}

export const TranscriptionEditorContext =
  createContext<ITranscriptionEditorContext | null>(null);

interface ITranscriptionEditorProviderProps {
  language: Languages;
  supabaseText?: DatabaseText;
}
const TranscriptionEditorProvider = ({
  language,
  supabaseText,
  children,
}: PropsWithChildren<ITranscriptionEditorProviderProps>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParamsText = searchParams?.get("text") as string;

  const initialText = supabaseText?.text || queryParamsText || "";

  const [inputText, setInputText] = useState(initialText);
  const [result, setResult] = useState<Result>(Template.Result);

  const changeLanguage = (language: Languages) => {
    router.push(`/transcription/${language}?text=${inputText}`);
  };

  return (
    <TranscriptionEditorContext.Provider
      value={{
        inputText,
        setInputText,
        result,
        setResult,
        language,
        changeLanguage,
      }}
    >
      {children}
    </TranscriptionEditorContext.Provider>
  );
};

export default TranscriptionEditorProvider;

export const useTranscriptionEditorContext = () => {
  const context = useContext(TranscriptionEditorContext);
  if (context === null) {
    throw new Error(
      `useTranscriptionEditor must be used within a TranscriptionEditorContextProvider.`
    );
  }
  return context;
};
