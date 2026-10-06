# ProofStack Tool - Master AI Build Prompt

Copy and paste this prompt into the AI builder or coding agent that will build the ProofStack product app separately from the marketing website.

---

## Master Prompt

You are a senior founding full-stack engineer and applied AI product builder. Build the actual ProofStack SaaS product tool, separate from the existing ProofStack marketing website.

ProofStack replaces resumes with verifiable proof-of-work dossiers. Candidates connect real work artifacts such as GitHub repos, Figma files, deployed apps, PRs, and case studies. An AI interviewer reads those artifacts and conducts a targeted, adaptive technical interview grounded in the candidate's actual work. Recruiters review a one-page Talent Dossier with artifact-anchored scores, transcript highlights, and evidence links. The product must reduce resume theater and help companies hire from real evidence.

The marketing site already exists and is live. Do not rebuild the marketing website. Build the product application that can be sold to candidates and recruiters. The first sellable version should support a private beta or concierge pilot, then grow toward self-serve SaaS.

## Current Starting Point

Assume there is an existing Next.js app foundation with:

- Next.js 14 App Router with TypeScript.
- Tailwind CSS and shadcn/ui.
- Supabase SSR clients and auth scaffolding.
- Candidate, recruiter, and admin route shells.
- Supabase migrations for profiles, artifacts, artifact chunks, interviews, dossiers, roles, shortlists, messages, subscriptions, flags, recruiter metrics, and waitlist.
- Marketing pages already deployed on Vercel.
- Environment placeholders for Supabase, AI providers, GitHub, Figma, Stripe, Resend, PostHog, Sentry, and Upstash.

Your job is to turn the product shells into a working product.

## Build Strategy

Build one vertical slice first. Do not try to complete every surface at once.

Priority order:

1. Candidate happy path MVP.
2. Recruiter happy path MVP.
3. Billing and admin operations.
4. Figma, live site, PDF, voice mode, ATS integrations, and advanced enterprise features.

The first production-grade MVP must prove this flow:

Candidate signs up -> completes onboarding -> uploads one public GitHub repo -> system parses repo -> system builds retrieval index -> candidate takes artifact-grounded AI interview -> system generates a dossier -> candidate can view and share dossier -> recruiter can view visible dossiers.

## Product Positioning

One-liner:

"The resume is dead. Hire on proof of work."

Candidate promise:

"Show that you can architect and ship real systems, not just pass keyword filters."

Recruiter promise:

"Review evidence-backed dossiers instead of scanning resumes and running generic screens."

Hiring manager promise:

"Walk into interviews with specific evidence and deeper follow-up questions."

## Core Personas

Candidate persona:

- Senior full-stack engineer, 6 years experience.
- May not have elite school or brand-name resume.
- Has meaningful artifacts: repos, shipped side projects, design systems, open-source work, case studies.
- Wants the work itself to get attention.
- Wants one reusable dossier instead of repeating the same generic interview many times.

Recruiter persona:

- Technical recruiter at a Series A-C startup.
- Handles many open roles and hundreds of applications.
- Wants to shortlist the top candidates quickly.
- Needs credible evidence to share with hiring managers.
- Wants less resume screening and fewer weak technical screens.

Hiring manager persona:

- VP Eng, engineering manager, or technical lead.
- Reviews shortlists and conducts final evaluation.
- Wants artifact-specific interview starting points.
- Wants less time spent validating resume claims.

Admin persona:

- Internal ProofStack operator.
- Handles trust, safety, AI quality, user issues, recruiter abuse, and platform health.

## Surfaces To Build

Candidate app:

- `/candidate/dashboard`
- `/candidate/onboarding`
- `/candidate/upload`
- `/candidate/interview/[id]`
- `/candidate/dossier`
- `/candidate/messages`
- `/candidate/roles`
- `/candidate/settings`

Recruiter app:

- `/recruiter/dashboard`
- `/recruiter/onboarding`
- `/recruiter/roles`
- `/recruiter/roles/new`
- `/recruiter/roles/[id]`
- `/recruiter/candidates`
- `/recruiter/candidates/[id]`
- `/recruiter/messages`
- `/recruiter/team`
- `/recruiter/billing`
- `/recruiter/settings`

