import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import InterviewPage from './pages/InterviewPage'
import InterviewReport from './pages/InterviewReport'
import AboutPage from './pages/AboutPage'
import Leaderboard from './pages/LeaderboardPage'
import ReportsPage from './pages/ReportsView'
import ReportsDashboard from './pages/ReportsDashboard'
import { useState } from 'react'
import { AuthProvider } from './components/AuthProvider'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import RequireAuth from './components/RequireAuth'

function App() {
  const [allResponses, setAllResponses] = useState([]);

  return (
    <AuthProvider>

      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          {/* Role Selection Page */}
          <Route path="/practicerole" element={<RoleSelectionPage />} />
          <Route path='/interview' element={<InterviewPage setAllResponses={setAllResponses} />} />
          {/* Interview Report Page */}
          <Route path='/report' element={<InterviewReport allResponses={allResponses} />} />
          {/* About Page */}
          <Route path='/about' element={<AboutPage />} />
          {/* Leaderboard Page */}
          <Route path='/leaderboard' element={<Leaderboard />} />
          {/* Reports Page */}
          <Route path='/reportsview' element={<ReportsPage />} />
          {/* Reports Dashboard Page */}
          <Route path='/reportsdashboard' element={<ReportsDashboard />} />
          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
