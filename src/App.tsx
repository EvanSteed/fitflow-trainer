import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import IntakeWizard from './pages/IntakeWizard'
import AdminDashboard from './pages/AdminDashboard'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import TrainersPage from './pages/TrainersPage'
import WhatWeDoPage from './pages/WhatWeDoPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/what-we-do" element={<WhatWeDoPage />} />
        <Route path="/intake" element={<IntakeWizard />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
