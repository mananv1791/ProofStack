import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function FeatureFlagsPage() {
  return (
    <SurfacePage
      description="Feature flags and killswitches control risky AI, ingestion, billing, and messaging surfaces."
      eyebrow="Feature flags"
      title="Ship carefully and turn off sharp edges fast."
    >
      <StatusList
        items={[
          { label: "artifact_ingestion", meta: "Global AI ingestion pipeline", status: "on" },
          { label: "interview_streaming", meta: "Candidate AI interview endpoint", status: "off" },
          { label: "recruiter_search", meta: "Vector-backed candidate search", status: "beta" },
        ]}
        title="Flags"
      />
    </SurfacePage>
  );
}
