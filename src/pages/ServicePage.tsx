import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Lightning, Fire, Target, CheckCircle, ArrowLeft, Clock, Barbell, ChatCircle } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ServicePackage {
  id: string
  name: string
  price: number
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
}

const servicesData: Record<string, {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  packages: ServicePackage[]
}> = {
  'online-coaching': {
    title: 'Online Coaching',
    subtitle: 'Train Anywhere, Anytime',
    description: 'Get personalized training programs delivered directly to your phone with weekly check-ins and unlimited support. Perfect for those who want expert guidance without the constraints of location or gym hours.',
    icon: <Lightning className="w-8 h-8 text-gold" weight="bold" />,
    packages: [
      {
        id: 'online-basic',
        name: 'Basic',
        price: 49.99,
        period: '/month',
        description: 'Perfect for those just starting their fitness journey',
        features: [
          'Weekly personalized workout programs',
          'Monthly progress check-in',
          'Exercise video library access',
          'Discord server access'
        ]
      },
      {
        id: 'online-pro',
        name: 'Pro',
        price: 99.99,
        period: '/month',
        description: 'Most popular choice for serious results',
        features: [
          'Weekly personalized workout programs',
          'Weekly video form checks (2 videos)',
          'Nutrition guidance & meal templates',
          'WhatsApp support during business hours',
          'Monthly progress report',
          'Discord server access'
        ],
        highlighted: true
      },
      {
        id: 'online-elite',
        name: 'Elite',
        price: 199.99,
        period: '/month',
        description: 'Complete transformation package',
        features: [
          'Bi-weekly personalized workout programs',
          'Unlimited video form checks',
          'Detailed nutrition planning',
          '24/7 WhatsApp support',
          'Weekly progress calls',
          'Custom exercise library',
          'Priority scheduling',
          'Discord server access'
        ]
      }
    ]
  },
  'train-with-me': {
    title: 'Train With Me',
    subtitle: 'In-Person Training',
    description: 'Train directly with our experienced personal trainer in person. Get real-time feedback, motivation, and customized workouts tailored to your specific needs and goals.',
    icon: <Fire className="w-8 h-8 text-gold" weight="bold" />,
    packages: [
      {
        id: 'train-single',
        name: 'Single Session',
        price: 80,
        description: 'One session to get started',
        features: [
          '45-minute one-on-one session',
          'Real-time feedback on form',
          'Personalized exercise selection',
          'Equipment provided',
          'Flexible scheduling'
        ]
      },
      {
        id: 'train-pack-10',
        name: '10 Session Pack',
        price: 700,
        description: 'Commit to your goals',
        features: [
          '10 x 45-minute sessions',
          'Real-time feedback on form',
          'Progress tracking & assessments',
          'Nutrition tips',
          'Flexible scheduling',
          'Exercise technique videos'
        ],
        highlighted: true
      },
      {
        id: 'train-pack-20',
        name: '20 Session Pack',
        price: 1200,
        description: 'Maximum results package',
        features: [
          '20 x 45-minute sessions',
          'Real-time feedback on form',
          'Detailed progress reports',
          'Custom nutrition plan',
          'Unlimited support between sessions',
          'Priority booking',
          'Bonus nutrition e-book'
        ]
      }
    ]
  },
  'personal-training': {
    title: 'Personal Training',
    subtitle: 'Comprehensive Transformation',
    description: 'Comprehensive one-on-one training sessions designed around your unique body type, goals, and lifestyle. Includes detailed nutrition guidance and ongoing support for a complete fitness transformation.',
    icon: <Target className="w-8 h-8 text-gold" weight="bold" />,
    packages: [
      {
        id: 'pt-starter',
        name: 'Starter',
        price: 250,
        description: 'Perfect introduction to personal training',
        features: [
          '4 sessions (45 min each)',
          'Initial fitness assessment',
          'Personalized workout plan',
          'Goal setting session',
          'Progress check-in'
        ]
      },
      {
        id: 'pt-transform',
        name: 'Transform',
        price: 800,
        description: 'Most popular for real results',
        features: [
          '10 sessions (45 min each)',
          'Comprehensive fitness assessment',
          'Custom workout & nutrition plan',
          'Weekly progress tracking',
          'Form correction & technique',
          'Motivation & accountability',
          'Email support'
        ],
        highlighted: true
      },
      {
        id: 'pt-premium',
        name: 'Premium',
        price: 1500,
        description: 'Complete transformation experience',
        features: [
          '20 sessions (45 min each)',
          'Detailed body composition analysis',
          'Full nutrition planning & coaching',
          'Unlimited WhatsApp support',
          'Weekly consultations',
          'Custom supplement guide',
          'Lifestyle & habit coaching',
          'Priority scheduling'
        ]
      }
    ]
  }
}

