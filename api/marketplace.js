import crypto from 'crypto';

const ANALYTICS_URL = process.env.DYNK_ANALYTICS_URL ||
  'https://dynk-wallet-analytics.s3.ap-south-1.amazonaws.com/analytics.json';

const ANALYTICS_SALT_HEX = process.env.DYNK_ANALYTICS_SALT || 'd39cd889';

function decrypt(file) {
  const secret = process.env.DYNK_ANALYTICS_SECRET;
  if (!secret) throw new Error('DYNK_ANALYTICS_SECRET not set');
  const salt = Buffer.from(ANALYTICS_SALT_HEX, 'hex');
  const key  = crypto.scryptSync(secret, salt, 32);
  const d    = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(file.iv, 'hex'));
  d.setAAD(Buffer.from(`${file.versionCode}:${file.timestamp}`, 'utf8'));
  d.setAuthTag(Buffer.from(file.authTag, 'hex'));
  const dec = Buffer.concat([d.update(Buffer.from(file.ciphertext, 'base64')), d.final()]);
  return JSON.parse(dec.toString('utf8'));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  let file;
  try {
    const r = await fetch(ANALYTICS_URL);
    if (!r.ok) throw new Error(`S3 ${r.status}`);
    file = await r.json();
  } catch (err) {
    console.error('[marketplace] fetch failed:', err);
    return res.status(200).json({ ok: false, error: 'fetch_failed' });
  }

  let data;
  try {
    data = decrypt(file);
  } catch (err) {
    console.error('[marketplace] decrypt failed:', err.message);
    return res.status(200).json({ ok: false, error: 'decrypt_failed' });
  }

  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=600');
  return res.status(200).json({ ok: true, generatedAt: file.timestamp, data });
}
