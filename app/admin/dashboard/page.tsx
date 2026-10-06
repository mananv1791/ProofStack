import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function AdminDashboardPage() {
  return (
    <SurfacePage
      description="Founding operators can monitor conversion, moderation, recruiter behavior, AI quality, and revenue signals."
      eyebrow="Admin dashboard"
      metrics={[
        { label: "DAU", value: "42" },
        { label: "Interviews completed", value: "18" },
        { label: "Dossiers generated", value: "16" },
        { label: "Hires reported", value: "1" },
      ]}
      title="Operate the marketplace with evidence and audit trails."
    >
      <StatusList
        items={[
          { label: "Moderation queue", meta: "Flagged artifacts and messages", status: "3 open" },
          { label: "AI quality sample", meta: "Weekly dossier calibration", status: "5 due" },
          { label: "Recruiter health", meta: "Response rate and ghosting", status: "92 avg" },
        ]}
        title="Operational queue"
      />
    </SurfacePage>
  );
}
