import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import InterviewPage from './pages/InterviewPage'

function App() {


  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Role Selection Page */}
        <Route path="/practicerole" element={<RoleSelectionPage />} />
        <Route path='/interview' element={<InterviewPage />} />
      </Routes>
    </Router>

  )
}

export default App
