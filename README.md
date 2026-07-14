# paxoride.com

Landing page and founding waitlist for PAXO (Paxo Technologies LLC).

## Structure

- `index.html` — landing page + driver/rider waitlist forms (Netlify Forms)
- `privacy.html` — waitlist privacy policy
- `netlify/functions/submission-created.mjs` — sends welcome emails via Resend on each signup
- `netlify.toml` — Netlify config

## Deploying

Push to `master`. Netlify auto-deploys.

## Environment variables (set in Netlify UI, never commit)

- `RESEND_API_KEY` — Resend API key for sending welcome emails

## Forms

Two Netlify Forms, detected at deploy time from `index.html`:
- `driver-waitlist`
- `rider-waitlist`

Submissions appear in Netlify > Forms and export to CSV.
Planned: migrate to PAXO API + Supabase at launch.
