import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Mail, Download, FileText, Calendar, ArrowRight } from 'lucide-react'

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
    email: { icon: Mail, label: 'Email (PDF)', desc: 'Check your inbox for the program PDF' },
    app: { icon: Download, label: 'App Access', desc: 'Access your program via the web app' },
    sheets: { icon: FileText, label: 'Google Sheets', desc: 'Receive a shared Google Sheets link' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
          <p className="text-slate-600">Thank you for your purchase, {clientData?.fullName || 'Client'}!</p>
        </div>

        {/* Order Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-left">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Order Confirmation</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Order Number</span>
              <span className="font-mono text-slate-900">FF-{Date.now().toString(36).toUpperCase()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Package</span>
              <span className="font-medium text-slate-900">{selectedPackage?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Amount Paid</span>
              <span className="font-bold text-emerald-600">${selectedPackage?.price}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Delivery Method</span>
              <span className="font-medium text-slate-900">
                {deliveryMethodInfo[clientData?.deliveryMethod as keyof typeof deliveryMethodInfo]?.label || 'Email'}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-left">
          <h2 className="text-lg font-bold text-slate-900 mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Check your email</p>
                <p className="text-sm text-slate-600">
                  We've sent a confirmation email to {clientData?.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Complete intake call</p>
                <p className="text-sm text-slate-600">
                  We'll schedule a call within 24-48 hours to discuss your program
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Receive your program</p>
                <p className="text-sm text-slate-600">
                  Your personalized training program will be delivered via {deliveryMethodInfo[clientData?.deliveryMethod as keyof typeof deliveryMethodInfo]?.label || 'email'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-left">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Questions?</h2>
          <p className="text-slate-600 mb-4">
            If you have any questions about your program or need to make changes, don't hesitate to reach out.
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-slate-700">
              <span className="font-medium">Email:</span> hello@statstackers.com
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Phone:</span> +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            Back to Home
          </button>
          <button
            onClick={() => alert('Demo mode - in production, this would download your program or show app access')}
            className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            View My Program <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
