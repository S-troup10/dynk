export async function appendToSheet(email, source) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  const params = new URLSearchParams({ email, source: source || 'home' });
  await fetch(`${url}?${params}`);
}
