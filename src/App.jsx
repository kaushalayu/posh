import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import LoginPage from './features/auth/LoginPage'
import DashboardPage from './features/dashboard/DashboardPage'
import ComplaintsPage from './features/complaints/ComplaintsPage'
import NewComplaintForm from './features/complaints/NewComplaintForm'
import CaseWorkspacePage from './features/case-workspace/CaseWorkspacePage'
import ActionTrackerPage from './features/actions/ActionTrackerPage'
import EvidencePage from './features/evidence/EvidencePage'
import ReportsPage from './features/reports/ReportsPage'
import DocumentsPage from './features/documents/DocumentsPage'
import ProceedingsPage from './features/proceedings/ProceedingsPage'
import AdminSettingsPage from './features/admin/AdminSettingsPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <AnimatePresence mode="wait">
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="complaints/new" element={<NewComplaintForm />} />
          <Route path="cases/:id" element={<CaseWorkspacePage />} />
          <Route path="cases" element={<CaseWorkspacePage />} />
          <Route path="actions" element={<ActionTrackerPage />} />
          <Route path="evidence" element={<EvidencePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="admin/*" element={<AdminSettingsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="proceedings" element={<ProceedingsPage />} />
          <Route path="audit" element={<AdminSettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
