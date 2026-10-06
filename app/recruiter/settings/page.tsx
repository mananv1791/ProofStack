import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterSettingsPage() {
  return (
    <SurfacePage
      description="Recruiter profile, company, notifications, ATS handoff, and account controls."
      eyebrow="Settings"
      title="Keep recruiter workflow settings predictable."
    >
      <StatusList
        items={[
          { label: "Profile", meta: "Name, title, avatar", status: "editable" },
          { label: "Company", meta: "Domain, logo, verification state", status: "verified later" },
          { label: "Alerts", meta: "Saved searches and role matches", status: "weekly" },
        ]}
        title="Settings groups"
      />
    </SurfacePage>
  );
}
