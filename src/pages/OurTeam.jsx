import React from 'react';
import TeamSection from '../components/TeamSection';
import AboutNav from '../components/AboutNav';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleTransition from '../components/ParticleTransition';

export default function OurTeam() {
  const [showParticle, setShowParticle] = React.useState(true);

  return (
    <div style={{ background: 'radial-gradient(circle at 50% -20%, #1a1a2e 0%, #020205 70%)', minHeight: '100vh', position: 'relative', overflow: 'clip' }}>
      
      <AnimatePresence>
        {showParticle && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020205' }}
            >
              <ParticleTransition onComplete={() => setShowParticle(false)} />
            </motion.div>
        )}
      </AnimatePresence>

      {/* Background glowing orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <AboutNav />
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '180px', paddingBottom: '100px', textAlign: 'center', paddingLeft: '5vw', paddingRight: '5vw' }}>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'var(--accent-gold)', letterSpacing: 5, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 800, marginBottom: 20 }}
        >
            The Architects
        </motion.p>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', fontFamily: 'var(--font-serif)', color: '#fff', margin: 0, lineHeight: 1, letterSpacing: 2 }}
        >
            OUR TEAM
        </motion.h1>
      </div>
      <TeamSection />
    </div>
  );
}
