export type Json =
  string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
}
