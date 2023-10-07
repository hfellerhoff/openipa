import dayjs from "dayjs";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface TranslationQuota {
  count: number;
  limit: number;
  resetOn: string;
}

type QuotaKey = keyof Omit<QuotaStore, "updateQuota" | "resetQuota">;
interface QuotaStore {
  translation: TranslationQuota;
  updateQuota: (name: QuotaKey, count?: number) => void;
  resetQuota: (name: QuotaKey) => void;
}

type QuotaStorePersist = (
  config: StateCreator<QuotaStore>,
  options: PersistOptions<QuotaStore>
) => StateCreator<QuotaStore>;

export const useQuotaStore = create<QuotaStore>(
  (persist as unknown as QuotaStorePersist)(
    (set) => ({
      translation: {
        count: 0,
        limit: 3,
        resetOn: dayjs().add(1, "week").toISOString(),
      },
      updateQuota: (name, count = 1) =>
        set((store) => ({
          ...store,
          [name]: {
            ...store[name],
            count: store[name].count + count,
          },
        })),
      resetQuota: (name) =>
        set((store) => ({
          ...store,
          [name]: {
            ...store[name],
            count: 0,
            resetOn: dayjs().add(1, "month").toISOString(),
          },
        })),
    }),
    {
      name: "@openipa/storage/quota",
    }
  )
);
