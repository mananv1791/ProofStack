import { AppShell } from "@/components/app-shell/app-shell";
import { candidateNav } from "@/lib/navigation";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell eyebrow="Candidate app" navItems={candidateNav} title="Candidate workspace">
      {children}
    </AppShell>
  );
}
