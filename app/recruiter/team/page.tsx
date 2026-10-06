import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterTeamPage() {
  return (
    <SurfacePage
      description="Seat management connects recruiters to a verified company and controls billing access."
      eyebrow="Team"
      title="Manage collaborators and reviewer seats."
    >
      <StatusList
        items={[
          { label: "Marcus Lee", meta: "Owner · marcus@northstarlabs.com", status: "active" },
          { label: "Elena Torres", meta: "Hiring manager", status: "invited" },
        ]}
        title="Seat preview"
      />
    </SurfacePage>
  );
}
