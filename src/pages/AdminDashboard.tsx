import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, CurrencyDollar, Clock, EnvelopeSimple, Phone, Calendar,
  MagnifyingGlass, CaretRight, SignOut, Barbell, WarningCircle, ListDashes
} from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'
import GameHudHeader from '../components/GameHudHeader'

interface Client {
  id: string
  full_name: string
  email: string
  phone: string
  age: number | null
  gender: string | null
  goals: string[]
  experience_level: number | null
  injuries: string | null
  equipment_access: string[]
  days_per_week: number | null
  location: string | null
  delivery_method: string | null
  package_name: string | null
  package_price: number | null
  status: string
  created_at: string
}

function SkeletonRow() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-hud-panel rounded-full" />
          <div>
            <div className="h-4 w-32 bg-hud-panel rounded mb-1.5" />
            <div className="h-3 w-44 bg-hud-panel rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-hud-panel rounded-full" />
          <div className="w-5 h-5 bg-hud-panel rounded" />
        </div>
      </div>
    </div>
  )
}

function SkeletonStat() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
          <div className="h-7 w-16 bg-slate-200 rounded" />
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-xl" />
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) {
          setError(`Failed to load clients: ${fetchError.message}`)
        } else {
          setClients(data || [])
        }
      } catch (err) {
        setError('Unable to connect to the database. Please try again later.')
      }
      setLoading(false)
    }

    fetchClients()
  }, [])

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' ||
      (filter === 'pending' && client.status === 'pending') ||
      (filter === 'completed' && client.status === 'completed')
    return matchesSearch && matchesFilter
  })

  const totalRevenue = clients
    .filter(c => c.status === 'completed' && c.package_price)
    .reduce((sum, c) => sum + (c.package_price || 0), 0)
  const pendingCount = clients.filter(c => c.status === 'pending').length

  const getExperienceLabel = (level: number | null) => {
    if (!level) return 'Not set'
    switch (level) {
      case 1: return 'Beginner'
      case 2: return 'Intermediate'
      case 3: return 'Advanced'
      case 4: return 'Athlete'
      case 5: return 'Elite'
      default: return 'Not set'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Barbell className="w-6 h-6 text-white" weight="bold" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Stat Stackers Dashboard</h1>
              <p className="text-xs text-slate-500">Trainer Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              View Landing Page
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <SignOut className="w-5 h-5 text-slate-600" weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <WarningCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" weight="bold" />
            <div>
              <p className="text-sm font-medium text-red-800">Connection Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {loading ? (
            <>
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Clients</p>
                    <p className="text-2xl font-bold text-slate-900">{clients.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" weight="bold" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-emerald-600">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CurrencyDollar className="w-6 h-6 text-emerald-600" weight="bold" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Pending Payments</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" weight="bold" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Client List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MagnifyingGlass className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" weight="bold" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Clients</option>
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                  <option value="completed">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : filteredClients.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ListDashes className="w-8 h-8 text-slate-300" weight="duotone" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">No clients yet</h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
                    When clients complete the intake form and payment, they'll appear here. Share your landing page to get started.
                  </p>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Pricing Page
                    <CaretRight className="w-4 h-4" weight="bold" />
                  </button>
                </div>
              ) : (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedClient?.id === client.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-slate-600">
                            {client.full_name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{client.full_name}</p>
                          <p className="text-sm text-slate-500">{client.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          client.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {client.status}
                        </span>
                        <CaretRight className="w-5 h-5 text-slate-400" weight="bold" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {selectedClient ? (
              <>
                <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {selectedClient.full_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedClient.full_name}</h2>
                      <p className="text-blue-100">{selectedClient.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <EnvelopeSimple className="w-4 h-4 text-slate-400" weight="bold" />
                        <span className="text-slate-700">{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" weight="bold" />
                        <span className="text-slate-700">{selectedClient.phone}</span>
                      </div>
                      {selectedClient.age && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-slate-400" weight="bold" />
                          <span className="text-slate-700">Age: {selectedClient.age}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedClient.goals && selectedClient.goals.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-3">Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.goals.map((goal, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-3">Training Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Experience</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {getExperienceLabel(selectedClient.experience_level)}
                        </span>
                      </div>
                      {selectedClient.days_per_week && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Days/Week</span>
                          <span className="text-slate-700 font-medium">{selectedClient.days_per_week}</span>
                        </div>
                      )}
                      {selectedClient.delivery_method && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Delivery</span>
                          <span className="text-slate-700 font-medium capitalize">{selectedClient.delivery_method}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedClient.equipment_access && selectedClient.equipment_access.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-3">Equipment Access</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.equipment_access.map((eq, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedClient.injuries && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-3">Injuries/Conditions</h3>
                      <p className="text-sm text-slate-700 bg-yellow-50 p-3 rounded-lg">
                        {selectedClient.injuries}
                      </p>
                    </div>
                  )}

                  {selectedClient.package_name && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-3">Package</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">{selectedClient.package_name}</span>
                        <span className="text-lg font-bold text-blue-600">${selectedClient.package_price}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-slate-100">
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors active:scale-[0.98]">
                      Create Program
                    </button>
                    <button className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors active:scale-[0.98]">
                      Send Message
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" weight="duotone" />
                <p className="text-slate-500">Select a client to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
