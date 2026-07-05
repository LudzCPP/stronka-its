import { verifyNotificationSign, verifyTransaction } from '../lib/przelewy24.js'
import { notifySheet } from '../lib/sheets.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const notification = req.body || {}

  if (!verifyNotificationSign(notification)) {
    res.status(400).json({ error: 'Nieprawidłowy podpis' })
    return
  }

  const paid = await verifyTransaction({
    sessionId: notification.sessionId,
    amount: notification.amount,
    currency: notification.currency,
    orderId: notification.orderId,
  })

  if (!paid) {
    res.status(400).json({ error: 'Weryfikacja transakcji nie powiodła się' })
    return
  }

  await notifySheet({
    action: 'confirm',
    sessionId: notification.sessionId,
    orderId: notification.orderId,
  })

  res.status(200).end('OK')
}
