import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseBrowserEnv } from "@/lib/env";
import {
  canUseRecruiterEmail,
  homeForRole,
  normalizeUserRole,
} from "@/lib/auth/roles";

export async function GET(request: NextRequest) {
  const env = getSupabaseBrowserEnv();
  const pendingRole = normalizeUserRole(
    request.cookies.get("proofstack_pending_role")?.value ?? null,
  );
  const pendingMode = request.cookies.get("proofstack_pending_mode")?.value;
  const requestedNext = request.nextUrl.searchParams.get("next");
  const safeNext = requestedNext?.startsWith("/")
    ? requestedNext
    : homeForRole(pendingRole);

  if (!env) {
    const url = new URL("/auth/sign-in", request.url);
    url.searchParams.set("error", "Supabase is not configured yet.");

    return NextResponse.redirect(url);
  }

  const code = request.nextUrl.searchParams.get("code");
  const response = NextResponse.redirect(new URL(safeNext, request.url));

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    if (pendingMode === "sign-up" && pendingRole === "recruiter") {
      if (!canUseRecruiterEmail(user.email)) {
        const url = new URL("/auth/sign-up", request.url);
        url.searchParams.set("error", "Recruiters need to use a work email address.");

        response.cookies.delete("proofstack_pending_role");
        response.cookies.delete("proofstack_pending_mode");

        return NextResponse.redirect(url);
      }
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name, avatar_url, github_username")
      .eq("id", user.id)
      .maybeSingle();

    const shouldSetPendingRole = !profile || pendingMode === "sign-up";

    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        role: shouldSetPendingRole ? pendingRole : normalizeUserRole(profile?.role),
        full_name:
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          profile?.full_name ??
          null,
        avatar_url: user.user_metadata?.avatar_url ?? profile?.avatar_url ?? null,
        github_username: user.user_metadata?.user_name ?? profile?.github_username ?? null,
      },
      { onConflict: "id" },
    );
  }

  response.cookies.delete("proofstack_pending_role");
  response.cookies.delete("proofstack_pending_mode");

  return response;
}
