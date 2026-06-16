import { appendToSheet } from './sheets.js';

const ORANGE = '#FF7A1A';
const ORANGE_DEEP = '#E55A00';
const BG = '#F0E5DA';
const CARD_BG = '#FFFFFF';
const TEXT_1 = '#1A1A1A';
const TEXT_2 = '#5C5E68';
const TEXT_3 = '#8A8D9A';

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
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:linear-gradient(180deg,#F8C9A5 0%,#F0E5DA 35%,#E5E6EE 70%,#DBDDE8 100%);min-height:100vh;padding:48px 16px;">
    <tr><td align="center" valign="top">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:28px;">
          <span style="font-family:'Orbitron',Georgia,serif;font-size:20px;font-weight:900;letter-spacing:0.16em;color:${ORANGE};text-transform:uppercase;">DYNK</span>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:rgba(255,255,255,0.88);border:1px solid rgba(255,122,26,0.15);border-radius:20px;padding:40px 36px;box-shadow:0 4px 32px rgba(255,122,26,0.08);">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">
            &copy; DYNK &nbsp;&mdash;&nbsp;
            <a href="https://dynk.io" style="color:${ORANGE};text-decoration:none;font-weight:600;">dynk.io</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>`;
}

function notificationHtml(email) {
  return baseEmail(`
    <!-- Label -->
    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${ORANGE};font-family:'Outfit',Arial,sans-serif;">New Submission</p>

    <!-- Heading -->
    <h1 style="margin:0 0 28px;font-family:'Orbitron',Georgia,serif;font-size:22px;font-weight:900;color:${TEXT_1};letter-spacing:0.04em;">Founder Signup</h1>

    <!-- Email row -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background:linear-gradient(135deg,rgba(255,122,26,0.06),rgba(255,122,26,0.02));border:1px solid rgba(255,122,26,0.2);border-radius:12px;margin-bottom:28px;">
      <tr>
        <td style="padding:18px 22px;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_3};font-family:'Outfit',Arial,sans-serif;">From</p>
          <p style="margin:0;font-size:17px;font-weight:600;color:${TEXT_1};font-family:'Outfit',Arial,sans-serif;">${email}</p>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
      <tr><td style="height:1px;background:linear-gradient(90deg,${ORANGE},rgba(255,122,26,0));"></td></tr>
    </table>

    <p style="margin:0;font-size:14px;color:${TEXT_2};line-height:1.7;font-family:'Outfit',Arial,sans-serif;">
      Someone just filled in the Founders form. Reach out within 24 hours.
    </p>
  `);
}

function confirmationHtml() {
  return baseEmail(`
    <!-- Icon -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr><td align="center">
        <div style="display:inline-block;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,${ORANGE},${ORANGE_DEEP});text-align:center;line-height:60px;font-size:26px;color:#fff;">✓</div>
      </td></tr>
    </table>

    <!-- Heading -->
    <h1 style="margin:0 0 12px;font-family:'Orbitron',Georgia,serif;font-size:22px;font-weight:900;color:${TEXT_1};letter-spacing:0.04em;text-align:center;">We got your email.</h1>

    <p style="margin:0 0 32px;font-size:15px;color:${TEXT_2};line-height:1.7;text-align:center;font-family:'Outfit',Arial,sans-serif;">
      Thanks for reaching out. We&rsquo;ve received your details<br>and will get back to you <strong style="color:${TEXT_1};font-weight:700;">within 24 hours</strong>.
    </p>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      <tr><td style="height:1px;background:linear-gradient(90deg,rgba(255,122,26,0),${ORANGE},rgba(255,122,26,0));"></td></tr>
    </table>

    <!-- CTA -->
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

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const headers = {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  };

  await Promise.all([
    appendToSheet(email, 'founders'),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: 'DYNK <noreply@dynk.io>',
        to: 'simontroup27@gmail.com',
        subject: `New founder signup: ${email}`,
        html: notificationHtml(email),
        text: `New founder signup: ${email}`,
      }),
    }),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: 'DYNK <noreply@dynk.io>',
        to: email,
        subject: 'We got your email — talk soon.',
        html: confirmationHtml(),
        text: `Thanks for reaching out to DYNK. We've received your details and will get back to you within 24 hours.\n\nVisit us at https://dynk.io`,
      }),
    }),
  ]);

  res.status(200).json({ ok: true });
}
