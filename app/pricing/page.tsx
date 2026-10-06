import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, Landmark, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ProofStack pricing for startup recruiting teams.",
};

const tiers = [
  {
    name: "Starter",
    price: "$299",
    unit: "seat / month",
    icon: CreditCard,
    intro: "For one recruiter replacing resume review with dossier review.",
    features: ["Up to 3 open roles", "1 recruiter seat", "Unlimited dossier views", "3 preview dossiers before billing"],
  },
  {
    name: "Growth",
    price: "$1,499",
    unit: "per hire",
    icon: Users,
    intro: "For hiring teams that want proof-based shortlists across roles.",
    features: ["Unlimited roles", "5 recruiter seats", "Greenhouse and Lever handoff", "Saved searches and alerts"],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "50+ hires / year",
    icon: Landmark,
    intro: "For larger teams with custom compliance and integration needs.",
    features: ["Unlimited seats", "SSO / SAML", "Custom ATS integration", "Dedicated calibration support"],
  },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <main>
        <section className="border-b border-border bg-foreground text-background">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1fr_380px] lg:px-8">
            <div>
              <Badge className="border-background/20 bg-background/10 text-background" variant="outline">
                Pricing
              </Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                Pay for evidence-backed recruiting, not application volume.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-background/70">
                Candidates are free forever. Recruiters pay for proof-based
                discovery, dossier review, and shortlist workflows once hiring
                starts moving.
              </p>
            </div>
            <div className="border border-background/15 bg-background/10 p-5">
              <p className="font-mono text-xs uppercase text-secondary">Beta billing guardrail</p>
              <p className="mt-4 text-3xl font-semibold">3 dossier previews</p>
              <p className="mt-3 text-sm leading-6 text-background/65">
                Recruiters can inspect a few proof packets before choosing a
                plan. Candidate contact still requires in-app messaging.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => {
              const Icon = tier.icon;

              return (
                <Card
                  className={tier.recommended ? "border-foreground bg-card shadow-[8px_8px_0_rgb(var(--foreground))]" : "border-border shadow-none"}
                  key={tier.name}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground">
                        <Icon className="size-5" />
                      </div>
                      {tier.recommended ? <Badge variant="secondary">Most popular</Badge> : null}
                    </div>
                    <CardTitle className="pt-5 text-2xl">{tier.name}</CardTitle>
                    <p className="text-sm leading-6 text-muted-foreground">{tier.intro}</p>
                    <div className="pt-4">
                      <span className="text-5xl font-semibold tracking-normal">{tier.price}</span>
                      <span className="ml-2 text-sm text-muted-foreground">{tier.unit}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-3">
                      {tier.features.map((feature) => (
                        <div className="flex items-center gap-2 text-sm" key={feature}>
                          <Check className="size-4 text-accent" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full" variant={tier.recommended ? "default" : "outline"}>
                      <Link href="/auth/sign-up">
                        Start beta access
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
