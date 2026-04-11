import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, ArrowLeft, Check, Shield, WarningCircle, LockKey } from '@phosphor-icons/react'
import { loadStripe } from '@stripe/stripe-js'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [error, setError] = useState('')
  const [stripe, setStripe] = useState<any>(null)

  // Bound form state
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')

  // Hardcoded fallback based on package name (in case all else fails)
  const priceMap: Record<string, number> = {
    'Core Coaching': 100,
    'Elite Coaching': 240,
    'Single Session': 80,
    '10 Session Pack': 700,
    '20 Session Pack': 1200,
    'Starter': 250,
    'Transform': 800,
    'Premium (Trainer)': 1500
  }
  
  // Get the raw values from storage
  const rawSelectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}')
  const clientData = JSON.parse(localStorage.getItem('clientData') || '{}')

  // Determine which values to use - ensure they are numbers
  const packageName = rawSelectedPackage.name || clientData.package_name || 'Unknown Package'
  let packagePrice = Number(rawSelectedPackage.price) || Number(clientData.package_price) || 0
  
  // If price is still 0, look it up by name
  if (!packagePrice && packageName && packageName !== 'Unknown Package') {
    packagePrice = priceMap[packageName] || 0
  }

  const stripeFee = paymentMethod === 'card' ? packagePrice * 0.02 : 0
  const totalPrice: number = packagePrice + stripeFee

  // Debug
  console.log('rawSelectedPackage:', rawSelectedPackage)
  console.log('clientData:', clientData)
  console.log('packageName:', packageName)
  console.log('packagePrice:', packagePrice)

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')
      setStripe(stripeInstance)
    }
    initializeStripe()
  }, [])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    setIsProcessing(true)

    if (paymentMethod === 'card') {
      // For Stripe integration, redirect to hosted checkout
      // In production, this would create a session server-side
      // For demo, simulate Stripe checkout
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate successful Stripe payment
      localStorage.setItem('paymentStatus', 'completed')
      localStorage.setItem('paymentMethod', 'stripe')
      localStorage.setItem('paymentAmount', totalPrice.toFixed(2))
      localStorage.setItem('stripeFee', stripeFee.toFixed(2))

      navigate('/success')
    } else {
      // Simulate other payment methods
      await new Promise(resolve => setTimeout(resolve, 2000))

      localStorage.setItem('paymentStatus', 'completed')
      localStorage.setItem('paymentMethod', paymentMethod)
      localStorage.setItem('paymentAmount', totalPrice.toFixed(2))
      if (paymentMethod === 'card') {
        localStorage.setItem('stripeFee', stripeFee.toFixed(2))
      }

      navigate('/success')
    }
  }

  return (
    <div className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 hud-card flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gold" weight="bold" />
            </div>
            <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2">// Checkout</p>
            <h1 className="text-2xl font-bold text-white font-cinzel">Complete Your Purchase</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="hud-card p-6 relative">
              <div className="corner-decor-tl" />
              <div className="corner-decor-tr" />

              <h2 className="text-lg font-bold text-white mb-4 font-rajdhani">Order Summary</h2>
              <div className="border-b border-hud-border pb-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-white">{packageName}</p>
                    <p className="text-sm text-gray-500">Service Package</p>
                  </div>
                  <p className="font-bold text-white font-rajdhani">${packagePrice}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${packagePrice}</span>
                </div>
                {paymentMethod === 'card' && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processing Fee (2%)</span>
                    <span className="text-white">${stripeFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-hud-border font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-gold font-rajdhani">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="mt-6 pt-4 border-t border-hud-border">
                <h3 className="font-semibold text-white mb-2 text-sm font-rajdhani uppercase tracking-wider">Client Information</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>{clientData.fullName}</p>
                  <p>{clientData.email}</p>
                  <p>{clientData.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="hud-card p-6 relative">
              <div className="corner-decor-tl" />
              <div className="corner-decor-tr" />

              <h2 className="text-lg font-bold text-white mb-4 font-rajdhani">Payment Details</h2>

              <form onSubmit={handlePayment} className="space-y-4">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-4 rounded font-medium text-sm transition-all font-rajdhani uppercase tracking-wider ${
                      paymentMethod === 'card'
                        ? 'bg-gold text-hud-bg'
                        : 'bg-hud-panel text-gray-400 hover:text-white border border-hud-border'
                    }`}
                  >
                    Card (Stripe)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank-transfer')}
                    className={`py-2.5 px-4 rounded font-medium text-sm transition-all font-rajdhani uppercase tracking-wider ${
                      paymentMethod === 'bank-transfer'
                        ? 'bg-gold text-hud-bg'
                        : 'bg-hud-panel text-gray-400 hover:text-white border border-hud-border'
                    }`}
                  >
                    Bank Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2.5 px-4 rounded font-medium text-sm transition-all font-rajdhani uppercase tracking-wider ${
                      paymentMethod === 'cash'
                        ? 'bg-gold text-hud-bg'
                        : 'bg-hud-panel text-gray-400 hover:text-white border border-hud-border'
                    }`}
                  >
                    Cash (In-person)
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-hud-panel border border-gold/30 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-gold" weight="bold" />
                      <span className="text-gold font-semibold font-rajdhani">Secure Payment via Stripe</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      You'll be redirected to Stripe's secure checkout page to complete your payment.
                    </p>
                    <p className="text-xs text-gray-500">
                      Stripe handles all payment processing securely and PCI compliant.
                    </p>
                  </div>
                )}

                {paymentMethod === 'bank-transfer' && (
                  <div className="mb-4 p-4 bg-hud-panel border border-gold/30 rounded">
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Bank Transfer Details:</strong>
                    </p>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Account Name: Evan Steed-Adams</p>
                      <p>Account Number: 1017 4111</p>
                      <p>BSB: 066 153</p>
                      <p>Reference: {clientData.fullName?.replace(/\s+/g, '') || 'Client'}</p>
                    </div>
                    <p className="text-sm font-bold text-gold mt-4">
                      Please transfer the billed amount before pressing the submit button to confirm your payment.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="py-8 text-center">
                    <p className="text-gray-400 mb-4">
                      Payment will be collected in-person during your first session.
                    </p>
                    <p className="text-sm text-gray-500">
                      Please bring exact change or be prepared to pay the full amount.
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="p-3 rounded bg-red-900/20 border border-red-500/40 flex items-start gap-2">
                    <WarningCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" weight="bold" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Lock className="w-3.5 h-3.5" weight="bold" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <LockKey className="w-3.5 h-3.5" weight="bold" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-gold text-hud-bg font-bold rounded hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-rajdhani uppercase tracking-wider text-sm"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-hud-bg border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" weight="bold" />
                      {paymentMethod === 'card' && `Pay $${totalPrice.toFixed(2)} with Stripe`}
                      {paymentMethod === 'bank-transfer' && `Confirm Payment`}
                      {paymentMethod === 'cash' && `Confirm Cash Payment`}
                    </>
                  )}
                </button>

                {paymentMethod === 'bank-transfer' && (
                  <p className="text-sm text-center text-gray-400 mb-4">
                    Please note standard processing usually takes 1-2 days.
                  </p>
                )}
                <p className="text-xs text-center text-gray-600">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/intake')}
              className="flex items-center gap-2 text-gray-500 hover:text-gold transition-colors mx-auto font-rajdhani text-sm"
            >
              <ArrowLeft className="w-4 h-4" weight="bold" /> Back to Intake
            </button>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
