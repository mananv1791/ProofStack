import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterRolesPage() {
  return (
    <SurfacePage
      actions={
        <Button asChild>
          <Link href="/recruiter/roles/new">
            <Plus className="size-4" />
            New role
          </Link>
        </Button>
      }
      description="Role prompts drive artifact matching, so each posting captures what a great candidate would have built."
      eyebrow="Roles"
      metrics={[
        { label: "Draft", value: "1" },
        { label: "Open", value: "3" },
        { label: "Paused", value: "0" },
      ]}
      title="Create precise searches before reviewing dossiers."
    >
      <StatusList
        items={[
          { label: "Founding full-stack engineer", meta: "Next.js, Postgres, realtime", status: "open" },
          { label: "Senior backend engineer", meta: "Reliability, data pipelines", status: "open" },
          { label: "Design systems lead", meta: "Figma components, product craft", status: "draft" },
        ]}
        title="Role list preview"
      />
    </SurfacePage>
  );
}
