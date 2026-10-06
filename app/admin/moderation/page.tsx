import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function AdminModerationPage() {
  return (
    <SurfacePage
      description="Review flagged artifacts, messages, dossiers, and profiles with reason codes."
      eyebrow="Moderation"
      metrics={[
        { label: "Open flags", value: "3" },
        { label: "Actioned today", value: "7" },
        { label: "Dismissed", value: "2" },
      ]}
      title="Handle abuse before it contaminates trust."
    >
      <StatusList
        items={[
          { label: "AI-generated code concern", meta: "Artifact · collab-editor fork", status: "open" },
          { label: "Fake company report", meta: "Recruiter profile", status: "review" },
          { label: "Ghosting report", meta: "Message thread", status: "open" },
        ]}
        title="Flag queue"
      />
    </SurfacePage>
  );
}
