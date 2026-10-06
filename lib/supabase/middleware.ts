import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseBrowserEnv } from "@/lib/env";
import { homeForRole, isProtectedSurface } from "@/lib/auth/roles";

function redirectToSignIn(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/sign-in";
  url.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  const env = getSupabaseBrowserEnv();
  const protectedRole = isProtectedSurface(request.nextUrl.pathname);

  if (!env) {
    return NextResponse.next({ request });
  }

  const response = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (protectedRole && !user) {
    return redirectToSignIn(request);
  }

  if (!user) {
    return response;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const resolvedHome = homeForRole(profile?.role);

  if (request.nextUrl.pathname.startsWith("/auth/")) {
    const url = request.nextUrl.clone();
    url.pathname = resolvedHome;
    url.search = "";

    return NextResponse.redirect(url);
  }

  if (protectedRole && protectedRole !== profile?.role) {
    const url = request.nextUrl.clone();
    url.pathname = resolvedHome;
    url.search = "";

    return NextResponse.redirect(url);
  }

  return response;
}
