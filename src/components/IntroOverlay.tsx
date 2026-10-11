import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

type IntroOverlayProps = { onFinish: () => void }

export function IntroOverlay({ onFinish }: IntroOverlayProps) {
  const introRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onFinish()
      return
    }

    const timeline = gsap.timeline({ onComplete: onFinish })
    timeline
      .fromTo('.intro-art--main', { scale: 1.22, y: 70, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 1.15, ease: 'power3.out' })
      .fromTo('.intro-art--side', { scale: .8, x: 65, opacity: 0 }, { scale: 1, x: 0, opacity: 1, duration: .8, ease: 'back.out(1.3)' }, '-=.65')
      .fromTo('.intro-lockup > *', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .13, ease: 'power3.out' }, '-=.55')
      .to(introRef.current, { opacity: 0, duration: .7, delay: 1.2, ease: 'power2.inOut' })

    return () => timeline.kill()
  }, { scope: introRef })

  const skip = () => {
    gsap.killTweensOf(introRef.current)
    gsap.to(introRef.current, { opacity: 0, duration: .25, onComplete: onFinish })
  }

  return (
    <div className="intro-screen" ref={introRef} aria-label="ANIVEX opening sequence">
      <div className="intro-screen__art" aria-hidden="true">
        <img className="intro-art--main" src="/images/Demon Slayer Live 4k Wallpaper _ Kamado Tanjirou UHD wallpaper_.jpg" alt="" />
        <img className="intro-art--side" src="/images/Kamado Tanjiro (Demon Slayer_ Kimetsu no Yaiba).jpg" alt="" />
      </div>
      <div className="intro-screen__shade" aria-hidden="true" />
      <div className="intro-wash" aria-hidden="true" />
      <div className="intro-lockup">
        <p className="intro-kicker">A universe in motion</p>
        <h1>ANIVEX</h1>
        <p className="intro-caption">THE FRAME IS YOURS TO ENTER</p>
      </div>
      <button className="intro-skip" onClick={skip} type="button">Skip intro <ArrowRight size={15} /></button>
      <span className="intro-index">01 — 03 / ENTER THE WORLDS</span>
    </div>
  )
}
