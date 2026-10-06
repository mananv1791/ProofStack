import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function AdminUsersPage() {
  return (
    <SurfacePage
      description="Search, filter, warn, suspend, ban, and impersonate with every action written to audit_log."
      eyebrow="User management"
      title="Manage users without losing auditability."
    >
      <StatusList
        items={[
          { label: "Priya Raman", meta: "Candidate · public dossier", status: "active" },
          { label: "Marcus Lee", meta: "Recruiter · Northstar Labs", status: "active" },
          { label: "Unknown actor", meta: "Repeated failed auth attempts", status: "review" },
        ]}
        title="User queue"
      />
    </SurfacePage>
  );
}
