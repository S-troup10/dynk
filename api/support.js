const ORANGE = '#FF7A1A';
const ORANGE_DEEP = '#E55A00';
const TEXT_1 = '#1A1A1A';
const TEXT_2 = '#5C5E68';
const TEXT_3 = '#8A8D9A';

const CONTACT_INBOX = 'contact@dynk.io';

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function baseEmail(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
<title>DYNK</title>
</head>
<body style="margin:0;padding:0;background:#F0E5DA;font-family:'Outfit',Arial,sans-serif;color:${TEXT_1};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:linear-gradient(180deg,#F8C9A5 0%,#F0E5DA 35%,#E5E6EE 70%,#DBDDE8 100%);min-height:100vh;padding:48px 16px;">
    <tr><td align="center" valign="top">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;">
        <tr><td align="center" style="padding-bottom:28px;">
          <span style="font-family:'Orbitron',Georgia,serif;font-size:20px;font-weight:900;letter-spacing:0.16em;color:${ORANGE};text-transform:uppercase;">DYNK</span>
        </td></tr>
        <tr><td style="background:rgba(255,255,255,0.88);border:1px solid rgba(255,122,26,0.15);border-radius:20px;padding:40px 36px;box-shadow:0 4px 32px rgba(255,122,26,0.08);">
          ${content}
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">
            &copy; DYNK &nbsp;&mdash;&nbsp;
            <a href="https://dynk.io" style="color:${ORANGE};text-decoration:none;font-weight:600;">dynk.io</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailRow(label, value) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background:linear-gradient(135deg,rgba(255,122,26,0.06),rgba(255,122,26,0.02));border:1px solid rgba(255,122,26,0.2);border-radius:12px;margin-bottom:14px;">
      <tr>
        <td style="padding:16px 22px;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">${label}</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:${TEXT_1};font-family:'Outfit',Arial,sans-serif;">${value}</p>
        </td>
      </tr>
    </table>`;
}

function notificationHtml({ name, email, topic, message }) {
  return baseEmail(`
    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${ORANGE};font-family:'Outfit',Arial,sans-serif;">New Support Enquiry</p>
    <h1 style="margin:0 0 28px;font-family:'Orbitron',Georgia,serif;font-size:22px;font-weight:900;color:${TEXT_1};letter-spacing:0.04em;">${esc(topic)}</h1>
    ${detailRow('From', esc(name))}
    ${detailRow('Email', esc(email))}
    ${detailRow('Topic', esc(topic))}
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background:rgba(0,0,0,0.02);border:1px solid rgba(0,0,0,0.08);border-radius:12px;margin-bottom:20px;">
      <tr>
        <td style="padding:16px 22px;">
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">Message</p>
          <p style="margin:0;font-size:15px;color:${TEXT_2};line-height:1.7;font-family:'Outfit',Arial,sans-serif;white-space:pre-wrap;">${esc(message)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:13px;color:${TEXT_3};line-height:1.6;font-family:'Outfit',Arial,sans-serif;">
      Reply directly to this email to respond to ${esc(name)}.
    </p>
  `);
}

function confirmationHtml({ name, topic, message }) {
  return baseEmail(`
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr><td align="center">
        <div style="display:inline-block;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,${ORANGE},${ORANGE_DEEP});text-align:center;line-height:60px;font-size:26px;color:#fff;">&#10003;</div>
      </td></tr>
    </table>
    <h1 style="margin:0 0 12px;font-family:'Orbitron',Georgia,serif;font-size:22px;font-weight:900;color:${TEXT_1};letter-spacing:0.04em;text-align:center;">We got your message.</h1>
    <p style="margin:0 0 28px;font-size:15px;color:${TEXT_2};line-height:1.7;text-align:center;font-family:'Outfit',Arial,sans-serif;">
      Thanks for reaching out, ${esc(name)}. We&rsquo;ve received your enquiry and<br>our team will get back to you <strong style="color:${TEXT_1};font-weight:700;">very soon</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background:rgba(0,0,0,0.02);border:1px solid rgba(0,0,0,0.08);border-radius:12px;margin-bottom:24px;">
      <tr>
        <td style="padding:18px 22px;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">Topic</p>
          <p style="margin:0 0 14px;font-size:15px;font-weight:600;color:${TEXT_1};font-family:'Outfit',Arial,sans-serif;">${esc(topic)}</p>
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">Your message</p>
          <p style="margin:0;font-size:14px;color:${TEXT_2};line-height:1.7;font-family:'Outfit',Arial,sans-serif;white-space:pre-wrap;">${esc(message)}</p>
        </td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      <tr><td style="height:1px;background:linear-gradient(90deg,rgba(255,122,26,0),${ORANGE},rgba(255,122,26,0));"></td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding-bottom:8px;">
        <p style="margin:0 0 16px;font-size:13px;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">In the meantime, explore what we&rsquo;re building.</p>
        <a href="https://dynk.io"
          style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,${ORANGE},${ORANGE_DEEP});color:#fff;font-family:'Outfit',Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.04em;">
          Visit dynk.io &rarr;
        </a>
      </td></tr>
    </table>
  `);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let { name, email, topic, message } = req.body || {};
  name = (name || '').toString().trim();
  email = (email || '').toString().trim();
  topic = (topic || 'General enquiry').toString().trim();
  message = (message || '').toString().trim();

  if (!name || !email || !email.includes('@') || !message) {
    return res.status(400).json({ ok: false, error: 'Invalid submission' });
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND;
  if (!apiKey) {
    console.error('[support] RESEND_API_KEY not set');
    return res.status(500).json({ ok: false, error: 'email_not_configured' });
  }

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    await Promise.all([
      // Notify the DYNK team
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: 'DYNK Support <noreply@dynk.io>',
          to: CONTACT_INBOX,
          reply_to: email,
          subject: `[Support] ${topic} — ${name}`,
          html: notificationHtml({ name, email, topic, message }),
          text: `New support enquiry\n\nFrom: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`,
        }),
      }),
      // Confirm to the user
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: 'DYNK <noreply@dynk.io>',
          to: email,
          reply_to: CONTACT_INBOX,
          subject: 'We got your message — DYNK Support',
          html: confirmationHtml({ name, topic, message }),
          text: `Thanks for reaching out, ${name}. We've received your enquiry (${topic}) and our team will get back to you very soon.\n\nYour message:\n${message}\n\nVisit us at https://dynk.io`,
        }),
      }),
    ]);
  } catch (err) {
    console.error('[support] send failed:', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }

  return res.status(200).json({ ok: true });
}
