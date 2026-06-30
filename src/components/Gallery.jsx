import img1 from '../assets/its1.jpg'
import img2 from '../assets/its2.jpg'
import img3 from '../assets/its3.jpg'
import AnimateIn from './AnimateIn'

export default function Gallery() {
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

        {/* Mobile: its1 + its3 (its2 jest już w sekcji O nas) */}
        <AnimateIn>
          <div className="lg:hidden flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden aspect-video">
              <img src={img1} alt="Stół do ping-ponga z latającymi piłeczkami" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <img src={img3} alt="Profesjonalny sprzęt Tibhar" className="w-full h-full object-cover" />
            </div>
          </div>
        </AnimateIn>

        {/* Desktop: 2/3 + 1/3 stacked grid */}
        <AnimateIn>
          <div className="hidden lg:grid grid-cols-3 gap-3 h-[440px]">
            <div className="col-span-2 rounded-2xl overflow-hidden">
              <img
                src={img1}
                alt="Stół do ping-ponga z latającymi piłeczkami"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-2xl overflow-hidden">
                <img
                  src={img2}
                  alt="Szatnia i recepcja"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden">
                <img
                  src={img3}
                  alt="Profesjonalny sprzęt Tibhar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
