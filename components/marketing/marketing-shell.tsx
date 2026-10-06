import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  GitBranch,
  LockKeyhole,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/for-candidates", label: "Candidates" },
  { href: "/for-recruiters", label: "Recruiters" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
  { href: "/manifesto", label: "Manifesto" },
];

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/demo", label: "Demo dossier" },
      { href: "/for-candidates", label: "Candidate app" },
      { href: "/for-recruiters", label: "Recruiter app" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/blog", label: "Blog" },
      { href: "/waitlist", label: "Waitlist" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <Link className="group flex items-center gap-2 font-mono text-sm font-semibold" href="/">
            <span className="grid size-9 place-items-center rounded-md bg-foreground text-background transition-transform group-hover:-rotate-6">
              <FileSearch className="size-4" />
            </span>
            ProofStack
          </Link>

          <nav className="hidden items-center rounded-full border border-border bg-card px-2 py-1 text-sm text-muted-foreground lg:flex">
            {navItems.map((item) => (
              <Link
                className="rounded-full px-4 py-2 transition-colors hover:bg-muted hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex" size="sm" variant="ghost">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/sign-up">
                Join beta
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div>
            <Link className="flex items-center gap-2 font-mono text-sm font-semibold" href="/">
              <span className="grid size-9 place-items-center rounded-md bg-background text-foreground">
                <FileSearch className="size-4" />
              </span>
              ProofStack
            </Link>
            <h2 className="mt-8 max-w-xl text-4xl font-semibold tracking-normal md:text-5xl">
              The resume is dead. Hire on proof of work.
            </h2>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                { icon: GitBranch, label: "Artifact graph" },
                { icon: MessageSquareText, label: "Interview engine" },
                { icon: LockKeyhole, label: "Candidate-owned" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div className="border border-background/15 p-3" key={item.label}>
                    <Icon className="size-4 text-secondary" />
                    <p className="mt-3 text-sm text-background/75">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-xs uppercase text-secondary">{group.title}</p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-background/70">
                  {group.links.map((link) => (
                    <Link className="hover:text-background" href={link.href} key={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-background/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>ProofStack private beta</span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-3 text-secondary" />
              Built for evidence-backed hiring
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
