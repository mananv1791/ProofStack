import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function CandidateRolesPage() {
  return (
    <SurfacePage
      description="Matched roles will be ranked by the overlap between open-role prompts and artifact evidence."
      eyebrow="Matched roles"
      metrics={[
        { label: "Open matches", value: "12" },
        { label: "Remote friendly", value: "9" },
        { label: "Series A-C", value: "7" },
      ]}
      title="Roles where your artifacts are the strongest signal."
    >
      <StatusList
        items={[
          { label: "Founding full-stack engineer", meta: "Next.js, Supabase, realtime systems", status: "92 match" },
          { label: "Senior product engineer", meta: "Collaboration software, TypeScript", status: "88 match" },
          { label: "Backend engineer", meta: "Postgres, RLS, reliability", status: "81 match" },
        ]}
        title="Role feed preview"
      />
    </SurfacePage>
  );
}
