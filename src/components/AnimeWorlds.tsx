import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { animeWorlds, type AnimeKey } from '../data/media'

gsap.registerPlugin(ScrollTrigger)

type AnimeWorldsProps = { onJoin: (filter: AnimeKey) => void }

export function AnimeWorlds({ onJoin }: AnimeWorldsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const media = gsap.matchMedia(sectionRef)
    media.add('(min-width: 901px)', () => {
      const scenes = gsap.utils.toArray<HTMLElement>('.world-scene')
      scenes.forEach((scene, index) => {
        const sequence = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: '+=105%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        sequence
          .fromTo(scene.querySelector('.world-scene__media'), { scale: 0.88, yPercent: 5 }, { scale: 1.08, yPercent: -3, ease: 'none' })
          .fromTo(scene.querySelector('.world-scene__title'), { xPercent: index === 1 ? 7 : -5, yPercent: 22, opacity: 0.1 }, { xPercent: 0, yPercent: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(scene.querySelector('.world-scene__details'), { y: 34, opacity: 0.35 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
          .to(scene.querySelector('.world-scene__veil'), { opacity: index === 0 ? 0.25 : 0.12, ease: 'none' }, 0)
          .to(scene, { clipPath: 'inset(0 0 100% 0)', ease: 'none' }, 0.94)
      })

      gsap.timeline({
        scrollTrigger: { trigger: '.world-scene--demon', start: 'top top', end: '+=95%', scrub: 0.5 },
      }).fromTo('.tanjiro-slash path', { strokeDashoffset: 1100, opacity: 0 }, {
        strokeDashoffset: 0, opacity: 0.95, duration: 0.62, ease: 'none', stagger: 0.06,
      }).to('.tanjiro-slash', { rotate: -9, scale: 1.06, opacity: 0, ease: 'none' }, 0.7)
    })

    media.add('(max-width: 900px)', () => {
      gsap.utils.toArray<HTMLElement>('.world-scene').forEach((scene) => {
        gsap.fromTo(scene.querySelector('.world-scene__media'), { scale: .9, y: 28 }, { scale: 1, y: 0, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: scene, start: 'top 78%', once: true } })
        gsap.fromTo(scene.querySelector('.world-scene__title'), { y: 38, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top 70%', once: true },
        })
      })
    })

    return () => media.revert()
  }, { scope: sectionRef })

  const [demon, titan, paradise] = animeWorlds
  const hellArt = '/images/Hell Paradise _ Anime Mix Edits.jpg'

  return (
    <section className="worlds" id="worlds" ref={sectionRef}>
      <header className="worlds__intro" id="about">
        <div>
          <p className="eyebrow"><span /> CHAPTERS FROM YOUR SIGNAL</p>
          <h2>Keep your eyes<br />on the <em>horizon.</em></h2>
        </div>
        <p>Five edits arrived from your collection. Each one is a doorway into the scene, the feeling, and the fandom waiting on the other side.</p>
        <span className="worlds__index">SCROLL TO TRAVEL / 01—03</span>
      </header>

      <article className="world-scene world-scene--demon" aria-labelledby="demon-title">
        <div className="world-scene__media">
          <img className="world-scene__poster" src={demon.image} alt="" />
          <img className="world-scene__cutout world-scene__cutout--demon" src="/images/Kamado Tanjiro (Demon Slayer_ Kimetsu no Yaiba).jpg" alt="Tanjiro Kamado in a second flame-lit portrait" loading="lazy" />
          <div className="world-scene__veil" aria-hidden="true" />
          <div className="world-scene__embers" aria-hidden="true" />
          <svg className="tanjiro-slash" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="water-slash" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#42bcff" stopOpacity="0" /><stop offset=".48" stopColor="#e4fbff" /><stop offset="1" stopColor="#ff633c" stopOpacity="0" /></linearGradient></defs>
            <path d="M-30 605 C 155 560, 250 438, 402 397 S 680 375, 1030 60" fill="none" stroke="url(#water-slash)" strokeWidth="30" strokeLinecap="round" />
            <path d="M-25 620 C 160 578, 270 463, 410 421 S 680 400, 1020 87" fill="none" stroke="#fff8e9" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="world-scene__frame-label">FRAME 01 / KAMADO TANJIRO</span>
        </div>
        <div className="world-scene__copy">
          <div className="world-scene__title">
            <p className="world-scene__eyebrow"><span>01</span> A BREATH BEFORE THE CUT</p>
            <h3 id="demon-title">Demon<br /><em>Slayer</em></h3>
            <p className="world-scene__subhead">KIMETSU NO YAIBA</p>
          </div>
          <div className="world-scene__details">
            <p className="world-scene__description">{demon.description}</p>
            <button className="text-link" type="button" onClick={() => onJoin(demon.key)}>Follow the flame into community <ArrowRight size={15} /></button>
          </div>
        </div>
        <span className="world-scene__chapter">CHAPTER 01 <i /> WATER / FIRE</span>
      </article>

      <article className="world-scene world-scene--titan" aria-labelledby="titan-title">
        <div className="world-scene__media">
          <img className="world-scene__poster" src={titan.image} alt="" />
          <span className="titan-wall-light" aria-hidden="true" />
          <div className="world-scene__veil" aria-hidden="true" />
          <div className="world-scene__dust" aria-hidden="true" />
          <span className="world-scene__frame-label">SCOUT REGIMENT / BEYOND THE WALL</span>
        </div>
        <div className="world-scene__copy">
          <div className="world-scene__title">
            <p className="world-scene__eyebrow"><span>02</span> FREEDOM HAS A PRICE</p>
            <h3 id="titan-title">Attack on<br /><em>Titan</em></h3>
            <p className="world-scene__subhead">SHINGEKI NO KYOJIN</p>
          </div>
          <div className="world-scene__details">
            <p className="world-scene__description">{titan.description}</p>
            <button className="text-link" type="button" onClick={() => onJoin(titan.key)}>Enter the Scout Regiment room <ArrowRight size={15} /></button>
          </div>
        </div>
        <span className="titan-backdrop-type" aria-hidden="true">自由</span>
        <span className="world-scene__chapter">CHAPTER 02 <i /> THE WALLS REMEMBER</span>
      </article>

      <article className="world-scene world-scene--paradise" aria-labelledby="paradise-title">
        <div className="world-scene__media world-scene__media--paradise">
          <img className="world-scene__poster" src={paradise.image} alt={paradise.imageAlt} loading="lazy" />
          <img className="paradise-cutout" src={hellArt} alt="A second Hell's Paradise anime edit in cool blue light" loading="lazy" />
          <div className="world-scene__veil" aria-hidden="true" />
          <span className="paradise-seal" aria-hidden="true">極楽</span>
          <span className="world-scene__frame-label">GABIMARU / STILL ARTWORK, NOT VIDEO</span>
        </div>
        <div className="world-scene__copy">
          <div className="world-scene__title">
            <p className="world-scene__eyebrow"><span>03</span> BEAUTY HAS TEETH</p>
            <h3 id="paradise-title">Hell's<br /><em>Paradise</em></h3>
            <p className="world-scene__subhead">JIGOKURAKU</p>
          </div>
          <div className="world-scene__details">
            <p className="world-scene__description">{paradise.description} An island blooming at the edge of life.</p>
            <button className="text-link" type="button" onClick={() => onJoin(paradise.key)}>Enter the island room <ArrowRight size={15} /></button>
          </div>
        </div>
        <span className="world-scene__chapter">CHAPTER 03 <i /> THE ISLAND OF ELIXIR</span>
      </article>

      <p className="media-note">All chapter scenes use the still artwork supplied with this project. Video edits are waiting in the community feed.</p>
      <div className="worlds__end"><ArrowDownRight size={18} /><span>THE FEED IS CALLING</span><button onClick={() => onJoin('demon-slayer')} type="button">Join the signal <ArrowRight size={15} /></button></div>
    </section>
  )
}
