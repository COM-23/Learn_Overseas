import React from 'react';
import { motion } from 'framer-motion';

export default function AdvantageSection() {
  return (
    <div style={{
      width: '100%',
      backgroundImage: `linear-gradient(to bottom, rgba(2, 2, 5, 1) 0%, rgba(2, 2, 5, 0.2) 20%, rgba(2, 2, 5, 0.4) 80%, rgba(2, 2, 5, 1) 100%), url('/dive-clouds.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '100px',
      paddingBottom: '120px',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(249,212,64,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(125,193,177,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '120px 120px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '15px', fontWeight: 700, fontSize: '0.9rem' }}>
          The Learn Overseas Advantage
        </p>
        <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '50px', maxWidth: '900px', lineHeight: 1.1 }}>
          We engineer <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>global legacies</span> at the world's most exclusive institutions.
        </h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', width: '100%', maxWidth: '1200px', padding: '0 5vw' }}>
        <motion.div 
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(249, 212, 64, 0.1)' }}
          style={{ background: 'rgba(20,20,25,0.95)', padding: '50px 40px', borderRadius: '24px', border: '1px solid rgba(249, 212, 64, 0.2)' }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🎯</div>
          <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.6rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Strategic Positioning</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '1.05rem' }}>We discard generic applications. We meticulously curate multi-year narratives that transform our candidates into highly sought-after assets for Ivy League admissions boards.</p>
        </motion.div>
        <motion.div 
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(125, 193, 177, 0.1)' }}
          style={{ background: 'rgba(20,20,25,0.95)', padding: '50px 40px', borderRadius: '24px', border: '1px solid rgba(125, 193, 177, 0.2)' }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🛂</div>
          <h3 style={{ color: 'var(--accent-blue)', fontSize: '1.6rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Flawless Execution</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '1.05rem' }}>Guided by former consular experts, our administrative and visa teams operate with a 99.9% precision rate. Bureaucratic hurdles will never disrupt your trajectory.</p>
        </motion.div>
        <motion.div 
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(214, 122, 67, 0.1)' }}
          style={{ background: 'rgba(20,20,25,0.95)', padding: '50px 40px', borderRadius: '24px', border: '1px solid rgba(214, 122, 67, 0.2)' }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🏛️</div>
          <h3 style={{ color: 'var(--accent-copper)', fontSize: '1.6rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Financial Dominance</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '1.05rem' }}>Having secured over $24M in exclusive funding, we aggressively target and negotiate high-value merit scholarships and global fellowships on your behalf.</p>
        </motion.div>
      </div>
    </div>
  );
}
