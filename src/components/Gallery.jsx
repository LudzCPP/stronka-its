import { useState, useEffect, useCallback } from 'react'
import img1 from '../assets/its1.jpg'
import img2 from '../assets/its2.jpg'
import img3 from '../assets/its3.jpg'
import AnimateIn from './AnimateIn'

const IMAGES = [
  { src: img1, alt: 'Stół do tenisa stołowego w sali ITS w Łodzi' },
  { src: img2, alt: 'Szatnia i recepcja Instytutu Tenisa Stołowego' },
  { src: img3, alt: 'Profesjonalny sprzęt do tenisa stołowego Tibhar' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="galeria" className="py-24 bg-[#080b14] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <AnimateIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0075C4]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0075C4]">Galeria</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-14">
            Nasza sala
          </h2>
        </AnimateIn>

        {/* Mobile: its1 + its3 */}
        <AnimateIn>
          <div className="lg:hidden flex flex-col gap-4">
            {[0, 2].map(i => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="rounded-2xl overflow-hidden aspect-video w-full cursor-zoom-in block"
              >
                <img
                  src={IMAGES[i].src}
                  alt={IMAGES[i].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Desktop: 2/3 + 1/3 stacked grid */}
        <AnimateIn>
          <div className="hidden lg:grid grid-cols-3 gap-3 h-[440px]">
            <button
              onClick={() => setLightbox(0)}
              className="col-span-2 rounded-2xl overflow-hidden cursor-zoom-in"
            >
              <img
                src={IMAGES[0].src}
                alt={IMAGES[0].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </button>
            <div className="flex flex-col gap-3">
              {[1, 2].map(i => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="flex-1 rounded-2xl overflow-hidden cursor-zoom-in"
                >
                  <img
                    src={IMAGES[i].src}
                    alt={IMAGES[i].alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </button>
              ))}
            </div>
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
