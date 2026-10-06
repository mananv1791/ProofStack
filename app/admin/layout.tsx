import { AppShell } from "@/components/app-shell/app-shell";
import { adminNav } from "@/lib/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell eyebrow="Admin console" navItems={adminNav} title="Platform operations">
      {children}
    </AppShell>
  );
}
