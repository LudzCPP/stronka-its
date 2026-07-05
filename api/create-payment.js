import crypto from 'node:crypto'
import { registerTransaction } from '../lib/przelewy24.js'
import { notifySheet } from '../lib/sheets.js'

// Ceny ustalane po stronie serwera - nigdy nie ufamy kwocie przysłanej z przeglądarki.
// TYMCZASOWO: cena Śniadaniowego obniżona do 1 zł na potrzeby testu płatności produkcyjnej - przywrócić do 85 po teście.
const PLANS = {
  sniadaniowy: { name: 'Abonament Śniadaniowy', price: 1 },
  max: { name: 'Abonament Max', price: 125 },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { planId, name, email, phone } = req.body || {}
  const plan = PLANS[planId]

  if (!plan || !name || !email || !phone) {
    res.status(400).json({ error: 'Brak wymaganych danych' })
    return
  }

  const siteUrl = process.env.SITE_URL
    || (process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://gramnaits.pl')
  const sessionId = crypto.randomUUID()
  const amount = plan.price * 100

  // Deploymenty Preview maja wlaczona ochrone logowaniem Vercel - P24 (jako zewnetrzny caller
  // bez sesji) nie przejdzie jej bez sekretu bypass. Produkcja nie ma tej ochrony wiec zbedne.
  const statusUrl = new URL('/api/payment-notify', siteUrl)
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_PROTECTION_BYPASS) {
    statusUrl.searchParams.set('x-vercel-protection-bypass', process.env.VERCEL_PROTECTION_BYPASS)
    statusUrl.searchParams.set('x-vercel-set-bypass-cookie', 'true')
  }

  try {
    await notifySheet({
      action: 'create',
      sessionId,
      name,
      email,
      phone,
      plan: plan.name,
      price: plan.price,
    })

    const { link } = await registerTransaction({
      sessionId,
      amount,
      currency: 'PLN',
      description: plan.name,
      email,
      country: 'PL',
      language: 'pl',
      urlReturn: `${siteUrl}/#abonamenty`,
      urlStatus: statusUrl.toString(),
    })

    res.status(200).json({ link })
  } catch (err) {
    res.status(502).json({ error: err.message || 'Nie udało się zainicjować płatności' })
  }
}
