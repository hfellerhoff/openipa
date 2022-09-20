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

export type LatinTranscriptionOptions = Record<never, unknown>;
export type LatinTranscriptionOptionKeys =
  keyof FullTranscriptionOptions<LatinTranscriptionOptions>;

const defaultLatinEditorOptions: LatinTranscriptionOptions = {};

// ===== FRENCH OPTIONS =====

export type FrenchTranscriptionOptions = {
  shouldAnalyzeElision: TranscriptionOption<boolean>;
  shouldAnalyzeLiason: TranscriptionOption<boolean>;
};
export type FrenchTranscriptionOptionKeys =
  keyof FullTranscriptionOptions<FrenchTranscriptionOptions>;

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
  handleSetLatinOption: (
    option: LatinTranscriptionOptionKeys
  ) => (value: boolean) => void;
  handleSetFrenchOption: (
    option: FrenchTranscriptionOptionKeys
  ) => (value: boolean) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
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
  handleSetLatinOption: (option) => (value) => {
    set((store) => ({
      ...store,
      options: {
        ...store.options,
        [Languages.Latin]: {
          ...store.options[Languages.Latin],
          [option]: {
            ...store.options[Languages.Latin][option],
            value,
          },
        },
      },
    }));
  },
  handleSetFrenchOption: (option) => (value) => {
    set((store) => ({
      ...store,
      options: {
        ...store.options,
        [Languages.French]: {
          ...store.options[Languages.French],
          [option]: {
            ...store.options[Languages.French][option],
            value,
          },
        },
      },
    }));
  },
}));
