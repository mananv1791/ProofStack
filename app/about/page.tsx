import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/marketing-page";

export const metadata: Metadata = {
  title: "About",
  description: "ProofStack mission and operating thesis.",
};

export default function AboutPage() {
  return (
    <MarketingPage
      badge="Mission"
      ctaHref="/waitlist"
      ctaLabel="Join waitlist"
      description="ProofStack exists to make hiring look at the work itself: the code, product judgment, design systems, operational trade-offs, and communication that credentials flatten."
      features={[
        {
          title: "Candidate-owned signal",
          description: "Dossiers travel with candidates instead of staying trapped inside one application funnel.",
        },
        {
          title: "Evidence over theater",
          description: "Every assessment point should cite artifacts or transcript moments.",
        },
        {
          title: "Designed for calibration",
          description: "Human review loops and outcome data improve the rubric over time.",
        },
      ]}
      title="We are replacing resume theater with work that can be inspected."
    />
  );
}
