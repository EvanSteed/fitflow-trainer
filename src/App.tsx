import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import IntakeWizard from './pages/IntakeWizard'
import AdminDashboard from './pages/AdminDashboard'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import ServicePage from './pages/ServicePage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/intake" element={<IntakeWizard />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
      </Routes>
    </Router>
  )
}
