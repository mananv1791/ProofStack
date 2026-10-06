import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Gauge,
  Sparkles,
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

type Feature = {
  title: string;
  description: string;
};

type MarketingPageProps = {
  badge: string;
  ctaHref?: string;
  ctaLabel?: string;
  description: string;
  features: Feature[];
  title: string;
};

export function MarketingPage({
  badge,
  ctaHref = "/auth/sign-up",
  ctaLabel = "Join beta",
  description,
  features,
  title,
}: MarketingPageProps) {
  return (
    <MarketingShell>
      <main>
        <section className="proof-grid border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8">
            <div>
              <Badge variant="outline">{badge}</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                {description}
              </p>
              <Button asChild className="mt-8" size="lg">
                <Link href={ctaHref}>
                  {ctaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="clip-corner border border-foreground bg-background shadow-[10px_10px_0_rgb(var(--foreground))]">
              <div className="flex items-center justify-between border-b border-border bg-foreground px-4 py-3 text-background">
                <div className="flex items-center gap-2 font-mono text-xs uppercase">
                  <FileSearch className="size-4 text-secondary" />
                  Dossier module
                </div>
                <Gauge className="size-4 text-secondary" />
              </div>
              <div className="space-y-3 p-4">
                {features.slice(0, 3).map((feature, index) => (
                  <div className="rounded-md border border-border bg-card p-4" key={feature.title}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-xs text-primary">
                        {(index + 1).toString().padStart(2, "0")}
                      </p>
                      <CheckCircle2 className="size-4 text-accent" />
                    </div>
                    <h2 className="mt-3 text-sm font-semibold tracking-normal">
                      {feature.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Card className="border-border shadow-none" key={feature.title}>
                <CardHeader>
                  <div className="mb-3 grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
                    <Sparkles className="size-4" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-mono text-xs uppercase text-primary">
                    Evidence-backed
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