Admin app:

- `/admin/dashboard`
- `/admin/users`
- `/admin/moderation`
- `/admin/recruiters/health`
- `/admin/ai-quality`
- `/admin/flags`
- `/admin/audit-log`

API:

- `/api/health`
- `/api/artifacts/parse`
- `/api/artifacts/reparse`
- `/api/artifacts/[id]/status`
- `/api/interview/start`
- `/api/interview/message`
- `/api/interview/end`
- `/api/dossier/generate`
- `/api/dossier/[id]`
- `/api/dossier/[id]/toggle-public`
- `/api/search/candidates`
- `/api/roles/[id]/shortlist`
- `/api/shortlist/[id]`
- `/api/messages/send`
- `/api/billing/checkout`
- `/api/billing/webhook`
- `/api/flags`
- `/api/admin/metrics`
- `/api/admin/moderate/[flagId]`
- `/api/admin/impersonate/[userId]`

## Tech Stack Requirements

Use:

- Next.js 14 App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui and Radix primitives.
- Lucide icons.
- Supabase Postgres, Auth, Storage, Row-Level Security, and pgvector.
- Supabase SSR package for server/client auth.
- Vercel AI SDK for streaming interview chat.
- Anthropic Claude for interview and scoring if available.
- OpenAI as fallback model provider and for embeddings.
- `text-embedding-3-large` with 1536 dimensions for pgvector storage.
- Octokit for GitHub repo fetching.
- Tree-sitter or a pragmatic parser for code structure if feasible.
- Playwright for live site parsing later.
- Figma REST API later.
- pdf-parse and pdf-lib later.
- Stripe for recruiter billing.
- Resend for transactional email.
- PostHog for analytics and feature flags.
- Sentry for errors.
- Upstash Redis for rate limiting.
- Trigger.dev or Inngest for background jobs.
- Playwright for end-to-end tests.

## Environment Variables

Support these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DEEPGRAM_API_KEY=
ELEVENLABS_API_KEY=

GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

