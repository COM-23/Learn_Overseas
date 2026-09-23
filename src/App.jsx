import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalToasts from './components/GlobalToasts';

// ─── Code-split every page: much smaller initial bundle = faster first load ───
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Countries = lazy(() => import('./pages/Countries'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const CountryUniversities = lazy(() => import('./pages/CountryUniversities'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Careers = lazy(() => import('./pages/Careers'));
const NewsFeed = lazy(() => import('./pages/NewsFeed'));
const Login = lazy(() => import('./pages/Login'));
const Universities = lazy(() => import('./pages/Universities'));
const UniversityDetail = lazy(() => import('./pages/UniversityDetail'));
const OurTeam = lazy(() => import('./pages/OurTeam'));
const OurVision = lazy(() => import('./pages/OurVision'));
const TeamMemberDetail = lazy(() => import('./pages/TeamMemberDetail'));
const Events = lazy(() => import('./pages/Events'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const cinematicVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.45, ease: [0.7, 0, 1, 0.3] } },
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

function AnimatedRoutes() {
  const location = useLocation();

  const isImmersivePage =
    location.pathname === '/about/team' ||
    location.pathname.startsWith('/about/team/');

  return (
    <>
      {!isImmersivePage && <Header />}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
              <Route path="/services/:id" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
              <Route path="/countries" element={<PageWrapper><Countries /></PageWrapper>} />
              <Route path="/destinations/:id" element={<PageWrapper><CountryDetail /></PageWrapper>} />
              <Route path="/destinations/:id/universities" element={<PageWrapper><CountryUniversities /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
              <Route path="/news" element={<PageWrapper><NewsFeed /></PageWrapper>} />
              <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/university/:name" element={<PageWrapper><UniversityDetail /></PageWrapper>} />
              <Route path="/universities/*" element={<PageWrapper><Universities /></PageWrapper>} />
              <Route path="/about/team" element={<PageWrapper><OurTeam /></PageWrapper>} />
              <Route path="/about/team/:id" element={<PageWrapper><TeamMemberDetail /></PageWrapper>} />
              <Route path="/about/vision" element={<PageWrapper><OurVision /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </ErrorBoundary>
      {!isImmersivePage && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [forceHidePreloader, setForceHidePreloader] = useState(false);

  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  // True fallback: actually removes the Preloader node after 3.5s no matter what
  useEffect(() => {
    const id = setTimeout(() => setForceHidePreloader(true), 3500);
    return () => clearTimeout(id);
  }, []);

  const showPreloader = loading && !forceHidePreloader;

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <div
        style={{
          opacity: showPreloader ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <BrowserRouter>
          <AnimatedRoutes />
          <GlobalToasts />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
