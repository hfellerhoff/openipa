export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "11.2.2 (f884da7)";
  };
  public: {
    Tables: {
      authors: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      ipa: {
        Row: {
          category: number | null;
          id: number;
          subcategory: number | null;
          symbol: string;
          tags: string[];
        };
        Insert: {
          category?: number | null;
          id?: number;
          subcategory?: number | null;
          symbol: string;
          tags?: string[];
        };
        Update: {
          category?: number | null;
          id?: number;
          subcategory?: number | null;
          symbol?: string;
          tags?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "ipa_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "ipa_category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ipa_subcategory_fkey";
            columns: ["subcategory"];
            isOneToOne: false;
            referencedRelation: "ipa_subcategory";
            referencedColumns: ["id"];
          },
        ];
      };
      ipa_category: {
        Row: {
          id: number;
          label: string;
          letters: string[];
        };
        Insert: {
          id?: number;
          label: string;
          letters?: string[];
        };
        Update: {
          id?: number;
          label?: string;
          letters?: string[];
        };
        Relationships: [];
      };
      ipa_subcategory: {
        Row: {
          category: number | null;
          id: number;
          label: string;
          letters: string[];
        };
        Insert: {
          category?: number | null;
          id?: number;
          label: string;
          letters?: string[];
        };
        Update: {
          category?: number | null;
          id?: number;
          label?: string;
          letters?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "ipa_subcategory_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "ipa_category";
            referencedColumns: ["id"];
          },
        ];
      };
      ipa_tags: {
        Row: {
          categories: number[] | null;
          id: number;
          label: string;
        };
        Insert: {
          categories?: number[] | null;
          id?: number;
          label: string;
        };
        Update: {
          categories?: number[] | null;
          id?: number;
          label?: string;
        };
        Relationships: [];
      };
      languages: {
        Row: {
          id: number;
          label: string;
          slug: string;
        };
        Insert: {
          id?: number;
          label: string;
          slug?: string;
        };
        Update: {
          id?: number;
          label?: string;
          slug?: string;
        };
        Relationships: [];
      };
      rules: {
        Row: {
          description: string;
          id: number;
          input: Json;
          language_id: number;
          output: number[];
        };
        Insert: {
          description?: string;
          id?: number;
          input?: Json;
          language_id: number;
          output?: number[];
        };
        Update: {
          description?: string;
          id?: number;
          input?: Json;
          language_id?: number;
          output?: number[];
        };
        Relationships: [
          {
            foreignKeyName: "rules_language_id_fkey";
            columns: ["language_id"];
            isOneToOne: false;
            referencedRelation: "languages";
            referencedColumns: ["id"];
          },
        ];
      };
      texts: {
        Row: {
          author: number;
          id: number;
          language: number;
          slug: string;
          source: string | null;
          text: string;
          title: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          author?: number;
          id?: number;
          language: number;
          slug: string;
          source?: string | null;
          text: string;
          title?: string;
          type?: string;
          updated_at?: string;
        };
        Update: {
          author?: number;
          id?: number;
          language?: number;
          slug?: string;
          source?: string | null;
          text?: string;
          title?: string;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "texts_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "authors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "texts_language_fkey";
            columns: ["language"];
            isOneToOne: false;
            referencedRelation: "languages";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
