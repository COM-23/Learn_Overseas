import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// A completely clean, stable mobile-only version of the Home page
// Uses standard stacking context to completely avoid iOS Safari WebKit GPU crashes
export default function MobileHome() {
  return (
    <div style={{ backgroundColor: '#020205', minHeight: '100vh', width: '100%', overflowX: 'hidden', paddingBottom: '100px' }}>
      
      {/* 1. HERO SECTION */}
      <div style={{ position: 'relative', width: '100%', minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px', background: 'radial-gradient(ellipse at top, #0c1220 0%, #020205 100%)' }}>
        
        {/* Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: 10, textAlign: 'center', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: '#fff', lineHeight: 1, margin: 0 }}>Learn</h1>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', lineHeight: 1, margin: '5px 0 0 0', letterSpacing: '-0.02em' }}>OVERSEAS</h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginTop: '15px', maxWidth: '300px' }}>
            We don't just apply. We engineer your acceptance.
          </p>
          <Link to="/countries" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ marginTop: '30px', padding: '16px 40px', fontSize: '1.1rem' }}>
              Start Your Journey
            </button>
          </Link>
        </motion.div>

        {/* Pure DOM Visual (No WebGL/Canvas to prevent iOS GPU crashes) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
          style={{ position: 'relative', width: '100%', height: '40vh', marginTop: 'auto', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Outer glow ring */}
          <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.1) 0%, transparent 70%)', border: '1px solid rgba(249, 212, 64, 0.2)' }}></div>
          {/* Inner core */}
          <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, #1a233a 0%, #0c1220 100%)', boxShadow: 'inset 0 0 40px rgba(249, 212, 64, 0.1), 0 0 20px rgba(0,0,0,0.8)' }}></div>
          
          {/* Animated orbit rings (Pure DOM) */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-gold)' }}
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', border: '1px dotted rgba(255,255,255,0.15)', borderBottomColor: 'var(--accent-copper)' }}
          />
          
          <span style={{ position: 'relative', zIndex: 5, color: 'var(--accent-gold)', fontSize: '1.2rem', fontFamily: 'monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Global Network
          </span>
        </motion.div>
      </div>

      {/* 2. STATS SECTION */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px 20px', width: '100%', zIndex: 10, position: 'relative' }}>
        {[
          { v: '140K+', l: 'Programs globally' },
          { v: 'Top 1%', l: 'University placement' },
          { v: '$50M+', l: 'Scholarships secured' },
          { v: '100%', l: 'Success rate' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', fontWeight: 800 }}>{stat.v}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.l}</span>
          </motion.div>
        ))}
      </div>

      {/* 3. CTA SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: '20px' }}>Ready to step onto the world stage?</h2>
        <Link to="/contact" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '18px 50px', fontSize: '1.2rem', background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-copper))', color: '#000', border: 'none', borderRadius: '100px', fontWeight: 700 }}>
            Book Consultation
          </button>
        </Link>
      </motion.div>

    </div>
  );
}
