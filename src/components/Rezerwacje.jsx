import AnimateIn from './AnimateIn'

function CalendarIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

// Gdy właściciel dostarczy kod embed z panelu nakiedy.pl,
// podmień EMBED_SRC na właściwy URL lub wstaw kod snippet zamiast iframe.
const EMBED_SRC = "https://its.nakiedy.pl/em/?h=1300"

export default function Rezerwacje() {
  return (
    <section id="rezerwacje" className="py-24 bg-[#0f1423] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <AnimateIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0075C4]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">Rezerwacje</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Zarezerwuj stół online
            </h2>
            <a
              href="https://its.nakiedy.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#0075C4] hover:text-blue-400 transition-colors font-semibold shrink-0"
            >
              Otwórz w nowej karcie
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </AnimateIn>

        {/* Mobile: przycisk CTA zamiast iframe */}
        <AnimateIn delay={100} className="lg:hidden">
          <a
            href="https://its.nakiedy.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-white/8 bg-[#0f1423] hover:bg-[#161d33] hover:border-[#0075C4]/30 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#0075C4]/20 flex items-center justify-center">
              <CalendarIcon className="w-8 h-8 text-[#0075C4]" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl mb-1">Zarezerwuj stół</p>
              <p className="text-gray-400 text-sm">Otwiera kalendarz rezerwacji nakiedy.pl</p>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0075C4] text-white font-semibold text-base group-hover:bg-blue-600 transition-colors">
              Przejdz do rezerwacji
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
          <p className="mt-3 text-xs text-gray-600 text-center">
            System rezerwacji nakiedy.pl · Bezpieczna platnosc online
          </p>
        </AnimateIn>

        {/* Desktop: pelny iframe */}
        <AnimateIn delay={100} className="hidden lg:block">
          <div className="rounded-2xl border border-white/8 bg-[#080b14] overflow-hidden">
            <iframe
              src={EMBED_SRC}
              id="nakiedyWidget"
              title="Rezerwacja stolu - Instytut Tenisa Stolowego"
              style={{ width: '100%', minWidth: '360px', height: '1360px', border: 0 }}
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-xs text-gray-600 text-center">
            System rezerwacji nakiedy.pl · Bezpieczna platnosc online
          </p>
        </AnimateIn>

      </div>
    </section>
  )
}
