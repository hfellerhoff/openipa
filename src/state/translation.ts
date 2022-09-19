import create from 'zustand';

interface TranslationStore {
  translations: {
    [language: string]: Map<string, string>;
  };
  addTranslation: (
    language: string,
    original: string,
    translation: string
  ) => void;
  getTranslation: (language: string, original: string) => string | null;
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  translations: {},
  addTranslation: (language: string, original: string, translation: string) =>
    set((state) => {
      if (!state.translations[language]) {
        state.translations[language] = new Map();
      }

      state.translations[language].set(original, translation);
      return { ...state, translations: state.translations };
    }),
  getTranslation: (language: string, original: string) => {
    const store = get();
    return store.translations[language].get(original) || null;
  },
}));