export default function ServicePage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const containerRef = useRef(null)

  const service = serviceId ? servicesData[serviceId] : null

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.xp-bar-fill').forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width') || bar.style.width || '50%'
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

    ScrollTrigger.batch('.package-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', overwrite: true }
        )
      },
      start: 'top 85%',
    })

    gsap.utils.toArray<HTMLElement>('.feature-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })
  }, { scope: containerRef })

  if (!service) {
    return (
      <div className="min-h-screen bg-hud-bg font-rajdhani flex items-center justify-center">
        <div className="hud-panel p-10 text-center relative">
          <div className="corner-decor-tl" />
          <div className="corner-decor-tr" />
          <h1 className="text-2xl text-white mb-4 font-rajdhani">Service Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-teal hover:text-gold transition-colors font-rajdhani"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  const handleGetStarted = (pkg: ServicePackage) => {
    localStorage.setItem('selectedPackage', JSON.stringify({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      service: service.title,
      features: pkg.features
    }))
    navigate('/intake')
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-teal hover:text-gold transition-colors mb-8 font-rajdhani text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" weight="bold" />
            Back to Base
          </button>

          <div className="w-20 h-20 hud-card flex items-center justify-center mx-auto mb-6">
            {service.icon}
          </div>

          <p className="text-xs text-teal font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Quest line</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cinzel tracking-wide">
            {service.title}
          </h1>
          <p className="text-xl text-gold mb-6 font-rajdhani" style={{ textShadow: '0 0 10px #ffd70044' }}>{service.subtitle}</p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-gold font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Mission select</p>
            <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select the option that fits your goals and lifestyle. All plans include a free consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-enter">
            {service.packages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className={`package-card hud-card relative flex flex-col ${
                  pkg.highlighted
                    ? 'hud-card-featured !border-gold'
                    : ''
                }`}
                style={{ opacity: 0 }}
              >
                {pkg.highlighted && (
                  <>
                    <div className="corner-decor-tl" />
                    <div className="corner-decor-tr" />
                    <div className="corner-decor-bl" />
                    <div className="corner-decor-br" />
                  </>
                )}

                {pkg.highlighted && (
                  <div className="bg-gold text-hud-bg text-xs font-bold px-3 py-2 text-center uppercase tracking-wider font-rajdhani">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">TIER {idx + 1}</span>
                    <div className="flex-1 h-px bg-hud-border" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 font-rajdhani">{pkg.name}</h3>
                  <p className="text-gray-400 text-base mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white font-rajdhani">${pkg.price}</span>
                    {pkg.period && <span className="text-gray-400">{pkg.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3 text-base text-gray-300">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          pkg.highlighted ? 'text-gold' : 'text-teal'
                        }`} weight="fill" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5">
                    <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                      <span>Value Rating</span>
                      <span>{idx === 0 ? '40%' : idx === 1 ? '75%' : '100%'}</span>
                    </div>
                    <div className="xp-bar-track">
                      <div className="xp-bar-fill" data-width={idx === 0 ? '40%' : idx === 1 ? '75%' : '100%'} style={{ width: '0%' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => handleGetStarted(pkg)}
                    className={`w-full py-4 font-semibold transition-all font-rajdhani uppercase tracking-wider text-sm ${
                      pkg.highlighted
                        ? 'hud-btn-gold'
                        : 'hud-btn !w-full !py-4'
                    }`}
                    style={!pkg.highlighted ? {
                      clipPath: 'none',
                      border: '1px solid #333',
                      background: 'linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)',
                      color: '#c8c8d8',
                    } : {}}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-teal font-semibold mb-2 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Loot table</p>
            <h2 className="hud-section-title text-3xl font-bold">What's Included</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 stagger-enter">
            {[
              { icon: <Barbell className="w-6 h-6 text-gold" weight="bold" />, title: 'Custom Workouts', desc: 'Programs designed specifically for your body type and goals' },
              { icon: <Clock className="w-6 h-6 text-gold" weight="bold" />, title: 'Flexible Scheduling', desc: 'Book sessions at times that work for your lifestyle' },
              { icon: <ChatCircle className="w-6 h-6 text-gold" weight="bold" />, title: 'Ongoing Support', desc: 'Direct access to your trainer for questions and motivation' },
              { icon: <Target className="w-6 h-6 text-gold" weight="bold" />, title: 'Progress Tracking', desc: 'Regular assessments to ensure you\'re on track' },
            ].map((item, i) => (
              <div key={i} className="feature-item hud-card flex items-start gap-4 p-5" style={{ opacity: 0 }}>
                <div className="w-12 h-12 bg-hud-bg border border-gold/30 rounded flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1 font-rajdhani">{item.title}</h3>
                  <p className="text-gray-400 text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
