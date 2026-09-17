import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cinematic preloader — full immersive experience
export default function Preloader({ onComplete }) {
  useEffect(() => {
    // PERMANENT FIX: do NOT clear this timer in cleanup.
    // React HMR (hot-module-reload) unmounts+remounts effects during dev server
    // restarts. If we clearTimeout in cleanup, the timer dies and onComplete()
    // is never called → white screen forever. The 'called' guard prevents double-fire.
    let called = false;
    const fire = () => { if (!called) { called = true; onComplete(); } };
    setTimeout(fire, 2800);
    // NO return/cleanup — intentional. Safety fallback in App.jsx covers edge cases.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps — fire once on mount, never re-run

  return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#020205',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(249,212,64,0.08) 0%, transparent 60%)' }} />

        {/* Central Visual */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Animated rings */}
          <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.svg
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              viewBox="0 0 280 280"
              animate={{ rotate: 360, scale: [0.8, 1.1, 1] }}
              transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.8, ease: 'easeOut' } }}
            >
              <circle cx="140" cy="140" r="130" fill="none" stroke="rgba(249,212,64,0.4)" strokeWidth="2" strokeDasharray="4 12" />
              <circle cx="140" cy="140" r="115" fill="none" stroke="rgba(249,212,64,0.6)" strokeWidth="1.5" strokeDasharray="100 150" />
            </motion.svg>

            {/* Glowing inner core */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 150, damping: 15 }}
              style={{
                width: 140, height: 140, borderRadius: '50%',
                background: 'linear-gradient(135deg, #111, #000)',
                border: '2px solid rgba(249,212,64,0.8)',
                boxShadow: '0 0 80px rgba(249,212,64,0.6), inset 0 0 40px rgba(249,212,64,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <motion.div 
                animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 900, textShadow: '0 0 20px rgba(249,212,64,0.8)' }}
              >
                L.O.
              </motion.div>
            </motion.div>

            {/* Orbiting Plane */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%) rotate(90deg)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--accent-gold)" style={{ filter: 'drop-shadow(0 0 12px var(--accent-gold))' }}>
                  <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Large Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            style={{ marginTop: 40, textAlign: 'center' }}
          >
            <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: '#fff', letterSpacing: 3, marginBottom: 8, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Learn Overseas
            </h1>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}
              style={{ fontSize: '1.1rem', letterSpacing: 10, color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700 }}
            >
              Preparing for takeoff
            </motion.div>
          </motion.div>

          {/* Loading Bar */}
          <div style={{ width: 340, height: 3, background: 'rgba(255,255,255,0.1)', marginTop: 40, overflow: 'hidden', borderRadius: 4 }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--accent-gold), #fff)', boxShadow: '0 0 10px var(--accent-gold)' }}
            />
          </div>
        </div>
      </motion.div>
  );
}
