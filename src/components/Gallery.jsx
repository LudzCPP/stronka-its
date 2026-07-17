import { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react'
import img1 from '../assets/its1.webp'
import img2 from '../assets/its2.webp'
import img3 from '../assets/its3.webp'
import img4 from '../assets/its4.webp'
import img5 from '../assets/its5.webp'
import img6 from '../assets/its6.webp'
import img7 from '../assets/its7.webp'
import img8 from '../assets/its8.webp'
import AnimateIn from './AnimateIn'

const IMAGES = [
  { src: img1, alt: 'Stół do tenisa stołowego w sali ITS w Łodzi' },
  { src: img2, alt: 'Szatnia i recepcja Instytutu Tenisa Stołowego' },
  { src: img3, alt: 'Profesjonalny sprzęt do tenisa stołowego Tibhar' },
  { src: img4, alt: 'Sala tenisa stołowego z banerami zawodnikow ITS w Łodzi' },
  { src: img5, alt: 'Widok sali ping-ponga - czerwona podloga, niebieskie sciany' },
  { src: img6, alt: 'Tablica wynikow Tibhar na stole do tenisa stolowego' },
  { src: img7, alt: 'Rakietka Butterfly i pilka na stole Tibhar w sali ITS' },
  { src: img8, alt: 'Szatnia Instytutu Tenisa Stolowego w Łodzi' },
]

const GAP = 12 // px, odpowiada gap-3

function useItemsPerView() {
  const [items, setItems] = useState(1)
  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setItems(w >= 1024 ? 3 : w >= 640 ? 2 : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return items
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [start, setStart] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef(null)
  const [slotWidth, setSlotWidth] = useState(0)
  const itemsPerView = useItemsPerView()

  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      setSlotWidth((w - (itemsPerView - 1) * GAP) / itemsPerView)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [itemsPerView])

  const go = (dir) => {
    if (sliding || !slotWidth) return
    setDirection(dir)
    setSliding(true)
  }
  const prevSlide = () => go(-1)
  const nextSlide = () => go(1)

  const handleTransitionEnd = (e) => {
    // transitionend bubluje az z dzieci (np. hover:scale-105 na zdjeciach) - reagujemy
    // tylko na przejscie samego paska, inaczej samo najechanie mysza przeskakiwalo karuzel
    if (e.target !== e.currentTarget) return
    setStart(s => (s + direction + IMAGES.length) % IMAGES.length)
    setSliding(false)
  }

  const ordered = Array.from({ length: IMAGES.length }, (_, k) => (start + k) % IMAGES.length)
  const shift = slotWidth ? direction * (slotWidth + GAP) : 0
  const translate = sliding ? -shift : 0

  return (
    <section id="galeria" className="py-24 bg-[#080b14] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <AnimateIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0075C4]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">Galeria</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-14">
            Nasza sala tenisa stołowego w Łodzi
          </h2>
        </AnimateIn>

        {/* Karuzel - 1 zdjecie na mobile, 2 na tablet, 3 na desktop (itemsPerView).
            Caly pasek fizycznie sie przesuwa (transform translateX), a nie zanika/wjezdza -
            po zakonczeniu animacji tablica sie "obraca" (start+1) i transform wraca do 0
            bez przejscia, w tej samej klatce - stad brak widocznego skoku (efekt petli). */}
        <AnimateIn>
          <div className="relative">
            <div ref={containerRef} className="overflow-hidden">
              <div
                className="flex"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(${translate}px)`,
                  transition: sliding ? 'transform 0.45s ease-out' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {ordered.map(i => (
                  <button
                    key={i}
                    onClick={() => !sliding && setLightbox(i)}
                    style={{ width: slotWidth ? `${slotWidth}px` : `${100 / itemsPerView}%` }}
                    className="shrink-0 rounded-2xl overflow-hidden cursor-zoom-in aspect-[4/3]"
                  >
                    <img
                      src={IMAGES[i].src}
                      alt={IMAGES[i].alt}
                      loading="lazy"
                      decoding="async"
                      width="2048"
                      height="1365"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#080b14] border border-white/15 text-white hover:bg-[#0075C4] hover:border-[#0075C4] transition-colors"
              aria-label="Poprzednie zdjęcie"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#080b14] border border-white/15 text-white hover:bg-[#0075C4] hover:border-[#0075C4] transition-colors"
              aria-label="Następne zdjęcie"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </AnimateIn>

      </div>

      {lightbox !== null && (
        <Lightbox
          images={IMAGES}
          index={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}

function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index)
  const [touchStart, setTouchStart] = useState(null)

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    setTouchStart(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Zamknij */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
        aria-label="Zamknij"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Licznik */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-gray-400 select-none">
        {current + 1} / {images.length}
      </div>

      {/* Poprzednie */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
        aria-label="Poprzednie"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Zdjęcie */}
      <div
        className="px-16 sm:px-20"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          decoding="async"
          width="2048"
          height="1365"
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
      </div>

      {/* Następne */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
        aria-label="Następne"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
