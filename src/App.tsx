import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { About } from '@/components/About'
import { EngineeringFocus } from '@/components/EngineeringFocus'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Leadership } from '@/components/Leadership'
import { Achievements } from '@/components/Achievements'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CustomCursor } from '@/components/CustomCursor'
import { ChatWidget } from '@/components/ChatWidget'
import { useLenis } from '@/lib/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useHasFinePointer } from '@/hooks/useHasFinePointer'

function App() {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const hasFinePointer = useHasFinePointer()

  useLenis(!reducedMotion && !isMobile)

  return (
    <>
      {!isMobile && hasFinePointer && !reducedMotion && <CustomCursor />}
      <Navbar />
      <ScrollProgress />

      <main className="relative">
        <Hero />
        <Stats />
        <About />
        <EngineeringFocus />
        <Skills />
        <Projects />
        <Experience />
        <Leadership />
        <Achievements />
        <Education />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
