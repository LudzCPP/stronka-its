// Wywołuje Google Apps Script Web App podłączony do arkusza z abonamentami.
export async function notifySheet(payload) {
  const url = process.env.APPS_SCRIPT_URL
  const secret = process.env.APPS_SCRIPT_SECRET

  if (!url || !secret) {
    throw new Error('Brak konfiguracji Google Apps Script (APPS_SCRIPT_URL / APPS_SCRIPT_SECRET)')
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, secret }),
  })

  const data = await res.json()

  if (!data.ok) {
    throw new Error(data.error || 'Zapis do arkusza nie powiódł się')
  }

  return data
}
