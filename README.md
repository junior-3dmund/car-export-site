# Route One Motors — Car Export Site

A real, deployable Next.js car listing site: search/filter inventory, car
detail pages, an inquiry form that emails you, and an admin form to add cars.

Works out of the box with sample data — becomes a real, live business site
once you plug in the four free-tier services below.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it runs immediately using the sample cars in
`data/sample-cars.json`, no accounts needed yet.

## 2. Set up the real database (Supabase — free tier)

1. Create a project at supabase.com
2. In the SQL editor, run:

```sql
create table cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  year int not null,
  price numeric not null,
  mileage int default 0,
  fuel text,
  transmission text,
  origin_port text,
  image text not null,
  description text,
  created_at timestamp default now()
);

alter table cars enable row level security;

create policy "Public read access"
  on cars for select
  using (true);
```

The RLS policy above allows anyone to *read* cars (needed for the site to
show listings) but blocks writes from the browser — writes only happen
through `/api/admin/cars`, using the service role key server-side.

3. Copy your Project URL, anon key, and service role key from
   Settings → API into `.env.local` (copy `.env.example` to start).

## 3. Set up image hosting (Cloudinary — free tier)

1. Create an account at cloudinary.com
2. Create an unsigned upload preset (Settings → Upload)
3. For now, paste image URLs directly into the admin form's `image` field
   (a full drag-and-drop uploader is a natural next feature to add)

## 4. Set up real inquiry emails (Resend — free tier)

1. Create an account at resend.com, verify a sending domain
2. Copy your API key into `.env.local`
3. Update the `from` address in `app/api/inquiry/route.js` to match your
   verified domain

## 5. Set your admin password

Set `ADMIN_PASSWORD` in `.env.local`. Visit `/admin` to add real cars.
**This is a placeholder gate, not real authentication** — before taking the
site fully live, replace it with Clerk (clerk.com) or Supabase Auth so the
admin route requires a real login, not just a shared password.

## 6. Deploy for real

1. Push this project to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Add all the same environment variables from `.env.local` in Vercel's
   project settings
4. Deploy — Vercel gives you a live `.vercel.app` URL immediately
5. Buy a domain (Namecheap/GoDaddy) and add it in Vercel → Domains;
   Vercel shows you the exact DNS records to add at your registrar

## 7. Before you call it done

- [ ] Add a privacy policy + terms page (required once you're collecting
      emails via the inquiry form)
- [ ] Add Google Analytics or Plausible
- [ ] Submit the site to Google Search Console and add a sitemap
- [ ] Replace the admin password gate with real auth
- [ ] Add real car photos (your own, not stock images)
- [ ] Test the inquiry form end-to-end and confirm you receive the email

## Project structure

```
app/
  page.js              → home page
  cars/page.js          → listing + filters
  cars/[id]/page.js     → car detail + inquiry form
  admin/page.js          → add-car form
  api/inquiry/route.js   → sends inquiry emails
  api/admin/cars/route.js → inserts new cars (password-checked)
components/              → Navbar, Footer, CarCard, SearchBar, InquiryForm
lib/                      → Supabase clients + data-fetching helpers
data/sample-cars.json     → fallback data used until Supabase is connected
```
