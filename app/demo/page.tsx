import type { Metadata } from "next";
import {
  Bot,
  CheckCircle2,
  ExternalLink,
  FileCode2,
  FileSearch,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Demo dossier",
  description: "Explore a sample ProofStack talent dossier.",
};

const dimensions = [
  ["System architecture", 91, "trade-off reasoning"],
  ["Edge-case handling", 82, "failure paths"],
  ["Execution craft", 88, "tests and boundaries"],
  ["Communication clarity", 84, "structured answers"],
  ["Product sense", 86, "user impact"],
] as const;

const highlights = [
  {
    tag: "excellent trade-off",
    text: "Chose eventual consistency for cursor presence but strict server confirmation for document mutations.",
  },
  {
    tag: "strong reasoning",
    text: "Separated infrastructure risk from product risk when asked what breaks at 10x tenant growth.",
  },
  {
    tag: "concern",
    text: "Observability answer named the right metrics, but did not cite a production dashboard from the artifact.",
  },
];

export default function DemoPage() {
  return (
    <MarketingShell>
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_420px] lg:px-8">
            <div>
              <Badge variant="outline">Demo dossier</Badge>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                Priya Raman, senior full-stack engineer
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                A sample proof packet generated from a realtime collaboration
                repo and an artifact-grounded technical interview.
              </p>
            </div>
            <div className="clip-corner border border-foreground bg-background p-5 shadow-[10px_10px_0_rgb(var(--foreground))]">
              <p className="font-mono text-xs uppercase text-primary">Recommendation</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-6xl font-semibold tracking-normal">86</p>
                  <p className="mt-2 text-sm text-muted-foreground">Overall proof score</p>
                </div>
                <Badge variant="secondary">Hire</Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 lg:grid-cols-[1fr_380px] lg:px-8">
          <div className="space-y-4">
            <Card className="border-border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode2 className="size-5 text-primary" />
                  Artifact reviewed
                </CardTitle>
                <CardDescription>
                  GitHub repo · 87 files · TypeScript · Supabase realtime
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-[180px_1fr]">
                <div className="rounded-md border border-border bg-muted/40 p-3 font-mono text-xs">
                  <p>app/editor.tsx</p>
                  <p>lib/sync-engine.ts</p>
                  <p>lib/use-presence.ts</p>
                  <p>supabase/rls.sql</p>
                </div>
                <div className="rounded-md border border-border bg-foreground p-4 text-background">
                  <p className="font-mono text-xs uppercase text-secondary">Retrieved context</p>
                  <p className="mt-3 text-sm leading-6 text-background/75">
                    Optimistic operation replay, reconnect conflict handling,
                    tenant-scoped row-level security, and missing observability
                    dashboard evidence.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareText className="size-5 text-primary" />
                  Transcript highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                {highlights.map((highlight) => (
                  <div className="rounded-md border border-border bg-background p-4" key={highlight.tag}>
                    <Badge variant="outline">{highlight.tag}</Badge>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{highlight.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="size-5 text-primary" />
                  Interview trace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["03:28", "Question anchored to sync-engine.ts"],
                  ["07:14", "Follow-up asked after shallow reconnect answer"],
                  ["12:42", "Concern logged for observability gap"],
                  ["18:07", "Interview complete, dossier queued"],
                ].map(([time, text]) => (
                  <div className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-md border border-border bg-background p-3" key={time}>
                    <span className="font-mono text-sm text-primary">{time}</span>
                    <span className="text-sm">{text}</span>
                    <CheckCircle2 className="size-4 text-accent" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="border-border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSearch className="size-5 text-primary" />
                  Dimension scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dimensions.map(([label, score, detail]) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                      <span>{label}</span>
                      <span className="font-mono">{score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${score}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-foreground text-background shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-secondary" />
                  Audit result
                </CardTitle>
                <CardDescription className="text-background/65">
                  Every scored dimension has at least one artifact or transcript citation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-background text-foreground hover:bg-background/80">
                  Open evidence links
                  <ExternalLink className="size-4" />
                </Button>
              </CardContent>
            </Card>
          </aside>
        </section>
      </main>
    </MarketingShell>
  );
}
