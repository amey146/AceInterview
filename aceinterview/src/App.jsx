import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Role Selection Page */}
        <Route path="/practicerole" element={<RoleSelectionPage />} />
      </Routes>
    </Router>

  )
}

export default App
