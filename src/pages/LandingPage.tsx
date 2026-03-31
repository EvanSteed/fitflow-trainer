import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Mail, Instagram, MessageCircle, TrendingUp, Dumbbell, Apple, ClipboardCheck, Shield, ChevronRight, Star, Zap, Trophy, ArrowUp } from 'lucide-react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-hud-panel border border-gold/30 px-5 py-2.5 mb-8" style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
            <Star className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-semibold tracking-wider uppercase font-rajdhani">Track your stats. Stack your progress.</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-cinzel tracking-wide">
            Level Up Your
            <span className="block text-gold" style={{ textShadow: '0 0 20px #ffd70066, 0 0 40px #ffd70033' }}> Fitness Journey</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every workout is XP. Every meal is a stat boost. Every habit you track is progress toward the next level.
            Stop guessing, start stacking.
          </p>

          {/* Hero Stats Bar */}
          <div className="flex justify-center gap-8 mb-10">
            {[
              { label: 'STR', value: '99', icon: <Dumbbell className="w-4 h-4" /> },
              { label: 'NUTR', value: '85', icon: <Apple className="w-4 h-4" /> },
              { label: 'MIND', value: '72', icon: <Shield className="w-4 h-4" /> },
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/pricing')}
              className="hud-btn-gold text-base px-10 py-4"
            >
              View Plans
            </button>
            <a
              href="https://discord.gg/BJr8TUys"
              target="_blank"
              rel="noopener noreferrer"
              className="hud-btn hud-btn-discord font-rajdhani text-base px-10 py-4 inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Join the Discord
            </a>
          </div>
        </div>
      </section>

      {/* How Stat Stacking Works - Quest Board Style */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// System Overview</p>
            <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
              How Stat Stacking Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Think of your fitness like an RPG character. Every area of your life is a stat, and the more consistently you train each one, the higher your level goes.
            </p>
          </div>

          {/* Quest Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Dumbbell className="w-7 h-7 text-gold" />,
                title: 'Workout Programming',
                desc: 'Structured workouts with progressive overload, designed around your goals and schedule. Every session adds XP to your strength stat.',
                xp: '+Strength',
                stat: 'STR',
              },
              {
                icon: <Apple className="w-7 h-7 text-gold" />,
                title: 'Nutritional Advice',
                desc: 'Fuel your body right. Macros, meal prep, and eating better consistently. Your nutrition stat keeps stacking higher.',
                xp: '+Energy',
                stat: 'NUTR',
              },
              {
                icon: <Shield className="w-7 h-7 text-gold" />,
                title: 'Accountability',
                desc: 'No more spinning your wheels. Progress checks keep you honest and on track. Clarity beats motivation every time.',
                xp: '+Results',
                stat: 'FOCUS',
              },
              {
                icon: <ClipboardCheck className="w-7 h-7 text-gold" />,
                title: 'Habit Building',
                desc: 'Sleep, recovery, daily routines. The boring stuff that separates Level 1 from Level 50. Progress compounds week by week.',
                xp: '+Life Skills',
                stat: 'DISC',
              },
            ].map((quest, i) => (
              <div key={i} className="hud-card p-6 group relative">
                {/* Corner decorations */}
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />

                {/* Quest stat boost badge */}
                <div className="absolute top-3 right-3 bg-green-900/30 border border-green-500/40 px-2 py-0.5 rounded text-[10px] text-green-400 font-bold flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-green-400" />
                  {quest.xp}
                </div>

                <div className="w-12 h-12 bg-hud-bg border border-gold/30 rounded flex items-center justify-center mb-4 group-hover:border-gold/60 transition-colors">
                  {quest.icon}
                </div>

                {/* Stat label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{quest.stat}</span>
                  <div className="flex-1 h-px bg-hud-border" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-rajdhani">{quest.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{quest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section - Codex Style */}
      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-gold uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// Strategy Guide</p>
            <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
              Tips to Stack Stats Faster
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Progress isn't about being perfect. It's about being consistent. Here's how to keep leveling up week after week.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <TrendingUp className="w-5 h-5 text-teal" />, title: 'Start small, stack daily', desc: 'Don\'t try to max every stat on Day 1. Pick one habit, lock it in for a week, then add another. Small wins compound into massive gains.', level: 'Lv.1' },
              { icon: <ClipboardCheck className="w-5 h-5 text-teal" />, title: 'Track everything', desc: 'What gets measured gets managed. Log your workouts, meals, sleep, and mood. You can\'t level up a stat you\'re not watching.', level: 'Lv.5' },
              { icon: <Dumbbell className="w-5 h-5 text-teal" />, title: 'Train with intention', desc: 'Every rep has a purpose. Follow a program, not a vibe. Progressive overload is the XP system. Add weight, add reps, add time under tension.', level: 'Lv.10' },
              { icon: <Apple className="w-5 h-5 text-teal" />, title: 'Fuel like you mean it', desc: 'You can\'t out-train a bad diet. Nail your protein, stay hydrated, and eat for performance. Your nutrition stat is the multiplier for everything else.', level: 'Lv.15' },
              { icon: <Shield className="w-5 h-5 text-teal" />, title: 'Recover to progress', desc: 'Rest days aren\'t cheat days, they\'re when your body actually builds. Sleep 7+ hours, manage stress, and treat recovery as part of the grind.', level: 'Lv.20' },
            ].map((tip, i) => (
              <div key={i} className="hud-card flex items-start gap-5 p-5">
                {/* Level badge */}
                <div className="w-10 h-10 bg-hud-bg border border-gold/30 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-[10px] font-bold">{tip.level}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {tip.icon}
                    <h3 className="text-base font-bold text-white font-rajdhani">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{tip.desc}</p>
                </div>

                {/* XP reward */}
                <div className="flex-shrink-0 text-right">
                  <span className="text-xs text-teal font-bold">+{50 + i * 25} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progression CTA - Achievement Style */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="hud-panel p-10 md:p-14 text-center relative overflow-hidden">
            {/* Corner decorations */}
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />
            <div className="corner-decor-bl" />
            <div className="corner-decor-br" />

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-gold" />
                <span className="text-xs text-gold uppercase tracking-[3px] font-semibold font-rajdhani">Achievement Unlocked</span>
                <Trophy className="w-6 h-6 text-gold" />
              </div>

              <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px #ffd70044' }}>
                Week by Week, Stat by Stat
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                This isn't a 6-week crash course. It's a progression system. You pick your tier, we give you the quests,
                and you level up at your own pace. Whether you're a beginner or a veteran, there's always a next level.
              </p>

              {/* Progress bar visual */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Elite</span>
                </div>
                <div className="xp-bar-track h-2">
                  <div className="xp-bar-fill h-full" style={{ width: '65%' }} />
                </div>
              </div>

              <button
                onClick={() => navigate('/pricing')}
                className="hud-btn-gold text-base px-10 py-4 inline-flex items-center gap-2"
              >
                See Your Options
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Discord - Guild Hall Style */}
      <section className="py-16 px-4 bg-hud-panel/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// Guild Hall</p>
          <h2 className="hud-section-title text-3xl md:text-4xl font-bold mb-4">
            You Don't Have to Grind Alone
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the Stat Stackers community on Discord. Share wins, get accountability, ask questions,
            and push each other to level up. The best players never solo queue.
          </p>

          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center gap-8">
              {/* Instagram */}
              <div className="flex flex-col items-center group">
                <a
                  href="https://www.instagram.com/thisistogoevenfurtherbeyond/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-24 h-24 hud-card group-hover:border-pink-500/40 transition-all"
                  style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <Instagram className="w-10 h-10 text-pink-400" />
                </a>
                <p className="mt-3 text-xs text-gray-500 uppercase tracking-wider font-rajdhani">Updates</p>
              </div>

              {/* Discord */}
              <div className="flex flex-col items-center group">
                <a
                  href="https://discord.gg/BJr8TUys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-24 h-24 hud-card group-hover:border-[#5865F2]/40 transition-all"
                  style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <MessageCircle className="w-10 h-10 text-[#5865F2]" />
                </a>
                <p className="mt-3 text-xs text-gray-500 uppercase tracking-wider font-rajdhani">Community</p>
              </div>
            </div>

            {/* Discord Widget */}
            <div className="hud-card p-1">
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

      {/* Contact & Location - Map Marker Style */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-gold uppercase tracking-[4px] font-semibold mb-2 font-rajdhani">// Base Camp</p>
            <h2 className="hud-section-title text-3xl font-bold">Ready to Start Stacking?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <MapPin className="w-6 h-6 text-gold" />, label: 'Location', value: 'Downtown Fitness Center', sub: '123 Main Street' },
              { icon: <Clock className="w-6 h-6 text-gold" />, label: 'Hours', value: 'Mon - Sat: 6AM - 8PM', sub: 'Sunday: By appointment' },
              { icon: <Mail className="w-6 h-6 text-gold" />, label: 'Contact', value: 'hello@statstackers.com', sub: '+1 (555) 123-4567' },
            ].map((info, i) => (
              <div key={i} className="hud-card p-6 text-center relative">
                <div className="corner-decor-tl" />
                <div className="corner-decor-tr" />

                <div className="w-14 h-14 bg-hud-bg border border-gold/30 rounded flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <p className="text-[10px] text-teal uppercase tracking-[3px] font-semibold mb-2 font-rajdhani">{info.label}</p>
                <p className="text-white font-semibold text-sm">{info.value}</p>
                <p className="text-gray-400 text-sm">{info.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
