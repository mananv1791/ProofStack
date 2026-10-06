import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/marketing-page";

export const metadata: Metadata = {
  title: "For candidates",
  description: "Turn real work into a portable ProofStack dossier.",
};

export default function ForCandidatesPage() {
  return (
    <MarketingPage
      badge="Candidate app"
      ctaLabel="Get discovered"
      description="Upload the projects you are proud of, answer artifact-grounded questions once, and carry the dossier into every hiring conversation."
      features={[
        {
          title: "Proof beats pedigree",
          description: "GitHub repos, Figma systems, shipped apps, and case studies become the first signal.",
        },
        {
          title: "One interview, reusable dossier",
          description: "The AI interviewer asks about decisions you actually made, then packages the evidence.",
        },
        {
          title: "Visibility controls",
          description: "Keep your dossier private, recruiter-only, or shareable through a public link.",
        },
      ]}
      title="Your best work should get you the interview."
    />
  );
}
