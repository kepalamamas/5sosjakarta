const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const outputPath = path.join(root, 'js', 'config.js');

if (!fs.existsSync(envPath)) {
  throw new Error('Missing .env. Copy .env.example to .env and set SODTIX_PAYLOAD_SECRET.');
}

const values = {};
for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match && !match[1].startsWith('#')) {
    values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

if (!values.SODTIX_PAYLOAD_SECRET || values.SODTIX_PAYLOAD_SECRET === 'replace-with-backend-secret') {
  throw new Error('SODTIX_PAYLOAD_SECRET is missing from .env.');
}

if (!values.SODTIX_TURNSTILE_SITE_KEY) {
  throw new Error('SODTIX_TURNSTILE_SITE_KEY is missing from .env.');
}

const config = {
  apiBase: values.SODTIX_API_BASE || 'https://sodtix.com/api/v1',
  eventSlug: values.SODTIX_EVENT_SLUG || '3bdd4ea2-843d-4bde-b4c8-45cd0d9673fe',
  payloadSecret: values.SODTIX_PAYLOAD_SECRET,
  turnstileSiteKey: values.SODTIX_TURNSTILE_SITE_KEY
};

fs.writeFileSync(outputPath, `window.SODTIX_CONFIG = ${JSON.stringify(config)};\n`);
console.log(`Generated ${path.relative(root, outputPath)}`);
