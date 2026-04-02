import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, CaretRight, Shield, Target, Crown, Star, Lightning } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface PricingTier {
  id: string
  name: string
  tierLabel: string
  price: string
  priceNote: string
  icon: React.ReactNode
  features: string[]
  cta: string
  ctaStyle: 'basic' | 'coaching' | 'vip'
  badge?: string
  xpPerWeek: string
}

const tiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    tierLabel: 'TIER 1',
    price: '$79/mo',
    priceNote: 'Get started with structure',
    icon: <Shield className="w-7 h-7 text-teal" weight="bold" />,
    features: [
      'Pre-made workout programs',
      'Access to general resources',
      'Community Q&A',
      'Monthly group challenges',
    ],
    cta: 'Get Started',
    ctaStyle: 'basic',
    xpPerWeek: '+500 XP',
  },
  {
    id: 'coaching',
    name: 'Coaching Plan',
    tierLabel: 'TIER 2',
    price: '$199/mo',
    priceNote: 'Level up with guidance',
    icon: <Target className="w-7 h-7 text-gold" weight="bold" />,
    features: [
      'Everything in Basic',
      'Weekly check-ins',
      'Custom program modifications',
      'Nutrition guidance',
      'Monthly video feedback',
    ],
    cta: 'Get Coaching',
    ctaStyle: 'coaching',
    badge: 'MOST POPULAR',
    xpPerWeek: '+1200 XP',
  },
  {
    id: 'vip',
    name: 'VIP Plan',
    tierLabel: 'TIER 3',
    price: '$399/mo',
    priceNote: 'Full access, full support',
    icon: <Crown className="w-7 h-7 text-gold" weight="bold" />,
    features: [
      'Everything in Coaching',
      'Bi-weekly video calls',
      'Daily communication access',
      'Custom meal planning',
      'Priority response time',
    ],
    cta: 'Go VIP',
    ctaStyle: 'vip',
    badge: 'MAX LEVEL',
    xpPerWeek: '+2500 XP',
  },
]

export default function PricingPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.xp-bar-fill').forEach((bar) => {
      const targetWidth = bar.style.width || bar.getAttribute('data-width') || '50%'
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })

    ScrollTrigger.batch('.tier-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', overwrite: true }
        )
      },
      start: 'top 85%',
    })
  }, { scope: containerRef })

  const handleSelect = (tier: PricingTier) => {
    localStorage.setItem('selectedPackage', JSON.stringify({
      id: tier.id,
      name: tier.name,
      price: tier.price,
      description: tier.priceNote,
      features: tier.features,
    }))
    navigate('/intake')
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-hud-panel border border-gold/30 px-5 py-2.5 mb-8" style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
            <Star className="w-4 h-4 text-gold" weight="fill" />
            <span className="text-sm text-gold font-semibold tracking-wide font-rajdhani">Choose your path</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-cinzel tracking-wide">
            Choose Your
            <span className="text-gold" style={{ textShadow: '0 0 20px #ffd70066' }}> Tier</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Every tier is a progression path. Start where you are, and level up when you're ready.
            More structure, more support, more results.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-stretch stagger-enter">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`tier-card hud-card relative flex flex-col h-full ${
                  tier.ctaStyle === 'coaching'
                    ? 'hud-card-featured !border-gold'
                    : tier.ctaStyle === 'vip'
                    ? '!border-gold/40 hover:!border-gold'
                    : ''
                }`}
                style={{ opacity: 0 }}
              >
                {tier.ctaStyle === 'coaching' && (
                  <>
                    <div className="corner-decor-tl" />
                    <div className="corner-decor-tr" />
                    <div className="corner-decor-bl" />
                    <div className="corner-decor-br" />
                  </>
                )}

                {tier.badge && (
                  <div className={`text-xs font-bold px-3 py-2 text-center uppercase tracking-wider font-rajdhani ${
                    tier.ctaStyle === 'vip'
                      ? 'bg-gold/20 text-gold'
                      : 'bg-gold text-hud-bg'
                  }`}>
                    {tier.badge}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-gray-500 tracking-widest font-rajdhani">{tier.tierLabel}</p>
                    <span className="text-[10px] text-teal font-bold bg-hud-bg border border-teal/30 px-2 py-0.5 rounded">
                      {tier.xpPerWeek}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded flex items-center justify-center border ${
                      tier.ctaStyle === 'vip' ? 'bg-gold/10 border-gold/30' : 'bg-hud-bg border-hud-border'
                    }`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white font-rajdhani">{tier.name}</h3>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white font-rajdhani">{tier.price}</span>
                    <p className="text-base text-gray-400 mt-1">{tier.priceNote}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-gray-300">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          tier.ctaStyle === 'vip' ? 'text-gold' : 'text-teal'
                        }`} weight="fill" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5">
                    <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                      <span>Level Progress</span>
                      <span>{tier.ctaStyle === 'basic' ? '35%' : tier.ctaStyle === 'coaching' ? '65%' : '100%'}</span>
                    </div>
                    <div className="xp-bar-track">
                      <div className="xp-bar-fill" data-width={tier.ctaStyle === 'basic' ? '35%' : tier.ctaStyle === 'coaching' ? '65%' : '100%'} style={{ width: '0%' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelect(tier)}
                    className={`w-full py-3 font-semibold transition-all flex items-center justify-center gap-2 font-rajdhani uppercase tracking-wider text-sm ${
                      tier.ctaStyle === 'coaching'
                        ? 'hud-btn-gold'
                        : tier.ctaStyle === 'vip'
                        ? 'bg-gold text-hud-bg hover:bg-gold/90 border-2 border-gold'
                        : 'hud-btn !w-full !py-3'
                    }`}
                    style={tier.ctaStyle !== 'coaching' && tier.ctaStyle !== 'vip' ? {
                      clipPath: 'none',
                      border: '1px solid #333',
                      background: 'linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)',
                    } : {}}
                  >
                    {tier.cta}
                    <CaretRight className="w-4 h-4" weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-hud-panel/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="hud-panel p-8 relative">
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />

            <Lightning className="w-8 h-8 text-gold mx-auto mb-4" weight="fill" />
            <h2 className="text-2xl font-bold text-white mb-4 font-rajdhani">
              Not sure which tier is right for you?
            </h2>
            <p className="text-gray-400 mb-6 text-base leading-relaxed">
              Start with Basic to get a feel for the system. You can upgrade anytime.
              Every tier builds on the last. Your stats carry over, and you keep all your progress.
            </p>
            <a
              href="https://discord.gg/BJr8TUys"
              target="_blank"
              rel="noopener noreferrer"
              className="hud-btn hud-btn-discord font-rajdhani inline-flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Ask on Discord
            </a>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
