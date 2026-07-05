import crypto from 'node:crypto'

const SANDBOX_URL = 'https://sandbox.przelewy24.pl'
const PRODUCTION_URL = 'https://secure.przelewy24.pl'

function baseUrl() {
  return process.env.PRZELEWY24_ENV === 'production' ? PRODUCTION_URL : SANDBOX_URL
}

function sha384(data) {
  return crypto.createHash('sha384').update(data, 'utf8').digest('hex')
}

function credentials() {
  const merchantId = Number(process.env.PRZELEWY24_MERCHANT_ID)
  const posId = Number(process.env.PRZELEWY24_POS_ID || process.env.PRZELEWY24_MERCHANT_ID)
  const apiKey = process.env.PRZELEWY24_API_KEY
  const crc = process.env.PRZELEWY24_CRC

  if (!merchantId || !apiKey || !crc) {
    throw new Error('Brak konfiguracji Przelewy24 (zmienne środowiskowe)')
  }

  return { merchantId, posId, apiKey, crc }
}

function authHeader(posId, apiKey) {
  return `Basic ${Buffer.from(`${posId}:${apiKey}`).toString('base64')}`
}

// Rejestruje transakcję. Struktura hashData i kolejność pól musi dokładnie
// odpowiadać algorytmowi P24 (sha384 nad JSON.stringify) - patrz dokumentacja REST API v3.
export async function registerTransaction(order) {
  const { merchantId, posId, apiKey, crc } = credentials()

  const hashData = {
    sessionId: order.sessionId,
    merchantId,
    amount: order.amount,
    currency: order.currency,
    crc,
  }
  const sign = sha384(JSON.stringify(hashData))

  const body = { merchantId, posId, ...order, sign }

  const res = await fetch(`${baseUrl()}/api/v1/transaction/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(posId, apiKey),
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok || !data?.data?.token) {
    throw new Error(data?.error || `Przelewy24: rejestracja transakcji nie powiodła się (HTTP ${res.status})`)
  }

  return {
    token: data.data.token,
    link: `${baseUrl()}/trnRequest/${data.data.token}`,
  }
}

// Weryfikuje sign przychodzącego powiadomienia (webhook) - używa wszystkich pól
// z powiadomienia (poza "sign"), niezależnie od tego jakie dokładnie pola P24 wysłał.
export function verifyNotificationSign(notification) {
  const { crc } = credentials()
  const { sign, ...rest } = notification || {}

  if (!sign) return false

  const hash = sha384(JSON.stringify({ ...rest, crc }))
  return hash === sign
}

// Potwierdza przechwycenie środków - dopiero to wywołanie kończy transakcję po stronie P24.
export async function verifyTransaction({ sessionId, amount, currency, orderId }) {
  const { merchantId, posId, apiKey, crc } = credentials()

  const hashData = { sessionId, orderId, amount, currency, crc }
  const sign = sha384(JSON.stringify(hashData))

  const body = { merchantId, posId, sessionId, amount, currency, orderId, sign }

  const res = await fetch(`${baseUrl()}/api/v1/transaction/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(posId, apiKey),
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return res.ok && data?.data?.status === 'success'
}
