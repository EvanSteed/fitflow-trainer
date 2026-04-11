import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, CaretRight, Shield, Crown, Star } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Duration = 1 | 3 | 6

interface PricingData {
  monthlyPrice: number
  discount: string
  total: number
  weeklyEquivalent: string
}

const pricing: Record<Duration, { core: PricingData; elite: PricingData }> = {
  1: {
    core: { monthlyPrice: 100, discount: '', total: 100, weeklyEquivalent: '$25.00/wk' },
    elite: { monthlyPrice: 240, discount: '', total: 240, weeklyEquivalent: '$60.00/wk' },
  },
  3: {
    core: { monthlyPrice: 90, discount: 'Save 10%', total: 270, weeklyEquivalent: '$22.50/wk' },
    elite: { monthlyPrice: 216, discount: 'Save 10%', total: 648, weeklyEquivalent: '$54.00/wk' },
  },
  6: {
    core: { monthlyPrice: 80, discount: 'Best Value', total: 480, weeklyEquivalent: '$20.00/wk' },
    elite: { monthlyPrice: 192, discount: 'Best Value', total: 1152, weeklyEquivalent: '$48.00/wk' },
  },
}

const durations: { value: Duration; label: string }[] = [
  { value: 1, label: '1 Month' },
  { value: 3, label: '3 Months' },
  { value: 6, label: '6 Months' },
]

interface TierFeatures {
  id: string
  name: string
  subtext: string
  badge?: string
  features: string[]
}

const tierData: TierFeatures[] = [
  {
    id: 'core',
    name: 'Core Coaching',
    subtext: 'Consistent guidance and accountability',
    badge: 'Recommended',
    features: [
      'Fully personalised training program',
      'Weekly check-in',
      '24 hour response time',
      'Form checks',
      'Nutrition review',
      'Private discord channel access',
      'Habit tracking & accountability',
      'Program adjustments as needed',
    ],
  },
  {
    id: 'elite',
    name: 'Elite Coaching',
    subtext: 'Closer coaching, faster feedback, ongoing support',
    badge: 'Priority Access',
    features: [
      'Fully personalised training program',
      'Weekly check-ins (more accountability if required)',
      'Priority response',
      'Unlimited form checks',
      'Nutrition review and planning',
      'Private discord channel access',
      'Recovery & lifestyle coaching',
      'Program adjustments on-demand',
    ],
  },
]

export default function PricingPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [duration, setDuration] = useState<Duration>(3)

  useGSAP(() => {
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

  const handleSelect = (tier: TierFeatures) => {
    const pricingInfo = pricing[duration][tier.id as 'core' | 'elite']
    localStorage.setItem('selectedPackage', JSON.stringify({
      id: tier.id,
      name: tier.name,
      price: pricingInfo.monthlyPrice,
      duration: duration,
      total: pricingInfo.total,
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
            Online
            <span className="text-gold" style={{ textShadow: '0 0 20px #ffd70066' }}> Coaching</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Fully personalised training programs built around your body, your goals, and your lifestyle.
            Choose your commitment level and start transforming today.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Duration Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-hud-panel rounded-full p-1.5 border border-hud-border">
              {durations.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d.value)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all font-rajdhani uppercase tracking-wider ${
                    duration === d.value
                      ? 'bg-gold text-hud-bg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 stagger-enter">
            {tierData.map((tier) => {
              const pricingInfo = pricing[duration][tier.id as 'core' | 'elite']
              const isElite = tier.id === 'elite'

              return (
                <div
                  key={tier.id}
                  className={`tier-card relative flex flex-col h-full rounded-2xl overflow-hidden transition-all hover:scale-[1.02] ${
                    isElite
                      ? 'bg-gradient-to-b from-gold/10 to-hud-bg border-2 border-gold/50 shadow-lg shadow-gold/10'
                      : 'bg-hud-panel border border-hud-border'
                  }`}
                  style={{ opacity: 0 }}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className={`text-xs font-bold px-3 py-2 text-center uppercase tracking-wider font-rajdhani ${
                      tier.id === 'core' ? 'bg-gold text-hud-bg' : 'bg-gold/20 text-gold'
                    }`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white font-rajdhani">{tier.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{tier.subtext}</p>
                    </div>

                    {/* Price Display */}
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white font-rajdhani">
                        ${pricingInfo.monthlyPrice}
                      </span>
                      <span className="text-gray-400">/mo</span>
                    </div>

                    {/* Duration & Discount Labels */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500">
                        {duration} month commitment
                      </span>
                      {pricingInfo.discount && (
                        <span className="text-xs font-bold text-gold bg-gold/20 px-2 py-0.5 rounded">
                          {pricingInfo.discount}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-teal mb-6">
                      {pricingInfo.weeklyEquivalent}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6 flex-grow">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isElite ? 'text-gold' : 'text-teal'}`} weight="fill" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Total */}
                    <div className="mb-4 p-3 bg-hud-bg/50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total</span>
                        <span className="font-bold text-white">${pricingInfo.total}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSelect(tier)}
                      className={`w-full py-3 font-semibold transition-all flex items-center justify-center gap-2 font-rajdhani uppercase tracking-wider text-sm rounded-lg ${
                        isElite
                          ? 'bg-gold text-hud-bg hover:bg-gold/90'
                          : 'bg-hud-border text-white hover:bg-hud-border/80'
                      }`}
                    >
                      Get Started
                      <CaretRight className="w-4 h-4" weight="bold" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}