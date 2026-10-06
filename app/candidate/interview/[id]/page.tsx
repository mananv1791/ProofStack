import { Bot, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SurfacePage } from "@/components/app-shell/surface-page";

type CandidateInterviewPageProps = {
  params: {
    id: string;
  };
};

export default function CandidateInterviewPage({ params }: CandidateInterviewPageProps) {
  return (
    <SurfacePage
      description="This route is ready for the streaming chat endpoint and artifact preview pane planned in Milestone 1."
      eyebrow="AI interview"
      title={`Interview session ${params.id}`}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle>Artifact preview</CardTitle>
            <CardDescription>Repo tree, code excerpts, Figma frames, or live-site evidence.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md border border-border bg-background p-4 font-mono text-xs leading-6">
              {`app/editor.tsx
lib/sync-engine.ts
supabase/rls.sql

// Retrieved context will stream here during the interview.`}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle>Interview chat</CardTitle>
            <CardDescription>Stubbed transcript until Vercel AI SDK streaming is added.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3 rounded-md border border-border bg-background p-3">
              <Bot className="mt-1 size-4 text-primary" />
              <p className="text-sm leading-6">
                Your sync engine batches optimistic operations. What happens when
                the server accepts op 3 but rejects op 2?
              </p>
            </div>
            <div className="flex gap-3 rounded-md border border-border bg-muted p-3">
              <User className="mt-1 size-4 text-muted-foreground" />
              <p className="text-sm leading-6 text-muted-foreground">
                Candidate answer capture lands with the streaming message endpoint.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SurfacePage>
  );
}
