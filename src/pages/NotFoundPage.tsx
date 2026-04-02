import { useNavigate } from 'react-router-dom'
import { House, ArrowLeft } from '@phosphor-icons/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-24 px-4 flex items-center justify-center">
        <div className="hud-panel p-12 md:p-16 text-center max-w-lg relative">
          <div className="corner-decor-tl" />
          <div className="corner-decor-tr" />
          <div className="corner-decor-bl" />
          <div className="corner-decor-br" />

          <p className="text-xs text-teal font-semibold mb-4 font-rajdhani" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Error</p>

          <h1 className="font-cinzel text-6xl font-bold text-gold mb-2" style={{ textShadow: '0 0 20px #ffd70044' }}>
            404
          </h1>
          <p className="text-xl text-white font-semibold mb-2 font-rajdhani">Area Not Discovered</p>
          <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
            This zone hasn't been unlocked yet. Head back to base camp and pick a known path.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="hud-btn-gold font-rajdhani inline-flex items-center justify-center gap-2 text-sm"
            >
              <House className="w-4 h-4" weight="bold" />
              Base Camp
            </button>
            <button
              onClick={() => navigate(-1)}
              className="hud-btn font-rajdhani inline-flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" weight="bold" />
              Go Back
            </button>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
