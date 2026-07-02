import AnimateIn from './AnimateIn'

const MAPS_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2467.710796839028!2d19.50030557694348!3d51.79317168978637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb1a4c553e47%3A0xf46f55e5d3d3fe7e!2sInstytut%20Tenisa%20Sto%C5%82owego!5e0!3m2!1spl!2spl!4v1782810428758!5m2!1spl!2spl"

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#080b14] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <AnimateIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0075C4]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">Kontakt</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Kontakt i rezerwacje
          </h2>
          <p className="text-gray-200 text-base mb-10 max-w-md">
            Stoły rezerwujesz online przez system nakiedy.pl. Telefon i e-mail służą do kontaktu z obsługą sali.
          </p>
        </AnimateIn>

        {/* Baner rezerwacji online */}
        <AnimateIn delay={100}>
        <a
          href="https://its.nakiedy.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-6 p-6 mb-10 rounded-2xl bg-[#0075C4] hover:bg-blue-700 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">Zarezerwuj stół online</p>
              <p className="text-blue-100 text-sm mt-0.5">its.nakiedy.pl — szybko, bez dzwonienia</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12 items-end">

          <AnimateIn delay={200} className="space-y-3">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">Kontakt z obsługą sali</p>
            <ContactItem icon={<PhoneIcon />} label="Telefon" value="+48 533 644 535" href="tel:+48533644535" />
            <ContactItem icon={<EmailIcon />} label="E-mail" value="tenisstolowy.lodz@gmail.com" href="mailto:tenisstolowy.lodz@gmail.com" />
            <ContactItem icon={<PinIcon />} label="Adres" value="ul. Śnieżna 5, 92-103 Łódź" />
            <ContactItem icon={<ClockIcon />} label="Godziny otwarcia" value="Codziennie 6:00–24:00" sub="Obsługa sali: 9:00–21:00" />
          </AnimateIn>

          <AnimateIn delay={300} className="rounded-2xl overflow-hidden h-96 border border-white/8">
            <iframe
              src={MAPS_SRC}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Instytut Tenisa Stołowego — mapa"
            />
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, value, sub, href }) {
  const inner = (
    <div className={`flex items-center gap-5 p-5 rounded-xl border border-white/8 bg-[#0f1423] ${href ? 'hover:border-[#0075C4]/40 hover:bg-[#161d33] transition-all group cursor-pointer' : ''}`}>
      <div className="w-10 h-10 rounded-lg bg-[#0075C4]/20 flex items-center justify-center shrink-0 text-[#0075C4]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`font-semibold text-white text-base ${href ? 'group-hover:text-[#0075C4] transition-colors' : ''}`}>
          {value}
        </p>
        {sub && <p className="text-sm text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
  return href ? <a href={href}>{inner}</a> : inner
}

function CalendarIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
