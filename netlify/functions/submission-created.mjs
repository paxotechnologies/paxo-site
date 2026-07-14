// Fires automatically whenever a Netlify form is submitted.
// Sends the right welcome email depending on which form it was.
// Requires env var: RESEND_API_KEY

const FROM = 'PAXO <hello@paxoride.com>';
const REPLY_TO = 'hello@paxoride.com';

// ── Email content ──────────────────────────────────────────────
function driverEmail(name) {
  const first = (name || '').trim().split(' ')[0] || 'there';
  return {
    subject: "You're a Founding Driver — PAXO",
    text: `Hi ${first},

Thanks for joining the PAXO founding driver waitlist.

Here's what happens next: we'll email you as soon as PAXO opens in your area, and founding drivers go first — priority approval, higher launch bonuses, and a Founding Driver badge on your profile.

Quick reminder of why we're building this. Every other rideshare app takes 30-40% of your fare. PAXO takes none of it. You'll pay one flat daily rate, only on the days you drive, and keep 100% of every fare and every tip.

We're launching in Pittsburgh, pending approval from the Pennsylvania Public Utility Commission. We'll keep you posted as that progresses.

Questions? Just reply to this email — it comes straight to us.

— The PAXO team
paxoride.com`,
    html: wrap(`
      <p>Hi ${esc(first)},</p>
      <p>Thanks for joining the PAXO founding driver waitlist.</p>
      <p>Here's what happens next: we'll email you as soon as PAXO opens in your area, and founding drivers go first.</p>
      ${perks([
        'Priority approval — front of the queue at launch',
        'Higher launch bonuses than later sign-ups',
        'Founding Driver badge on your profile',
        'Extra referral rewards for bringing other drivers'
      ], 'Your founding driver benefits')}
      <p>Quick reminder of why we're building this. Every other rideshare app takes 30–40% of your fare. <strong style="color:#0B1F3A">PAXO takes none of it.</strong> You'll pay one flat daily rate, only on the days you drive, and keep 100% of every fare and every tip.</p>
      <p>We're launching in Pittsburgh, pending approval from the Pennsylvania Public Utility Commission. We'll keep you posted as that progresses.</p>
      <p>Questions? Just reply to this email — it comes straight to us.</p>
      <p style="margin-top:26px">— The PAXO team</p>
    `)
  };
}

function riderEmail(name) {
  const first = (name || '').trim().split(' ')[0] || 'there';
  return {
    subject: "You're a Founding Rider — PAXO",
    text: `Hi ${first},

Thanks for joining the PAXO founding rider waitlist.

We'll email you the moment PAXO opens in Pittsburgh — with your $20 founding rider credit ready to use, and early access before the public launch.

Why PAXO is different: no commission means fares come down. No surge pricing, no booking fees, no service fees. Just a fair price, every time — and you'll see exactly what you saved on every ride.

We're launching pending approval from the Pennsylvania Public Utility Commission. We'll keep you posted.

Questions? Just reply to this email — it comes straight to us.

— The PAXO team
paxoride.com

Founding rider credit is subject to launch terms and availability.`,
    html: wrap(`
      <p>Hi ${esc(first)},</p>
      <p>Thanks for joining the PAXO founding rider waitlist.</p>
      <p>We'll email you the moment PAXO opens in Pittsburgh.</p>
      ${perks([
        '$20 in ride credit when we launch',
        'Early access before the public launch',
        'Referral rewards for inviting friends',
        'No surge pricing — ever'
      ], 'Your founding rider benefits')}
      <p>Why PAXO is different: no commission means fares come down. <strong style="color:#0B1F3A">No surge pricing, no booking fees, no service fees.</strong> Just a fair price, every time — and you'll see exactly what you saved on every ride.</p>
      <p>We're launching pending approval from the Pennsylvania Public Utility Commission. We'll keep you posted.</p>
      <p>Questions? Just reply to this email — it comes straight to us.</p>
      <p style="margin-top:26px">— The PAXO team</p>
      <p style="font-size:12px;color:#94A3B8;margin-top:18px">Founding rider credit is subject to launch terms and availability.</p>
    `)
  };
}

// ── Presentation helpers ───────────────────────────────────────
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}

function perks(items, title) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background:#E6FFFA;border:1px solid #99D8D0;border-radius:10px;margin:22px 0">
    <tr><td style="padding:18px 20px">
      <p style="margin:0 0 12px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;
                color:#065F52;font-weight:700">${esc(title)}</p>
      ${items.map(i => `<p style="margin:0 0 8px;font-size:14px;color:#475569;line-height:1.5">
        <span style="color:#0D9488;font-weight:700">•</span> ${esc(i)}</p>`).join('')}
    </td></tr>
  </table>`;
}

function wrap(inner) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8FAFC">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:560px;background:#fff;border-radius:14px;overflow:hidden;
                    border:1px solid #E2E8F0">

        <!-- Header -->
        <tr><td style="background:#0B1F3A;padding:26px 28px">
          <p style="margin:0;font-size:20px;font-weight:700;letter-spacing:.2em;color:#0D9488;
                    font-family:Arial,sans-serif">PAXO</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px;font-family:-apple-system,Segoe UI,Arial,sans-serif;
                       font-size:15px;line-height:1.65;color:#475569">
          ${inner}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:20px 28px;
                       font-family:Arial,sans-serif;font-size:11px;color:#94A3B8;line-height:1.7">
          &copy; 2026 Paxo Technologies LLC &nbsp;·&nbsp;
          <a href="https://paxoride.com" style="color:#94A3B8">paxoride.com</a><br/>
          You're receiving this because you joined the PAXO waitlist at paxoride.com.<br/>
          To be removed, reply to this email or contact
          <a href="mailto:privacy@paxoride.com" style="color:#94A3B8">privacy@paxoride.com</a>.
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ── Handler ────────────────────────────────────────────────────
export default async (req) => {
  try {
    const { payload } = await req.json();
    const formName = payload?.form_name;
    const data = payload?.data || {};
    const to = data.email;

    if (!to) {
      console.log('No email address in submission — skipping');
      return new Response('No email', { status: 200 });
    }

    let mail;
    if (formName === 'driver-waitlist')      mail = driverEmail(data.name);
    else if (formName === 'rider-waitlist')  mail = riderEmail(data.name);
    else {
      console.log(`Unrecognised form: ${formName} — skipping`);
      return new Response('Unknown form', { status: 200 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: REPLY_TO,
        subject: mail.subject,
        text: mail.text,
        html: mail.html
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', res.status, err);
      return new Response('Send failed', { status: 200 }); // 200 so Netlify doesn't retry-loop
    }

    console.log(`Welcome email sent: ${formName} -> ${to}`);
    return new Response('Sent', { status: 200 });

  } catch (e) {
    console.error('Function error:', e);
    return new Response('Error', { status: 200 });
  }
};
