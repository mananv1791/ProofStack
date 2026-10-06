export const userRoles = ["candidate", "recruiter", "admin"] as const;

export type UserRole = (typeof userRoles)[number];

export const roleHome: Record<UserRole, string> = {
  candidate: "/candidate/dashboard",
  recruiter: "/recruiter/dashboard",
  admin: "/admin/dashboard",
};

export const roleLabels: Record<UserRole, string> = {
  candidate: "Candidate",
  recruiter: "Recruiter",
  admin: "Admin",
};

const personalEmailDomains = new Set([
  "aol.com",
  "gmail.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "me.com",
  "msn.com",
  "outlook.com",
  "proton.me",
  "protonmail.com",
  "yahoo.com",
]);

export function normalizeUserRole(value: FormDataEntryValue | string | null) {
  return userRoles.includes(value as UserRole) ? (value as UserRole) : "candidate";
}

export function homeForRole(role: string | null | undefined) {
  return roleHome[normalizeUserRole(role ?? null)];
}

export function canUseRecruiterEmail(email: string) {
  const domain = email.toLowerCase().split("@").at(1);

  return Boolean(domain && !personalEmailDomains.has(domain));
}

export function isProtectedSurface(pathname: string) {
  if (pathname.startsWith("/candidate")) {
    return "candidate";
  }

  if (pathname.startsWith("/recruiter")) {
    return "recruiter";
  }

  if (pathname.startsWith("/admin")) {
    return "admin";
  }

  return null;
}
