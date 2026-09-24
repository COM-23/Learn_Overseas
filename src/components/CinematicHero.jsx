import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Premium Unsplash campus images — ZERO watermarks, ZERO text
const IMGS = [
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=1600', // Beautiful aerial campus
  'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1600', // Students studying
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600', // Team collaboration
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600', // Airplane wing over clouds
];

export default function CinematicHero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring — lower stiffness = silkier
  const s = useSpring(scrollYProgress, { stiffness: 45, damping: 22 });

  // ── SCENE TRANSITIONS — OVERLAPPING so there's NEVER a black gap ──
  // Scene 1: 0 → 0.30 (fade-out at 0.22)
  const op1 = useTransform(s, [0, 0.22, 0.30], [1, 1, 0]);
  // Scene 2: 0.20 → 0.55
  const op2 = useTransform(s, [0.20, 0.28, 0.45, 0.55], [0, 1, 1, 0]);
  // Scene 3: 0.45 → 0.78
  const op3 = useTransform(s, [0.45, 0.53, 0.68, 0.78], [0, 1, 1, 0]);
  // Scene 4: 0.68 → 1.0 (stays until end)
  const op4 = useTransform(s, [0.68, 0.78, 1.0], [0, 1, 1]);

  // Image zoom per scene
  const sc1 = useTransform(s, [0, 0.30], [1.0, 1.25]);
  const sc2 = useTransform(s, [0.20, 0.55], [1.0, 1.22]);
  const sc3 = useTransform(s, [0.45, 0.78], [1.0, 1.22]);
  const sc4 = useTransform(s, [0.68, 1.0], [1.0, 1.18]);

  // Text animations
  const y1 = useTransform(s, [0, 0.30], ['0px', '-60px']);
  const y2blur = useTransform(s, [0.20, 0.28, 0.45, 0.55], ['8px', '0px', '0px', '8px']);
  const y2 = useTransform(s, [0.20, 0.28, 0.45, 0.55], ['40px', '0px', '0px', '-40px']);
  const sc3text = useTransform(s, [0.45, 0.53, 0.68, 0.78], [0.9, 1, 1, 1.05]);

  return (
    <section ref={containerRef} style={{ height: '420vh', position: 'relative', background: '#020205' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ══ PERSISTENT FALLBACK BG (prevents black flashes) ══ */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #020205 0%, #080810 100%)', zIndex: 0 }} />

        {/* ══ SCENE 1 BG ══ */}
        <motion.div style={{ position: 'absolute', inset: '-8%', opacity: op1, zIndex: 1, scale: sc1 }}>
          <img src={IMGS[0]} alt="" style={{ width: '116%', height: '116%', objectFit: 'cover', filter: 'brightness(0.4) saturate(1.3)' }} />
        </motion.div>

        {/* ══ SCENE 2 BG ══ */}
        <motion.div style={{ position: 'absolute', inset: '-8%', opacity: op2, zIndex: 1, scale: sc2 }}>
          <img src={IMGS[1]} alt="" style={{ width: '116%', height: '116%', objectFit: 'cover', filter: 'brightness(0.35) saturate(1.1)' }} />
        </motion.div>

        {/* ══ SCENE 3 BG ══ */}
        <motion.div style={{ position: 'absolute', inset: '-8%', opacity: op3, zIndex: 1, scale: sc3 }}>
          <img src={IMGS[2]} alt="" style={{ width: '116%', height: '116%', objectFit: 'cover', filter: 'brightness(0.3) saturate(1.2)' }} />
        </motion.div>

        {/* ══ SCENE 4 BG ══ */}
        <motion.div style={{ position: 'absolute', inset: '-8%', opacity: op4, zIndex: 1, scale: sc4 }}>
          <img src={IMGS[3]} alt="" style={{ width: '116%', height: '116%', objectFit: 'cover', filter: 'brightness(0.45) saturate(1.4)' }} />
        </motion.div>

        {/* Cinematic gradient overlays — always on top of images */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(2,2,5,0.4) 0%, rgba(2,2,5,0.1) 45%, rgba(2,2,5,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 60%, rgba(249,212,64,0.06) 0%, transparent 60%)' }} />

        {/* ══════════════════════════════════
            SCENE 1 TEXT — THE DREAM
        ══════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: op1, y: y1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ width: 56, height: 1, background: 'var(--accent-gold)' }} />
              <span style={{ fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700 }}>Your Journey Begins</span>
              <div style={{ width: 56, height: 1, background: 'var(--accent-gold)' }} />
            </div>

            <h1 className="heading-hero" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 1.02, marginBottom: 28 }}>
              Every student<br />
              has a <span className="text-gradient" style={{ fontStyle: 'italic' }}>dream.</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: 'rgba(255,255,255,0.72)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
              A dream of Ivy League campuses, cutting-edge research, and a life-changing global career.
            </p>
          </motion.div>

          {/* Scroll cue */}
          <div style={{ position: 'absolute', bottom: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 9, letterSpacing: 5, color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700 }}>Scroll</span>
            <motion.div animate={{ height: [0, 48, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }} style={{ width: 1, background: 'linear-gradient(to bottom, var(--accent-gold), transparent)' }} />
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            SCENE 2 TEXT — THE REALITY
        ══════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: op2, y: y2,
            display: 'flex', alignItems: 'center',
          }}
        >
          <div className="container">
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,2,5,0.55)', pointerEvents: 'none' }} />
            <h2 className="heading-hero" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', maxWidth: 860, lineHeight: 1.08, marginBottom: 44, position: 'relative', zIndex: 1 }}>
              But the path is complex,<br />
              competitive, and{' '}
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>unforgiving.</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 820, position: 'relative', zIndex: 1 }}>
              {[
                { num: '500+', label: 'Universities to choose from — each with unique requirements.' },
                { num: '100+', label: 'Pages of documentation, essays, and visas to manage.' },
                { num: '5%', label: 'Average acceptance rate at top-tier global institutions.' },
              ].map(s => (
                <div key={s.num} className="glass-panel" style={{ padding: 28 }}>
                  <div style={{ fontSize: '2.4rem', color: 'var(--accent-gold)', marginBottom: 12, fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            SCENE 3 TEXT — THE SOLUTION
        ══════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: op3, scale: sc3text,
            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}
        >
          <div className="container">
            <motion.div
              style={{ width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #f0d060, var(--accent-copper))', margin: '0 auto 36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a3e00', fontFamily: 'var(--font-serif)', fontSize: 38, fontWeight: 900 }}
              animate={{ boxShadow: ['0 0 40px rgba(249,212,64,0.4)', '0 0 90px rgba(249,212,64,0.9)', '0 0 40px rgba(249,212,64,0.4)'] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              L
            </motion.div>
            <h2 className="heading-hero" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.08, marginBottom: 28 }}>
              We engineer your{' '}
              <span className="text-gradient" style={{ fontStyle: 'italic' }}>success.</span>
            </h2>
            <p style={{ maxWidth: 660, margin: '0 auto', fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8 }}>
              We don't just process papers. We build strategic profiles, negotiate scholarships, and prepare you to thrive in a global environment.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            SCENE 4 TEXT — THE DESTINATION
        ══════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: op4,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: 28 }}>
            Your Destination Awaits
          </div>
          <h2 className="heading-hero" style={{ fontSize: 'clamp(4rem, 11vw, 10rem)', letterSpacing: -4, lineHeight: 0.92 }}>
            Welcome{' '}
            <span className="text-gradient" style={{ fontStyle: 'italic' }}>Aboard.</span>
          </h2>
          <div style={{ marginTop: 56, display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.a href="/contact" className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Check Eligibility
            </motion.a>
            <motion.a href="#destinations" className="btn-secondary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Explore Destinations
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
