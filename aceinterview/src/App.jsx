import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import InterviewPage from './pages/InterviewPage'
import InterviewReport from './pages/InterviewReport'
import AboutPage from './pages/AboutPage'
import { useState } from 'react'

function App() {
  const [allResponses, setAllResponses] = useState([]);

  return (
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
      </Routes>
    </Router>

  )
}

export default App
