import { useState } from 'react'
import AnimateIn from './AnimateIn'

const PLANS = [
  {
    id: 'sniadaniowy',
    name: 'Abonament Śniadaniowy',
    price: 85,
    badge: null,
    hoursLabel: 'Wejścia w godz. 6:00–13:00',
    features: [
      'Dostęp do sali w godz. 6:00–13:00',
      'Bez limitu wejść przez cały miesiąc',
      'Wszystkie stoły do dyspozycji',
      'Ważny 30 dni od zakupu',
    ],
    highlighted: false,
  },
  {
    id: 'max',
    name: 'Abonament Max',
    price: 125,
    badge: 'Najpopularniejszy',
    hoursLabel: 'Pełny dostęp 6:00–24:00',
    features: [
      'Pełny dostęp do sali 6:00–24:00',
      'Bez limitu wejść przez cały miesiąc',
      'Wszystkie stoły do dyspozycji',
      'Priorytet w godzinach szczytu',
      'Ważny 30 dni od zakupu',
    ],
    highlighted: true,
  },
]

export default function Abonament() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <section id="abonamenty" className="py-24 bg-[#0f1423] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#0075C4]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">Abonamenty</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Nieograniczony dostęp<br />do sali przez cały miesiąc
          </h2>
          <p className="text-gray-300 max-w-sm lg:text-right text-base">
            Kup online — płatność kartą, BLIK lub przelewem.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto lg:mx-0">
          {PLANS.map((plan, i) => (
            <AnimateIn key={plan.id} delay={i * 120}>
            <div
              className={`relative rounded-2xl p-8 border flex flex-col transition-all duration-200 h-full ${
                plan.highlighted
                  ? 'bg-[#080b14] border-[#0075C4]/50 shadow-[0_0_40px_rgba(0,117,196,0.12)]'
                  : 'bg-[#080b14] border-white/8 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-8 bg-[#0075C4] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-400 mb-1">{plan.name}</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-lg mb-1.5">zł<span className="text-sm font-normal"> /mies.</span></span>
                </div>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{plan.hoursLabel}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-gray-200 text-sm">
                    <CheckIcon className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-[#0075C4]' : 'text-gray-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base min-h-[52px] transition-all duration-200 active:scale-95 ${
                  plan.highlighted
                    ? 'bg-[#0075C4] text-white hover:bg-blue-700 shadow-lg'
                    : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                Kup abonament
              </button>
            </div>
            </AnimateIn>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-400 max-w-lg">
          Po zakupie otrzymasz e-mail z potwierdzeniem. Numer telefonu podany przy zakupie zostanie aktywowany w systemie dostępu do sali — możesz wejść dzwoniąc na dedykowany numer przy drzwiach.
        </p>

      </div>

      {selectedPlan && (
        <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  )
}

function CheckoutModal({ plan, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Replace with Przelewy24/PayU API — create transaction, redirect to payment URL
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setDone(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#0f1423] rounded-2xl border border-white/10 shadow-2xl">

        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Zakup abonamentu</p>
            <h3 className="text-white font-bold text-lg">{plan.name}</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-extrabold text-white">
              {plan.price} <span className="text-base font-normal text-gray-400">zł</span>
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Zamknij"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0075C4]/15 flex items-center justify-center mx-auto mb-5">
              <CheckIcon className="w-8 h-8 text-[#0075C4]" />
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Przekierowujemy do płatności</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Za chwilę zostaniesz przeniesiony do bezpiecznej bramki płatniczej.<br />
              Po opłaceniu wyślemy potwierdzenie na <span className="text-gray-200">podany adres e-mail</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            <FormField label="Imię i nazwisko">
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Jan Kowalski"
                className="w-full px-4 py-3 rounded-xl bg-[#080b14] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0075C4]/60 transition-colors text-base"
              />
            </FormField>

            <FormField label="Adres e-mail">
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="jan@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#080b14] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0075C4]/60 transition-colors text-base"
              />
            </FormField>

            <FormField
              label="Numer telefonu"
              hint="Numer zostanie aktywowany w systemie wejść do sali."
            >
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+48 500 000 000"
                className="w-full px-4 py-3 rounded-xl bg-[#080b14] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0075C4]/60 transition-colors text-base"
              />
            </FormField>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 px-6 rounded-xl bg-[#0075C4] text-white font-bold text-base min-h-[52px] hover:bg-blue-700 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><SpinnerIcon />Przetwarzanie...</>
              ) : (
                <><LockIcon />Przejdź do płatności — {plan.price} zł</>
              )}
            </button>

            <p className="text-xs text-gray-600 text-center pt-1">
              Płatność obsługuje Przelewy24 · BLIK, karta, przelew
            </p>

          </form>
        )}
      </div>
    </div>
  )
}

function FormField({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-600 mt-1.5">{hint}</p>}
    </div>
  )
}

function CheckIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}
