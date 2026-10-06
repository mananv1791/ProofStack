import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "ProofStack beta terms placeholder.",
};

export default function TermsPage() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <p className="font-mono text-xs uppercase text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal">Terms</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-muted-foreground">
          <p>
            ProofStack dossiers are decision-support signals, not automated
            hiring decisions. Employers remain responsible for fair, compliant
            recruiting practices.
          </p>
          <p>
            Candidates retain control over dossier visibility and may delete
            their account data according to the product&apos;s data deletion flow.
          </p>
          <p>
            This beta placeholder should be replaced with counsel-reviewed
            commercial terms before paid recruiter access opens.
          </p>
        </div>
      </main>
    </MarketingShell>
  );
}
