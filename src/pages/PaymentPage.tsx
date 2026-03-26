import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, ArrowLeft, Check, Shield } from 'lucide-react'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}')
  const clientData = JSON.parse(localStorage.getItem('clientData') || '{}')

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Store payment status
    localStorage.setItem('paymentStatus', 'completed')
    localStorage.setItem('paymentAmount', selectedPackage.price)

    navigate('/success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Complete Your Purchase</h1>
          <p className="text-slate-600">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
            <div className="border-b border-slate-200 pb-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-slate-900">{selectedPackage.name}</p>
                  <p className="text-sm text-slate-500">{selectedPackage.description}</p>
                </div>
                <p className="font-bold text-slate-900">${selectedPackage.price}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">${selectedPackage.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax</span>
                <span className="text-slate-900">$0.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold">
                <span className="text-slate-900">Total</span>
                <span className="text-emerald-600">${selectedPackage.price}</span>
              </div>
            </div>

            {/* Client Info Summary */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Client Information</h3>
              <div className="space-y-1 text-sm text-slate-600">
                <p>{clientData.fullName}</p>
                <p>{clientData.email}</p>
                <p>{clientData.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Payment Details</h2>

            <form onSubmit={handlePayment} className="space-y-4">
              {/* Payment Method Selection */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {paymentMethod === 'paypal' && (
                <div className="py-8 text-center">
                  <p className="text-slate-600 mb-4">You will be redirected to PayPal to complete your purchase.</p>
                </div>
              )}

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Pay ${selectedPackage.price}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-500">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/intake')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Intake
          </button>
        </div>
      </div>
    </div>
  )
}
