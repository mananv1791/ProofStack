import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function AuditLogPage() {
  return (
    <SurfacePage
      description="Every admin moderation, impersonation, suspension, and feature-flag action is immutable and searchable."
      eyebrow="Audit log"
      title="Trust operations need a permanent trail."
    >
      <StatusList
        items={[
          { label: "flag.resolved", meta: "Admin · moderation target", status: "2m ago" },
          { label: "user.warned", meta: "Recruiter response-rate warning", status: "1h ago" },
          { label: "feature_flag.updated", meta: "interview_streaming disabled", status: "1d ago" },
        ]}
        title="Recent audit events"
      />
    </SurfacePage>
  );
}
