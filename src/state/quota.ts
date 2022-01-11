import dayjs from 'dayjs';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Quota {
  count: number;
  limit: number;
  resetOn: string;
}

type QuotaKey = keyof Omit<QuotaStore, 'updateQuota' | 'resetQuota'>;
interface QuotaStore {
  translation: Quota;
  updateQuota: (name: QuotaKey, count?: number) => void;
  resetQuota: (name: QuotaKey) => void;
}

export const useQuotaStore = create<QuotaStore>(
  persist(
    (set, get) => ({
      translation: {
        count: 0,
        limit: 3,
        resetOn: dayjs().add(1, 'week').toISOString(),
      },
      updateQuota: (name: QuotaKey, count: number = 1) =>
        set((store) => ({
          ...store,
          [name]: {
            ...store[name],
            count: store[name].count + count,
          },
        })),
      resetQuota: (name: QuotaKey) =>
        set((store) => ({
          ...store,
          [name]: {
            ...store[name],
            count: 0,
            resetOn: dayjs().add(1, 'month').toISOString(),
          },
        })),
    }),
    {
      name: '@openipa/storage/quota',
      //   storage: sessionStorage, // (optional) default is 'localStorage'
    }
  )
);
