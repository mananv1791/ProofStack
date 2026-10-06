import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";
import { KanbanBoard } from "@/components/shared/kanban-board";

export default function RecruiterDashboardPage() {
  return (
    <SurfacePage
      actions={
        <Button asChild>
          <Link href="/recruiter/roles/new">
            <Plus className="size-4" />
            Post role
          </Link>
        </Button>
      }
      description="Review matched dossiers, shortlist candidates, and keep hiring manager evidence close to the workflow."
      eyebrow="Recruiter dashboard"
      metrics={[
        { label: "Open roles", value: "3" },
        { label: "New dossiers", value: "12", delta: "48h" },
        { label: "Messages sent", value: "8" },
        { label: "Pipeline health", value: "92" },
      ]}
      title="Shortlist candidates on evidence, not keywords."
    >
      <KanbanBoard
        columns={[
          {
            title: "Reviewing",
            items: [
              { candidate: "Priya Raman", meta: "Realtime editor · 92 match", score: 86 },
              { candidate: "Jo Lee", meta: "Billing platform · 88 match", score: 83 },
            ],
          },
          { title: "Contacted", items: [{ candidate: "Alex Chen", meta: "Auth library", score: 81 }] },
          { title: "Interviewing", items: [{ candidate: "Mina Patel", meta: "Design system", score: 84 }] },
          { title: "Offer", items: [] },
          { title: "Hired", items: [] },
        ]}
      />

      <StatusList
        items={[
          { label: "Company verification", meta: "Domain check and manual review", status: "pending" },
          { label: "Paywall preview", meta: "3 dossier previews before plan required", status: "armed" },
        ]}
        title="Account readiness"
      />
    </SurfacePage>
  );
}
