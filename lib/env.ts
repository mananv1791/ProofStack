export function getSupabaseBrowserEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function getSupabaseServiceEnv() {
  const browserEnv = getSupabaseBrowserEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!browserEnv || !serviceRoleKey) {
    return null;
  }

  return { ...browserEnv, serviceRoleKey };
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseBrowserEnv());
}

export function getAppUrl(requestHeaders?: Headers) {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  const host = requestHeaders?.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol = requestHeaders?.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
}
