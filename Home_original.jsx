import React, { useRef, useState, Suspense, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import './Home.css';
import StudentSuccessWall from '../components/StudentSuccessWall';
import MagneticButton from '../components/MagneticButton';
import InfiniteMarquee from '../components/InfiniteMarquee';
import JourneyBackground from '../components/JourneyBackground';
import GlobeScene from '../components/GlobeScene';
import GraduationScene from '../components/GraduationScene';

export default function Home() {
  const containerRef = useRef(null);
  const finalJourneyRef = useRef(null);
  const { scrollYProgress: journeyScroll } = useScroll({ target: finalJourneyRef, offset: ['start start', 'end end'] });

  // Track global mouse position for Spotlight and Magnetic CTA
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const updateMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMouse, { passive: true });
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [mouseX, mouseY]);

  // Use a long scroll container (350vh) to trigger animations
  // 'end end' ensures scrollYProgress reaches 1.0 EXACTLY when the sticky element is about to unstick.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });



  // 1. First Text (Learn OVERSEAS)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const text1Display = useTransform(scrollYProgress, (v) => v > 0.15 ? 'none' : 'flex');

  // Metrics (Highlighters)
  const metricOpacity = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [0, 1, 1, 0]);
  const metricY = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [50, 0, 0, -50]);
  const metricScale = useTransform(scrollYProgress, [0.10, 0.25], [0.9, 1]);

  // 2. Second Text (Study Anywhere)
  const text2Opacity = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [50, 0, 0, -50]);
  const text2Display = useTransform(scrollYProgress, (v) => (v < 0.05 || v > 0.60) ? 'none' : 'flex');

  // 3. Cinematic Typographic HUD (Engineer Your Acceptance)
  const hudOpacity = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [0, 1, 1, 0]);
  const hudY = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [50, 0, 0, -50]);
  const hudScale = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [0.95, 1, 1, 1.05]);
  const hudDisplay = useTransform(scrollYProgress, (v) => (v < 0.40 || v > 0.98) ? 'none' : 'flex');

  // 4. Earth Zoom — gentle zoom-in over a wide range so it never looks jarring
  const earthScale = useTransform(scrollYProgress, [0.75, 1.0], [1, 1.7]);
  // Earth starts fading earlier and finishes before the scene completely exits
  const earthExitOpacity = useTransform(scrollYProgress, [0.78, 0.95], [1, 0]);

  // 5. Gateway portal — fades in softly, no aggressive scale punch
  const gatewayOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1]);
  const gatewayScale = useTransform(scrollYProgress, [0.88, 1.0], [0.92, 1.3]);

  // 6. Full scene container: fades out smoothly after earth is already gone
  const sceneOpacity = useTransform(scrollYProgress, [0.94, 1.0], [1, 0]);

  // 7. GPU Memory Saver
  const sceneDisplay = useTransform(scrollYProgress, (v) => v >= 0.999 ? 'none' : 'block');

  // 8. CTA section background opacity
  const ctaBgOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div style={{ color: 'var(--text-primary)', position: 'relative' }}>

      {/* Lightweight Noise Grain Overlay Removed for Performance */}

      {/* Global Interactive Spotlight (GPU Accelerated with strict contain for performance) */}
      <motion.div style={{
        position: 'fixed', left: -600, top: -600, width: 1200, height: 1200, zIndex: 5, pointerEvents: 'none',
        background: 'radial-gradient(circle 600px at center, rgba(249, 212, 64, 0.04), transparent 80%)',
        x: mouseX, y: mouseY,
        willChange: 'transform',
        contain: 'strict'
      }} />

      {/* Unified Hero Container (400vh for cinematic scroll pacing) */}
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '400vh', zIndex: 10, contain: 'layout' }}>

        {/* Sticky wrapper stays fixed while the user scrolls through the 300vh. */}
        <motion.div style={{
          position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden',
          background: 'radial-gradient(ellipse at top, #0c1220 0%, #020205 70%)',
          opacity: sceneOpacity,
          display: sceneDisplay,
          transform: 'translateZ(0)',
          willChange: 'opacity'
        }}>

          {/* Bottom vignette — bleeds the globe scene into the black sections below */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(2,2,5,0.6) 60%, #020205 100%)',
            zIndex: 30, pointerEvents: 'none'
          }} />

          {/* 0. The Interactive Globe Scene — no blur filter (too expensive on scroll) */}
          <motion.div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            opacity: earthExitOpacity,
            scale: earthScale,
            willChange: 'opacity, transform',
            contain: 'layout style'
          }}>
            <GlobeScene />
          </motion.div>

          {/* 1. First Text (Learn OVERSEAS) - Upgraded Cinematic Typography */}
          <motion.div className="hero-ui container" style={{
            position: 'absolute', inset: 0, zIndex: 10, display: text1Display, flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none',
            opacity: text1Opacity, y: text1Y, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}
              style={{ position: 'absolute', top: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(249,212,64,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }}
            />

            {/* Metric Badges - Top Corners */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.8 }}
              className="home-hero-corner-badge"
              style={{ position: 'absolute', top: '15%', left: '5%', background: 'rgba(10,14,18,0.95)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', zIndex: 20 }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', fontWeight: 400, lineHeight: 1 }}>3M+</span>
              <span style={{ fontSize: '0.75rem', letterSpacing: 2, color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>Scholarships</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 1 }}
              className="home-hero-corner-badge"
              style={{ position: 'absolute', top: '15%', right: '5%', background: 'rgba(10,14,18,0.95)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', zIndex: 20 }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', fontWeight: 400, lineHeight: 1 }}>99%</span>
              <span style={{ fontSize: '0.75rem', letterSpacing: 2, color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>Visa Success</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, willChange: 'transform, opacity', zIndex: 20 }}
            >
              <div style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 800, background: 'rgba(5,5,8,0.95)', padding: '12px 28px', borderRadius: '100px', border: '1px solid rgba(249,212,64,0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center' }}>
                A Global Perspective
              </div>
            </motion.div>

            <motion.h1
              className="heading-hero"
              initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', willChange: 'transform, opacity' }}
            >
              <div style={{ position: 'absolute', inset: -100, background: 'radial-gradient(ellipse at center, rgba(249,212,64,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <span style={{ fontSize: 'clamp(4rem, 9vw, 9rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, fontFamily: 'var(--font-sans)', color: '#ffffff', textShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 100px rgba(255,255,255,0.2)' }}>
                Learn
              </span>
              <span style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 0.9, marginTop: '8px', fontFamily: 'var(--font-sans)', background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-gold) 40%, var(--accent-copper) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
                OVERSEAS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
              className="body-large"
              style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 650, marginTop: 32, fontSize: '1.2rem', lineHeight: 1.6, textShadow: '0 4px 15px rgba(0,0,0,0.9)' }}
            >
              Plunge into the future of international education. We don't just process applications—we architect your global trajectory.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1 }}
              style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%) translateZ(0)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, willChange: 'opacity, transform' }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.7)', textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Initiate Scroll</span>

              <div style={{ width: 26, height: 44, borderRadius: 22, border: '2px solid rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'center', padding: '5px', position: 'relative', background: 'rgba(0,0,0,0.7)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                <div className="scroll-dot" style={{ width: 4, borderRadius: 4, background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }} />
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Second Text (Study Anywhere) */}
          <motion.div style={{
            position: 'absolute', inset: 0, zIndex: 10, display: text2Display, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none',
            opacity: text2Opacity, y: text2Y, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
              <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', letterSpacing: '0.8em', textTransform: 'uppercase', color: 'var(--accent-gold)', margin: 0, fontWeight: 800, textShadow: '0 0 20px rgba(249,212,64,0.5)' }}>Global Network</p>
              <div style={{ width: '60px', height: '1px', background: 'linear-gradient(-90deg, transparent, var(--accent-gold))' }} />
            </div>

            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 'clamp(4.5rem, 9vw, 9rem)', lineHeight: 1.1, paddingTop: '0.1em', color: '#fff', marginBottom: '24px', textShadow: '0 20px 60px rgba(0,0,0,0.9)' }}>
              Study<br />
              <span style={{ color: 'var(--accent-blue)', fontStyle: 'italic', background: 'linear-gradient(90deg, var(--accent-blue), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 30px rgba(125,193,177,0.4))' }}>Anywhere.</span>
            </h1>

            <p className="study-anywhere-desc" style={{ fontFamily: "var(--font-sans)", fontSize: '1.3rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', maxWidth: '550px', marginBottom: '60px', fontWeight: 300, textShadow: '0 4px 15px rgba(0,0,0,0.9)', background: 'rgba(4,4,8,0.92)', padding: '20px 30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              Interact with the globe to explore our partner universities and live tuition estimates across the world.
            </p>
          </motion.div>

          {/* 3. Metrics Cards (Appear as text2 fades) */}
          <motion.div className="metric-card-wrapper left" style={{ position: 'absolute', top: '15%', left: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <div className="metric-card" style={{ background: 'rgba(10,10,15,0.97)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.03)' }}>
              <span className="metric-value" style={{ background: 'linear-gradient(135deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>99%</span>
              <span className="metric-label blue" style={{ letterSpacing: 2, fontWeight: 700 }}>Visa Success</span>
            </div>
          </motion.div>
          <motion.div className="metric-card-wrapper right" style={{ position: 'absolute', top: '12%', right: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <div className="metric-card" style={{ background: 'rgba(10,10,15,0.97)', border: '1px solid rgba(249,212,64,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(249,212,64,0.06)' }}>
              <span className="metric-value" style={{ color: 'var(--accent-gold)' }}>200+</span>
              <span className="metric-label gold" style={{ letterSpacing: 2, fontWeight: 700 }}>Universities</span>
            </div>
          </motion.div>
          <motion.div className="metric-card-wrapper bottom-left" style={{ position: 'absolute', bottom: '22%', left: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <div className="metric-card copper" style={{ background: 'rgba(10,10,15,0.97)', border: '1px solid rgba(180,120,60,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(180,120,60,0.06)' }}>
              <span className="metric-value" style={{ color: 'var(--accent-copper)' }}>$10M+</span>
              <span className="metric-label copper" style={{ letterSpacing: 2, fontWeight: 700 }}>Scholarships</span>
            </div>
          </motion.div>
          <motion.div className="metric-card-wrapper bottom-right" style={{ position: 'absolute', bottom: '15%', right: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <div className="metrics-stats-bar" style={{ background: 'rgba(10,10,15,0.97)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
              <div>
                <div className="stat-value">35</div>
                <div className="stat-label">Countries</div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div className="stat-value">500+</div>
                <div className="stat-label">Universities</div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div className="stat-value">8k+</div>
                <div className="stat-label">Students</div>
              </div>
            </div>
          </motion.div>

          {/* 3. Cinematic Typographic HUD (Proper Section Transition) */}
          <motion.div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 15, display: hudDisplay, alignItems: 'center', justifyContent: 'center',
            opacity: hudOpacity, y: hudY, scale: hudScale,
            willChange: 'transform, opacity'
          }}>
            <div className="hud-outer" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '30px',
              padding: '60px 8vw',
            }}>
              <div className="hud-pills-row" style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div className="hud-pill" style={{ display: 'inline-flex', border: '1px solid rgba(249,212,64,0.5)', padding: '10px 24px', borderRadius: '100px', color: '#000', background: 'var(--accent-gold)', letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 800, boxShadow: '0 10px 30px rgba(249,212,64,0.3)', alignItems: 'center', gap: 8 }}>
                  Top 1% Global Placements
                </div>
                <div className="hud-pill" style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.12)', padding: '10px 24px', borderRadius: '100px', color: 'rgba(255,255,255,0.8)', background: 'rgba(8,8,12,0.9)', letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%', boxShadow: '0 0 10px #4CAF50' }} /> ACCEPTING 2025 COHORT
                </div>
                <div className="hud-pill" style={{ display: 'inline-flex', border: '1px solid rgba(249,212,64,0.3)', padding: '10px 24px', borderRadius: '100px', color: 'var(--accent-gold)', background: 'rgba(8,8,12,0.9)', letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>Ivy League</span> Specialization
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(4rem, 8vw, 8.5rem)', color: '#fff', margin: 0, fontWeight: 400, lineHeight: 1.05, textShadow: '0 30px 60px rgba(0,0,0,0.9)' }}>
                Engineer Your <br />
                <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)', background: 'linear-gradient(90deg, #fff, var(--accent-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 40px rgba(249,212,64,0.4))' }}>Acceptance.</span>
              </h2>

              <div className="hud-stat-cards" style={{ display: 'flex', gap: '3vw', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="hud-stat-card" style={{ background: 'rgba(2,2,5,0.9)', border: '1px solid rgba(255,255,255,0.1)', padding: '35px 45px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.05)' }}>
                  <div className="hud-stat-value" style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: '#fff', textShadow: '0 10px 20px rgba(0,0,0,0.5)', lineHeight: 1 }}>98.7%</div>
                  <div className="hud-stat-label" style={{ fontSize: '0.8rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '15px', fontWeight: 700 }}>Placement Rate</div>
                </div>
                <div className="hud-stat-card" style={{ background: 'rgba(2,2,5,0.9)', border: '1px solid rgba(249,212,64,0.4)', padding: '35px 45px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(249,212,64,0.1)' }}>
                  <div className="hud-stat-value" style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', textShadow: '0 10px 20px rgba(0,0,0,0.5)', lineHeight: 1 }}>$24M+</div>
                  <div className="hud-stat-label" style={{ fontSize: '0.8rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '15px', fontWeight: 700 }}>Scholarships Secured</div>
                </div>
                <div className="hud-stat-card" style={{ background: 'rgba(2,2,5,0.9)', border: '1px solid rgba(125,193,177,0.4)', padding: '35px 45px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(125,193,177,0.1)' }}>
                  <div className="hud-stat-value" style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-blue)', textShadow: '0 10px 20px rgba(0,0,0,0.5)', lineHeight: 1 }}>200+</div>
                  <div className="hud-stat-label" style={{ fontSize: '0.8rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '15px', fontWeight: 700 }}>Global Partners</div>
                </div>
              </div>

              <div className="hud-description-row" style={{ display: 'flex', gap: '40px', maxWidth: '1000px', marginTop: '30px', textAlign: 'left', background: 'rgba(10,10,18,0.95)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="hud-description-col" style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, flex: 1, margin: 0, textShadow: '0 5px 15px rgba(0,0,0,0.5)', borderLeft: '3px solid var(--accent-gold)', paddingLeft: '24px' }}>
                  Our bespoke strategy transforms your unique potential into an undeniable candidate profile. We don't just submit applications—we architect your entire trajectory to ensure you secure a position at the world's most elite institutions.
                </p>
                <p className="hud-description-col" style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, flex: 1, margin: 0, textShadow: '0 5px 15px rgba(0,0,0,0.5)', borderLeft: '3px solid var(--accent-blue)', paddingLeft: '24px' }}>
                  From Ivy League admissions to cutting-edge research placements in Europe, our alumni network spans the globe. Gain exclusive access to proprietary placement strategies that guarantee unparalleled scholarship outcomes and career acceleration.
                </p>
              </div>
            </div>
          </motion.div>




          {/* 6. University Gateway Portal (Upgraded Dimensional Wormhole) */}
          <motion.div style={{
            position: 'absolute', inset: 0, zIndex: 25, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: gatewayOpacity, scale: gatewayScale, willChange: 'transform, opacity'
          }}>
            <div style={{
              width: '100%', height: '100vh',
              background: 'radial-gradient(circle at center, rgba(249,212,64,0.3) 0%, rgba(125,193,177,0.1) 40%, transparent 70%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Simple CSS-only rings — no 3D transforms, no preserve-3d (was the #1 perf killer) */}
              <div style={{ position: 'absolute', width: '60vw', height: '60vw', borderRadius: '50%', border: '2px solid rgba(249,212,64,0.15)', pointerEvents: 'none', animation: 'spin-slow 25s linear infinite' }} />
              <div style={{ position: 'absolute', width: '75vw', height: '75vw', borderRadius: '50%', border: '1px dashed rgba(125,193,177,0.2)', pointerEvents: 'none', animation: 'spin-slow 35s linear infinite reverse' }} />

              {/* Core Supernova Burst — pulse only, no filter animation */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(249,212,64,0.15) 30%, transparent 70%)', borderRadius: '50%' }}
              />

              <div style={{
                border: '1px solid rgba(249,212,64,0.8)',
                padding: '25px 60px',
                borderRadius: '100px',
                boxShadow: '0 0 100px rgba(249,212,64,0.6), inset 0 0 40px rgba(249,212,64,0.4)',
                background: 'rgba(5,5,8,0.99)',
                position: 'relative',
                zIndex: 10
              }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '1.4rem', color: 'var(--accent-gold)',
                  fontWeight: 800, letterSpacing: '10px', textTransform: 'uppercase', textShadow: '0 0 30px rgba(249,212,64,0.8)'
                }}>
                  Entering Global Network
                </span>
              </div>
              <motion.div
                animate={{ height: [80, 200, 80], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ marginTop: '40px', width: '3px', background: 'linear-gradient(to bottom, var(--accent-gold), transparent)', boxShadow: '0 0 20px var(--accent-gold)' }}
              />
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* The following section overlaps the sticky container by exactly 100vh.
          This means that at the exact moment the sticky container finishes scrolling (and fades to opacity 0),
          this section is already perfectly positioned in the viewport, creating a flawless 0-seam transition. */}
      {/* ══════════════════════════════════════════════════════════
           THE FINAL JOURNEY WRAPPER
           (Act II, Act III, Act IV)
      ══════════════════════════════════════════════════════════ */}
      <div ref={finalJourneyRef} style={{ position: 'relative', zIndex: 1, marginTop: '-100vh', background: 'transparent' }}>
        
        {/* The continuous sticky animated background */}
        <JourneyBackground scrollYProgress={journeyScroll} />

        {/* ── Content layers scrolling normally over the background ── */}
        
        {/* ACT II: Marquee + Success Wall */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Gradient bridge from globe navy */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '220px',
            background: 'linear-gradient(to bottom, #0c1220 0%, rgba(2,2,5,0.7) 60%, transparent 100%)',
            pointerEvents: 'none', zIndex: 5
          }} />
          {/* Cinematic black curtain */}
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', inset: 0, background: '#020205',
              zIndex: 4, pointerEvents: 'none',
              height: '100vh'
            }}
          />
          <InfiniteMarquee />
          <StudentSuccessWall />
        </div>

        {/* ACT III: Graduation Scene (Transparent background to see student walking) */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Curtain wipe */}
          <motion.div
            initial={{ x: 0 }}
            whileInView={{ x: '101%' }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', inset: 0, background: '#020205',
              zIndex: 4, pointerEvents: 'none', height: '100%'
            }}
          />
          <GraduationScene />
        </div>

        {/* ACT IV: The Climax / Call to Action */}
        <div style={{
          position: 'relative', zIndex: 2,
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* We remove the opaque background from CTA so we can see the journey background */}
          <motion.div style={{
            position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(249, 212, 64, 0.15) 0%, transparent 70%)',
            opacity: ctaBgOpacity, pointerEvents: 'none'
          }} />

          {/* Floating Ambient Orbs */}
          <div className="ambient-orb-1" style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(180,150,255,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div className="ambient-orb-2" style={{ position: 'absolute', bottom: '10%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(249,212,64,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          {/* Infinite Grid Floor Effect */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50vh',
            background: 'linear-gradient(transparent 95%, rgba(249,212,64,0.15) 100%), linear-gradient(90deg, transparent 95%, rgba(249,212,64,0.15) 100%)',
            backgroundSize: '50px 50px',
            transform: 'perspective(600px) rotateX(65deg)',
            transformOrigin: 'top',
            opacity: 0.4, pointerEvents: 'none'
          }} />

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: 'relative', zIndex: 10,
              padding: '60px 20px',
              perspective: 1000,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-block', border: '1px solid rgba(249,212,64,0.6)', borderRadius: '100px', padding: '12px 30px', color: 'var(--accent-gold)', fontSize: '0.9rem', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 40, background: 'rgba(5,5,8,0.95)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              Initiate Launch
            </div>

            <h2 style={{ color: '#fff', fontSize: 'clamp(4rem, 10vw, 8rem)', fontFamily: 'var(--font-serif)', lineHeight: 1, margin: 0, textShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
              Your global <br />
              <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic', background: 'linear-gradient(180deg, #fff, var(--accent-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>legacy awaits.</span>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', maxWidth: 650, margin: '40px auto 60px', lineHeight: 1.8, textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>
              Don't just apply. Dominate the admissions cycle with our proprietary placement architecture. Join the top 1% today.
            </p>

            {/* ── Inline Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%', maxWidth: 680,
                background: 'rgba(8,8,14,0.85)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(249,212,64,0.2)',
                borderRadius: 28,
                padding: '48px 44px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: 8, textAlign: 'left' }}>
                Get in Touch
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', fontFamily: 'var(--font-serif)', fontWeight: 400, margin: '0 0 32px', textAlign: 'left', lineHeight: 1.3 }}>
                Begin your journey with a free consultation
              </h3>

              <form
                onSubmit={(e) => { e.preventDefault(); window.location.href = '/contact'; }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {/* Row: Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Full Name</label>
                    <input
                      type="text" placeholder="Your name" required
                      style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: '0.95rem',
                        outline: 'none', transition: 'border-color 0.3s',
                        fontFamily: 'var(--font-sans)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(249,212,64,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Email</label>
                    <input
                      type="email" placeholder="your@email.com" required
                      style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: '0.95rem',
                        outline: 'none', transition: 'border-color 0.3s',
                        fontFamily: 'var(--font-sans)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(249,212,64,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>

                {/* Row: Phone + Target Country */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Phone</label>
                    <input
                      type="tel" placeholder="+91 XXXXX XXXXX"
                      style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: '0.95rem',
                        outline: 'none', transition: 'border-color 0.3s',
                        fontFamily: 'var(--font-sans)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(249,212,64,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Target Country</label>
                    <select
                      style={{
                        background: 'rgba(10,10,18,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '14px 18px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem',
                        outline: 'none', transition: 'border-color 0.3s', cursor: 'pointer',
                        fontFamily: 'var(--font-sans)', appearance: 'none',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(249,212,64,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      <option value="">Select destination</option>
                      <option>🇬🇧 United Kingdom</option>
                      <option>🇺🇸 United States</option>
                      <option>🇨🇦 Canada</option>
                      <option>🇦🇺 Australia</option>
                      <option>🇩🇪 Germany</option>
                      <option>🇸🇬 Singapore</option>
                      <option>🇳🇱 Netherlands</option>
                      <option>🇫🇷 France</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Message (optional)</label>
                  <textarea
                    placeholder="Tell us about your goals and academic background…"
                    rows={3}
                    style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: '0.95rem',
                      outline: 'none', resize: 'none', transition: 'border-color 0.3s',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(249,212,64,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(249,212,64,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    marginTop: 8,
                    background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
                    color: '#000', border: 'none', borderRadius: 14,
                    padding: '18px 32px', fontSize: '0.95rem', fontWeight: 800,
                    letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    boxShadow: '0 10px 30px rgba(249,212,64,0.2)',
                  }}
                >
                  Request Free Consultation →
                </motion.button>

                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', margin: '4px auto 0', letterSpacing: 0.5 }}>
                  🔒 Your information is secure. We respond within 24 hours.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
</div>
  );
}

