import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Services from './components/Services'
import Abonament from './components/Abonament'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Abonament />
      <Testimonials />
      <Contact />
      <footer className="py-8 bg-[#040609] border-t border-white/8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Instytut Tenisa Stołowego · ul. Śnieżna 5, Łódź</p>
      </footer>
    </main>
  )
}
