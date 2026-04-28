import { useNavigate } from 'react-router-dom'

export default function GameHudFooter() {
  const navigate = useNavigate()

  return (
    <footer className="relative bg-gradient-to-b from-[#0d0d1a] to-[#060610] border-t border-hud-border">
      {/* Top gold line */}
      <div className="absolute top-0 left-5 right-5 h-0.5 hud-divider" />

      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <h3 className="font-cinzel text-xl font-bold text-gold mb-3" style={{ textShadow: '0 0 10px #ffd70066' }}>
              Stat Stackers
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Level up your fitness journey. Every workout is XP. Every meal is a stat boost. Stop guessing, start stacking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-rajdhani text-sm font-bold text-teal uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'What We Do', path: '/what-we-do' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'Trainer Login', path: '/admin' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-rajdhani text-sm font-bold text-teal uppercase tracking-wider mb-3">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/y42G8fjvZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#5865F2] transition-colors"
                >
                  Discord Server
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/thisistogoevenfurtherbeyond/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="hud-divider mb-6" />

        {/* Copyright */}
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 font-rajdhani">
            &copy; 2026 Stat Stackers. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-rajdhani">
            Built for players who never stop grinding.
          </p>
        </div>
      </div>
    </footer>
  )
}
