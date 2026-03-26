import { useNavigate } from 'react-router-dom'
import { Dumbbell, Zap, ArrowRight, CheckCircle, Flame, MapPin, Clock, Mail, Target, Heart, Instagram, MessageCircle } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  shortDescription: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    id: 'online-coaching',
    name: 'Online Coaching',
    description: 'Get personalized training programs delivered to your phone with weekly check-ins and unlimited support. Perfect for those who want guidance while still training autonomously.',
    shortDescription: 'Personalized programs delivered to your phone with weekly check-ins',
    icon: <Zap className="w-6 h-6 text-[#2533d5]" />
  },
  {
    id: 'train-with-me',
    name: 'Train With Me',
    description: 'A unique buddy training experience where we share our fitness journey together. Unlike traditional sessions where you are just shown what to do, this is a collaborative workout where you do what I do, pushing each other to new limits.',
    shortDescription: 'In-person training with real-time feedback and personalized attention',
    icon: <Flame className="w-6 h-6 text-blue-500" />
  },
  {
    id: 'personal-training',
    name: 'Personal Training',
    description: 'Comprehensive one-on-one training sessions designed around your unique body type, goals, and lifestyle. Includes nutrition guidance and ongoing support.',
    shortDescription: 'Comprehensive fitness transformation with nutrition and support',
    icon: <Target className="w-6 h-6 text-[#2533d5]" />
  }
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <header className="bg-[#1a1a1a]/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2533d5] rounded-xl flex items-center justify-center shadow-lg">
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
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-bebas text-5xl md:text-7xl tracking-[0.15em]">
            Transform Your Body,
            <span className="text-[#2533d5]"> Transform Your Life</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-0 max-w-2xl mx-auto">
            Personalized training programs designed specifically for your body type, goals, and lifestyle.
            Start your journey today with expert guidance every step of the way.
          </p>
          
        </div>
      </section>

      {/* Photo */}
      <section className="pt-0 pb-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-center">
          <img 
            src="/images/website_photo.png" 
            alt="Fitness" 
            className="w-[400px] h-[500px] object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 px-4 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Choose Your Training Plan
          </h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            Select the option that fits your goals and lifestyle. All plans include a free consultation.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(`/service/${service.id}`)}
                className="bg-[#1f1f1f] rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-[#2a2a2a] overflow-hidden group flex flex-col hover:border-[#2533d5] cursor-pointer"
              >
                <div className="p-8 flex flex-col flex-grow text-center items-center">
                  <div className="w-14 h-14 bg-[#2a2a2a] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2533d5] transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/service/${service.id}`)}}
                    className="w-full py-3 rounded-xl font-semibold transition-all group-hover:scale-105 mt-auto bg-[#2533d5] text-white hover:bg-[#1e28b8]"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <div className="flex justify-center gap-6">
            {/* Instagram */}
            <div className="flex flex-col items-center">
              <a 
                href="https://www.instagram.com/thisistogoevenfurtherbeyond/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-28 h-28 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #00FF7F 0%, #8B00FF 100%)' }}
              >
                <Instagram className="w-16 h-16 text-white" />
              </a>
              <p className="mt-4 text-gray-400">See what I'm up to<br/>on Instagram :)</p>
            </div>
            {/* Discord */}
            <div className="flex flex-col items-center">
              <a 
                href="https://discord.gg/VJFAnQMK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-28 h-28 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)' }}
              >
                <MessageCircle className="w-16 h-16 text-white" />
              </a>
              <p className="mt-4 text-gray-400">Live chat and<br/>community Discord</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-[#151515]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#2533d5]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#2533d5]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Online Programming</h3>
              <p className="text-gray-400">Custom workout plans delivered via app, email, or PDF. Train anywhere, anytime.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#2533d5]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-[#2533d5]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">In-Person Training</h3>
              <p className="text-gray-400">One-on-one sessions with real-time feedback and personalized attention.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#2533d5]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#2533d5]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Nutrition Guidance</h3>
              <p className="text-gray-400">Custom meal plans and macros tailored to your goals and preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Start Your Journey?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-slate-400">Downtown Fitness Center<br />123 Main Street</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-slate-400">Mon - Sat: 6AM - 8PM<br />Sunday: By appointment</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Mail className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-slate-400">hello@10xconsulting.com<br />+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-[#2533d5] text-center">
        <p>&copy; 2026 10X Consulting.</p>
      </footer>
    </div>
  )
}
