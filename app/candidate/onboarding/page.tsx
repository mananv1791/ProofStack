import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function CandidateOnboardingPage() {
  return (
    <SurfacePage
      description="The first-run wizard captures target role, seniority, location, and remote preference before artifact upload."
      eyebrow="Candidate onboarding"
      title="A 90-second setup before the proof starts."
    >
      <StatusList
        items={[
          { label: "Target role", meta: "Full-stack, backend, frontend, mobile, design, or PM", status: "step 1" },
          { label: "Seniority", meta: "Junior through principal", status: "step 2" },
          { label: "Location preference", meta: "Onsite, hybrid, remote, or any", status: "step 3" },
        ]}
        title="Wizard steps"
      />
    </SurfacePage>
  );
}
