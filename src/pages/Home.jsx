import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Stats from '../components/Stats.jsx'
import Skills from '../components/Skills.jsx'
import Experience from '../components/Experience.jsx'
import Projects from '../components/Projects.jsx'
import Education from '../components/Education.jsx'
import Certifications from '../components/Certifications.jsx'
import ResumeCTA from '../components/ResumeCTA.jsx'
import Contact from '../components/Contact.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import Footer from '../components/Footer.jsx'

export default function Home({ onSceneReady, started }) {
  return (
    <>
      <a
        href="#about"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero onSceneReady={onSceneReady} started={started} />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <ResumeCTA />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
