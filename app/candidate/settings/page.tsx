import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function CandidateSettingsPage() {
  return (
    <SurfacePage
      description="Profile, notification, visibility, and account controls for the candidate-owned dossier."
      eyebrow="Settings"
      title="Keep your proof profile current."
    >
      <StatusList
        items={[
          { label: "Profile details", meta: "Name, headline, location, links", status: "editable" },
          { label: "Dossier visibility", meta: "Private, recruiter-only, or public", status: "private" },
          { label: "Notification digest", meta: "Weekly matched roles and recruiter views", status: "weekly" },
        ]}
        title="Settings groups"
      />
    </SurfacePage>
  );
}
