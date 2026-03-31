import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Swords, Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'Who We Are', path: '/trainers' },
  { label: 'What We Do', path: '/' },
  { label: 'Select Your Journey', path: '/pricing' },
]

export default function GameHudHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (path: string) => {
    navigate(path)
    setMobileOpen(false)
  }

  return (
    <header className="w-full bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] relative sticky top-0 z-50">
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-[60px] h-[60px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full border-t-[3px] border-l-[3px] border-gold rounded-tl-lg" />
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-teal rounded-tl-sm shadow-[0_0_10px_#00ffcc44]" />
      </div>
      <div className="absolute top-0 right-0 w-[60px] h-[60px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full border-t-[3px] border-r-[3px] border-gold rounded-tr-lg" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-teal rounded-tr-sm shadow-[0_0_10px_#00ffcc44]" />
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-5 right-5 h-0.5 hud-divider" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: '10%', top: '20%', delay: '0s' },
          { left: '25%', top: '60%', delay: '1s' },
          { left: '40%', top: '30%', delay: '2s' },
          { left: '55%', top: '70%', delay: '0.5s' },
          { left: '70%', top: '40%', delay: '1.5s' },
          { left: '85%', top: '50%', delay: '2.5s' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-teal rounded-full opacity-60 animate-float-particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto h-[72px] px-5 flex items-center justify-between relative z-10">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="relative w-12 h-12">
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a] border-2 border-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_#ffd70044,inset_0_0_15px_#ffd70022]">
              <Swords className="w-6 h-6 text-gold" style={{ filter: 'drop-shadow(0 0 6px #ffd700)' }} />
            </div>
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#ff4444] to-[#cc0000] text-white text-[8px] font-bold px-1 py-0.5 rounded border border-[#ff6666] shadow-[0_0_8px_#ff444488]">
              LV
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-[18px] md:text-[22px] font-bold text-gold leading-none" style={{ textShadow: '0 0 10px #ffd70066, 0 2px 4px #00000088' }}>
              Stat Stackers
            </span>
            <span className="font-rajdhani text-[9px] md:text-[11px] font-semibold text-teal uppercase tracking-[2px] md:tracking-[3px] mt-0.5" style={{ textShadow: '0 0 8px #00ffcc66' }}>
              Performance Optimization
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`hud-btn font-rajdhani ${isActive ? '!text-teal !border-teal/40' : ''}`}
              >
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-teal" style={{ filter: 'drop-shadow(0 0 4px #00ffcc)' }} />
                )}
                {item.label}
              </button>
            )
          })}
          <button
            onClick={() => window.open('https://discord.gg/BJr8TUys', '_blank')}
            className="hud-btn hud-btn-discord font-rajdhani flex items-center gap-1.5 !ml-2"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Discord
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => navigate('/pricing')}
            className="hud-btn-gold font-rajdhani"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center border border-gold/30 rounded bg-hud-panel text-gold"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] border-t border-hud-border relative z-10">
          <div className="px-5 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`w-full text-left px-4 py-3 rounded font-rajdhani text-sm font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-teal/10 text-teal border border-teal/30'
                      : 'text-gray-300 hover:text-gold hover:bg-gold/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => window.open('https://discord.gg/BJr8TUys', '_blank')}
                className="flex-1 hud-btn-discord font-rajdhani text-sm py-3 text-center inline-flex items-center justify-center gap-2 rounded"
                style={{ clipPath: 'none' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Discord
              </button>
              <button
                onClick={() => handleNav('/pricing')}
                className="flex-1 hud-btn-gold font-rajdhani text-sm py-3 text-center"
                style={{ clipPath: 'none' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
