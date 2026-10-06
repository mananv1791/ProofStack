# ProofStack

ProofStack replaces resumes with verifiable proof-of-work dossiers. Candidates
connect artifacts, take an adaptive interview grounded in that work, and own a
portable dossier recruiters can review.

## Milestone 0 Scope

- Next.js 14 App Router project with TypeScript, Tailwind, and shadcn UI.
- Public marketing routes for the pitch surface.
- Candidate, recruiter, and admin route shells with role-specific navigation.
- Supabase SSR clients, auth actions, OAuth callback, and role-aware middleware.
- Supabase migrations for schema, RLS, and seed records.
- Sentry and PostHog initialization guarded by environment variables.
- Health and waitlist route handlers.

## Local Development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and fill the Supabase keys to enable live
authentication. Without those keys, protected app routes remain visible locally
so the foundation can be reviewed.

## Verification

```bash
pnpm build
pnpm lint
```

The Supabase CLI is not bundled in this workspace. Apply migrations with the
Supabase CLI or dashboard SQL editor once a project exists.
