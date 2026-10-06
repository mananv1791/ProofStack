import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function RecruiterBillingPage() {
  return (
    <SurfacePage
      description="Stripe checkout and subscription status land after the recruiter happy path."
      eyebrow="Billing"
      metrics={[
        { label: "Current plan", value: "Starter" },
        { label: "Seats", value: "1" },
        { label: "Dossier views", value: "3" },
      ]}
      title="Pay for signal, not application volume."
    >
      <StatusList
        items={[
          { label: "Starter", meta: "$299 per seat per month", status: "planned" },
          { label: "Growth", meta: "$1,499 per hire", status: "planned" },
          { label: "Enterprise", meta: "Custom terms, SSO, DPA", status: "planned" },
        ]}
        title="Plans"
      />
    </SurfacePage>
  );
}
