export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          chat_id: string | null
          content: string | null
          created_at: string
          id: string
          speaker: string | null
        }
        Insert: {
          chat_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          speaker?: string | null
        }
        Update: {
          chat_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          speaker?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_chat_logs_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          }
        ]
      }
      chats: {
        Row: {
          created_at: string
          id: string
          sub_goal_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          sub_goal_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          sub_goal_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_chats_sub_goal_id_fkey"
            columns: ["sub_goal_id"]
            isOneToOne: false
            referencedRelation: "sub_goals"
            referencedColumns: ["id"]
          }
        ]
      }
      goals: {
        Row: {
          created_at: string
          id: string
          is_achievement: boolean | null
          is_publish: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_achievement?: boolean | null
          is_publish?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_achievement?: boolean | null
          is_publish?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sub_goals: {
        Row: {
          content: string | null
          created_at: string
          goal_id: string | null
          id: string
          is_achievement: boolean | null
          is_final: boolean | null
          is_now: boolean | null
          is_pre: boolean | null
          level: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          goal_id?: string | null
          id?: string
          is_achievement?: boolean | null
          is_final?: boolean | null
          is_now?: boolean | null
          is_pre?: boolean | null
          level?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          goal_id?: string | null
          id?: string
          is_achievement?: boolean | null
          is_final?: boolean | null
          is_now?: boolean | null
          is_pre?: boolean | null
          level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_sub_goals_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          name: string | null
          user_level: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          user_level?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          user_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
