import { GitBranch, Layers3, Link2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfacePage } from "@/components/app-shell/surface-page";

const artifactTypes = [
  { icon: GitBranch, label: "GitHub repo URL", placeholder: "https://github.com/you/project" },
  { icon: Layers3, label: "Figma file URL", placeholder: "https://figma.com/file/..." },
  { icon: Link2, label: "Live deployed URL", placeholder: "https://your-project.com" },
];

export default function CandidateUploadPage() {
  return (
    <SurfacePage
      description="Add one to three artifacts. Milestone 1 will connect these inputs to parser jobs and ingestion progress."
      eyebrow="Artifact upload"
      title="Add the work you want the interview to inspect."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {artifactTypes.map((artifact) => {
          const Icon = artifact.icon;

          return (
            <Card className="border-border shadow-none" key={artifact.label}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{artifact.label}</CardTitle>
                <CardDescription>Validated by type before ingestion starts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>{artifact.label}</Label>
                  <Input placeholder={artifact.placeholder} />
                </div>
                <Button className="w-full" disabled>
                  <UploadCloud className="size-4" />
                  Parser lands in Milestone 1
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SurfacePage>
  );
}
