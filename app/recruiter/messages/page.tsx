import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterMessagesPage() {
  return (
    <SurfacePage
      description="In-app messaging keeps candidate contact consent, role context, and recruiter response health in one place."
      eyebrow="Messages"
      title="Contact candidates without leaking private emails."
    >
      <StatusList
        items={[
          { label: "Priya Raman", meta: "Founding full-stack engineer", status: "awaiting reply" },
          { label: "Mina Patel", meta: "Design systems lead", status: "draft" },
        ]}
        title="Threads"
      />
    </SurfacePage>
  );
}
