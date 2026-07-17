import heroBg from '../assets/its1.jpg'
import logo from '../assets/its_logo-removebg-preview.png'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      <img
        src={heroBg}
        alt="Sala Instytutu Tenisa Stołowego w Łodzi"
        fetchPriority="high"
        width="2048"
        height="1366"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Silna ciemna warstwa bazowa - gwarantuje czytelność tekstu */}
      <div className="absolute inset-0 bg-[#080b14]/70" />
      {/* Dodatkowy gradient od dołu dla strefy tekstu */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/40 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 pt-32">
        <div
          className="mb-10 flex items-center gap-4 sm:gap-6"
          style={{ animation: 'fadeUp 0.6s ease-out 0.1s both' }}
        >
          <img
            src={logo}
            alt="Instytut Tenisa Stołowego"
            width="360"
            height="366"
            className="h-20 sm:h-28 w-auto drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 24px rgba(0,117,196,0.45))' }}
          />
          <div className="border-l border-white/15 pl-4 sm:pl-6">
            <p className="text-[#0075C4] text-xs font-bold tracking-[0.22em] uppercase mb-1">Łódź</p>
            <p className="text-gray-300 text-sm font-medium">ul. Śnieżna 5</p>
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] max-w-3xl mb-6"
          style={{ animation: 'fadeUp 0.6s ease-out 0.25s both' }}
        >
          Tenis stołowy w&nbsp;Łodzi -<br />
          sala ping-ponga czynna<br />
          7&nbsp;dni w&nbsp;tygodniu
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-200 max-w-xl mb-10 leading-relaxed"
          style={{ animation: 'fadeUp 0.6s ease-out 0.4s both' }}
        >
          Czynne codziennie 6:00-24:00. Rezerwacje stołów, abonamenty miesięczne i treningi indywidualne w jednym miejscu.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4"
          style={{ animation: 'fadeUp 0.6s ease-out 0.55s both' }}
        >
          <a
            href="https://its.nakiedy.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] rounded-xl bg-[#0075C4] text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition-all duration-200 active:scale-95"
          >
            <CalendarIcon />
            Zarezerwuj stół online
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] rounded-xl border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-200"
          >
            Sprawdź ofertę
          </a>
        </div>

        <div
          className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-300"
          style={{ animation: 'fadeUp 0.6s ease-out 0.7s both' }}
        >
          <span className="flex items-center gap-2"><CheckIcon />Rezerwacje online - its.nakiedy.pl</span>
          <span className="flex items-center gap-2"><CheckIcon />Ocena 4,9/5 w Google</span>
          <span className="flex items-center gap-2"><CheckIcon />Czynne codziennie 6:00-24:00</span>
        </div>

        <div
          className="mt-4 flex items-center gap-3 flex-wrap"
          style={{ animation: 'fadeUp 0.6s ease-out 0.85s both' }}
        >
          <span className="text-xs text-gray-500 uppercase tracking-wider">Akceptujemy:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Medicover Sport
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            FitProfit
          </span>
        </div>
      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#0075C4] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}
