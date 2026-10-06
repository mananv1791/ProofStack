import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SurfacePage } from "@/components/app-shell/surface-page";

const candidates = [
  { name: "Priya Raman", score: 86, stack: "Next.js, Supabase, realtime" },
  { name: "Jo Lee", score: 83, stack: "Node, billing, platform systems" },
  { name: "Mina Patel", score: 84, stack: "Figma systems, React, design ops" },
];

export default function RecruiterCandidatesPage() {
  return (
    <SurfacePage
      description="Search and filters will combine vector match, stack, seniority, score threshold, and location."
      eyebrow="Candidate search"
      title="Browse candidates by the work they can defend."
    >
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Milestone 0 UI shell for the candidate discovery surface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by stack, artifact, role, or dossier signal" />
          </div>
          <div className="divide-y divide-border rounded-md border border-border">
            {candidates.map((candidate) => (
              <div className="flex items-center justify-between gap-4 p-4" key={candidate.name}>
                <div>
                  <p className="text-sm font-medium">{candidate.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{candidate.stack}</p>
                </div>
                <Badge variant="secondary">{candidate.score}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SurfacePage>
  );
}
