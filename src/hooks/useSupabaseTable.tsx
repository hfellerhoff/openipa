import { useEffect, useState } from "react";

import supabase from "../lib/supabase";
import {
  DatabaseRowFromTableName,
  DatabaseTableName,
} from "../lib/supabase/types";

export interface Dictionary<T> {
  [id: number]: T;
}

const useSupabaseTable = <T extends DatabaseTableName>(table: T) => {
  const [dictionary, setDictionary] = useState<
    Dictionary<DatabaseRowFromTableName<T>>
  >({});

  useEffect(() => {
    // Fetch the table data initially
    const fetchTable = async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("id", { ascending: true });

      if (error) console.log("error", error);
      else {
        const rows = data as unknown as DatabaseRowFromTableName<T>[];
        const updatedDictionary = rows.reduce(
          (dict, element) => {
            if ("id" in element && typeof element.id === "number") {
              dict[element.id] = element;
            }
            return dict;
          },
          {} as typeof dictionary,
        );

        setDictionary(updatedDictionary);
      }
    };

    fetchTable();

    // Subscribe to future table changes
    const channel = supabase
      .channel(`public:${table}:${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
            case "UPDATE":
              setDictionary((d) => {
                return {
                  ...d,
                  [parseInt(payload.new["id"])]:
                    payload.new as (typeof dictionary)[keyof typeof dictionary],
                };
              });
              return;
            case "DELETE":
              setDictionary((d) => {
                delete d[payload.old["id"]];
                return { ...d };
              });
              return;
          }
        },
      )
      .subscribe();

    // Unsubscribe from changes when component is destroyed
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [table]);

  return dictionary;
};

export default useSupabaseTable;
