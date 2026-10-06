import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { ProofStackHome } from "@/components/marketing/home-client";

export const metadata: Metadata = {
  title: "Hire on proof of work",
  description:
    "ProofStack turns real artifacts into adaptive interviews and evidence-backed talent dossiers.",
};

export default function Home() {
  return (
    <MarketingShell>
      <ProofStackHome />
    </MarketingShell>
  );
}
