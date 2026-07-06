import photo from '../assets/its2.jpg'
import logoAdditional from '../assets/its_logo_additional.png'
import AnimateIn from './AnimateIn'

const STATS = [
  { value: "4,9/5", label: "Średnia ocen Google" },
  { value: "7 dni", label: "Tygodniowo do dyspozycji" },
  { value: "6 - 24", label: "Godziny otwarcia każdego dnia" },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0f1423] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#0075C4]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">O nas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
              Profesjonalne warunki<br />dla graczy tenisa stołowego
            </h2>
            <div className="space-y-4 text-gray-200 leading-relaxed text-base">
              <p>
                Instytut Tenisa Stołowego to profesjonalny obiekt w sercu Łodzi, stworzony
                z myślą o graczach na każdym poziomie zaawansowania. Sala dostępna jest
                7 dni w tygodniu od 6:00 do 24:00 - bo wiemy, że pasja nie zna stałych godzin.
              </p>
              <p>
                Oferujemy rezerwacje stołów, abonamenty miesięczne, treningi z trenerem
                oraz regularne turnieje. Jesteśmy oficjalnym obiektem Łódzkiej Ligi
                Tenisa Stołowego.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-[#0075C4]/25">
              <div className="w-8 h-8 rounded-full bg-[#0075C4] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Oficjalny obiekt ŁLTS</p>
                <p className="text-sm text-gray-400">Łódzkiej Ligi Tenisa Stołowego</p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-white/10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-[#0075C4]">{s.value}</p>
                  <p className="mt-1 text-sm text-gray-400 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={150} className="relative">
            {/* Poświata pod zdjęciem */}
            <div className="absolute -inset-3 rounded-3xl bg-[#0075C4]/20 blur-xl" />

            {/* Zdjęcie główne */}
            <img
              src={photo}
              alt="Recepcja i szatnia Instytutu Tenisa Stołowego"
              className="relative rounded-2xl object-cover w-full aspect-[4/3] shadow-2xl shadow-black/60"
            />

            {/* Pieczęć z logo - osadzona w rogu zdjęcia */}
            <div className="absolute -bottom-5 -right-4 sm:-bottom-7 sm:-right-7 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-[6px] border-[#0f1423] shadow-[0_10px_35px_rgba(0,0,0,0.55)] flex items-center justify-center z-10 transition-transform duration-300 hover:scale-105">
              <img
                src={logoAdditional}
                alt="Logo Instytutu Tenisa Stołowego"
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
