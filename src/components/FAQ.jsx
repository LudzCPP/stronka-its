import AnimateIn from './AnimateIn'

const FAQS = [
  {
    q: "Czy potrzebuję rezerwacji?",
    a: "Tak, wszystkie wejścia rezerwuje się online przez its.nakiedy.pl - szybko, bez dzwonienia.",
  },
  {
    q: "Nie mam z kim grać - co wtedy?",
    a: "Posiadacze abonamentu mogą zarezerwować stół z robotem treningowym i ćwiczyć samodzielnie.",
  },
  {
    q: "Czy wypożyczacie sprzęt?",
    a: "Na sali dostępne są rakietki i piłki dla początkujących. Możesz też przyjść ze swoim sprzętem.",
  },
  {
    q: "Czy jest parking?",
    a: "Tak - bezpłatny parking bezpośrednio przy sali.",
  },
  {
    q: "Dla kogo jest sala?",
    a: "Dla każdego - od zupełnych początkujących po zaawansowanych zawodników. Poziom nie ma znaczenia.",
  },
  {
    q: "Jak wygląda płatność?",
    a: "Wyłącznie online - kartą, BLIKiem lub przelewem przy rezerwacji lub zakupie abonamentu.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#080b14] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <AnimateIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0075C4]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-14">
            Najczęstsze pytania o rezerwacje i grę
          </h2>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {FAQS.map((item, i) => (
            <AnimateIn key={i} delay={i * 60} className="h-full">
              <div className="p-6 rounded-xl bg-[#0f1423] border border-white/8 h-full">
                <p className="font-semibold text-white mb-2">{item.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
