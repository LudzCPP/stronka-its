import AnimateIn from './AnimateIn'

const SERVICES = [
  {
    title: "Rezerwacja stołu online",
    description: "Wybierz termin i zarezerwuj stół na its.nakiedy.pl — szybko, bez dzwonienia, dla 2 lub 4 osób od 32 zł / 90 min.",
  },
  {
    title: "Abonamenty miesięczne",
    description: "Nieograniczony dostęp do sali przez cały miesiąc — abonament śniadaniowy od 85 zł lub max za 125 zł.",
    href: "#abonamenty",
  },
  {
    title: "Treningi indywidualne",
    description: "Praca 1-na-1 z trenerem przez 60 lub 90 minut — skuteczna droga do poprawy techniki i wyników.",
  },
  {
    title: "Turnieje i miniturnieje",
    description: "Regularne turnieje ITS dla każdego poziomu zaawansowania — rywalizacja i emocje od 11 zł.",
  },
  {
    title: "Karty sportowe",
    description: "Rezerwacja dla dwóch posiadaczy karty sportowej bezpłatnie — wejdź i graj.",
    cards: true,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#080b14] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <AnimateIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0075C4]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">Oferta</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Co oferujemy
            </h2>
            <p className="text-gray-300 max-w-sm lg:text-right text-base">
              Rezerwacje, abonamenty, treningi i turnieje — wszystko w jednym miejscu.
            </p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const inner = (
              <>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#0075C4]/50 text-[#0075C4] text-xs font-bold mb-6 group-hover:border-[#0075C4] group-hover:bg-[#0075C4]/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{service.description}</p>
                {service.cards && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Medicover Sport
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      FitProfit — wkrótce
                    </span>
                  </div>
                )}
                {service.href && (
                  <span className="inline-block mt-4 text-xs font-semibold text-[#0075C4] group-hover:underline">Kup abonament →</span>
                )}
              </>
            )
            return (
              <AnimateIn key={service.title} delay={i * 80}>
                {service.href ? (
                  <a
                    href={service.href}
                    className="bg-[#0f1423] border border-white/8 rounded-xl p-8 hover:border-[#0075C4]/50 hover:bg-[#161d33] transition-all duration-200 group block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="bg-[#0f1423] border border-white/8 rounded-xl p-8 hover:border-[#0075C4]/50 hover:bg-[#161d33] transition-all duration-200 group h-full">
                    {inner}
                  </div>
                )}
              </AnimateIn>
            )
          })}

          <AnimateIn delay={SERVICES.length * 80}>
            <div className="bg-[#0f1423] border border-white/8 rounded-xl p-8 flex items-center justify-center h-full">
              <a
                href="https://its.nakiedy.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-[#0075C4] flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <CalendarIcon />
                </div>
                <span className="text-white font-semibold text-sm leading-tight">
                  Zarezerwuj stół online
                </span>
                <span className="text-[#0075C4] font-bold">its.nakiedy.pl</span>
              </a>
            </div>
          </AnimateIn>
        </div>

      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
