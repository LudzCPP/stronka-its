import { useState } from 'react'
import logo from '../assets/its_logo-removebg-preview.png'

const LINKS = [
  ['#about', 'O nas'],
  ['#galeria', 'Galeria'],
  ['#services', 'Oferta'],
  ['#abonamenty', 'Abonamenty'],
  ['#testimonials', 'Opinie'],
  ['#contact', 'Kontakt'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#080b14]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="#" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Instytut Tenisa Stołowego" className="h-10 w-auto" />
          <span className="hidden sm:block text-white font-bold text-sm leading-tight">
            Instytut<br />
            <span className="text-[#0075C4]">Tenisa Stołowego</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white transition-colors duration-150">{label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+48533644535"
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#0075C4] text-white text-sm font-semibold hover:bg-blue-700 transition-colors active:scale-95"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">533 644 535</span>
          </a>

          <button
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-white hover:border-white/30 transition-colors"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <nav
        className={`md:hidden border-t border-white/8 bg-[#080b14]/95 backdrop-blur-md overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 px-4 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
