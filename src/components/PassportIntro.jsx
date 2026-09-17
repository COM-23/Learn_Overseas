import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AtmosphericTransition from './AtmosphericTransition';

export default function PassportIntro({ onComplete }) {
  const [phase, setPhase] = useState('waiting'); // waiting -> diving -> done

  const handleDive = () => {
    if (phase !== 'waiting') return;
    setPhase('diving');
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase === 'diving' && (
        <AtmosphericTransition 
          active={true} 
          countryBg="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=90&w=2560" 
          countryName="THE WORLD" 
          onComplete={() => { setPhase('done'); onComplete(); }} 
        />
      )}

      {phase !== 'diving' && (
        <motion.div
          key="passport-desk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={handleDive}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundImage: 'url(/premium_passport.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          {/* Subtle pulse instruction */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'absolute', bottom: '15%',
              background: 'rgba(0,0,0,0.6)', ,
              padding: '16px 40px', borderRadius: 100,
              color: 'var(--accent-gold)', border: '1px solid rgba(249,212,64,0.4)',
              textTransform: 'uppercase', letterSpacing: 4, fontSize: 13, fontWeight: 700,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            Click to enter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}