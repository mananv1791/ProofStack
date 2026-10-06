import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "ProofStack privacy principles.",
};

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <p className="font-mono text-xs uppercase text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal">Privacy</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-muted-foreground">
          <p>
            ProofStack stores candidate profiles, submitted artifact metadata,
            interview transcripts, and dossier outputs to provide proof-of-work
            hiring workflows.
          </p>
          <p>
            Candidate email addresses are not exposed to recruiters until the
            candidate accepts a message. Public sharing is opt-in and can be
            revoked by the candidate.
          </p>
          <p>
            This placeholder will be replaced with counsel-reviewed GDPR, CCPA,
            deletion, export, and enterprise DPA language before launch.
          </p>
        </div>
      </main>
    </MarketingShell>
  );
}
