import { SurfacePage } from "@/components/app-shell/surface-page";
import { KanbanBoard } from "@/components/shared/kanban-board";

type RecruiterRoleDetailPageProps = {
  params: {
    id: string;
  };
};

export default function RecruiterRoleDetailPage({ params }: RecruiterRoleDetailPageProps) {
  return (
    <SurfacePage
      description="Role detail combines matched dossiers, shortlist stages, notes, and messaging context."
      eyebrow="Role detail"
      metrics={[
        { label: "Matched dossiers", value: "24" },
        { label: "Shortlisted", value: "4" },
        { label: "Contacted", value: "1" },
      ]}
      title={`Role pipeline ${params.id}`}
    >
      <KanbanBoard
        columns={[
          { title: "Reviewing", items: [{ candidate: "Priya Raman", meta: "86 proof score", score: 92 }] },
          { title: "Contacted", items: [{ candidate: "Alex Chen", meta: "81 proof score", score: 84 }] },
          { title: "Interviewing", items: [] },
          { title: "Offer", items: [] },
          { title: "Hired", items: [] },
        ]}
      />
    </SurfacePage>
  );
}
