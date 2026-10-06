import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterHealthPage() {
  return (
    <SurfacePage
      description="Track response rates, ghosting flags, hire reports, and account freezes for recruiter quality."
      eyebrow="Recruiter health"
      metrics={[
        { label: "Avg health score", value: "92" },
        { label: "Ghost flags", value: "2" },
        { label: "Frozen accounts", value: "0" },
      ]}
      title="Make recruiter behavior part of marketplace trust."
    >
      <StatusList
        items={[
          { label: "Northstar Labs", meta: "94% response rate", status: "healthy" },
          { label: "FinchPay", meta: "2 ghost reports", status: "watch" },
        ]}
        title="Recruiter accounts"
      />
    </SurfacePage>
  );
}
