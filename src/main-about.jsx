import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Footer from './components/Footer'
import AboutUs from './pages/AboutUs'
import OurVision from './pages/OurVision'
import OurTeam from './pages/OurTeam'
import PremiumCursor from './components/PremiumCursor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PremiumCursor />
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }} />}>
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/vision" element={<OurVision />} />
          <Route path="/about/team" element={<OurTeam />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
