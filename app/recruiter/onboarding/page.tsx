import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterOnboardingPage() {
  return (
    <SurfacePage
      description="Recruiter accounts are verified through work email, company domain checks, and optional manual review."
      eyebrow="Company verification"
      title="Trust starts before dossier search opens."
    >
      <StatusList
        items={[
          { label: "Work email", meta: "Personal domains are blocked at sign-up", status: "required" },
          { label: "Company domain", meta: "Matches recruiter seat to company record", status: "required" },
          { label: "Manual review", meta: "Fallback for common or ambiguous domains", status: "optional" },
        ]}
        title="Verification checks"
      />
    </SurfacePage>
  );
}
