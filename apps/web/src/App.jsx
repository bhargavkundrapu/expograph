import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './app/providers/AuthProvider'
import PublicLayout from './app/layouts/PublicLayout'
import PortalLayout from './app/layouts/PortalLayout'
import { RequireAuth, RequireRole } from './app/routes/guards'

import Academy from './pages/Academy'
import Solutions from './pages/Solutions'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import LmsDashboard from './pages/lms/Dashboard'
import Courses from './pages/lms/Courses'
import CourseTree from './pages/lms/CourseTree'
import Lesson from './pages/lms/Lesson'
import CodeVault from './pages/lms/CodeVault'
import LaunchPad from './pages/lms/LaunchPad'
import Internships from './pages/lms/Internships'
import ClientLab from './pages/lms/ClientLab'

import MentorDashboard from './pages/mentor/Dashboard'
import SubmissionsQueue from './pages/mentor/SubmissionsQueue'

import AdminDashboard from './pages/admin/Dashboard'
import AdminContent from './pages/admin/Content'
import AdminLeads from './pages/admin/Leads'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/academy" replace />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

        {/* Student LMS */}
        <Route
          path="/lms"
          element={
            <RequireAuth>
              <RequireRole allow={["Student"]}>
                <PortalLayout variant="lms" />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route index element={<LmsDashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseSlug" element={<CourseTree />} />
          <Route path="courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug" element={<Lesson />} />
          <Route path="code-vault" element={<CodeVault />} />
          <Route path="launchpad" element={<LaunchPad />} />
          <Route path="internships" element={<Internships />} />
          <Route path="client-lab" element={<ClientLab />} />
        </Route>

        {/* Mentor */}
        <Route
          path="/mentor"
          element={
            <RequireAuth>
              <RequireRole allow={["Mentor"]}>
                <PortalLayout variant="mentor" />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route index element={<MentorDashboard />} />
          <Route path="submissions" element={<SubmissionsQueue />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RequireRole allow={["TenantAdmin", "SuperAdmin"]}>
                <PortalLayout variant="admin" />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="leads" element={<AdminLeads />} />
        </Route>

        <Route path="*" element={<Navigate to="/academy" replace />} />
      </Routes>
    </AuthProvider>
  )
}
