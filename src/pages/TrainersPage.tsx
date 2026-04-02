import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Sword, Heart, Brain, Star, CaretRight, User } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const trainers = [
  {
    name: 'Evan',
    title: 'Guild Master',
    class: 'Fitness Strategist',
    level: 50,
    role: 'Lead Trainer',
    avatar: null,
    stats: {
      str: 92,
      con: 88,
      int: 95,
      wis: 85,
      cha: 78,
    },
    traits: ['Program Design', 'Nutrition Strategy', 'Habit Engineering'],
    bio: 'Founder of Stat Stackers. Dedicated to helping you level up every aspect of your fitness journey.',
    active: true,
  },
]

export default function TrainersPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    const card = cardRef.current

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, {
        rotationY: x * 12,
        rotationX: -y * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    }

    const handleLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, { scope: containerRef })

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10 stagger-enter">
          <p className="text-xs text-teal font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Party roster</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cinzel tracking-wide">
            Who <span className="text-gold" style={{ textShadow: '0 0 20px #ffd70066' }}>We Are</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Meet the trainers behind Stat Stackers. Each one is built to help you grind smarter, not harder.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-1 gap-8 stagger-enter">
            {trainers.map((trainer) => (
              <div key={trainer.name} ref={cardRef} className="hud-card relative overflow-hidden" style={{ opacity: 0 }}>
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />
                <div className="corner-decor-bl" />
                <div className="corner-decor-br" />

                <div className="bg-gold/10 border-b border-gold/20 px-6 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                    <span className="text-[10px] text-teal uppercase tracking-[3px] font-semibold">Online</span>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    Class: {trainer.class}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-40 h-48 bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] border-2 border-gold/40 rounded-lg overflow-hidden relative flex items-center justify-center"
                        style={{ boxShadow: '0 0 20px #ffd70022, inset 0 0 30px #00000088' }}>
                        <div className="flex flex-col items-center gap-2 text-gray-600">
                          <User className="w-20 h-20" />
                          <span className="text-[9px] uppercase tracking-widest">Portrait TBD</span>
                        </div>

                        <div className="absolute top-2 right-2 bg-gradient-to-br from-[#ff4444] to-[#cc0000] text-white text-[10px] font-bold px-2 py-1 rounded border border-[#ff6666] shadow-[0_0_8px_#ff444488]">
                          LV {trainer.level}
                        </div>
                      </div>

                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-teal" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-teal" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-teal" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-teal" />
                    </div>

                    <div className="mt-3 text-center">
                      <h2 className="font-cinzel text-2xl font-bold text-gold" style={{ textShadow: '0 0 10px #ffd70066' }}>
                        {trainer.name}
                      </h2>
                      <p className="text-xs text-teal uppercase tracking-[3px] font-semibold mt-0.5">{trainer.title}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gold" weight="bold" />
                      <span className="text-sm text-gray-300">
                        <span className="text-gray-500 uppercase tracking-wider text-[10px] font-semibold mr-2">Role</span>
                        {trainer.role}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] text-gray-500 font-semibold" style={{ fontVariant: 'small-caps', letterSpacing: '0.1em' }}>Core stats</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {[
                          { label: 'STR', value: trainer.stats.str, icon: <Sword className="w-3.5 h-3.5" weight="bold" />, color: 'text-red-400' },
                          { label: 'CON', value: trainer.stats.con, icon: <Heart className="w-3.5 h-3.5" weight="bold" />, color: 'text-green-400' },
                          { label: 'INT', value: trainer.stats.int, icon: <Brain className="w-3.5 h-3.5" weight="bold" />, color: 'text-blue-400' },
                          { label: 'WIS', value: trainer.stats.wis, icon: <Star className="w-3.5 h-3.5" weight="bold" />, color: 'text-purple-400' },
                        ].map((stat) => (
                          <div key={stat.label} className="flex items-center gap-3">
                            <div className={`w-6 flex items-center ${stat.color}`}>
                              {stat.icon}
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider w-8 font-semibold">{stat.label}</span>
                            <div className="flex-1 xp-bar-track h-2">
                              <div className="xp-bar-fill h-full" style={{ width: `${stat.value}%` }} />
                            </div>
                            <span className="text-xs text-teal font-bold w-8 text-right">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold mb-2" style={{ fontVariant: 'small-caps', letterSpacing: '0.1em' }}>Traits</p>
                      <div className="flex flex-wrap gap-2">
                        {trainer.traits.map((trait) => (
                          <span
                            key={trait}
                            className="text-[11px] px-3 py-1 bg-hud-bg border border-gold/20 text-gold/80 rounded font-semibold"
                            style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hud-panel p-4 relative">
                      <div className="corner-decor-tl" style={{ width: '10px', height: '10px' }} />
                      <div className="corner-decor-tr" style={{ width: '10px', height: '10px' }} />
                      <p className="text-sm text-gray-300 italic leading-relaxed">
                        "{trainer.bio}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                    <span>Reputation</span>
                    <span>Lv.{trainer.level}</span>
                  </div>
                  <div className="xp-bar-track">
                    <div className="xp-bar-fill" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="hud-panel p-8 inline-block relative">
              <div className="corner-decor-tl" />
              <div className="corner-decor-tr" />
              <p className="text-sm text-gray-400 mb-4">Ready to join the party?</p>
              <button
                onClick={() => navigate('/pricing')}
                className="hud-btn-gold font-rajdhani inline-flex items-center gap-2"
              >
                View Plans
                <CaretRight className="w-4 h-4" weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
