import { SurfacePage } from "@/components/app-shell/surface-page";
import { ArtifactCard } from "@/components/shared/artifact-card";
import { ScoreGauge } from "@/components/shared/score-gauge";

type RecruiterCandidatePageProps = {
  params: {
    id: string;
  };
};

export default function RecruiterCandidatePage({ params }: RecruiterCandidatePageProps) {
  return (
    <SurfacePage
      description="Recruiters see only visible or shared dossiers, with evidence links and transcript highlights."
      eyebrow="Candidate dossier"
      title={`Candidate ${params.id}`}
    >
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <ScoreGauge score={86} />
        </div>
        <ArtifactCard
          description="Sample recruiter dossier view for the candidate's primary repo. Real evidence links come from parsed artifacts."
          meta="GitHub repo · direct artifact link"
          status="ready"
          title="collab-editor"
          type="github"
        />
      </div>
    </SurfacePage>
  );
}
