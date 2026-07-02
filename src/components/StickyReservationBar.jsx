import { useState, useEffect } from 'react'

export default function StickyReservationBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div
        className="bg-[#080b14]/95 backdrop-blur-md border-t border-white/10 px-4 py-3"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <a
          href="https://its.nakiedy.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0075C4] text-white font-bold text-base active:scale-95 transition-transform hover:bg-blue-700"
        >
          <CalendarIcon />
          Zarezerwuj stol
        </a>
      </div>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
