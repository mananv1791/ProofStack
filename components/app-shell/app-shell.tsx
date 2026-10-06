import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { NavItem } from "@/lib/navigation";

type AppShellProps = {
  children: React.ReactNode;
  eyebrow: string;
  navItems: NavItem[];
  title: string;
};

export function AppShell({ children, eyebrow, navItems, title }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-5">
            <Link href="/" className="font-mono text-sm font-semibold tracking-normal">
              ProofStack
            </Link>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="outline">{eyebrow}</Badge>
              <span className="text-xs text-muted-foreground">Milestone 0</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border p-3">
            <form action={signOut}>
              <Button className="w-full justify-start" size="sm" type="submit" variant="ghost">
                <LogOut className="size-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground">{eyebrow}</p>
              <h1 className="text-lg font-semibold tracking-normal">{title}</h1>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/demo">
                Demo dossier
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <Separator />
          <nav className="flex gap-1 overflow-x-auto px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="size-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
