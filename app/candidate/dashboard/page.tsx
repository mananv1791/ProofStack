import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";
import { ArtifactCard } from "@/components/shared/artifact-card";
import { ScoreGauge } from "@/components/shared/score-gauge";

export default function CandidateDashboardPage() {
  return (
    <SurfacePage
      actions={
        <Button asChild>
          <Link href="/candidate/upload">
            Add artifact
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      }
      description="Track dossier readiness, recruiter views, and the work artifacts that will anchor your interview."
      eyebrow="Candidate dashboard"
      metrics={[
        { label: "Dossier score", value: "86", delta: "sample" },
        { label: "Recruiter views", value: "3", delta: "7d" },
        { label: "Matched roles", value: "12" },
        { label: "Interview status", value: "Ready" },
      ]}
      title="Show the work, then let the interview go deep."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <section className="grid gap-4 md:grid-cols-2">
          <ArtifactCard
            description="A realtime collaborative editor with Supabase realtime, optimistic updates, RLS, and a clear sync boundary."
            meta="GitHub repo · ready for interview"
            status="ready"
            title="collab-editor"
            type="github"
          />
          <ArtifactCard
            description="A product walkthrough and design system case study awaiting parser support in the next milestone."
            meta="PDF case study · queued"
            status="pending"
            title="editor-case-study.pdf"
            type="document"
          />
        </section>

        <StatusList
          description="Milestone 0 uses sample data until Supabase records are connected."
          items={[
            { label: "Dossier visibility", meta: "Recruiter-only", status: "private beta" },
            { label: "Latest recruiter view", meta: "Founding Engineer · Series B fintech", status: "3h ago" },
            { label: "Next action", meta: "Upload one more artifact before interview", status: "open" },
          ]}
          title="Activity"
        />
      </div>

      <div className="rounded-md border border-border bg-card p-5">
        <ScoreGauge className="items-start" score={86} />
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="size-4" />
          Recruiter analytics unlock after the first live dossier is generated.
        </div>
      </div>
    </SurfacePage>
  );
}
