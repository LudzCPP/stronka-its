import logo from '../assets/its_logo-removebg-preview.png'
import medicoverCard from '../assets/medicover-sport-card.png'
import fitprofitCard from '../assets/fitprofit-card.png'

const NAV_LINKS = [
  { label: 'O nas',       href: '#about' },
  { label: 'Galeria',     href: '#gallery' },
  { label: 'Oferta',      href: '#services' },
  { label: 'Rezerwacje',  href: '#rezerwacje' },
  { label: 'Abonamenty',  href: '#abonamenty' },
  { label: 'Opinie',      href: '#testimonials' },
  { label: 'Kontakt',     href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#040609] border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Logo + adres */}
        <div>
          <img src={logo} alt="Instytut Tenisa Stołowego" className="h-14 w-auto mb-4 opacity-90" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Profesjonalna sala tenisa stołowego<br />w sercu Łodzi.
          </p>
          <div className="mt-4 space-y-1 text-sm text-gray-500">
            <p>ul. Śnieżna 5, 92-103 Łódź</p>
            <p>Czynne codziennie 6:00-24:00</p>
          </div>
        </div>

        {/* Nawigacja */}
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-500 mb-4">Nawigacja</p>
          <ul className="space-y-2">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-500 mb-4">Kontakt</p>
          <ul className="space-y-3">
            <li>
              <a href="tel:+48533644535" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group">
                <PhoneIcon />
                533 644 535
              </a>
            </li>
            <li>
              <a href="mailto:tenisstolowy.lodz@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group">
                <EmailIcon />
                tenisstolowy.lodz@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://its.nakiedy.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#0075C4] hover:text-blue-400 text-sm font-semibold transition-colors"
              >
                <CalendarIcon />
                Zarezerwuj stół online
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/tenisstolowyLogocentrum"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <FacebookIcon />
                Facebook
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Karty benefitowe */}
      <div className="border-t border-white/6 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-500">
            Honorujemy karty benefitowe
          </p>
          <div className="flex items-center gap-4">
            <img src={medicoverCard} alt="Karta Medicover Sport" className="h-12 sm:h-14 w-auto drop-shadow-lg" />
            <img src={fitprofitCard} alt="Karta FitProfit" className="h-12 sm:h-14 w-auto drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Pasek dolny */}
      <div className="border-t border-white/6 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Instytut Tenisa Stołowego · Łódź</p>
          <p>Wszelkie prawa zastrzeżone</p>
        </div>
      </div>
    </footer>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}
