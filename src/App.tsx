import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AnimeWorlds } from './components/AnimeWorlds'
import { CommunityExperience } from './components/CommunityExperience'
import { IntroOverlay } from './components/IntroOverlay'
import { LandingHero } from './components/LandingHero'
import type { AnimeKey } from './data/media'
import './App.css'

const introStorageKey = 'anivex-intro-seen'

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !window.localStorage.getItem(introStorageKey)
    } catch {
      return false
    }
  })
  const [communityFilter, setCommunityFilter] = useState<AnimeKey | 'all' | 'fan-art'>('all')
  const [showCommunity, setShowCommunity] = useState(false)

  const finishIntro = useCallback(() => {
    try {
      window.localStorage.setItem(introStorageKey, 'true')
    } catch {
      // The intro still works when storage is disabled; it may replay next visit.
    }
    setShowIntro(false)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('intro-active', showIntro || showCommunity)
    return () => document.body.classList.remove('intro-active')
  }, [showIntro, showCommunity])

  const openCommunity = (filter: AnimeKey | 'all' | 'fan-art' = 'all') => {
    setCommunityFilter(filter)
    setShowCommunity(true)
  }

  const discoverWorlds = () => document.getElementById('worlds')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {showIntro && <IntroOverlay onFinish={finishIntro} />}

      <main>
        <LandingHero active={!showIntro && !showCommunity} onJoin={() => openCommunity()} onDiscover={discoverWorlds} />
        <AnimeWorlds onJoin={openCommunity} />
        <section className="manifesto" aria-labelledby="manifesto-title">
          <p className="eyebrow"><span /> THE STORY CONTINUES WITH YOU</p>
          <h2 id="manifesto-title">A fandom is a world<br />you <em>build together.</em></h2>
          <p>Follow the edits, trade favorite frames, and find the people who never skip the opening.</p>
          <button className="manifesto__button" onClick={() => openCommunity()} type="button">Find your people <ArrowUpRight size={17} /></button>
          <span className="manifesto__kanji" aria-hidden="true">縁</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home"><span className="brand__sigil">A</span> ANIVEX</a>
        <span>AN UNOFFICIAL FAN COMMUNITY CONCEPT</span>
        <a href="#home">Back to the beginning ↑</a>
      </footer>

      {showCommunity && <CommunityExperience initialFilter={communityFilter} onClose={() => setShowCommunity(false)} />}
    </>
  )
}

export default App
