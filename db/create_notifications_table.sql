-- Create `notifications` table for admin notices
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)

create extension if not exists "pgcrypto";

create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  message text,
  author_user_id uuid references auth.users(id) on delete set null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Example seed
insert into public.notifications (title, message, read) values ('Welcome', 'This is a test notice', false);

select * from public.notifications limit 10;
