import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, EnvelopeSimple, Monitor, CalendarBlank, User, WarningCircle } from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'
import GameHudHeader from '../components/GameHudHeader'
import GameHudFooter from '../components/GameHudFooter'

interface ClientData {
  fullName: string
  email: string
  phone: string
  age: string
  gender: string
  goals: string[]
  experienceLevel: number
  fitnessCheck: string[]
  weightRange: string
  preferLowImpact: boolean
  injuries: string
  equipmentAccess: string[]
  daysPerWeek: number
  sessionLength: number
  location: string
  deliveryMethod: string
  motivations: string[]
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  goals?: string
  submit?: string
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

const fitnessChecks = [
  'Can do 10+ pushups',
  'Can do 5+ pull-ups',
  'Can run 3km without stopping',
  'Never exercised before',
  'Can do 10+ squats',
  'Can hold plank for 60+ seconds'
]

const weightRanges = [
  'Under 60kg',
  '60-80kg',
  '80-100kg',
  '100-120kg',
  'Over 120kg',
  'Prefer not to say'
]

const motivations = [
  'Health concerns',
  'Look better',
  'Performance goals',
  'Life event (wedding, reunion, etc.)',
  'Just want to feel stronger',
  'Doctor recommendation',
  'New year motivation'
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
  { id: 'email', label: 'Email (PDF)', icon: EnvelopeSimple, desc: 'Receive your program as a PDF attachment' },
  { id: 'discord', label: 'Discord', icon: Monitor, desc: 'Programs and communication delivered through our Discord server' },
  { id: 'sheets', label: 'Google Sheets', icon: CalendarBlank, desc: 'Interactive spreadsheet with videos' }
]

const sessionLengths = [
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60 min' },
  { value: 90, label: '90 min' }
]

export default function IntakeWizard() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<ClientData>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    goals: [],
    experienceLevel: 3,
    fitnessCheck: [],
    weightRange: '',
    preferLowImpact: false,
    injuries: '',
    equipmentAccess: [],
    daysPerWeek: 3,
    sessionLength: 60,
    location: '',
    deliveryMethod: 'email',
    motivations: []
  })

  useEffect(() => {
    const saved = localStorage.getItem('intakeData')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge saved data with new fields for backwards compatibility
      setData(prev => ({
        ...prev,
        ...parsed,
        fitnessCheck: parsed.fitnessCheck || [],
        weightRange: parsed.weightRange || '',
        preferLowImpact: parsed.preferLowImpact || false,
        sessionLength: parsed.sessionLength || 60,
        motivations: parsed.motivations || []
      }))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('intakeData', JSON.stringify(data))
  }, [data])

  const updateData = (updates: Partial<ClientData>) => {
    setData(prev => ({ ...prev, ...updates }))
    setErrors({})
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {}

    switch (currentStep) {
      case 0:
        if (!data.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!data.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          newErrors.email = 'Enter a valid email address'
        }
        if (!data.phone.trim()) {
          newErrors.phone = 'Phone number is required'
        } else if (data.phone.replace(/\D/g, '').length < 10) {
          newErrors.phone = 'Enter a valid phone number'
        }
        break
      case 1:
        if (data.goals.length === 0) newErrors.goals = 'Select at least one goal'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    setIsSubmitting(true)
    setErrors({})

    const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}')

    const cleanPrice = selectedPackage.price
      ? Math.round(parseFloat(selectedPackage.price.toString().replace(/[^0-9.-]/g, '')))
      : null

    try {
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
          fitness_check: data.fitnessCheck,
          weight_range: data.weightRange || null,
          prefer_low_impact: data.preferLowImpact,
          injuries: data.injuries || null,
          equipment_access: data.equipmentAccess,
          days_per_week: data.daysPerWeek,
          session_length: data.sessionLength,
          location: data.location || null,
          delivery_method: data.deliveryMethod,
          motivations: data.motivations,
          package_name: selectedPackage.name || null,
          package_price: cleanPrice,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        setErrors({ submit: `Failed to save your information: ${error.message}` })
        setIsSubmitting(false)
        return
      }

      localStorage.setItem('clientData', JSON.stringify({
        ...data,
        package_name: selectedPackage.name || null,
        package_price: cleanPrice
      }))
      localStorage.setItem('clientId', client?.id || '')
      navigate('/payment')
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
      setIsSubmitting(false)
    }
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
        return data.equipmentAccess.length > 0
      case 4:
        return data.motivations.length > 0
      case 5:
        return data.deliveryMethod
      default:
        return true
    }
  }

  const steps = [
    {
      title: 'Tell us about yourself',
      subtitle: 'We need some basic information to get started',
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-rajdhani">Full Name *</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
              className={`w-full px-4 py-3 rounded bg-hud-bg border ${errors.fullName ? 'border-red-500' : 'border-hud-border'} text-white placeholder-gray-600 outline-none font-rajdhani`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <WarningCircle className="w-3 h-3" weight="bold" />
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-rajdhani">Email Address *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className={`w-full px-4 py-3 rounded bg-hud-bg border ${errors.email ? 'border-red-500' : 'border-hud-border'} text-white placeholder-gray-600 outline-none font-rajdhani`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <WarningCircle className="w-3 h-3" weight="bold" />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-rajdhani">Phone Number *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className={`w-full px-4 py-3 rounded bg-hud-bg border ${errors.phone ? 'border-red-500' : 'border-hud-border'} text-white placeholder-gray-600 outline-none font-rajdhani`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <WarningCircle className="w-3 h-3" weight="bold" />
                {errors.phone}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 font-rajdhani">Age</label>
              <input
                type="number"
                value={data.age}
                onChange={(e) => updateData({ age: e.target.value })}
                className="w-full px-4 py-3 rounded bg-hud-bg border border-hud-border text-white placeholder-gray-600 outline-none font-rajdhani"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 font-rajdhani">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => updateData({ gender: e.target.value })}
                className="w-full px-4 py-3 rounded bg-hud-bg border border-hud-border text-white outline-none font-rajdhani"
              >
                <option value="" className="bg-hud-bg">Select...</option>
                <option value="male" className="bg-hud-bg">Male</option>
                <option value="female" className="bg-hud-bg">Female</option>
                <option value="other" className="bg-hud-bg">Other</option>
                <option value="prefer-not" className="bg-hud-bg">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
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
                className={`p-4 rounded border-2 text-left font-rajdhani ${
                  data.goals.includes(goal)
                    ? 'border-gold bg-gold/10 text-gold'
                    : `border-hud-border hover:border-hud-border-light text-gray-400 hover:text-gray-200 ${errors.goals ? 'border-red-500/50' : ''}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{goal}</span>
                  {data.goals.includes(goal) && <Check className="w-4 h-4 text-gold" weight="bold" />}
                </div>
              </button>
            ))}
          </div>
          {errors.goals && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <WarningCircle className="w-3 h-3" weight="bold" />
              {errors.goals}
            </p>
          )}
        </div>
      )
    },
    {
      title: 'Quick fitness check',
      subtitle: 'Select all that apply to you',
      content: (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-3">
            {fitnessChecks.map((check) => (
              <button
                key={check}
                onClick={() => {
                  const newChecks = data.fitnessCheck.includes(check)
                    ? data.fitnessCheck.filter(c => c !== check)
                    : [...data.fitnessCheck, check]
                  updateData({ fitnessCheck: newChecks })
                }}
                className={`p-3 rounded border-2 text-left font-rajdhani ${
                  data.fitnessCheck.includes(check)
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-hud-border hover:border-hud-border-light text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{check}</span>
                  {data.fitnessCheck.includes(check) && <Check className="w-4 h-4 text-gold" weight="bold" />}
                </div>
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-hud-border">
            <button
              onClick={() => updateData({ preferLowImpact: !data.preferLowImpact })}
              className={`p-3 rounded border-2 text-left font-rajdhani w-full ${
                data.preferLowImpact
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-hud-border hover:border-hud-border-light text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">I prefer low-impact exercises</span>
                {data.preferLowImpact && <Check className="w-4 h-4 text-gold" weight="bold" />}
              </div>
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'Your training setup',
      subtitle: 'Tell us about your available equipment and schedule',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 font-rajdhani">Equipment Access *</label>
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
                  className={`p-3 rounded border-2 text-sm text-left font-rajdhani ${
                    data.equipmentAccess.includes(item)
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-hud-border hover:border-hud-border-light text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    {data.equipmentAccess.includes(item) && <Check className="w-4 h-4 text-gold" weight="bold" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 font-rajdhani">
              Days per week available: <span className="text-gold font-bold">{data.daysPerWeek}</span>
            </label>
            <input
              type="range"
              min="1"
              max="7"
              value={data.daysPerWeek}
              onChange={(e) => updateData({ daysPerWeek: parseInt(e.target.value) })}
              className="w-full h-2 bg-hud-panel rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1.5 font-rajdhani">
              <span>1 day</span>
              <span>7 days</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 font-rajdhani">Preferred session length</label>
            <div className="grid grid-cols-4 gap-2">
              {sessionLengths.map((length) => (
                <button
                  key={length.value}
                  onClick={() => updateData({ sessionLength: length.value })}
                  className={`p-3 rounded border-2 text-center font-rajdhani ${
                    data.sessionLength === length.value
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-hud-border hover:border-hud-border-light text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">{length.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-rajdhani">
              Preferred training location (for in-person)
            </label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="w-full px-4 py-3 rounded bg-hud-bg border border-hud-border text-white placeholder-gray-600 outline-none font-rajdhani"
              placeholder="e.g., Downtown Gym, Home gym, etc."
            />
          </div>
        </div>
      )
    },
    {
      title: 'Why are you starting now?',
      subtitle: 'Select your main motivations',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 mb-4">This helps us understand what's driving your fitness journey</p>
          <div className="grid grid-cols-1 gap-3">
            {motivations.map((motivation) => (
              <button
                key={motivation}
                onClick={() => {
                  const newMotivations = data.motivations.includes(motivation)
                    ? data.motivations.filter(m => m !== motivation)
                    : [...data.motivations, motivation]
                  updateData({ motivations: newMotivations })
                }}
                className={`p-3 rounded border-2 text-left font-rajdhani ${
                  data.motivations.includes(motivation)
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-hud-border hover:border-hud-border-light text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{motivation}</span>
                  {data.motivations.includes(motivation) && <Check className="w-4 h-4 text-gold" weight="bold" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'How should we deliver your program?',
      subtitle: 'Choose your preferred method',
      content: (
        <div className="space-y-4">
          {deliveryMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => updateData({ deliveryMethod: method.id })}
              className={`w-full p-4 rounded border-2 text-left flex items-center gap-4 font-rajdhani ${
                data.deliveryMethod === method.id
                  ? 'border-gold bg-gold/10'
                  : 'border-hud-border hover:border-hud-border-light'
              }`}
            >
              <div className={`w-12 h-12 rounded flex items-center justify-center ${
                data.deliveryMethod === method.id ? 'bg-gold text-hud-bg' : 'bg-hud-panel text-gray-400'
              }`}>
                <method.icon className="w-6 h-6" weight="bold" />
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${data.deliveryMethod === method.id ? 'text-gold' : 'text-white'}`}>{method.label}</p>
                <p className="text-sm text-gray-500">{method.desc}</p>
              </div>
              {data.deliveryMethod === method.id && (
                <Check className="w-5 h-5 text-gold" weight="bold" />
              )}
            </button>
          ))}
        </div>
      )
    }
  ]

  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}')

  return (
    <div className="min-h-screen bg-hud-bg font-rajdhani">
      <GameHudHeader />

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 hud-card flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gold" weight="bold" />
            </div>
            <p className="text-xs text-teal uppercase tracking-[4px] font-semibold mb-2">// Client Intake</p>
            <h1 className="text-2xl font-bold text-white font-cinzel">Character Setup</h1>
            {selectedPackage.name && (
              <p className="text-sm text-gray-400 mt-1">
                {selectedPackage.name} -- {selectedPackage.price}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    idx < currentStep
                      ? 'bg-gold text-hud-bg'
                      : idx === currentStep
                      ? 'bg-gold/20 text-gold border border-gold'
                      : 'bg-hud-panel text-gray-500 border border-hud-border'
                  }`}
                >
                  {idx < currentStep ? <Check className="w-4 h-4" weight="bold" /> : idx + 1}
                </div>
              ))}
            </div>
            <div className="xp-bar-track">
              <div
                className="xp-bar-fill"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="hud-card p-6 md:p-8 relative" style={{ transition: 'none' }}>
            <div className="corner-decor-tl" />
            <div className="corner-decor-tr" />

            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1 font-rajdhani">{steps[currentStep].title}</h2>
              <p className="text-sm text-gray-400">{steps[currentStep].subtitle}</p>
            </div>

            {steps[currentStep].content}

            {/* Submit Error */}
            {errors.submit && (
              <div className="mt-6 p-3 rounded bg-red-900/20 border border-red-500/40 flex items-start gap-2">
                <WarningCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" weight="bold" />
                <p className="text-sm text-red-300">{errors.submit}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-hud-border">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded font-medium font-rajdhani ${
                  currentStep === 0
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-gold hover:bg-hud-panel'
                }`}
              >
                <ArrowLeft className="w-4 h-4" weight="bold" /> Back
              </button>
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className={`hud-btn-gold flex items-center gap-2 font-rajdhani ${!canProceed() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-hud-bg border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue to Payment <ArrowRight className="w-4 h-4" weight="bold" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`hud-btn-gold flex items-center gap-2 font-rajdhani ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue <ArrowRight className="w-4 h-4" weight="bold" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <GameHudFooter />
    </div>
  )
}
