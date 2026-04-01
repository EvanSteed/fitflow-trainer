import { useNavigate } from 'react-router-dom'
import { Dumbbell, Apple, ClipboardCheck, Video, CalendarDays, CheckCircle, ChevronRight, ArrowUp, Zap, Shield, Star, TrendingUp, MessageCircle, Target, Award, Users } from 'lucide-react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

export default function WhatWeDoPage() {
  const navigate = useNavigate()

  const services = [
    {
      icon: <Dumbbell className="w-8 h-8 text-gold" />,
      stat: 'STR',
      title: 'Online Programming',
      subtitle: 'Build Your Training Foundation',
      description: 'Every great character starts with a solid build. Your training program is the backbone of your fitness journey -- designed around your goals, your schedule, and your experience level.',
      details: [
        'Personalized workout programs updated weekly or bi-weekly',
        'Progressive overload built into every session so you keep leveling up',
        'Programs for strength, hypertrophy, endurance, or general fitness',
        'Exercise substitutions for home gym or limited equipment',
        'Access to a training app to track every set, rep, and PR',
      ],
      xp: '+STR',
      color: 'gold',
    },
    {
      icon: <Apple className="w-8 h-8 text-gold" />,
      stat: 'NUTR',
      title: 'Nutritional Guidance',
      subtitle: 'Fuel Your Progress',
      description: 'Your nutrition stat is the multiplier for everything else. You can train hard every day, but without the right fuel, your XP gains are cut in half. We help you eat for performance, not punishment.',
      details: [
        'Macro targets and calorie guidance tailored to your goal',
        'Meal templates and prep strategies that fit your lifestyle',
        'Flexible dieting approach -- no foods are off limits',
        'Nutrition adjustments based on your check-in progress',
        'Supplement recommendations if needed (no BS, just what works)',
      ],
      xp: '+NUTR',
      color: 'gold',
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-gold" />,
      stat: 'FOCUS',
      title: 'Accountability Check-Ins',
      subtitle: 'Stay on the Quest',
      description: 'Motivation fades. Systems don\'t. Regular check-ins keep you honest, celebrate your wins, and adjust the plan when life throws a boss battle your way. This is what separates solo grinding from having a party.',
      details: [
        'Weekly or bi-weekly structured check-ins',
        'Progress photo tracking and body measurements',
        'Honest feedback on what\'s working and what needs to change',
        'Program adjustments based on real data, not guesswork',
        'Direct messaging access to your coach for questions between check-ins',
      ],
      xp: '+FOCUS',
      color: 'gold',
    },
    {
      icon: <Video className="w-8 h-8 text-gold" />,
      stat: 'TECH',
      title: 'Video Form Checks',
      subtitle: 'Perfect Your Technique',
      description: 'Bad form is a debuff you don\'t want. It limits your gains and puts you at risk for injury. Send us videos of your lifts, and we\'ll break down your technique with detailed feedback.',
      details: [
        'Submit video form checks anytime through the app',
        'Detailed written and annotated feedback on your lifts',
        'Cues and corrections to improve bar path, bracing, and positioning',
        'Unlimited form checks on higher-tier plans',
        'Build confidence and train safely with expert eyes on your movement',
      ],
      xp: '+TECH',
      color: 'gold',
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-gold" />,
      stat: 'DISC',
      title: 'Habit Building Systems',
      subtitle: 'Stack Daily XP',
      description: 'The boring stuff that separates Level 1 from Level 50. Sleep, recovery, daily routines -- progress compounds week by week. We help you build the habits that turn effort into results.',
      details: [
        'Sleep optimization strategies for better recovery',
        'Daily routine building and consistency tracking',
        'Stress management techniques to protect your gains',
        'Weekly habit targets that build on each other',
        'Mindset coaching to push through plateaus and stay locked in',
      ],
      xp: '+DISC',
      color: 'gold',
    },
  ]

  const valuePoints = [
    {
      icon: <Target className="w-6 h-6 text-teal" />,
      title: 'Built Around You',
      desc: 'Every program, every check-in, every piece of feedback is tailored to your specific goals, body, and lifestyle. No cookie-cutter templates.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-teal" />,
      title: 'Data-Driven Adjustments',
      desc: 'We don\'t guess. Your program evolves based on your actual progress -- not a generic 12-week cycle that ignores your reality.',
    },
    {
      icon: <Users className="w-6 h-6 text-teal" />,
      title: 'Fraction of In-Person Cost',
      desc: 'Get expert coaching, programming, nutrition, and accountability for less than the cost of a single personal training session per month.',
    },
    {
      icon: <Award className="w-6 h-6 text-teal" />,
      title: 'Train on Your Schedule',
      desc: 'No locked-in session times. Train when it works for you -- morning, night, home gym, commercial gym, hotel room. Your quest, your timing.',
    },
  ]

  return (
    <div className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-hud-panel border border-gold/30 px-5 py-2.5 mb-8" style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-semibold tracking-wider uppercase font-rajdhani">// Skill Tree Overview</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-cinzel tracking-wide">
            What We Do
            <span className="block text-gold text-3xl md:text-4xl mt-2" style={{ textShadow: '0 0 20px #ffd70066' }}>
              Your Complete Progression System
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Online coaching with Stat Stackers isn't just a workout plan. It's a fully integrated system designed to level up every stat that matters -- training, nutrition, accountability, technique, and daily habits.
          </p>

          {/* Quick stats */}
          <div className="flex justify-center gap-8 mb-6">
            {[
              { label: 'STR', value: '99', icon: <Dumbbell className="w-5 h-5" /> },
              { label: 'NUTR', value: '85', icon: <Apple className="w-5 h-5" /> },
              { label: 'TECH', value: '80', icon: <Video className="w-5 h-5" /> },
              { label: 'FOCUS', value: '90', icon: <ClipboardCheck className="w-5 h-5" /> },
              { label: 'DISC', value: '88', icon: <CalendarDays className="w-5 h-5" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-hud-panel border border-hud-border rounded flex items-center justify-center mb-1 text-teal">
                  {stat.icon}
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</span>
                <span className="hud-stat text-lg">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Breakdown */}
      <section className="py-16 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// Skill Breakdown</p>
            <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
              Five Stats, One System
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Each element of our coaching works together. Train one stat and the others level up too. Here's exactly what you get when you join Stat Stackers.
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, i) => (
              <div key={i} className="hud-card p-8 md:p-10 relative group">
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />
                <div className="corner-decor-bl" />
                <div className="corner-decor-br" />

                {/* XP badge */}
                <div className="absolute top-4 right-4 bg-green-900/30 border border-green-500/40 px-3 py-1 rounded text-xs text-green-400 font-bold flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-green-400" />
                  {service.xp}
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  {/* Icon + stat */}
                  <div className="flex flex-col items-center md:items-start flex-shrink-0">
                    <div className="w-16 h-16 bg-hud-bg border border-gold/30 rounded flex items-center justify-center mb-2 group-hover:border-gold/60 transition-colors">
                      {service.icon}
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{service.stat}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1 font-rajdhani">{service.title}</h3>
                    <p className="text-gold text-sm font-semibold mb-3 font-rajdhani tracking-wide">{service.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed mb-5">{service.description}</p>

                    <ul className="space-y-2.5">
                      {service.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pay for Online Coaching */}
      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-gold uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// Why Stat Stackers</p>
            <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
              Why Pay for Online Programming?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Free programs are everywhere. So is free advice. But free doesn't mean effective. Here's what changes when you invest in a system built around you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {valuePoints.map((point, i) => (
              <div key={i} className="hud-card p-6 relative">
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-hud-bg border border-teal/30 rounded flex items-center justify-center flex-shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 font-rajdhani">{point.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison callout */}
          <div className="hud-panel p-8 md:p-12 text-center relative overflow-hidden">
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />
            <div className="corner-decor-bl" />
            <div className="corner-decor-br" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px #ffd70044' }}>
                The Math is Simple
              </h3>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                A single in-person personal training session costs $80+. Our Pro plan gives you <span className="text-gold font-bold">weekly programming, nutrition guidance, form checks, and accountability</span> for $99/month. That's less than one session for a full month of coaching.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/pricing')}
                  className="hud-btn-gold text-base px-10 py-4 inline-flex items-center justify-center gap-2"
                >
                  View Plans & Pricing
                  <ChevronRight className="w-5 h-5" />
                </button>
                <a
                  href="https://discord.gg/BJr8TUys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-btn hud-btn-discord font-rajdhani text-base px-10 py-4 inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Ask Questions on Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// Quest Log</p>
            <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Starting your journey with Stat Stackers is straightforward. Here's what the process looks like from sign-up to stat stacking.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { step: '01', title: 'Choose Your Plan', desc: 'Pick the tier that matches your goals and budget. Every plan starts with a free consultation to assess your current level and set your objectives.' },
              { step: '02', title: 'Complete Your Intake', desc: 'Fill out a detailed questionnaire about your training history, goals, injuries, schedule, and nutrition. This is how we build your starting stats.' },
              { step: '03', title: 'Get Your Custom Program', desc: 'Within 48 hours, you receive your personalized training program and nutrition guidelines through the app. Every detail is built around you.' },
              { step: '04', title: 'Train & Track', desc: 'Follow your program, log your workouts, and send form check videos. Everything feeds back to your coach so the system stays optimized.' },
              { step: '05', title: 'Check In & Level Up', desc: 'At your scheduled check-in, we review your progress, adjust your program, and set new targets. Rinse and repeat. Week by week, stat by stat.' },
            ].map((item, i) => (
              <div key={i} className="hud-card flex items-start gap-5 p-6 relative">
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />

                <div className="w-14 h-14 bg-hud-bg border border-gold/30 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-sm font-bold font-rajdhani">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 font-rajdhani">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs text-teal font-bold">+{(i + 1) * 100} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-8 h-8 text-gold mx-auto mb-4" />
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px #ffd70044' }}>
            Ready to Start Stacking?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Stop grinding without a plan. Join Stat Stackers and get a system that levels you up week by week, stat by stat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/pricing')}
              className="hud-btn-gold text-base px-10 py-4 inline-flex items-center justify-center gap-2"
            >
              View Plans & Pricing
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/intake')}
              className="hud-btn font-rajdhani text-base px-10 py-4 inline-flex items-center justify-center gap-2"
              style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
            >
              Get Started Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