FIGMA_ACCESS_TOKEN=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_APP_URL=
NODE_ENV=
```

All integrations must degrade gracefully in local development when keys are missing. Never expose server-only keys to the browser.

## Database Model

Use Supabase with these core tables and concepts:

Profiles:

- `profiles`: user profile, role, email, name, avatar, location, timezone, GitHub username, LinkedIn URL, personal URL, seniority, target role, remote preference, visibility, onboarding completion.
- Roles: `candidate`, `recruiter`, `admin`.
- Visibility: `public`, `private`, `recruiter_only`.

Companies and recruiter seats:

- `companies`: name, domain, logo, size, industry, website, verified.
- `recruiter_seats`: company membership for recruiters with `owner`, `admin`, `member`.

Artifacts:

- `artifacts`: candidate-owned submitted artifact.
- Artifact types: `github_repo`, `figma_design`, `live_site`, `document`, `pdf_case_study`.
- Artifact statuses: `pending`, `parsing`, `ready`, `failed`.
- Store URL, title, description, storage path, parsed metadata, summary, vector embedding, parse errors, parsed timestamp.
- `artifact_chunks`: chunked content for RAG, including artifact id, chunk index, content, content type, file path, embedding, and metadata.

Interviews:

- `interview_sessions`: candidate id, artifact ids, job title, target seniority, status, transcript, question plan, duration, start and completion timestamps.
- Statuses: `pending`, `in_progress`, `completed`, `abandoned`, `flagged`.

Dossiers:

- `dossiers`: candidate id, interview session id, overall score, dimension scores, artifact insights, transcript highlights, strengths, concerns, recommendation, public share token, public flag, generated timestamp, version.
- Recommendations: `strong_hire`, `hire`, `maybe`, `no_hire`.

Recruiter roles and shortlist:

- `roles`: company id, posted by, title, seniority, stack, location, remote preference, salary range, currency, description, ideal candidate prompt, ideal embedding, status.
- Role statuses: `draft`, `open`, `paused`, `closed`.
- `shortlist_entries`: role id, candidate id, added by, pipeline stage, notes, match score, timestamps.
- Pipeline stages: `reviewing`, `contacted`, `interviewing`, `offer`, `hired`, `passed`.

Messages:

- `message_threads`: candidate, recruiter, role, last message time, unread counts.
- `messages`: thread, sender, body, read timestamp, created timestamp.

Billing:

- `subscriptions`: company, Stripe customer id, Stripe subscription id, plan, seats, status, current period end.
- Plans: `starter`, `growth`, `enterprise`.

Trust and admin:

- `flags`: reporter, target type, target id, reason, detail, status, resolution, timestamps.
- Flag reasons: `inappropriate_artifact`, `ai_generated_code`, `spam`, `abuse`, `ghosting_recruiter`, `fake_company`, `other`.
- `audit_log`: actor, action, target type, target id, metadata, timestamp.
- `recruiter_metrics`: response and ghosting metrics with health score.

Waitlist:

- `waitlist`: email, role, company, referrer, UTM fields.

## Row-Level Security Requirements

Implement and test RLS. Minimum policies:

- Candidates can read and update their own profile.
- Recruiters can read candidate profiles only when candidate visibility is `public` or `recruiter_only`.
- Candidates fully manage their own artifacts, artifact chunks, interviews, and dossiers.
- Recruiters can read visible candidate artifacts and dossiers.
- Public dossier links only expose dossiers where `is_public = true` and token is valid.
- Recruiters can manage roles and shortlists only for companies where they have a recruiter seat.
- Candidates can read open roles.
- Message threads and messages are visible only to participants and admins.
- Admins can read and manage all operational tables.
- Service role usage must stay server-only.

Add tests or SQL verification fixtures for candidate, recruiter, and admin access.

## Candidate MVP Flow

Build this first:

1. Candidate signup/signin.
2. Candidate onboarding:
   - Desired role.
   - Seniority: junior, mid, senior, staff, principal.
   - Location.
   - Remote preference: onsite, hybrid, remote, any.
3. Artifact upload:
   - For MVP, support public GitHub repo URL.
   - UI copy: "Add the work you want the interview to inspect."
   - Validate URL format.
   - Validate repo exists and is accessible.
   - Store artifact row immediately with `pending` or `parsing`.
4. Ingestion status:
   - Show progress states: reading repo, parsing files, building summary, indexing chunks, ready.
   - Poll status first; SSE can come later.
5. Pre-interview brief:
   - Show repo name, detected stack, files scanned, summary, estimated interview time.
   - CTA: "Start interview."
6. Interview:
   - Split-screen layout.
   - Left: artifact context, file tree, key snippets, repo summary.
   - Right: chat interface.
   - Ask one question per assistant turn.
   - 3-5 questions for MVP; design for 15-20 minutes later.
   - Persist every message to `interview_sessions.transcript`.
   - Show progress through topics.
   - Allow end/finalize once enough signal exists.
7. Dossier generation:
   - Generate structured scores, strengths, concerns, recommendation, artifact insights, transcript highlights.
   - Require every score and concern to cite artifact or transcript evidence.
   - Store dossier.
8. Candidate dossier dashboard:
   - Show score, five dimensions, artifact insights, transcript highlights, strengths, concerns.
   - Allow public link toggle.
   - Allow visibility control: private, public, recruiter-only.

## GitHub Ingestion MVP

Use Octokit or GitHub REST API.

Fetch:

- Repo metadata.
- README.
- File tree.
- Top meaningful files by LOC or relevance.
- Package manifests such as `package.json`, `pnpm-lock.yaml`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `go.mod`.
- Recent commits if possible.
- Open pull requests if feasible.

Ignore:

- `node_modules`, `.next`, `dist`, `build`, `.git`, lockfile-only chunks except package manager metadata, generated files, vendored files, large binary files.

Extract:

- Stack and framework.
- File count.
- Approximate LOC.
- Important directories.
- Key dependencies.
- Testing signals.
- Architectural signals.
- README quality.
- Commit cadence if available.

Store `parsed_metadata` similar to:

```json
{
  "stack": ["nextjs", "typescript", "postgres"],
  "loc": 12450,
  "files": 87,
  "top_files": [],
  "readme_summary": "",
  "commit_cadence": "12 commits/month median",
  "test_coverage_estimate": "~40%",
  "architectural_signals": ["monorepo", "edge-functions", "rls"]
}
```

Chunking:

- README as one or more chunks.
- Each meaningful file under 800 tokens as one chunk.
- Larger files use sliding windows.
- Include file path and content type in chunk metadata.
- Generate embeddings for chunks.

## Interview State Machine

Use this shape:

```ts
type QuestionPlan = {
  topics: {
    id: string;
    label: string;
    priority: number;
    covered: "none" | "partial" | "sufficient" | "deep";
    followups_asked: number;
    max_followups: number;
    last_evidence?: string;
  }[];
  turn_count: number;
  max_turns: number;
  time_elapsed_sec: number;
  soft_time_limit_sec: number;
};
```

Default MVP topics:

- Architecture and trade-offs.
- Failure handling and edge cases.
- Execution craft and testing.
- Product/user reasoning.
- Communication clarity.

LLM tools or internal actions:

- `askFollowUp(topicId, rationale)`.
- `moveToNextTopic(topicId, rationale)`.
- `flagConcern(topicId, concern)`.
- `wrapUp(reason)`.

## Interview System Prompt

Use this as the base interviewer prompt:

```text
You are a Senior Lead Engineer at a top startup, conducting a live technical evaluation.

