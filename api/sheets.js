export async function appendToSheet(email, source) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  const body = JSON.stringify({ email, source });
  const headers = { 'Content-Type': 'application/json' };

  // Google Apps Script /exec redirects POST → GET (302), so follow manually
  const res = await fetch(url, { method: 'POST', headers, body, redirect: 'manual' });
  const location = res.headers.get('location');
  if (location) {
    await fetch(location, { method: 'POST', headers, body });
  }
}
