import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Services from './components/Services'
import Rezerwacje from './components/Rezerwacje'
import Abonament from './components/Abonament'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import StickyReservationBar from './components/StickyReservationBar'

export default function App() {
  return (
    <main className="pb-20 lg:pb-0">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Rezerwacje />
      <Abonament />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <StickyReservationBar />
    </main>
  )
}
