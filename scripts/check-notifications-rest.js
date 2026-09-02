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

(async function main() {
  const env = parseDotenv(path.resolve(process.cwd(), '.env.local'));
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('Missing env values in .env.local');
    process.exit(2);
  }

  const url = new URL('/rest/v1/notifications?select=*&limit=5', supabaseUrl).toString();
  console.log('Querying', url);
  try {
    const res = await fetch(url, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, Accept: 'application/json' },
    });
    console.log('Status:', res.status);
    const txt = await res.text();
    console.log('Body:', txt);
    process.exit(res.ok ? 0 : 3);
  } catch (e) {
    console.error('Request failed:', e.message || e);
    process.exit(4);
  }
})();
