import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SurfacePage } from "@/components/app-shell/surface-page";
import { ScoreGauge } from "@/components/shared/score-gauge";

export default function CandidateDossierPage() {
  return (
    <SurfacePage
      actions={<Button disabled>Public sharing lands after live dossiers</Button>}
      description="Candidates control visibility and can share a public dossier link when generation is complete."
      eyebrow="Your dossier"
      title="A portable signal you own."
    >
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Card className="border-border shadow-none">
          <CardContent className="pt-6">
            <ScoreGauge score={86} />
          </CardContent>
        </Card>
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle>Strengths and concerns</CardTitle>
            <CardDescription>Sample structure for the generated dossier output.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Strengths</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Clear systems trade-off language.</li>
                <li>Strong ownership of failure modes.</li>
                <li>Product-aware prioritization.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Concerns</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Needs stronger automated load-test evidence.</li>
                <li>Observability story is early.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </SurfacePage>
  );
}