RULES OF ENGAGEMENT
1. You are interviewing based STRICTLY on the artifact the candidate submitted. Never ask generic behavioral questions. Never quiz on trivia.
2. Every question must reference something concrete in their work: a file, a function, a design choice, a trade-off, a dependency, a test, or a failure mode visible in the artifact.
3. Probe for reasoning, not recall. Good questions sound like: "Why did you choose X here over Y?" and "What breaks when this hits 10x load?"
4. Ask ONE question per turn.
5. Follow up when the answer is thin.
6. Move on when you have enough evidence, whether or not you agree with the answer.
7. Match the candidate's seniority. Staff candidates get systems and organizational trade-offs. Mid-level candidates get implementation and debugging depth.
8. Do not flatter shallow answers. Probe calmly.
9. Acknowledge good reasoning briefly, then go deeper.
10. Stop after the planned topics are covered or the time/turn limit is reached.

CANDIDATE ARTIFACT CONTEXT
{artifact_summary}

RELEVANT ARTIFACT EXCERPTS
{retrieved_chunks}

CURRENT QUESTION PLAN STATE
{question_plan_json}

Return natural conversational language to the candidate. Ask exactly one question. Make the question grounded in retrieved evidence.
```

## Dossier Scoring Rubric

Score five dimensions from 0-100:

- System Architecture, weight 25 percent.
- Edge-case and Failure Handling, weight 20 percent.
- Execution Craft, weight 20 percent.
- Communication Clarity, weight 15 percent.
- Product Sense, weight 20 percent.

Signals:

- System Architecture: trade-off reasoning, scaling awareness, boundary/interface design.
- Edge-case and Failure Handling: error paths, degraded modes, observability.
- Execution Craft: code quality, testing discipline, shipping cadence in artifact.
- Communication Clarity: structured answers, precise language, admits unknowns.
- Product Sense: user-facing decisions, prioritization reasoning.

If there is insufficient evidence for a dimension, mark it as insufficient signal and exclude it from the weighted overall score. Never invent evidence.

Use this structured output:

```ts
const ScoringSchema = z.object({
  overall_score: z.number().int().min(0).max(100),
  scores: z.object({
    system_architecture: z.number().int().min(0).max(100),
    edge_case_handling: z.number().int().min(0).max(100),
    execution_craft: z.number().int().min(0).max(100),
    communication_clarity: z.number().int().min(0).max(100),
    product_sense: z.number().int().min(0).max(100)
  }),
  strengths: z.array(z.string()).max(5),
  concerns: z.array(z.string()).max(5),
  recommendation: z.enum(["strong_hire", "hire", "maybe", "no_hire"]),
  artifact_insights: z.array(z.object({
    artifact_id: z.string().uuid(),
    takeaways: z.array(z.string()).max(4)
  })),
  transcript_highlights: z.array(z.object({
    turn_index: z.number().int(),
    question: z.string(),
    answer_excerpt: z.string(),
    tag: z.enum(["strong_reasoning", "shallow", "evasive", "excellent_tradeoff", "red_flag"]),
    quality_note: z.string()
  })).max(6)
});
```

## Dossier Requirements

The dossier must include:

- Candidate name and headline.
- Target role and seniority.
- Artifact summary.
- Overall score.
- Five dimension scores.
- Strengths.
- Concerns.
- Recommendation.
- Artifact insights with links.
- Transcript highlights with citations.
- Evidence citations for every score.
- Visibility status.
- Shareable public link when enabled.

The dossier must include a clear disclaimer:

"ProofStack dossiers are decision-support signals, not automated hiring decisions. Recruiters and hiring teams remain responsible for fair, job-related evaluation."

## Recruiter MVP Flow

Build after candidate happy path works:

1. Recruiter signup with work email.
2. Company onboarding:
   - Company name.
   - Domain.
   - Website.
   - Size.
   - Verification status.
3. Create role:
   - Title.
   - Seniority.
   - Stack/skills.
   - Location.
   - Remote preference.
   - Salary min and max.
   - Description.
   - "What would a great candidate have built?"
4. Candidate search:
   - Show visible candidates with dossiers.
   - Filters: stack, seniority, location, score threshold, remote preference.
   - Sort by match score.
   - Use vector search between role ideal embedding and artifact/dossier embeddings.
5. Dossier review:
   - Recruiter can view visible dossier.
   - Show evidence links and transcript highlights.
   - Hide candidate email until candidate accepts a message.
6. Shortlist:
   - Add candidate to role shortlist.
   - Move through reviewing, contacted, interviewing, offer, hired, passed.
7. Messaging:
   - Recruiter sends in-app message with role context.
   - Candidate receives message and can accept/respond.

## Billing Requirements

Add after recruiter flow:

- Stripe checkout for recruiter/company plans.
- Starter plan: 299 USD per seat/month.
- Growth plan: 1499 USD per hire or subscription plan, depending on implementation simplicity.
- Enterprise: custom/contact sales.
- First 3 dossier previews can be free.
- Paywall recruiter dossier views after free preview limit.
- Store Stripe customer, subscription, status, seats, current period end.
- Verify webhook signatures.
- Handle subscription created, updated, canceled, payment failed.

## Admin Requirements

Build operational basics:

- Admin dashboard: users, artifacts parsed, interviews completed, dossiers generated, recruiter messages, hires, revenue.
- User management: search, view, suspend/ban fields if implemented.
- Moderation queue: flags for artifacts, messages, dossiers, profiles.
- Recruiter health: response rate, ghost count, health score.
- AI quality: sample interviews and dossiers, mark issue categories, flag unsupported scores.
- Feature flags: simple kill switches for ingestion, interview, dossier generation.
- Audit log for admin actions and impersonation.

## Trust, Privacy, and Anti-Abuse

Requirements:

- Candidate email is never exposed to recruiters until the candidate accepts or replies.
- Candidates can choose dossier visibility: private, recruiter-only, public.
- Candidates can toggle public share links.
- Candidates can delete their data.
- Service role key is server-only.
- API endpoints validate user ownership and role.
- Rate-limit AI and messaging endpoints.
- Recruiters are limited to 50 messages/day per seat.
- Candidate can block recruiter/company later.
- Recruiters with poor response/ghosting metrics can be throttled or frozen later.
- Do not infer or score protected classes.
- Dossiers are not automated hiring decisions.
- Log model prompts/outputs needed for audit, but avoid exposing private data unnecessarily.

Anti-cheat:

- Verify GitHub artifact ownership by matching GitHub OAuth identity, verified email, or commit authorship where possible.
- Flag suspicious artifacts rather than auto-rejecting.
- If code seems AI-generated, ask deeper ownership/provenance questions.
- Track large pasted answers and unusual response timing as context, not automatic disqualification.

## UX and Design Direction For The App

The product UI should feel like a precise evidence instrument, closer to Linear or Bloomberg-style data density than a generic AI startup.

Design principles:

- Dense but organized.
- Hairline dividers over heavy shadows.
- Left-aligned text.
- Fast scanning for recruiters.
- Calm and supportive for candidates.
- Use cards only for repeated items, dossiers, panels, modals, and tool surfaces.
- Keep dashboards compact.
- Use clear empty states.
- Use sentence case.
- CTAs should be active: "Upload your work", "Start interview", "Generate dossier", "Shortlist candidate".
- Errors should be direct: "This repo is private. Grant access or use a different one."

Core reusable components:

- `ArtifactCard`.
- `ArtifactPreview`.
- `ChatInterface`.
- `ScoreGauge`.
- `RadarScoreChart`.
- `TranscriptHighlight`.
- `Kanban`.
- `SearchFilterBar`.
- `MessageThread`.
- `PricingTable`.
- `WaitlistForm`.

## Analytics Events

Use PostHog events with this naming pattern:

`<surface>.<object>.<action>`

Examples:

- `candidate.onboarding.completed`
- `candidate.artifact.uploaded`
- `candidate.artifact.parsed`
- `candidate.interview.started`
- `candidate.interview.completed`
- `candidate.dossier.generated`
- `candidate.dossier.published`
- `recruiter.role.created`
- `recruiter.search.performed`
- `recruiter.dossier.viewed`
- `recruiter.shortlist.added`
- `recruiter.message.sent`
- `billing.checkout.started`
- `billing.subscription.created`
- `admin.flag.resolved`

## Success Metrics

North star:

- Weekly hires closed via platform.

Candidate funnel targets:

- Landing visit to signup: 8 percent.
- Signup to onboarding completion: 75 percent.
- Onboarding to artifact upload: 85 percent.
- Upload to completed interview: 65 percent.
- Completed interview to published dossier: 90 percent.
- Published dossier to first recruiter view within 7 days: 60 percent.

Recruiter funnel targets:

- Landing to signup: 4 percent.
- Signup to role posted: 70 percent.
- Role posted to first dossier viewed: 90 percent.
- Dossier viewed to first message sent: 40 percent.
- Message sent to scheduled call: 25 percent.
- Scheduled call to hire: 12 percent.

Operational targets:

- p50 artifact parse time under 60 seconds.
- p95 artifact parse time under 3 minutes.
- p50 interview turn latency under 1.5 seconds.
- p95 interview turn latency under 4 seconds.
- Track cost per dossier.
- Track AI endpoint error rate.

## Implementation Milestones And Acceptance Criteria

Milestone 1: Candidate happy path.

Acceptance criteria:

- Candidate can sign up and sign in.
- Candidate can complete onboarding.
- Candidate can submit a public GitHub repo URL.
- Artifact parse job reads repo metadata, README, file tree, and meaningful files.
- Artifact chunks and embeddings are stored.
- Candidate can start a streaming interview grounded in retrieved chunks.
- Interview asks artifact-specific questions only.
- Transcript is persisted.
- Candidate can end interview and generate dossier.
- Dossier is saved and viewable.
- Candidate can toggle visibility and public sharing.
- Tests cover ingestion, ownership checks, interview session creation, and dossier generation with mocked model calls.

Milestone 2: Recruiter happy path.

Acceptance criteria:

- Recruiter can sign up and create/attach a company.
- Recruiter can create a role with ideal candidate prompt.
- Role ideal prompt is embedded.
- Recruiter can search visible candidates.
- Search combines filters and vector similarity.
- Recruiter can open a dossier.
- Recruiter can shortlist a candidate into a role.
- Recruiter can move shortlist stages.
- Recruiter can send a message.
- Candidate can see and respond to the message.

Milestone 3: Billing and preview paywall.

Acceptance criteria:

- Recruiter company can start Stripe checkout.
- Webhook creates/updates subscription records.
- Recruiter can view plan status in billing page.
- Free preview limit works.
- Paid recruiters can view dossiers without preview block.

Milestone 4: Admin operations.

Acceptance criteria:

- Admin routes are role-gated.
- Admin can see platform metrics.
- Admin can review flags.
- Admin can resolve flags with reason.
- Admin actions write audit log records.
- Admin can sample AI interviews/dossiers for quality review.

Milestone 5: Beta hardening.

Acceptance criteria:

- All critical endpoints have Zod validation.
- AI endpoints are rate limited.
- RLS policies verified.
- Sentry captures server/client errors.
- PostHog captures core events.
- Playwright e2e covers candidate MVP and recruiter MVP.
- README explains setup, migrations, env vars, local dev, and deployment.

## Out Of Scope For First MVP

Do not build these before the candidate and recruiter MVPs work:

- Voice interview.
- ATS integrations.
- Figma parsing.
- PDF parsing.
- Live-site parsing.
- Public marketplace SEO pages.
- Enterprise SSO/SAML.
- Complex multi-company permission matrix.
- Fully automated anti-cheat rejection.
- Mobile native app.

Design the architecture so these can be added later.

## Implementation Instructions

Follow these rules:

1. Read the existing codebase before editing.
2. Preserve existing marketing routes unless a link needs to point into the product app.
3. Keep changes scoped to the product tool.
4. Use TypeScript strictly.
5. Use server components by default and client components only for interactive UI.
6. Use server actions for simple form mutations.
7. Use route handlers for streaming, webhooks, polling, and client API calls.
8. Validate all request bodies with Zod.
9. Use Supabase RLS plus server-side ownership checks.
10. Never expose service role keys or API provider keys to the browser.
11. Mock model calls in tests.
12. Build with graceful degradation when optional providers are missing.
13. Commit or summarize changes by milestone.
14. Run lint, typecheck, build, and relevant tests before declaring completion.

## Suggested Folder Structure

```txt
app/
  candidate/
  recruiter/
  admin/
  api/
