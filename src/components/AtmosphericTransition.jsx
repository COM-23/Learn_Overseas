import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AtmosphericTransition({ active, countryBg, countryName, onComplete }) {
  const [stage, setStage] = useState(0); 

  useEffect(() => {
    if (!active) { setStage(0); return; }
    setStage(1); // Space
    const t2 = setTimeout(() => setStage(2), 1600); // Clouds
    const t3 = setTimeout(() => setStage(3), 3200); // City
    const t4 = setTimeout(() => onComplete?.(), 4600); // Done
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  if (stage === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9990, overflow: 'hidden', background: '#000', cursor: 'default' }}>
      
      {/* Space Stage */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            key="space"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 3.5, opacity: 1 }}
            exit={{ opacity: 0, scale: 4.5 }}
            transition={{ duration: 1.8, ease: "easeIn" }}
            style={{
              position: 'absolute', inset: -150,
              backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=100&w=2560)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
        )}
      </AnimatePresence>

      {/* Clouds Stage */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            key="clouds"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 4, opacity: 1 }}
            exit={{ opacity: 0, scale: 5 }}
            transition={{ duration: 1.8, ease: "easeIn" }}
            style={{
              position: 'absolute', inset: -150,
              backgroundImage: 'url(https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&q=100&w=2560)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
        )}
      </AnimatePresence>

      {/* White Flash between clouds and city */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeIn" }}
            style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 10 }}
          />
        )}
      </AnimatePresence>

      {/* City Stage */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            key="city"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${countryBg})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ position: 'absolute', bottom: '12%', left: '8%' }}
            >
              <div style={{ fontSize: 11, letterSpacing: 6, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif', marginBottom: 12 }}>
                Arriving in
              </div>
              <div style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 900, color: '#fff', letterSpacing: -3, fontFamily: 'Inter,sans-serif', lineHeight: 0.9 }}>
                {countryName}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}