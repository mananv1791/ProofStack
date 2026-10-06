import { SurfacePage, StatusList } from "@/components/app-shell/surface-page";

export default function CandidateMessagesPage() {
  return (
    <SurfacePage
      description="Candidate inbox for recruiter outreach. Email remains hidden until the candidate accepts a message."
      eyebrow="Messages"
      title="Recruiter conversations with role context attached."
    >
      <StatusList
        items={[
          { label: "Marcus at Northstar Labs", meta: "Founding full-stack role", status: "unread" },
          { label: "Elena at FinchPay", meta: "Staff product engineer", status: "waiting" },
        ]}
        title="Inbox preview"
      />
    </SurfacePage>
  );
}
