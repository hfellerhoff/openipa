import create from 'zustand';

import { Languages } from '../constants/Interfaces';

export type TranscriptionOption<T> = {
  label: string;
  value: T;
};

// ===== GLOBAL OPTIONS =====

export type GlobalTranscriptionOptions = {
  shouldHideOriginalText: TranscriptionOption<boolean>;
};
const defaultGlobalEditorOptions: GlobalTranscriptionOptions = {
  shouldHideOriginalText: {
    label: 'Hide Original Text',
    value: false,
  },
};

// ===== LATIN OPTIONS =====

export type LatinTranscriptionOptions = {};
const defaultLatinEditorOptions: LatinTranscriptionOptions = {};

// ===== FRENCH OPTIONS =====

export type FrenchTranscriptionOptions = {
  shouldAnalyzeElision: TranscriptionOption<boolean>;
  shouldAnalyzeLiason: TranscriptionOption<boolean>;
};
const defaultFrenchEditorOptions: FrenchTranscriptionOptions = {
  shouldAnalyzeElision: {
    label: 'Analyze Elision',
    value: true,
  },
  shouldAnalyzeLiason: {
    label: 'Analyze Liason',
    value: true,
  },
};

// ===== FULL OPTION TYPES =====

export type FullTranscriptionOptions<T> = GlobalTranscriptionOptions & T;
type FullTranscriptionOptionsComposed = {
  [Languages.Latin]: FullTranscriptionOptions<LatinTranscriptionOptions>;
  [Languages.French]: FullTranscriptionOptions<FrenchTranscriptionOptions>;
};

// ===== STORE =====

interface EditorStore {
  isEditing: boolean;
  toggleIsEditing: () => void;
  options: FullTranscriptionOptionsComposed;
  handleSetOption: (
    language: Languages,
    option: string
  ) => (value: any) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  isEditing: false,
  toggleIsEditing: () => {
    set((store) => ({
      ...store,
      isEditing: !store.isEditing,
    }));
  },
  options: {
    [Languages.Latin]: {
      ...defaultLatinEditorOptions,
      ...defaultGlobalEditorOptions,
    },
    [Languages.French]: {
      ...defaultFrenchEditorOptions,
      ...defaultGlobalEditorOptions,
    },
  },
  handleSetOption: (language, option) => (value) => {
    set((store) => ({
      ...store,
      options: {
        ...store.options,
        [language]: {
          ...store.options[language],
          [option]: {
            ...store.options[language][option],
            value,
          },
        },
      },
    }));
  },
}));
