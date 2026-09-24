import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent, useMotionValue } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import { SERVICES } from '../data/services';

function ServiceCard({ svc, index, onClick }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <motion.div
        className="glass-panel"
        whileHover={{ y: -15, boxShadow: `0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px ${svc.color}30` }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(svc)}
        style={{
          cursor: 'pointer',
          width: '100%', height: '100%',
          borderRadius: 24, overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column',
          border: `1px solid ${svc.color}40`,
          background: `linear-gradient(145deg, rgba(20,20,25,0.8) 0%, rgba(10,10,15,0.9) 100%)`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        <div style={{ height: 160, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 100%)` }} />

          <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', color: svc.color, background: `${svc.color}20`, padding: '6px 12px', borderRadius: 100, border: `1px solid ${svc.color}50` }}>{svc.tag}</span>
            <span style={{ fontSize: 24 }}>{svc.icon}</span>
          </div>
        </div>

        <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
          <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: 12, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>{svc.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 20 }}>{svc.desc}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
            {svc.features.map((f, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: svc.color, flexShrink: 0, boxShadow: `0 0 10px ${svc.color}` }} />
                {f}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{svc.statLabel}</div>
              <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: svc.color, fontWeight: 800, lineHeight: 1 }}>{svc.stat}</div>
            </div>
            <div style={{ fontSize: 24, color: svc.color }}>→</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const navigate = useNavigate();
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
        setViewportWidth(window.innerWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate maximum RIGHT scroll distance since the track is aligned flex-end
  const maxScroll = trackWidth > viewportWidth ? (trackWidth - viewportWidth) : 0;
  const x = useTransform(scrollYProgress, [0, 0.85], [0, maxScroll]);

  // Plane animation (from right to left)
  const planeX = useTransform(scrollYProgress, [0, 0.85], ['110vw', '-110vw']);
  const planeY = useTransform(scrollYProgress, [0, 1], ['15%', '35%']);
  const planeOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);

  const [planeFacingLeft, setPlaneFacingLeft] = useState(true);

  const planeScaleX = useMotionValue(-1);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev + 5 && planeScaleX.get() !== -1) {
      planeScaleX.set(-1);
    } else if (latest < prev - 5 && planeScaleX.get() !== 1) {
      planeScaleX.set(1);
    }
  });

  return (
    <section ref={containerRef} style={{ background: '#020205', height: '400vh', position: 'relative' }}>

      <style>{`
        @keyframes pulseRotate1 {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(45deg); }
          100% { transform: scale(1) rotate(90deg); }
        }
        @keyframes pulseRotate2 {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(-45deg); }
          100% { transform: scale(1) rotate(-90deg); }
        }
      `}</style>

      <div
        style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0, animation: 'pulseRotate1 25s linear infinite' }}
      />
      <div
        style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(252, 113, 51, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0, animation: 'pulseRotate2 30s linear infinite' }}
      />

      <div className="services-sticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Background grain/texture and Country Design */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2560)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.04, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, filter: 'invert(1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(249,212,64,0.04) 0%, transparent 50%, rgba(125,193,177,0.03) 100%)', pointerEvents: 'none' }} />

        {/* Cinematic Airplane */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            x: planeX,
            y: planeY,
            zIndex: 1,
            pointerEvents: 'none',
            opacity: planeOpacity
          }}
        >
          <motion.div style={{ scaleX: planeScaleX, transition: 'transform 0.5s' }}>
            <img
              src="/airplane.png"
              alt="Plane"
              style={{
                width: 'clamp(300px, 50vw, 800px)',
                filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.8))',
                transform: 'rotate(0deg)',
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            width: 'max-content',
            gap: viewportWidth < 768 ? 20 : 40,
            paddingLeft: '10vw',
            paddingRight: '10vw',
            alignItems: 'center',
            alignSelf: 'flex-end', /* Aligns the track to the RIGHT edge */
            zIndex: 5,
            position: 'relative'
          }}
        >
          {/* Final CTA Card (Now on the far left) */}
          <div style={{ width: 'clamp(280px, 85vw, 400px)', height: 'clamp(500px, 80vh, 620px)', flexShrink: 0, padding: viewportWidth < 768 ? '10px' : '20px', display: 'flex', alignItems: 'center' }}>
            <div className="glass-panel" style={{ width: '100%', padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: 16 }}>Ready to take off?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 30, fontSize: '0.9rem' }}>Book a free strategy session with our senior counsellors.</p>
              <a href="/contact" className="btn-primary" style={{ padding: '14px 28px', width: '100%' }}>Book Consultation</a>
            </div>
          </div>

          {/* Map services in reverse */}
          {[...SERVICES].reverse().map((svc, i) => (
            <div key={svc.id} style={{ width: 'clamp(280px, 85vw, 400px)', height: 'clamp(500px, 80vh, 620px)', flexShrink: 0, padding: viewportWidth < 768 ? '10px' : '20px' }}>
              <ServiceCard svc={svc} index={i} onClick={(service) => navigate(`/services/${service.id}`)} />
            </div>
          ))}

          {/* Section Title (Now on the far right) */}
          <div style={{ width: 'clamp(280px, 85vw, 400px)', padding: '20px', flexShrink: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: 'var(--accent-gold)' }} />
              <span style={{ fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700 }}>First Class Services</span>
            </div>
            <h1 className="heading-hero" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 8, lineHeight: 1.1 }}>
              Your flight path<br />to the <span className="text-gradient" style={{ fontStyle: 'italic' }}>future.</span>
            </h1>
            <p className="body-large" style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: 24 }}>
              Scroll horizontally to explore our comprehensive services. We trace the perfect route for your international education journey.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}