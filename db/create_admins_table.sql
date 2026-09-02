-- Create `admins` table and insert an initial seed row.
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).

-- Ensure pgcrypto is available for gen_random_uuid()
create extension if not exists "pgcrypto";

create table if not exists public.admins (
  id uuid default gen_random_uuid() primary key,
  -- Optional link to auth user id (nullable). Use the uuid from auth.users.id
  user_id uuid references auth.users(id) on delete set null,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- Example seed row. Replace the values below with a real `user_id` (from auth.users)
-- or set user_id to NULL and identify the admin by email.
-- Replace 'admin@example.com' with the admin's email.
insert into public.admins (user_id, email, role) values (null, 'admin@example.com', 'admin');

-- Quick verification
select * from public.admins limit 10;
