alter table profiles enable row level security;
alter table companies enable row level security;
alter table recruiter_seats enable row level security;
alter table artifacts enable row level security;
alter table artifact_chunks enable row level security;
alter table interview_sessions enable row level security;
alter table dossiers enable row level security;
alter table roles enable row level security;
alter table shortlist_entries enable row level security;
alter table message_threads enable row level security;
alter table messages enable row level security;
alter table subscriptions enable row level security;
alter table flags enable row level security;
alter table recruiter_metrics enable row level security;

create or replace function public.current_user_role() returns text as $$
  select role::text from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

grant execute on function public.current_user_role() to authenticated;

create or replace function public.is_company_member(
  company uuid,
  allowed_roles text[] default array['owner','admin','member']
) returns boolean as $$
  select exists (
    select 1
    from public.recruiter_seats rs
    where rs.company_id = company
      and rs.profile_id = auth.uid()
      and rs.seat_role = any(allowed_roles)
  );
$$ language sql stable security definer set search_path = public;

grant execute on function public.is_company_member(uuid, text[]) to authenticated;

create policy "own profile: select" on profiles
  for select using (auth.uid() = id);
create policy "own profile: insert" on profiles
  for insert with check (auth.uid() = id);
create policy "own profile: update" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "recruiters can view visible candidates" on profiles
  for select using (
    public.current_user_role() = 'recruiter'
    and role = 'candidate'
    and visibility in ('public','recruiter_only')
  );
create policy "admin: all profiles" on profiles
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "authenticated can create company draft" on companies
  for insert with check (public.current_user_role() = 'recruiter');
create policy "recruiters can read own company" on companies
  for select using (public.is_company_member(companies.id));
create policy "recruiter owners manage company" on companies
  for update using (public.is_company_member(companies.id, array['owner','admin']));
create policy "admin: all companies" on companies
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "recruiters can read own seats" on recruiter_seats
  for select using (
    profile_id = auth.uid()
    or public.is_company_member(recruiter_seats.company_id)
  );
create policy "recruiter owners manage seats" on recruiter_seats
  for all using (public.is_company_member(recruiter_seats.company_id, array['owner','admin']))
  with check (public.is_company_member(recruiter_seats.company_id, array['owner','admin']));
create policy "admin: all recruiter seats" on recruiter_seats
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "own artifacts: all" on artifacts
  for all using (candidate_id = auth.uid()) with check (candidate_id = auth.uid());
create policy "recruiters read visible candidate artifacts" on artifacts
  for select using (
    public.current_user_role() = 'recruiter'
    and exists (
      select 1 from profiles p
      where p.id = artifacts.candidate_id
        and p.visibility in ('public','recruiter_only')
    )
  );
create policy "admin: all artifacts" on artifacts
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "candidate reads own chunks" on artifact_chunks
  for select using (
    exists (
      select 1 from artifacts a
      where a.id = artifact_chunks.artifact_id
        and a.candidate_id = auth.uid()
    )
  );
create policy "recruiters read visible candidate chunks" on artifact_chunks
  for select using (
    public.current_user_role() = 'recruiter'
    and exists (
      select 1 from artifacts a
      join profiles p on p.id = a.candidate_id
      where a.id = artifact_chunks.artifact_id
        and p.visibility in ('public','recruiter_only')
    )
  );
create policy "admin: all artifact chunks" on artifact_chunks
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "own interviews: all" on interview_sessions
  for all using (candidate_id = auth.uid()) with check (candidate_id = auth.uid());
create policy "admin: all interviews" on interview_sessions
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "own dossiers: all" on dossiers
  for all using (candidate_id = auth.uid()) with check (candidate_id = auth.uid());
create policy "recruiters read visible dossiers" on dossiers
  for select using (
    public.current_user_role() = 'recruiter'
    and exists (
      select 1 from profiles p
      where p.id = dossiers.candidate_id
        and p.visibility in ('public','recruiter_only')
    )
  );
create policy "public share reads public dossiers" on dossiers
  for select using (is_public = true);
create policy "admin: all dossiers" on dossiers
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "recruiters manage own company roles" on roles
  for all using (public.is_company_member(roles.company_id))
  with check (public.is_company_member(roles.company_id));
create policy "candidates read open roles" on roles
  for select using (status = 'open');
create policy "admin: all roles" on roles
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "recruiters manage shortlist for own roles" on shortlist_entries
  for all using (
    exists (
      select 1 from roles r
      where r.id = shortlist_entries.role_id
        and public.is_company_member(r.company_id)
    )
  ) with check (
    exists (
      select 1 from roles r
      where r.id = shortlist_entries.role_id
        and public.is_company_member(r.company_id)
    )
  );
create policy "admin: all shortlist entries" on shortlist_entries
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "participants read message threads" on message_threads
  for select using (candidate_id = auth.uid() or recruiter_id = auth.uid());
create policy "participants create message threads" on message_threads
  for insert with check (candidate_id = auth.uid() or recruiter_id = auth.uid());
create policy "participants update message threads" on message_threads
  for update using (candidate_id = auth.uid() or recruiter_id = auth.uid());
create policy "admin: all message threads" on message_threads
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "participants read messages" on messages
  for select using (
    exists (
      select 1 from message_threads t
      where t.id = messages.thread_id
        and (t.candidate_id = auth.uid() or t.recruiter_id = auth.uid())
    )
  );
create policy "participants send messages" on messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1 from message_threads t
      where t.id = messages.thread_id
        and (t.candidate_id = auth.uid() or t.recruiter_id = auth.uid())
    )
  );
create policy "admin: all messages" on messages
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "recruiters read own subscriptions" on subscriptions
  for select using (public.is_company_member(subscriptions.company_id));
create policy "admin: all subscriptions" on subscriptions
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "authenticated users create flags" on flags
  for insert with check (reporter_id = auth.uid());
create policy "reporters read own flags" on flags
  for select using (reporter_id = auth.uid());
create policy "admin: all flags" on flags
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "admin: all recruiter metrics" on recruiter_metrics
  for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
