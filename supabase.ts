export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			matches: {
				Row: {
					created_at: string;
					id: number;
					judge: string | null;
					result: string | null;
					sport: number | null;
					status: string;
					updated_at: string;
					user_1: string;
					user_2: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					judge?: string | null;
					result?: string | null;
					sport?: number | null;
					status: string;
					updated_at?: string;
					user_1: string;
					user_2: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					judge?: string | null;
					result?: string | null;
					sport?: number | null;
					status?: string;
					updated_at?: string;
					user_1?: string;
					user_2?: string;
				};
				Relationships: [
					{
						foreignKeyName: "matches_sport_fkey";
						columns: ["sport"];
						isOneToOne: false;
						referencedRelation: "sports";
						referencedColumns: ["id"];
					},
				];
			};
			scores: {
				Row: {
					created_at: string;
					id: number;
					score: number;
					sport: number;
					user: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					score: number;
					sport: number;
					user: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					score?: number;
					sport?: number;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: "scores_sport_fkey";
						columns: ["sport"];
						isOneToOne: false;
						referencedRelation: "sports";
						referencedColumns: ["id"];
					},
				];
			};
			scores_logs: {
				Row: {
					created_at: string;
					id: number;
					match: number;
					score: number;
					sport: number;
					user: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					match: number;
					score: number;
					sport: number;
					user: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					match?: number;
					score?: number;
					sport?: number;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: "scores_logs_match_fkey";
						columns: ["match"];
						isOneToOne: false;
						referencedRelation: "matches";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "scores_logs_score_fkey";
						columns: ["score"];
						isOneToOne: false;
						referencedRelation: "scores";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "scores_logs_sport_fkey";
						columns: ["sport"];
						isOneToOne: false;
						referencedRelation: "sports";
						referencedColumns: ["id"];
					},
				];
			};
			sports: {
				Row: {
					created_at: string;
					id: number;
					name: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					name: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			teams: {
				Row: {
					city: string;
					country: string;
					created_at: string;
					id: number;
					name: string;
				};
				Insert: {
					city: string;
					country: string;
					created_at?: string;
					id?: number;
					name: string;
				};
				Update: {
					city?: string;
					country?: string;
					created_at?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			user_sports: {
				Row: {
					created_at: string;
					id: number;
					sport: number;
					team: number;
					updated_at: string;
					user: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					sport: number;
					team: number;
					updated_at: string;
					user: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					sport?: number;
					team?: number;
					updated_at?: string;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_sports_sport_fkey";
						columns: ["sport"];
						isOneToOne: false;
						referencedRelation: "sports";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_sports_team_fkey";
						columns: ["team"];
						isOneToOne: false;
						referencedRelation: "teams";
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

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
