import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Profile Evaluation', desc: 'Deep dive into your academic and extracurricular background to identify unique strengths.' },
  { num: '02', title: 'University Shortlisting', desc: 'Algorithmic matching with the top 1% global institutions based on your aspirations.' },
  { num: '03', title: 'Application Strategy', desc: 'Crafting compelling narratives, SOPs, and securing the best letters of recommendation.' },
  { num: '04', title: 'Visa & Departure', desc: 'Seamless visa processing and pre-departure briefings to ensure a smooth transition.' }
];

export default function HomeExpertise() {
  return (
    <div className="home-expertise-section" style={{ position: 'relative', padding: '140px 5vw', background: '#020205', zIndex: 10 }}>

      {/* Ambient gradient — matches the globe section's dark background */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(125,193,177,0.03) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Header — same visual grammar as globe pages 1/2/3 ── */}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>

          {/* Bordered gold pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}
          >
            <div style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 800, background: 'rgba(5,5,8,0.95)', padding: '12px 28px', borderRadius: '100px', border: '1px solid rgba(249,212,64,0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', display: 'inline-flex', alignItems: 'center' }}>
              The Masterplan
            </div>
          </motion.div>

          {/* font-sans weight-900 stacked heading — cinematic whip-up reveal */}
          <div>
            <div style={{ overflow: 'hidden', paddingBottom: 6 }}>
              <motion.div
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span style={{ fontSize: 'clamp(3.2rem, 6vw, 7rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, fontFamily: 'var(--font-sans)', color: '#ffffff', display: 'block', textShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
                  How we
                </span>
              </motion.div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span style={{ fontSize: 'clamp(2rem, 4.5vw, 5rem)', fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', lineHeight: 0.9, fontFamily: 'var(--font-sans)', background: 'linear-gradient(135deg, var(--accent-blue) 0%, #7ee8cc 40%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
                  OPERATE.
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Step Cards Grid ── */}
        <div className="home-expertise-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'rgba(10,10,15,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                cursor: 'default'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'rgba(249,212,64,0.25)';
                e.currentTarget.style.boxShadow = '0 40px 60px rgba(0,0,0,0.6), 0 0 40px rgba(249,212,64,0.06)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
              }}
            >
              {/* Ghost step number */}
              <div style={{ position: 'absolute', top: -20, right: -10, fontSize: '9rem', fontWeight: 900, color: 'rgba(255,255,255,0.025)', fontFamily: 'var(--font-sans)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                {step.num}
              </div>

              {/* Gold accent bar */}
              <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-copper))', marginBottom: '30px', borderRadius: 2 }} />

              {/* Step number badge */}
              <div style={{ fontSize: '0.7rem', letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '14px', opacity: 0.7 }}>
                Step {step.num}
              </div>

              <h3 style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'var(--font-sans)', marginBottom: '16px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {step.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '1rem', margin: 0, fontWeight: 300 }}>
                {step.desc}
              </p>

              {/* Top accent line */}
              <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)', position: 'absolute', top: 0, left: 0, right: 0 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
