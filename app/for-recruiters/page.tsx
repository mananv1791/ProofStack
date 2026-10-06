import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/marketing-page";

export const metadata: Metadata = {
  title: "For recruiters",
  description: "Shortlist candidates using evidence-backed dossiers.",
};

export default function ForRecruitersPage() {
  return (
    <MarketingPage
      badge="Recruiter app"
      ctaLabel="Hire on proof"
      description="Post roles, search by artifact evidence, review one-page dossiers, and move candidates through a focused shortlist workflow."
      features={[
        {
          title: "Role-to-artifact matching",
          description: "The role prompt is embedded against candidate work instead of resume keywords.",
        },
        {
          title: "Dossier previews",
          description: "See grounded scores, transcript highlights, strengths, concerns, and direct evidence links.",
        },
        {
          title: "Shortlist workflow",
          description: "Move candidates from reviewing to contacted, interviewing, offer, hired, or passed.",
        },
      ]}
      title="Find the top 10 percent before reading 300 resumes."
    />
  );
}
