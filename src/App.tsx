import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import IntakeWizard from './pages/IntakeWizard'
import AdminDashboard from './pages/AdminDashboard'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import ServicePage from './pages/ServicePage'
import TrainersPage from './pages/TrainersPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/intake" element={<IntakeWizard />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
      </Routes>
    </Router>
  )
}
