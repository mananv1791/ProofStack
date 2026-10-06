"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAppUrl } from "@/lib/env";
import {
  canUseRecruiterEmail,
  homeForRole,
  normalizeUserRole,
  type UserRole,
} from "@/lib/auth/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const emailSchema = z.string().trim().email();

function authError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function authNotice(path: string, message: string): never {
  redirect(`${path}?notice=${encodeURIComponent(message)}`);
}

function getRedirectUrl(role: UserRole, nextPath?: string | null) {
  const requestHeaders = headers();
  const appUrl = getAppUrl(requestHeaders);
  const safeNext = nextPath?.startsWith("/") ? nextPath : homeForRole(role);

  return `${appUrl}/auth/callback?next=${encodeURIComponent(safeNext)}`;
}

function rememberPendingRole(role: UserRole, mode: "sign-in" | "sign-up") {
  cookies().set("proofstack_pending_role", role, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  cookies().set("proofstack_pending_mode", mode, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function signInWithGithub(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const role = normalizeUserRole(formData.get("role"));
  const nextPath = formData.get("next")?.toString();
  const mode = formData.get("mode") === "sign-up" ? "sign-up" : "sign-in";

  if (!supabase) {
    authError("/auth/sign-in", "Supabase is not configured yet.");
  }

  rememberPendingRole(role, mode);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: getRedirectUrl(role, nextPath),
      scopes: "read:user user:email",
    },
  });

  if (error || !data.url) {
    authError("/auth/sign-in", error?.message ?? "Could not start GitHub sign-in.");
  }

  redirect(data.url);
}

export async function sendMagicLink(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const role = normalizeUserRole(formData.get("role"));
  const nextPath = formData.get("next")?.toString();
  const emailResult = emailSchema.safeParse(formData.get("email"));
  const mode = formData.get("mode") === "sign-up" ? "sign-up" : "sign-in";
  const authPath = mode === "sign-up" ? "/auth/sign-up" : "/auth/sign-in";

  if (!emailResult.success) {
    authError(authPath, "Enter a valid email address.");
  }

  const email = emailResult.data;

  if (role === "recruiter" && !canUseRecruiterEmail(email)) {
    authError(authPath, "Recruiters need to use a work email address.");
  }

  if (!supabase) {
    authError(authPath, "Supabase is not configured yet.");
  }

  rememberPendingRole(role, mode);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getRedirectUrl(role, nextPath),
      data: { role },
      shouldCreateUser: true,
    },
  });

  if (error) {
    authError(authPath, error.message);
  }

  authNotice(
    "/auth/sign-in",
    "Check your email for a secure ProofStack sign-in link.",
  );
}

export async function signOut() {
  const supabase = createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}