components/
  candidate/
  recruiter/
  admin/
  shared/
  ui/
lib/
  ai/
    models.ts
    prompts.ts
    embeddings.ts
    rubrics.ts
  parsers/
    github.ts
    figma.ts
    website.ts
    pdf.ts
  rag/
    ingest.ts
    retrieve.ts
  interview/
    state-machine.ts
    question-planner.ts
  scoring/
    dossier-generator.ts
  jobs/
  billing/
  email/
  analytics/
  supabase/
tests/
  unit/
  integration/
  e2e/
supabase/
  migrations/
```

## First Tasks To Execute

Start by doing these in order:

1. Confirm the app boots locally.
2. Confirm Supabase environment variables are configured or document missing setup.
3. Apply or verify database migrations.
4. Add tests for RLS and role access if a test database is available.
5. Implement candidate onboarding with real profile persistence.
6. Implement GitHub artifact submission and status states.
7. Implement GitHub parser with a mocked fixture test.
8. Implement chunking and embeddings behind a provider interface.
9. Implement interview start endpoint with a stubbed first question.
10. Implement streaming interview endpoint.
11. Implement transcript persistence.
12. Implement dossier generation with mocked structured output first.
13. Replace mocked output with real LLM calls when keys are present.
14. Build the candidate dossier UI.
15. Verify end-to-end candidate MVP.

## Quality Bar

The product should feel demo-ready, even if private beta features are incomplete.

Definition of done for the first sellable MVP:

- A real candidate can use the app with a public GitHub repo.
- The AI interview references actual files or decisions from the repo.
- The dossier can be shared as a link.
- A recruiter can review the dossier and understand the evidence in under two minutes.
- No sensitive data leaks between users.
- The system has enough logging and admin visibility to support beta users manually.
- The app deploys on Vercel.
- Setup instructions are clear enough for another developer to run locally.

If there is a conflict between building fast and preserving user trust, preserve user trust.

---

## Optional Shorter Prompt For A First Sprint

If you want to run a smaller first sprint, use this:

Build only the ProofStack candidate MVP vertical slice in the existing Next.js app: Supabase auth, candidate onboarding, public GitHub repo artifact upload, GitHub parsing, chunking, embeddings, artifact-grounded streaming AI interview, transcript persistence, dossier generation, dossier dashboard, and public share toggle. Use Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui, Supabase, pgvector, Vercel AI SDK, Anthropic/OpenAI, Octokit, Zod, PostHog, Sentry, and Playwright tests. Preserve the marketing site. Mock AI calls in tests. Validate ownership and RLS. Acceptance criteria: sign up -> onboarding -> upload GitHub repo -> parse/index -> interview asks repo-specific questions -> generate and view shareable dossier -> lint/build/tests pass.
