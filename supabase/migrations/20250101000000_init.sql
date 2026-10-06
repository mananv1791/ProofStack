create extension if not exists "uuid-ossp";
create extension if not exists "vector";
create extension if not exists "pg_trgm";

create type user_role as enum ('candidate', 'recruiter', 'admin');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'candidate',
  full_name text,
  email text unique not null,
  avatar_url text,
  headline text,
  location text,
  timezone text,
  github_username text,
  linkedin_url text,
  personal_url text,
  seniority text check (seniority in ('junior','mid','senior','staff','principal')),
  target_role text,
  remote_pref text check (remote_pref in ('onsite','hybrid','remote','any')),
  visibility text default 'private' check (visibility in ('public','private','recruiter_only')),
  onboarding_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index profiles_role_idx on profiles(role);
create index profiles_target_role_idx on profiles(target_role);
create index profiles_seniority_idx on profiles(seniority);

create table companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  domain text unique,
  logo_url text,
  size text check (size in ('1-10','11-50','51-200','201-500','501-1000','1000+')),
  industry text,
  website text,
  verified boolean default false,
  created_at timestamptz default now()
);

create table recruiter_seats (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  seat_role text default 'member' check (seat_role in ('owner','admin','member')),
  created_at timestamptz default now(),
  unique(company_id, profile_id)
);

create index recruiter_seats_company_idx on recruiter_seats(company_id);
create index recruiter_seats_profile_idx on recruiter_seats(profile_id);

create type artifact_type as enum ('github_repo','figma_design','live_site','document','pdf_case_study');
create type artifact_status as enum ('pending','parsing','ready','failed');

create table artifacts (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references profiles(id) on delete cascade,
  type artifact_type not null,
  url text,
  title text,
  description text,
  storage_path text,
  status artifact_status default 'pending',
  parsed_metadata jsonb,
  summary text,
  embeddings vector(1536),
  parse_error text,
  parsed_at timestamptz,
  created_at timestamptz default now()
);

create index artifacts_candidate_idx on artifacts(candidate_id);
create index artifacts_type_idx on artifacts(type);
create index artifacts_status_idx on artifacts(status);
create index artifacts_embeddings_idx on artifacts using ivfflat (embeddings vector_cosine_ops) with (lists = 100);

create table artifact_chunks (
  id uuid primary key default uuid_generate_v4(),
  artifact_id uuid references artifacts(id) on delete cascade,
  chunk_index int not null,
  content text not null,
  content_type text,
  file_path text,
  embeddings vector(1536),
  metadata jsonb,
  created_at timestamptz default now()
);

create index artifact_chunks_artifact_idx on artifact_chunks(artifact_id);
create index artifact_chunks_embeddings_idx on artifact_chunks using ivfflat (embeddings vector_cosine_ops) with (lists = 200);

create type interview_status as enum ('pending','in_progress','completed','abandoned','flagged');

