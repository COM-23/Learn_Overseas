import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import PremiumCursor from './components/PremiumCursor';

import ErrorBoundary from './components/ErrorBoundary';
import GlobalToasts from './components/GlobalToasts';

import Home from './pages/Home';
import MobileHome from './pages/MobileHome';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import CountryUniversities from './pages/CountryUniversities';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Careers from './pages/Careers';
import NewsFeed from './pages/NewsFeed';
import Login from './pages/Login';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import OurTeam from './pages/OurTeam';
import OurVision from './pages/OurVision';
import TeamMemberDetail from './pages/TeamMemberDetail';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';

// Cinematic page transition — fades to black then reveals next page
// Mimics a film "cut to black" between scenes
const cinematicVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.45, ease: [0.7, 0, 1, 0.3] }
  }
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={cinematicVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function AnimatedRoutes() {
  const location = useLocation();

  // Hide the global Header and Footer on immersive, full-screen pages
  const isImmersivePage = location.pathname.startsWith('/about/team/');

  return (
    <>
      {!isImmersivePage && <Header />}
      <ErrorBoundary>
        {/* mode="wait" guarantees: old page fully exits THEN new page enters — no overlap */}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/"             element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/services"     element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/services/:id" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
            <Route path="/countries"    element={<PageWrapper><Countries /></PageWrapper>} />
            <Route path="/destinations/:id" element={<PageWrapper><CountryDetail /></PageWrapper>} />
            <Route path="/destinations/:id/universities" element={<PageWrapper><CountryUniversities /></PageWrapper>} />
            <Route path="/about"        element={<PageWrapper><AboutUs /></PageWrapper>} />
            <Route path="/contact"      element={<PageWrapper><ContactUs /></PageWrapper>} />
            <Route path="/careers"      element={<PageWrapper><Careers /></PageWrapper>} />
            <Route path="/news"         element={<PageWrapper><NewsFeed /></PageWrapper>} />
            <Route path="/events"       element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/login"        element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/university/:name" element={<PageWrapper><UniversityDetail /></PageWrapper>} />
            <Route path="/universities/*" element={<PageWrapper><Universities /></PageWrapper>} />
            <Route path="/about/team"   element={<PageWrapper><OurTeam /></PageWrapper>} />
            <Route path="/about/team/:id" element={<PageWrapper><TeamMemberDetail /></PageWrapper>} />
            <Route path="/about/vision" element={<PageWrapper><OurVision /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
      {!isImmersivePage && <Footer />}
    </>
  );
}



function App() {
  const [loading, setLoading] = useState(true);
  const setDone = useCallback(() => setLoading(false), []);

  // Stable callback passed to Preloader
  const handlePreloaderComplete = useCallback(() => {
    setDone();
  }, [setDone]);

  // Absolute nuclear fallback: fires after 3.5s no matter what.
  // We use proper cleanup so Vite HMR (hot module reload) doesn't break.
  useEffect(() => {
    const id = setTimeout(() => {
      setDone();
    }, 3500);
    return () => clearTimeout(id);
  }, [setDone]);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
          <GlobalToasts />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
