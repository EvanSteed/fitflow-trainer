import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin, Clock, EnvelopeSimple, InstagramLogo, ChatCircle, TrendUp, Barbell, AppleLogo, ShieldCheck, CheckCircle, CaretRight, Star, Lightning, Trophy, ArrowUp } from '@phosphor-icons/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function StatCounter({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toString()
      },
    })
  }, { scope: ref })

  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-hud-panel border border-hud-border rounded flex items-center justify-center mb-1 text-teal">
        {icon}
      </div>
      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</span>
      <span ref={ref} className="hud-stat text-lg">0</span>
    </div>
  )
}

function XpBarAnimated({ width, className = '' }: { width: string; className?: string }) {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!barRef.current) return
    gsap.fromTo(barRef.current, { width: '0%' }, {
      width,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: barRef.current,
        start: 'top 90%',
        once: true,
      },
    })
  }, { scope: barRef })

  return (
    <div className={`xp-bar-track ${className}`}>
      <div ref={barRef} className="xp-bar-fill h-full" style={{ width: '0%' }} />
    </div>
  )
}

function Portal() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const navigate = useNavigate()

  useGSAP(() => {
    if (!wrapperRef.current) return
    const glow = wrapperRef.current.querySelector('.portal-glow')
    const particles = wrapperRef.current.querySelectorAll('.portal-particle')

    // Glow pulse
    gsap.to(glow, {
      scale: 1.1,
      opacity: 0.9,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Particles float upward from portal center
    particles.forEach((p, i) => {
      gsap.fromTo(p,
        { y: 0, opacity: 0.9, scale: 1 },
        {
          y: -(60 + Math.random() * 80),
          x: (Math.random() - 0.5) * 60,
          opacity: 0,
          scale: 0.2,
          duration: 1.8 + Math.random() * 1.5,
          ease: 'power1.out',
          repeat: -1,
          delay: i * 0.2,
        }
      )
    })
  }, { scope: wrapperRef })

  const handleHover = (e: React.MouseEvent) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    gsap.to(imgRef.current, { rotationY: x, rotationX: -y, scale: 1.05, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }

  const handleLeave = () => {
    gsap.to(imgRef.current, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  const handleClick = () => {
    if (!wrapperRef.current) return
    gsap.to(wrapperRef.current, {
      scale: 1.06,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(wrapperRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        navigate('/pricing')
      },
    })
  }

  return (
    <div className="flex flex-col items-center mt-12">
      {/* Portal image - size controlled by image */}
      <div ref={wrapperRef} className="portal-wrapper relative cursor-pointer" style={{ width: '580px' }}
        onClick={handleClick}>
        <img
          ref={imgRef}
          src="/images/portal.png?v=5"
          alt="Enter the portal"
          className="w-full block cursor-pointer"
          draggable={false}
          onMouseMove={handleHover}
          onMouseLeave={handleLeave}
        />

        {/* Ambient glow overlay - centered on portal */}
        <div className="portal-glow absolute pointer-events-none"
          style={{
            top: '-5%',
            left: '10%',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)',
            filter: 'blur(30px)',
            zIndex: 2,
          }}
        />

        {/* Floating particles - centered on portal */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="portal-particle absolute pointer-events-none rounded-full"
            style={{
              zIndex: 3,
              width: i % 3 === 0 ? '5px' : i % 3 === 1 ? '4px' : '3px',
              height: i % 3 === 0 ? '5px' : i % 3 === 1 ? '4px' : '3px',
              background: i % 2 === 0 ? '#60a5fa' : '#fb923c',
              left: `${32 + Math.random() * 36}%`,
              top: `${20 + Math.random() * 15}%`,
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#60a5fa' : '#fb923c'}, 0 0 16px ${i % 2 === 0 ? '#3b82f644' : '#f9731644'}`,
            }}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/pricing')}
        className="mt-4 hud-btn-gold font-rajdhani text-sm inline-flex items-center gap-2"
      >
        Step Through the Portal
        <CaretRight className="w-4 h-4" weight="bold" />
      </button>
      <p className="text-xs text-gray-500 mt-2 font-rajdhani">Choose your tier and begin</p>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)

  // Scroll progress bar
  useGSAP(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, { scope: containerRef })

  // Hero grid parallax
  useGSAP(() => {
    const grid = document.querySelector('.hero-grid')
    if (!grid) return
    gsap.to(grid, {
      y: 80,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, { scope: containerRef })

  // Scroll-triggered reveals
  useGSAP(() => {
    ScrollTrigger.batch('.reveal-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', overwrite: true }
        )
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, { opacity: 0, y: 40, stagger: 0.08, duration: 0.4, overwrite: true })
      },
      start: 'top 88%',
      end: 'bottom 20%',
    })

    // Section labels
    gsap.utils.toArray<HTMLElement>('.section-label').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, letterSpacing: '0.3em' },
        {
          opacity: 1,
          letterSpacing: '0.15em',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      )
    })

    // Section headings
    gsap.utils.toArray<HTMLElement>('.section-heading').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    })
  }, { scope: containerRef })

  // Pinned progression section
  useGSAP(() => {
    const section = document.querySelector('.progression-section')
    if (!section) return
    const bar = section.querySelector('.progression-bar')
    if (bar) {
      gsap.fromTo(bar, { width: '0%' }, {
        width: '65%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })
    }
  }, { scope: containerRef })

  // Magnetic buttons
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.hud-btn-gold').forEach((btn) => {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' })
      }
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
      }
      btn.addEventListener('mousemove', handleMove)
      btn.addEventListener('mouseleave', handleLeave)
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-hud-bg font-rajdhani">
      {/* Scroll progress */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-teal to-gold origin-left z-[60]"
        style={{ transform: 'scaleX(0)', boxShadow: '0 0 8px #ffd70066' }}
      />

      <GameHudHeader />

      {/* Hero Section */}
      <section className="hero-section relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-hud-panel border border-gold/30 px-5 py-2.5 mb-8" style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
            <Star className="w-4 h-4 text-gold" weight="fill" />
            <span className="text-sm text-gold font-semibold tracking-wide font-rajdhani">Track your stats. Stack your progress.</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-cinzel tracking-wide">
            Start Your
            <span className="block text-gold" style={{ textShadow: '0 0 20px #ffd70066, 0 0 40px #ffd70033' }}> Fitness Journey</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every workout is XP. Every meal is a stat boost. Every habit you track is progress toward the next level.
            Stop guessing, start stacking.
          </p>



          {/* Portal */}
          <Portal />
        </div>
      </section>

      {/* How Stat Stacking Works */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label text-xs text-teal font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>How it works</p>
            <h2 className="section-heading hud-section-title text-3xl md:text-4xl font-bold mb-4">
              How Stat Stacking Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              Think of your fitness like an RPG character. Every area of your life is a stat, and the more consistently you train each one, the higher your level goes. With the help of a dedicated personal trainer, you can unlock your full potential and maximize every stat.
            </p>
          </div>

          {/* Quest Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Barbell className="w-7 h-7 text-gold" weight="bold" />,
                title: 'Workout Programming',
                desc: 'Customized training for any goal — strength, hypertrophy, endurance, sport specific, or general fitness.',
                xp: '+Fitness',
                stat: 'STR',
              },
               {
                 icon: <AppleLogo className="w-7 h-7 text-gold" weight="bold" />,
                 title: 'Nutritional Advice',
                 desc: 'Fuel your body right. Macros, meal prep, and eating better consistently. Optimal nutrition is the greatest buff one can acquire.',
                 xp: '+Energy',
                 stat: 'NUTR',
               },
              {
                icon: <ShieldCheck className="w-7 h-7 text-gold" weight="bold" />,
                title: 'Accountability',
                desc: 'No more spinning your wheels. Progress checks keep you honest and on track. Clarity beats motivation every time.',
                xp: '+Results',
                stat: 'FOCUS',
              },
               {
                 icon: <CheckCircle className="w-7 h-7 text-gold" weight="bold" />,
                 title: 'Habit Building',
                 desc: 'Champions are sculpted by the relentless cadence of daily virtue.',
                 xp: '+Consistency',
                 stat: 'DISC',
               },
            ].map((quest, i) => (
              <div key={i} className="reveal-card hud-card p-6 group relative" style={{ opacity: 0 }}>
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />

                <div className="absolute top-3 right-3 bg-green-900/30 border border-green-500/40 px-2 py-0.5 rounded text-[10px] text-green-400 font-bold flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-green-400" weight="bold" />
                  {quest.xp}
                </div>

                <div className="w-12 h-12 bg-hud-bg border border-gold/30 rounded flex items-center justify-center mb-4 group-hover:border-gold/60 transition-colors">
                  {quest.icon}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{quest.stat}</span>
                  <div className="flex-1 h-px bg-hud-border" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-rajdhani">{quest.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed">{quest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label text-xs text-gold font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Strategy guide</p>
            <h2 className="section-heading hud-section-title text-3xl md:text-4xl font-bold mb-4">
              How to rank up
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              Progress isn't about being perfect. It's about being consistent. Here's how to keep leveling up week after week.
            </p>
          </div>

          <div className="space-y-4">
            {[
               { icon: <TrendUp className="w-5 h-5 text-teal" weight="bold" />, title: 'Start small and have consistent effort', desc: 'Don\'t try to max every stat on Day 1. Pick one habit, lock it in for a week, then add another. Small wins compound into massive gains.', level: 'Lv.1' },
              { icon: <CheckCircle className="w-5 h-5 text-teal" weight="bold" />, title: 'Track everything', desc: 'What gets measured gets managed. Log your workouts, meals, sleep, and mood. You can\'t level up a stat you\'re not watching.', level: 'Lv.5' },
              { icon: <Barbell className="w-5 h-5 text-teal" weight="bold" />, title: 'Train with intention', desc: 'Every rep has a purpose. Follow a program, not a vibe. Progressive overload is the XP system. Add weight, add reps, add time under tension.', level: 'Lv.10' },
              { icon: <AppleLogo className="w-5 h-5 text-teal" weight="bold" />, title: 'Fuel like you mean it', desc: 'You can\'t out-train a bad diet. Nail your protein, stay hydrated, and eat for performance. Your nutrition stat is the multiplier for everything else.', level: 'Lv.15' },
              { icon: <ShieldCheck className="w-5 h-5 text-teal" weight="bold" />, title: 'Recover to progress', desc: 'Rest days aren\'t cheat days, they\'re when your body actually builds. Sleep 7+ hours, manage stress, and treat recovery as part of the grind.', level: 'Lv.20' },
            ].map((tip, i) => (
              <div key={i} className="reveal-card hud-card flex items-start gap-5 p-5" style={{ opacity: 0 }}>
                <div className="w-10 h-10 bg-hud-bg border border-gold/30 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-[10px] font-bold">{tip.level}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {tip.icon}
                    <h3 className="text-base font-bold text-white font-rajdhani">{tip.title}</h3>
                  </div>
                  <p className="text-base text-gray-400 leading-relaxed">{tip.desc}</p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <span className="text-xs text-teal font-bold">+{50 + i * 25} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progression CTA */}
      <section className="progression-section py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="hud-panel p-10 md:p-14 text-center relative overflow-hidden">
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />
            <div className="corner-decor-bl" />
            <div className="corner-decor-br" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-gold" weight="fill" />
                <span className="section-label text-xs text-gold font-semibold" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Achievement unlocked</span>
                <Trophy className="w-6 h-6 text-gold" weight="fill" />
              </div>

              <h2 className="section-heading font-cinzel text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px #ffd70044' }}>
                From Novice to Legend: The Eternal Grind
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                This isn't a 6-week crash course. It's a progression system. You pick your tier, we give you the quests,
                and you level up at your own pace. Whether you're a beginner or a veteran, there's always a next level.
              </p>

              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Elite</span>
                </div>
                <div className="xp-bar-track h-2">
                  <div className="progression-bar xp-bar-fill h-full" style={{ width: '0%' }} />
                </div>
              </div>

              <button
                onClick={() => navigate('/pricing')}
                className="hud-btn-gold text-base px-10 py-4 inline-flex items-center gap-2"
              >
                See Your Options
                <CaretRight className="w-5 h-5" weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="section-label text-xs text-teal font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Guild hall</p>
          <h2 className="section-heading hud-section-title text-3xl md:text-4xl font-bold mb-4">
            You don't have to solo level
          </h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-base leading-relaxed">
              Join the Stat Stackers community on Discord. Share wins, get accountability, ask questions,
              and push each other to level up. No need to solo queue when there is a party of like-minded individuals waiting for you.
            </p>

          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center group reveal-card" style={{ opacity: 0 }}>
                <a
                  href="https://www.instagram.com/thisistogoevenfurtherbeyond/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-24 h-24 hud-card group-hover:border-pink-500/40 transition-all"
                  style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <InstagramLogo className="w-10 h-10 text-pink-400" weight="bold" />
                </a>
                <p className="mt-3 text-xs text-gray-500 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.1em' }}>Updates</p>
              </div>

              <div className="flex flex-col items-center group reveal-card" style={{ opacity: 0 }}>
                <a
                  href="https://discord.gg/BJr8TUys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-24 h-24 hud-card group-hover:border-[#5865F2]/40 transition-all"
                  style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <ChatCircle className="w-10 h-10 text-[#5865F2]" weight="bold" />
                </a>
                <p className="mt-3 text-xs text-gray-500 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.1em' }}>Community</p>
              </div>
            </div>

            <div className="reveal-card hud-card p-1" style={{ opacity: 0 }}>
              <iframe
                src="https://discord.com/widget?id=1353349002648621198&theme=dark"
                width="350"
                height="500"
                allowTransparency={true}
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label text-xs text-gold font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Base camp</p>
            <h2 className="section-heading hud-section-title text-3xl font-bold">Ready to Start Stacking?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <MapPin className="w-6 h-6 text-gold" weight="bold" />, label: 'Location', value: 'Online + Plus Fitness Melville', sub: '380 Canning Hwy, Bicton' },
              { icon: <Clock className="w-6 h-6 text-gold" weight="bold" />, label: 'Hours', value: 'Contactable 6am - 8pm every day', sub: '' },
              { icon: <EnvelopeSimple className="w-6 h-6 text-gold" weight="bold" />, label: 'Contact', value: 'Discord', sub: 'Join the discord and message a Trainer' },
            ].map((info, i) => (
              <div key={i} className="reveal-card hud-card p-6 text-center relative" style={{ opacity: 0 }}>
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />

                <div className="w-14 h-14 bg-hud-bg border border-gold/30 rounded flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <p className="text-[10px] text-teal font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.12em' }}>{info.label}</p>
                <p className="text-white font-semibold text-base">{info.value}</p>
                <p className="text-gray-400 text-base">{info.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
