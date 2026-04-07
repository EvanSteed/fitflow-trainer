import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, EnvelopeSimple, Download, FileText, ArrowRight } from '@phosphor-icons/react'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

export default function SuccessPage() {
  const navigate = useNavigate()
  const [clientData, setClientData] = useState<any>(null)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('clientData')
    const pkg = localStorage.getItem('selectedPackage')
    if (data) setClientData(JSON.parse(data))
    if (pkg) setSelectedPackage(JSON.parse(pkg))
  }, [])

  const deliveryMethodInfo = {
    email: { icon: EnvelopeSimple, label: 'Email (PDF)', desc: 'Check your inbox for the program PDF' },
    app: { icon: Download, label: 'Discord', desc: 'Programs and communication delivered through Discord' },
    sheets: { icon: FileText, label: 'Google Sheets', desc: 'Receive a shared Google Sheets link' }
  }

  return (
    <div className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success */}
          <div className="mb-10">
            <div className="w-20 h-20 bg-green-900/30 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" weight="fill" />
            </div>
            <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2">// Quest Accepted</p>
            <h1 className="text-3xl font-bold text-white mb-2 font-cinzel">Payment Successful</h1>
            <p className="text-gray-400">Thank you for your purchase, {clientData?.fullName || 'Client'}.</p>
          </div>

          {/* Order Confirmation */}
          <div className="hud-card p-6 mb-6 text-left relative">
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />

            <h2 className="text-lg font-bold text-white mb-4 font-rajdhani">Order Confirmation</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-hud-border">
                <span className="text-gray-400">Order Number</span>
                <span className="font-mono text-teal">FF-{Date.now().toString(36).toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hud-border">
                <span className="text-gray-400">Package</span>
                <span className="font-medium text-white">{selectedPackage?.name}</span>
              </div>
               <div className="flex justify-between py-2 border-b border-hud-border">
                 <span className="text-gray-400">Package Price</span>
                 <span className="font-medium text-white">{selectedPackage?.price}</span>
               </div>
               {localStorage.getItem('stripeFee') && parseFloat(localStorage.getItem('stripeFee') || '0') > 0 && (
                 <div className="flex justify-between py-2 border-b border-hud-border">
                   <span className="text-gray-400">Processing Fee</span>
                   <span className="font-medium text-white">{localStorage.getItem('stripeFee')}</span>
                 </div>
               )}
               <div className="flex justify-between py-2 border-b border-hud-border">
                 <span className="text-gray-400">Total Paid</span>
                 <span className="font-bold text-gold font-rajdhani">{localStorage.getItem('paymentAmount') || selectedPackage?.price}</span>
               </div>
               <div className="flex justify-between py-2">
                 <span className="text-gray-400">Payment Method</span>
                 <span className="font-medium text-white">
                   {localStorage.getItem('paymentMethod') === 'stripe' ? 'Stripe (Card)' :
                    localStorage.getItem('paymentMethod') === 'bank-transfer' ? 'Bank Transfer' :
                    localStorage.getItem('paymentMethod') === 'cash' ? 'Cash' : 'Card'}
                 </span>
               </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Delivery Method</span>
                <span className="font-medium text-white">
                  {deliveryMethodInfo[clientData?.deliveryMethod as keyof typeof deliveryMethodInfo]?.label || 'Email'}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="hud-card p-6 mb-6 text-left relative">
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />

            <h2 className="text-lg font-bold text-white mb-4 font-rajdhani">What's Next?</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Check your email', desc: `We've sent a confirmation to ${clientData?.email || 'your inbox'}` },
                { step: '2', title: 'Join our Discord', desc: 'Complete Discord signup and onboarding to get started', button: true },
                { step: '3', title: 'We will get in contact with you', desc: "We'll reach out as soon as possible to discuss your program" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold/20 border border-gold/40 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-xs">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    {item.button && (
                      <button
                        onClick={() => alert('Discord link would open here')}
                        className="mt-2 hud-btn-gold text-xs px-4 py-2"
                      >
                        Join Discord
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="hud-card p-6 mb-8 text-left relative">
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />

            <h2 className="text-lg font-bold text-white mb-3 font-rajdhani">Questions?</h2>
            <p className="text-sm text-gray-400 mb-4">
              If you have any questions about your program or need to make changes, reach out anytime.
            </p>
            <div className="space-y-1.5 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-500 uppercase tracking-wider text-[10px] font-semibold mr-2">Email</span>
                hello@statstackers.com
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500 uppercase tracking-wider text-[10px] font-semibold mr-2">Phone</span>
                +1 (555) 123-4567
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="hud-btn font-rajdhani flex items-center justify-center gap-2 text-sm"
            >
              Back to Home
            </button>
            <button
              onClick={() => alert('Demo mode - in production, this would open your Discord server')}
              className="hud-btn-gold font-rajdhani flex items-center justify-center gap-2 text-sm"
            >
              View My Program <ArrowRight className="w-4 h-4" weight="bold" />
            </button>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
