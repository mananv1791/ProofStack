import {
  BadgeCheck,
  BarChart3,
  BellDot,
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  FileSearch,
  Flag,
  Gauge,
  Inbox,
  KanbanSquare,
  Landmark,
  MessageSquare,
  Search,
  Settings,
  SlidersHorizontal,
  UploadCloud,
  Users,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const candidateNav: NavItem[] = [
  { href: "/candidate/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/candidate/onboarding", label: "Onboarding", icon: ClipboardList },
  { href: "/candidate/upload", label: "Artifacts", icon: UploadCloud },
  { href: "/candidate/dossier", label: "Dossier", icon: FileSearch },
  { href: "/candidate/messages", label: "Messages", icon: Inbox },
  { href: "/candidate/roles", label: "Matched roles", icon: BriefcaseBusiness },
  { href: "/candidate/settings", label: "Settings", icon: Settings },
];

export const recruiterNav: NavItem[] = [
  { href: "/recruiter/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/recruiter/onboarding", label: "Verification", icon: BadgeCheck },
  { href: "/recruiter/roles", label: "Roles", icon: KanbanSquare },
  { href: "/recruiter/candidates", label: "Search", icon: Search },
  { href: "/recruiter/messages", label: "Messages", icon: MessageSquare },
  { href: "/recruiter/team", label: "Team", icon: Users },
  { href: "/recruiter/billing", label: "Billing", icon: CreditCard },
  { href: "/recruiter/settings", label: "Settings", icon: Settings },
];

export const adminNav: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/moderation", label: "Moderation", icon: Flag },
  { href: "/admin/recruiters/health", label: "Recruiter health", icon: BellDot },
  { href: "/admin/ai-quality", label: "AI quality", icon: WandSparkles },
  { href: "/admin/flags", label: "Feature flags", icon: SlidersHorizontal },
  { href: "/admin/audit-log", label: "Audit log", icon: Landmark },
];
