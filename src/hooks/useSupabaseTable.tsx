import { useEffect, useState } from 'react';

import supabase from '../lib/supabase';

export interface Dictionary<T> {
  [id: number]: T;
}

const useSupabaseTable = <T,>(table: string, primaryKeyColumn = 'id') => {
  const [dictionary, setDictionary] = useState<Dictionary<T>>({});

  useEffect(() => {
    // Fetch the table data initially
    const fetchTable = async () => {
      const { data, error } = await supabase
        .from<T>(table)
        .select('*')
        .order(primaryKeyColumn as keyof T, { ascending: true });
      if (error) console.log('error', error);
      else {
        const updatedDictionary = {};
        data.forEach((element) => {
          updatedDictionary[element[primaryKeyColumn]] = element;
        });

        setDictionary(updatedDictionary);
      }
    };

    fetchTable();

    // Subscribe to future table changes
    const subscription = supabase
      .from(table)
      .on('*', (payload) => {
        switch (payload.eventType) {
          case 'INSERT':
          case 'UPDATE':
            setDictionary((d) => {
              return {
                ...d,
                [payload.new[primaryKeyColumn]]: payload.new,
              };
            });
            return;
          case 'DELETE':
            setDictionary((d) => {
              delete d[payload.old[primaryKeyColumn]];
              return { ...d };
            });
            return;
        }
      })
      .subscribe();

    // Unsubscribe from changes when component is destroyed
    return () => {
      subscription.unsubscribe();
    };
  }, [table, primaryKeyColumn]);

  return dictionary;
};

export default useSupabaseTable;
