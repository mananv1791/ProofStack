import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function AiQualityPage() {
  return (
    <SurfacePage
      description="Sample interviews, flag hallucinated questions, audit unsupported scores, and feed calibration examples into evals."
      eyebrow="AI quality"
      metrics={[
        { label: "Samples due", value: "5" },
        { label: "Audits passed", value: "94%" },
        { label: "Hallucination flags", value: "1" },
      ]}
      title="Keep the interviewer grounded in the artifact."
    >
      <StatusList
        items={[
          { label: "Dossier audit", meta: "Score cited transcript turn 8", status: "pass" },
          { label: "Question grounding", meta: "Referenced missing file path", status: "review" },
          { label: "Rubric calibration", meta: "Architecture score variance", status: "queued" },
        ]}
        title="Review queue"
      />
    </SurfacePage>
  );
}
