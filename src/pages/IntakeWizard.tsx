import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Dumbbell, Monitor, Mail, Calendar, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ClientData {
  // Step 1: Basic Info
  fullName: string
  email: string
  phone: string
  age: string
  gender: string

  // Step 2: Goals
  goals: string[]

  // Step 3: Experience & History
  experienceLevel: number
  injuries: string

  // Step 4: Logistics
  equipmentAccess: string[]
  daysPerWeek: number
  location: string

  // Step 5: Delivery
  deliveryMethod: string
}

const goals = [
  'Weight Loss',
  'Muscle Gain',
  'Strength Building',
  'Endurance',
  'Flexibility/Mobility',
  'Athletic Performance',
  'General Fitness',
  'Post-Rehab'
]

const equipment = [
  'Full Gym Access',
  'Dumbbells',
  'Resistance Bands',
  'Barbell & Plates',
  'Kettlebells',
  'Pull-up Bar',
  'Cardio Equipment',
  'None - Bodyweight Only'
]

const deliveryMethods = [
  { id: 'email', label: 'Email (PDF)', icon: Mail, desc: 'Receive your program as a PDF attachment' },
  { id: 'app', label: 'App Access', icon: Monitor, desc: 'Access your program through our web app' },
  { id: 'sheets', label: 'Google Sheets', icon: Calendar, desc: 'Interactive spreadsheet with videos' }
]

export default function IntakeWizard() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<ClientData>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    goals: [],
    experienceLevel: 3,
    injuries: '',
    equipmentAccess: [],
    daysPerWeek: 3,
    location: '',
    deliveryMethod: 'email'
  })

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('intakeData')
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem('intakeData', JSON.stringify(data))
  }, [data])

  const updateData = (updates: Partial<ClientData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}')
    
    // Save to Supabase
    const { data: client, error } = await supabase
      .from('clients')
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        age: data.age || null,
        gender: data.gender || null,
        goals: data.goals,
        experience_level: data.experienceLevel,
        injuries: data.injuries || null,
        equipment_access: data.equipmentAccess,
        days_per_week: data.daysPerWeek,
        location: data.location || null,
        delivery_method: data.deliveryMethod,
        package_name: selectedPackage.name || null,
        package_price: selectedPackage.price || null,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving client:', error)
    }

    // Store all data for payment and admin
    localStorage.setItem('clientData', JSON.stringify(data))
    localStorage.setItem('clientId', client?.id || '')
    navigate('/payment')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return data.fullName && data.email && data.phone
      case 1:
        return data.goals.length > 0
      case 2:
        return true
      case 3:
        return data.daysPerWeek > 0
      case 4:
        return data.deliveryMethod
      default:
        return true
    }
  }

  const steps = [
    // Step 1: Basic Info
    {
      title: 'Tell us about yourself',
      subtitle: 'We need some basic information to get started',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input
                type="number"
                value={data.age}
                onChange={(e) => updateData({ age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => updateData({ gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
    // Step 2: Goals
    {
      title: 'What are your goals?',
      subtitle: 'Select all that apply',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  const newGoals = data.goals.includes(goal)
                    ? data.goals.filter(g => g !== goal)
                    : [...data.goals, goal]
                  updateData({ goals: newGoals })
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  data.goals.includes(goal)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{goal}</span>
                  {data.goals.includes(goal) && <Check className="w-5 h-5 text-blue-600" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    // Step 3: Experience & History
    {
      title: 'Your fitness background',
      subtitle: 'Help us understand your experience level',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Experience Level: <span className="text-blue-600 font-bold">
                {data.experienceLevel === 1 && 'Beginner'}
                {data.experienceLevel === 2 && 'Intermediate'}
                {data.experienceLevel === 3 && 'Advanced'}
                {data.experienceLevel === 4 && 'Athlete'}
                {data.experienceLevel === 5 && 'Elite'}
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={data.experienceLevel}
              onChange={(e) => updateData({ experienceLevel: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Athlete</span>
              <span>Elite</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Any injuries or health conditions we should know about?
            </label>
            <textarea
              value={data.injuries}
              onChange={(e) => updateData({ injuries: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-24 resize-none"
              placeholder="e.g., Knee pain, lower back issues, shoulder injury..."
            />
          </div>
        </div>
      )
    },
    // Step 4: Logistics
    {
      title: 'Your training setup',
      subtitle: 'Tell us about your available equipment and schedule',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Equipment Access</label>
            <div className="grid grid-cols-2 gap-3">
              {equipment.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const newEquipment = data.equipmentAccess.includes(item)
                      ? data.equipmentAccess.filter(e => e !== item)
                      : [...data.equipmentAccess, item]
                    updateData({ equipmentAccess: newEquipment })
                  }}
                  className={`p-3 rounded-xl border-2 text-sm text-left transition-all ${
                    data.equipmentAccess.includes(item)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    {data.equipmentAccess.includes(item) && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Days per week available: <span className="text-blue-600 font-bold">{data.daysPerWeek}</span>
            </label>
            <input
              type="range"
              min="1"
              max="7"
              value={data.daysPerWeek}
              onChange={(e) => updateData({ daysPerWeek: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 day</span>
              <span>7 days</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Preferred training location (for in-person)
            </label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="e.g., Downtown Gym, Home gym, etc."
            />
          </div>
        </div>
      )
    },
    // Step 5: Delivery
    {
      title: 'How should we deliver your program?',
      subtitle: 'Choose your preferred method',
      content: (
        <div className="space-y-4">
          {deliveryMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => updateData({ deliveryMethod: method.id })}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                data.deliveryMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                data.deliveryMethod === method.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                <method.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{method.label}</p>
                <p className="text-sm text-slate-500">{method.desc}</p>
              </div>
              {data.deliveryMethod === method.id && (
                <Check className="w-6 h-6 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )
    }
  ]

  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Client Intake</h1>
          {selectedPackage.name && (
            <p className="text-slate-600">
              {selectedPackage.name} - ${selectedPackage.price}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  idx <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{steps[currentStep].title}</h2>
            <p className="text-slate-600">{steps[currentStep].subtitle}</p>
          </div>

          {steps[currentStep].content}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Continue to Payment <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
