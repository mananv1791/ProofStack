insert into companies (id, name, domain, size, industry, website, verified)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Northstar Labs',
    'northstarlabs.example',
    '51-200',
    'Developer tools',
    'https://northstarlabs.example',
    true
  )
on conflict (domain) do nothing;

insert into roles (
  id,
  company_id,
  title,
  seniority,
  stack,
  location,
  remote_pref,
  salary_min,
  salary_max,
  description,
  ideal_candidate_prompt,
  status
)
values
  (
    '22222222-2222-4222-8222-222222222222',
    '11111111-1111-4111-8111-111111111111',
    'Founding full-stack engineer',
    'senior',
    array['nextjs','typescript','postgres','realtime'],
    'New York, NY',
    'hybrid',
    160000,
    220000,
    'Build product surfaces and backend workflows for a fast-growing collaboration product.',
    'A great candidate has shipped production realtime systems with tenant isolation, failure handling, and clear operational trade-offs.',
    'open'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    '11111111-1111-4111-8111-111111111111',
    'Senior backend engineer',
    'senior',
    array['postgres','queues','observability','billing'],
    'Remote',
    'remote',
    150000,
    210000,
    'Own reliable backend workflows, payment events, and data consistency boundaries.',
    'A great candidate has built durable services, reconciled third-party webhook state, and tested degraded modes.',
    'open'
  )
on conflict (id) do nothing;
