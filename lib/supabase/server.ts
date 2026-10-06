import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseBrowserEnv } from "@/lib/env";

export function createSupabaseServerClient() {
  const env = getSupabaseBrowserEnv();

  if (!env) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server Components cannot write cookies; Server Actions and Route Handlers can.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // Server Components cannot write cookies; Server Actions and Route Handlers can.
        }
      },
    },
  });
}
