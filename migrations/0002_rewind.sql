create table if not exists rewind_members (
  handle text primary key,
  name text not null,
  password_hash text not null,
  token_hash text,
  locker jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists rewind_follows (
  follower text not null,
  followee text not null,
  created_at timestamptz not null default now(),
  primary key (follower, followee)
);

create index if not exists rewind_follows_followee_idx on rewind_follows (followee);

create table if not exists rewind_messages (
  id bigserial primary key,
  sender text not null,
  recipient text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists rewind_messages_pair_idx on rewind_messages (sender, recipient, id);

create table if not exists rewind_films (
  slug text primary key,
  title text not null,
  year integer,
  director text not null default '',
  runtime integer not null default 0,
  overview text not null default '',
  genres text not null default '',
  themes text not null default '',
  palette text not null default '',
  catalog_no text not null default '',
  tagline text not null default ''
);
