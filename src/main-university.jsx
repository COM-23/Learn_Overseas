import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Universities from './pages/Universities'
import PremiumCursor from './components/PremiumCursor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PremiumCursor />
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }} />}>
        <Routes>
          <Route path="/" element={<Universities />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
