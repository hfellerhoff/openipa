export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      ipa: {
        Row: {
          category: number | null
          id: number
          subcategory: number | null
          symbol: string
          tags: string[]
        }
        Insert: {
          category?: number | null
          id?: number
          subcategory?: number | null
          symbol: string
          tags?: string[]
        }
        Update: {
          category?: number | null
          id?: number
          subcategory?: number | null
          symbol?: string
          tags?: string[]
        }
      }
      ipa_category: {
        Row: {
          id: number
          label: string
          letters: string[]
        }
        Insert: {
          id?: number
          label: string
          letters?: string[]
        }
        Update: {
          id?: number
          label?: string
          letters?: string[]
        }
      }
      ipa_subcategory: {
        Row: {
          category: number | null
          id: number
          label: string
          letters: string[]
        }
        Insert: {
          category?: number | null
          id?: number
          label: string
          letters?: string[]
        }
        Update: {
          category?: number | null
          id?: number
          label?: string
          letters?: string[]
        }
      }
      ipa_tags: {
        Row: {
          categories: number[] | null
          id: number
          label: string
        }
        Insert: {
          categories?: number[] | null
          id?: number
          label: string
        }
        Update: {
          categories?: number[] | null
          id?: number
          label?: string
        }
      }
      languages: {
        Row: {
          id: number
          label: string
          slug: string
        }
        Insert: {
          id?: number
          label: string
          slug?: string
        }
        Update: {
          id?: number
          label?: string
          slug?: string
        }
      }
      rules: {
        Row: {
          description: string
          id: number
          input: Json
          language_id: number
          output: number[]
        }
        Insert: {
          description?: string
          id?: number
          input?: Json
          language_id: number
          output?: number[]
        }
        Update: {
          description?: string
          id?: number
          input?: Json
          language_id?: number
          output?: number[]
        }
      }
      texts: {
        Row: {
          author: number
          id: number
          language: number
          slug: string
          source: string | null
          text: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          author?: number
          id?: number
          language: number
          slug: string
          source?: string | null
          text: string
          title?: string
          type?: string
          updated_at?: string
        }
        Update: {
          author?: number
          id?: number
          language?: number
          slug?: string
          source?: string | null
          text?: string
          title?: string
          type?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

