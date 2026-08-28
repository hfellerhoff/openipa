"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  PropsWithChildren,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { Languages, Result } from "../../constants/Interfaces";
import Template from "../../constants/Template";

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
  initialText?: string;
}
const TranscriptionEditorProvider = ({
  language,
  initialText = "",
  children,
}: PropsWithChildren<ITranscriptionEditorProviderProps>) => {
  const router = useRouter();

  const [inputText, setInputText] = useState(initialText);
  const [result, setResult] = useState<Result>(Template.Result);

  useEffect(() => {
    if (initialText) return;

    const queryText = new URLSearchParams(window.location.search).get("text");
    if (!queryText) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setInputText(queryText);
    });

    return () => {
      cancelled = true;
    };
  }, [initialText]);

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
      `useTranscriptionEditor must be used within a TranscriptionEditorContextProvider.`,
    );
  }
  return context;
};
