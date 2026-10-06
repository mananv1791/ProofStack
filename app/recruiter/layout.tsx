import { AppShell } from "@/components/app-shell/app-shell";
import { recruiterNav } from "@/lib/navigation";

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell eyebrow="Recruiter app" navItems={recruiterNav} title="Recruiter workspace">
      {children}
    </AppShell>
  );
}
