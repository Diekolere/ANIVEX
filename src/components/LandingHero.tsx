import { useState } from 'react'
import { ArrowDown, ArrowRight, Menu, Play, X } from 'lucide-react'

type LandingHeroProps = {
  active: boolean
  onJoin: () => void
  onDiscover: () => void
}

export function LandingHero({ active, onJoin, onDiscover }: LandingHeroProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className={`brand-hero ${active ? 'is-active' : ''}`} id="home">
      <img className="brand-hero__backdrop" src="/images/Titan looming over wall soldiers.jpg" alt="A Titan rises over soldiers and the city wall" fetchPriority="high" />
      <div className="brand-hero__shade" aria-hidden="true" />
      <div className="hero-art hero-art--tanjiro" aria-hidden="true"><img src="/images/Demon Slayer Live 4k Wallpaper _ Kamado Tanjirou UHD wallpaper_.jpg" alt="" /></div>
      <div className="hero-art hero-art--gabimaru" aria-hidden="true"><img src="/images/Gabimaru _ Hell's Paradise.jpg" alt="" /></div>
      <div className="hero-orbit" aria-hidden="true"><span>ANIME / WORLDS / PEOPLE</span></div>

      <header className="site-nav">
        <a className="brand" href="#home" aria-label="ANIVEX home"><span className="brand__sigil">A</span> ANIVEX</a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav className={`site-nav__links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#worlds" onClick={() => setMenuOpen(false)}>Worlds</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>The signal</a>
          <button type="button" onClick={() => { setMenuOpen(false); onJoin() }}>Community <ArrowRight size={14} /></button>
        </nav>
      </header>

      <div className="brand-hero__content">
        <p className="eyebrow"><span /> THE STORIES THAT STAY WITH YOU</p>
        <h1>Step beyond<br /><em>the frame.</em></h1>
        <p className="brand-hero__lede">A living universe shaped by anime, edits, and the people who never stop thinking about that one scene.</p>
        <div className="brand-hero__actions">
          <button className="button-primary" onClick={onJoin} type="button">Join community <ArrowRight size={16} /></button>
          <button className="button-quiet" onClick={onDiscover} type="button"><span><Play size={10} fill="currentColor" /></span> Travel the worlds</button>
        </div>
      </div>

      <div className="brand-hero__stamp" aria-hidden="true"><span>ANIME<br />EDITS<br />IN MOTION</span><i>緣</i></div>
      <div className="brand-hero__foot">
        <span>THREE WORLDS / ONE SIGNAL</span>
        <a href="#worlds">Scroll to enter <ArrowDown size={14} /></a>
        <span className="hero-location">EST. IN THE FANDOM</span>
      </div>
    </section>
  )
}
