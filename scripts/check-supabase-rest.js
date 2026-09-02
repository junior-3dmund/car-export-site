const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function parseDotenv(file) {
  const txt = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const lines = txt.split(/\r?\n/);
  const out = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const val = trimmed.slice(idx + 1);
    out[key] = val;
  }
  return out;
}

async function main() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const env = parseDotenv(envPath);
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(2);
  }

  // Try querying the admins table (safe read using service role)
  const url = new URL('/rest/v1/admins?select=*&limit=1', supabaseUrl).toString();

  console.log('Checking Supabase REST endpoint:', url);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json',
      },
    });

    console.log('Status:', res.status);
    const body = await res.text();
    console.log('Body:', body.slice(0, 200));
    if (res.ok) {
      console.log('Supabase REST request succeeded.');
      process.exit(0);
    } else {
      console.error('Supabase REST returned non-OK status.');
      process.exit(3);
    }
  } catch (err) {
    console.error('Request failed:', err.message || err);
    process.exit(4);
  }
}

main();
