import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from "next/headers";
import {Database} from '@/index';


export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export type ServerClient = SupabaseClient<Database, "public", Database["public"]>;

let supabaseClient: ServerClient | null = null;

export const getDBClient = async () =>
{
    if ( !supabaseClient )
    {
        const cookieStore = await cookies();
        supabaseClient = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll ()
                    {
                        return cookieStore.getAll();
                    },
                    setAll ( cookiesToSet )
                    {
                        try
                        {
                            cookiesToSet.forEach( ( { name, value, options } ) =>
                                cookieStore.set( name, value, options )
                            );
                        } catch
                        {
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            }
        );
    }

    return supabaseClient;
};

