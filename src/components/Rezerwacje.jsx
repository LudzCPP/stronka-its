import AnimateIn from './AnimateIn'

// Gdy właściciel dostarczy kod embed z panelu nakiedy.pl,
// podmień EMBED_SRC na właściwy URL lub wstaw kod snippet zamiast iframe.
const EMBED_SRC = "https://its.nakiedy.pl/em/?h=1050"

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

        <AnimateIn delay={100}>
          {/* overflow-x: auto na mobile — widget ma minimalną szerokość wewnętrzną */}
          <div className="rounded-2xl border border-white/8 bg-[#080b14] overflow-hidden overflow-x-auto">
            <iframe
              src={EMBED_SRC}
              id="nakiedyWidget"
              title="Rezerwacja stołu — Instytut Tenisa Stołowego"
              style={{ width: '100%', minWidth: '360px', height: '1100px', border: 0 }}
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-xs text-gray-600 text-center">
            System rezerwacji nakiedy.pl · Bezpieczna płatność online
          </p>
        </AnimateIn>

      </div>
    </section>
  )
}