create table interview_sessions (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references profiles(id) on delete cascade,
  artifact_ids uuid[] not null,
  job_title text,
  target_seniority text,
  status interview_status default 'pending',
  transcript jsonb default '[]'::jsonb,
  question_plan jsonb,
  duration_seconds int,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

create index interview_sessions_candidate_idx on interview_sessions(candidate_id);
create index interview_sessions_status_idx on interview_sessions(status);

create table dossiers (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references profiles(id) on delete cascade,
  interview_session_id uuid references interview_sessions(id) on delete cascade,
  overall_score int check (overall_score between 0 and 100),
  scores jsonb not null,
  artifact_insights jsonb,
  transcript_highlights jsonb,
  strengths text[],
  concerns text[],
  recommendation text check (recommendation in ('strong_hire','hire','maybe','no_hire')),
  public_share_token text unique,
  is_public boolean default false,
  generated_at timestamptz default now(),
  version int default 1
);

create index dossiers_candidate_idx on dossiers(candidate_id);
create index dossiers_score_idx on dossiers(overall_score);
create index dossiers_share_token_idx on dossiers(public_share_token);

create type role_status as enum ('draft','open','paused','closed');

create table roles (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  posted_by uuid references profiles(id),
  title text not null,
  seniority text,
  stack text[],
  location text,
  remote_pref text,
  salary_min int,
  salary_max int,
  currency text default 'USD',
  description text,
  ideal_candidate_prompt text,
  ideal_embeddings vector(1536),
  status role_status default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index roles_company_idx on roles(company_id);
create index roles_status_idx on roles(status);
create index roles_ideal_embeddings_idx on roles using ivfflat (ideal_embeddings vector_cosine_ops) with (lists = 100);

create type pipeline_stage as enum ('reviewing','contacted','interviewing','offer','hired','passed');

create table shortlist_entries (
  id uuid primary key default uuid_generate_v4(),
  role_id uuid references roles(id) on delete cascade,
  candidate_id uuid references profiles(id) on delete cascade,
  added_by uuid references profiles(id),
  stage pipeline_stage default 'reviewing',
  notes text,
  match_score numeric(5,2),
  added_at timestamptz default now(),
  stage_updated_at timestamptz default now(),
  unique(role_id, candidate_id)
);

create index shortlist_role_idx on shortlist_entries(role_id);
create index shortlist_candidate_idx on shortlist_entries(candidate_id);
create index shortlist_stage_idx on shortlist_entries(stage);

create table message_threads (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references profiles(id) on delete cascade,
  recruiter_id uuid references profiles(id) on delete cascade,
  role_id uuid references roles(id),
  last_message_at timestamptz default now(),
  candidate_unread int default 0,
  recruiter_unread int default 0,
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid references message_threads(id) on delete cascade,
  sender_id uuid references profiles(id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create index messages_thread_idx on messages(thread_id);
create index message_threads_candidate_idx on message_threads(candidate_id);
create index message_threads_recruiter_idx on message_threads(recruiter_id);

create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan text check (plan in ('starter','growth','enterprise')),
  seats int default 1,
  status text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create type flag_reason as enum (
  'inappropriate_artifact','ai_generated_code','spam','abuse',
  'ghosting_recruiter','fake_company','other'
);

create table flags (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid references profiles(id),
  target_type text not null,
  target_id uuid not null,
  reason flag_reason not null,
  detail text,
  status text default 'open' check (status in ('open','reviewed','actioned','dismissed')),
  resolution_note text,
  resolved_by uuid references profiles(id),
  resolved_at timestamptz,
  created_at timestamptz default now()
);

create index flags_status_idx on flags(status);
create index flags_target_idx on flags(target_type, target_id);

create table audit_log (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references profiles(id),
  action text not null,
  target_type text,
  target_id uuid,
  meta jsonb,
  created_at timestamptz default now()
);

create index audit_log_actor_idx on audit_log(actor_id);
create index audit_log_created_idx on audit_log(created_at desc);

create table recruiter_metrics (
  recruiter_id uuid primary key references profiles(id) on delete cascade,
  messages_sent int default 0,
  messages_replied int default 0,
  avg_response_hours numeric(6,2),
  hires_reported int default 0,
  ghost_count int default 0,
  health_score numeric(5,2) default 100,
  updated_at timestamptz default now()
);

create table waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  role text check (role in ('candidate','recruiter')),
  company text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz default now()
);

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger roles_updated_at before update on roles
  for each row execute function set_updated_at();
create trigger subscriptions_updated_at before update on subscriptions
  for each row execute function set_updated_at();

create or replace function public.handle_new_user() returns trigger as $$
declare
  requested_role user_role;
begin
  requested_role := case
    when new.raw_user_meta_data->>'role' in ('candidate','recruiter','admin')
      then (new.raw_user_meta_data->>'role')::user_role
    else 'candidate'::user_role
  end;

  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    requested_role
  )
  on conflict (id) do nothing;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
