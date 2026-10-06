import { ExternalLink, GitBranch, Layers3, Link2, MonitorUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ArtifactCardProps = {
  description: string;
  href?: string;
  meta: string;
  status: "ready" | "parsing" | "pending";
  title: string;
  type: "github" | "figma" | "site" | "document";
};

const artifactIcons = {
  github: GitBranch,
  figma: Layers3,
  site: MonitorUp,
  document: Link2,
};

export function ArtifactCard({
  description,
  href = "#",
  meta,
  status,
  title,
  type,
}: ArtifactCardProps) {
  const Icon = artifactIcons[type];

  return (
    <Card className="border-border shadow-none">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{meta}</CardDescription>
            </div>
          </div>
          <Badge variant={status === "ready" ? "secondary" : "outline"}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        <a
          className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          href={href}
        >
          Open artifact
          <ExternalLink className="size-4" />
        </a>
      </CardContent>
    </Card>
  );
}
