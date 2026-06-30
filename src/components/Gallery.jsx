import img1 from '../assets/its1.jpg'
import img2 from '../assets/its2.jpg'
import img3 from '../assets/its3.jpg'

export default function Gallery() {
  return (
    <section className="py-3 bg-[#080b14]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Mobile: główne zdjęcie + dwa małe obok siebie */}
        <div className="lg:hidden flex flex-col gap-3">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src={img1} alt="Stół do ping-ponga z latającymi piłeczkami" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img src={img2} alt="Szatnia i recepcja" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img src={img3} alt="Profesjonalny sprzęt Tibhar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop: 2/3 + 1/3 stacked grid */}
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

      </div>
    </section>
  )
}
