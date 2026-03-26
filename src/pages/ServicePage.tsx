import { useNavigate, useParams } from 'react-router-dom'
import { Zap, Flame, Target, CheckCircle, ArrowLeft, Clock, Dumbbell, MessageCircle } from 'lucide-react'

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
    icon: <Zap className="w-8 h-8" />,
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
          'Training app access'
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
          'Training app access'
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
          'Training app access'
        ]
      }
    ]
  },
  'train-with-me': {
    title: 'Train With Me',
    subtitle: 'In-Person Training',
    description: 'Train directly with our experienced personal trainer in person. Get real-time feedback, motivation, and customized workouts tailored to your specific needs and goals. Experience the difference of having a trainer right by your side.',
    icon: <Flame className="w-8 h-8" />,
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
    icon: <Target className="w-8 h-8" />,
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
  
  const service = serviceId ? servicesData[serviceId] : null
  
  if (!service) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Service Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-400"
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
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <header className="bg-[#1a1a1a]/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div 
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-[#2533d5] rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
            >
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">10X Consulting</span>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="text-white hover:text-blue-500"
          >
            Trainer Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
          
          <div className="w-20 h-20 bg-[#2a2a2a] rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
            {service.icon}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-anton uppercase tracking-wider">
            {service.title}
          </h1>
          <p className="text-xl text-blue-500 mb-6">{service.subtitle}</p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Select the option that fits your goals and lifestyle. All plans include a free consultation.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {service.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-[#1f1f1f] rounded-2xl shadow-lg transition-all border-2 overflow-hidden flex flex-col ${
                  pkg.highlighted 
                    ? 'border-[#2533d5] hover:border-[#1e28b8] transform md:-translate-y-2' 
                    : 'border-[#2a2a2a] hover:border-[#2533d5]'
                }`}
              >
                {pkg.highlighted && (
                  <div className="bg-[#2533d5] text-white text-xs font-bold px-3 py-2 text-center">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${pkg.price}</span>
                    {pkg.period && <span className="text-gray-400">{pkg.period}</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle className="w-5 h-5 text-[#2533d5] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleGetStarted(pkg)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      pkg.highlighted
                        ? 'bg-[#2533d5] text-white hover:bg-[#1e28b8]'
                        : 'bg-[#2a2a2a] text-white hover:bg-[#2533d5] border border-[#2a2a2a] hover:border-[#2533d5]'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Dumbbell className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Custom Workouts</h3>
                <p className="text-gray-400 text-sm">Programs designed specifically for your body type and goals</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Flexible Scheduling</h3>
                <p className="text-gray-400 text-sm">Book sessions at times that work for your lifestyle</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Ongoing Support</h3>
                <p className="text-gray-400 text-sm">Direct access to your trainer for questions and motivation</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Progress Tracking</h3>
                <p className="text-gray-400 text-sm">Regular assessments to ensure you're on track</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-green-500 text-center">
        <p>&copy; 2026 10X Consulting.</p>
      </footer>
    </div>
  )
}
