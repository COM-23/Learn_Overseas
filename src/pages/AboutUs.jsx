import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Plane, Globe2 } from 'lucide-react';
import AboutNav from '../components/AboutNav';

const TIMELINE = [
  { year: '2009', title: 'The Inception', desc: 'Started in a small office with just 2 counsellors and a single-minded vision to open global doors.' },
  { year: '2014', title: 'National Expansion', desc: 'Achieved our first landmark: 1,000 students placed at top universities worldwide.' },
  { year: '2018', title: 'Strategic Partnerships', desc: 'Forged direct tie-ups with 200+ universities across the UK, USA, Canada, and Australia.' },
  { year: '2023', title: 'Digital Transformation', desc: 'Launched our proprietary AI-driven profile matching system, raising success rates to 99%.' },
];

const STATS = [
  { num: '8,000+', label: 'Admissions' },
  { num: '1,200+', label: 'Universities' },
  { num: '20', label: 'Years of Excellence' },
  { num: '25M+', label: 'USD in Financial Aid' },
];

// Beautiful campus images — premium quality
const CAMPUS_IMGS = [
  '/about-hero.jpg', // Custom generated cinematic campus aerial
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=95&w=2400',
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=95&w=2400',
];

function ParallaxHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // As user scrolls DOWN, image ZOOMS IN — cinematic college reveal
  const imgScale = useTransform(smooth, [0, 1], [1, 1.35]);
  const imgBrightness = useTransform(smooth, [0, 0.6], [0.45, 0.2]);
  const textY = useTransform(smooth, [0, 1], ['0%', '-30%']);
  const textOpacity = useTransform(smooth, [0, 0.5, 0.85], [1, 1, 0]);

  return (
    <div className="about-hero-container" ref={heroRef} style={{ position: 'relative', height: '130vh', overflow: 'hidden' }}>

      {/* Sticky viewport */}
      <div className="about-hero-sticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Cinematic Background Image with Parallax Zoom */}
        <motion.div style={{ position: 'absolute', inset: 0, scale: imgScale, transformOrigin: 'center 30%' }}>
            <img 
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=100&w=2800" 
              alt="Historic University Library" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Base Overlay to ensure text readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 2, 5, 0.5)' }} />
        </motion.div>

        {/* Cinematic gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,2,5,0.7) 0%, rgba(2,2,5,0.2) 40%, rgba(2,2,5,1) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 10%, rgba(2,2,5,0.85) 100%)', pointerEvents: 'none' }} />

        {/* Floating Parallax Geometry */}
        <motion.div style={{ position: 'absolute', top: '20%', left: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(249, 212, 64, 0.1), transparent)', border: '1px solid rgba(249, 212, 64, 0.2)', y: useTransform(smooth, [0, 1], [0, -300]), rotate: useTransform(smooth, [0, 1], [0, 90]) }} />
        <motion.div style={{ position: 'absolute', top: '60%', right: '15%', width: '100px', height: '100px', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)', border: '1px solid rgba(255, 255, 255, 0.1)', y: useTransform(smooth, [0, 1], [0, -500]), rotate: useTransform(smooth, [0, 1], [0, -180]) }} />
        <motion.div style={{ position: 'absolute', top: '80%', left: '20%', width: '80px', height: '80px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(125, 193, 177, 0.1), transparent)', border: '1px solid rgba(125, 193, 177, 0.2)', y: useTransform(smooth, [0, 1], [0, -200]), rotate: useTransform(smooth, [0, 1], [45, 180]) }} />

        {/* Dynamic Architectural Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 10%, black 50%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 50%, transparent 90%)'
        }} />
        <motion.div 
          animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundSize: '100px 100px',
            backgroundImage: 'linear-gradient(to right, rgba(249,212,64,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,212,64,0.03) 1px, transparent 1px)',
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)'
        }} />

        {/* Scroll-animated hero text */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, y: textY, opacity: textOpacity,
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'center',
          }}
          className="container about-hero-text"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: 'var(--accent-gold)' }} />
              <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700 }}>Our Legacy</span>
            </div>

            <h1 className="heading-hero" style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 1, marginBottom: 28 }}>
              Beyond<br />
              <span className="text-gradient" style={{ fontStyle: 'italic' }}>Borders.</span>
            </h1>

            <p className="body-large" style={{ maxWidth: 560, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              For 20 years, we have engineered 8,000+ global careers — breaking down every barrier between brilliant Indian students and the world's most prestigious institutions.
            </p>

            {/* Scroll indicator */}
            <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: 4, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Scroll to explore</span>
              <motion.div
                animate={{ height: [0, 48, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{ width: 1, background: 'linear-gradient(to bottom, var(--accent-gold), transparent)' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating 3D Premium Badge on the right - Ultra Cinematic */}
        <motion.div
          style={{
            position: 'absolute', right: '10%', top: '50%', 
            y: useTransform(smooth, [0, 1], ['-50%', '-15%']), 
            opacity: textOpacity,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            perspective: 1200, zIndex: 10
          }}
          className="hide-on-mobile"
        >
          <motion.div
             animate={{ rotateY: [0, 8, -8, 0], rotateX: [0, -4, 4, 0], y: [0, -15, 0] }}
             transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
             style={{ 
               width: 360, height: 480, 
               background: 'linear-gradient(135deg, rgba(20,20,25,0.95), rgba(2,2,5,1))',
               borderRadius: 30, 
               border: '1px solid rgba(249, 212, 64, 0.15)',
               boxShadow: '0 40px 100px rgba(0,0,0,0.9), inset 0 2px 20px rgba(255,255,255,0.08), inset 0 0 50px rgba(249, 212, 64, 0.08)',
               padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
               position: 'relative', overflow: 'hidden'
             }}
          >
             {/* Scanning Light Sheen Effect */}
             <motion.div
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                  transform: 'skewX(-20deg)', pointerEvents: 'none', zIndex: 1
                }}
             />

             {/* Inner Spotlight Gradient for Depth */}
             <div style={{
               position: 'absolute', bottom: -50, right: -50, width: 250, height: 250,
               background: 'radial-gradient(circle, rgba(249, 212, 64, 0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1
             }} />

             {/* Geometric Globe/Compass Icon */}
             <div style={{ alignSelf: 'flex-end', position: 'relative', width: 80, height: 80, zIndex: 2 }}>
               {/* Rotating dashed ring */}
               <motion.div 
                 animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                 style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(249, 212, 64, 0.3)' }} 
               />
               {/* Pulsing inner glow */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,212,64,0.15) 0%, transparent 70%)' }} 
               />
               {/* Icon */}
               <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Globe2 size={38} strokeWidth={1} color="var(--accent-gold)" />
               </div>
             </div>

             <div style={{ position: 'relative', zIndex: 2 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }} />
                 <div style={{ color: 'var(--accent-gold)', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 800 }}>Exclusive Network</div>
               </div>
               
               <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', lineHeight: 1.05, marginBottom: 20 }}>
                 <span style={{ background: 'linear-gradient(90deg, #F9D440, #F2A65A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top 50</span><br/>
                 <span style={{ color: '#fff', fontStyle: 'italic' }}>Global</span><br/>
                 <span style={{ color: 'rgba(255,255,255,0.9)' }}>Universities</span>
               </div>
               
               <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, var(--accent-gold), transparent)', marginBottom: 25 }} />
               
               <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
                 Partnered with the world's most prestigious institutions to architect your global success.
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <div style={{ position: 'relative', background: 'linear-gradient(to right, rgba(2,2,5,1) 0%, rgba(12,18,30,0.8) 50%, rgba(2,2,5,1) 100%)', padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(249,212,64,0.03) 50%, transparent 100%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, textAlign: 'center' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 15px rgba(249,212,64,0.3))' }}
              style={{ cursor: 'default' }}
            >
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 800, lineHeight: 1, textShadow: '0 4px 20px rgba(249,212,64,0.2)' }}>
                {s.num}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 12, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CampusGallery() {
  return (
    <section style={{ padding: '120px 0', background: 'radial-gradient(ellipse at center, #0a1518 0%, #020205 80%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 10, marginBottom: 60, textAlign: 'center' }}>
        <h2 className="heading-section" style={{ marginBottom: 16 }}>
          The <span className="text-gradient">Campuses</span> Await
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
          Every campus has a story. Yours starts here.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 20, paddingInline: '5vw', overflow: 'hidden' }}>
        {CAMPUS_IMGS.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, zIndex: 10, boxShadow: '0 20px 40px rgba(249,212,64,0.25)', borderColor: 'rgba(249,212,64,0.5)' }}
            style={{
              flex: i === 0 ? 2 : 1,
              height: 420,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.1)',
              border: 'none',
              position: 'relative',
              transition: 'all 0.5s ease',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)', zIndex: 1, pointerEvents: 'none' }} />
            <img
              src={img}
              alt={`campus ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', filter: 'brightness(0.7)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,0.9) 0%, transparent 60%)', zIndex: 2 }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TimelineCard({ item, i, TOTAL_ROWS, ROW_HEIGHT, smoothProgress }) {
    const isLeft = i % 2 === 0;
    const nodeProgress = i / (TOTAL_ROWS - 1);
    
    // Fade and scale in intensely as plane passes
    const cardOpacity = useTransform(smoothProgress, 
      [Math.max(0, nodeProgress - 0.2), nodeProgress],
      [0, 1]
    );
    const cardScale = useTransform(smoothProgress, 
      [Math.max(0, nodeProgress - 0.2), nodeProgress],
      [0.85, 1]
    );
    const cardBorder = useTransform(smoothProgress,
      [Math.max(0, nodeProgress - 0.2), nodeProgress, Math.min(1, nodeProgress + 0.2)],
      ['rgba(255,255,255,0.02)', 'rgba(249,212,64,0.8)', 'rgba(255,255,255,0.1)']
    );
    const glowIntensity = useTransform(smoothProgress,
      [Math.max(0, nodeProgress - 0.2), nodeProgress, Math.min(1, nodeProgress + 0.2)],
      ['0 0 0px rgba(249,212,64,0)', '0 0 60px rgba(249,212,64,0.2)', '0 0 10px rgba(249,212,64,0.05)']
    );

    // Deep Parallax Logic
    const contentY = useTransform(smoothProgress, [0, 1], [50, -50]);

    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: ROW_HEIGHT,
          justifyContent: isLeft ? 'flex-start' : 'flex-end',
        }}
      >
        <motion.div
          style={{
            width: '45%',
            padding: '40px 50px',
            textAlign: isLeft ? 'right' : 'left',
            opacity: cardOpacity,
            scale: cardScale,
            borderColor: cardBorder,
            background: 'rgba(15, 17, 25, 0.95)',
            boxShadow: glowIntensity,
            borderRadius: '24px',
            position: 'relative',
          }}
        >
          {/* Subtle static gradient to replace the buggy spotlight */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at top right, rgba(249,212,64,0.1), transparent 60%)',
              pointerEvents: 'none',
              zIndex: 0,
              borderRadius: '24px'
            }}
          />

          <motion.div style={{ position: 'relative', zIndex: 1, y: contentY }}>
            <div style={{
              fontSize: '4.5rem', fontFamily: 'var(--font-serif)',
              color: 'var(--accent-gold)', opacity: 0.1,
              lineHeight: 1, marginBottom: -15, fontWeight: 900,
            }}>{item.year}</div>
            <h3 style={{
              fontSize: '1.8rem', color: '#fff',
              marginBottom: 12, fontFamily: 'var(--font-serif)',
            }}>{item.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>
              {item.desc}
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
}

function ZigZagTimeline() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.8'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const ROW_HEIGHT = 280;
  const TOTAL_ROWS = 4;
  
  // Gold line draws slightly ahead
  const lineFill = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  // Plane travels full length
  const planeY = useTransform(smoothProgress, [0, 1], [-50, ROW_HEIGHT * (TOTAL_ROWS - 1) + 150]);

  return (
    <section ref={timelineRef} style={{ position: 'relative', padding: '160px 0', background: '#020205', overflow: 'hidden' }}>
      
      {/* ── Intense Ambient Glows ── */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(125,193,177,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(252,113,51,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 140 }}
        >
          <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '15px', fontWeight: 800, fontSize: '0.9rem' }}>
            History
          </p>
          <h2 className="heading-section">
            Our <span className="text-gradient">Trajectory</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, fontSize: '1.2rem' }}>A journey built on results, not promises.</p>
        </motion.div>

        {/* Outer container — line is absolute inside here */}
        <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>

          {/* ── Background Track Line (Ultra subtle) ── */}
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 2,
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }} />

          {/* ── Animated Glowing Gold Line ── */}
          <motion.div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 4,
            transform: 'translateX(-50%)',
            transformOrigin: 'top',
            scaleY: lineFill,
            background: 'linear-gradient(to bottom, var(--accent-gold), #ffffff)',
            boxShadow: '0 0 40px rgba(249,212,64,0.8), 0 0 15px rgba(255,255,255,0.8)',
            pointerEvents: 'none',
          }} />

          {/* ── Continuous Electric Pulse ── */}
          <motion.div
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            style={{
                position: 'absolute',
                left: '50%',
                width: 6,
                height: 120,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
                boxShadow: '0 0 30px #ffffff, 0 0 60px var(--accent-gold)',
                borderRadius: 10,
                pointerEvents: 'none',
                zIndex: 5
            }}
          />

          {/* ── Airplane & Particle Trail ── */}
          <motion.div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            translateX: '-50%',
            y: planeY,
            zIndex: 20,
            pointerEvents: 'none',
          }}>
            {/* Massive Rocket Exhaust Particle Trail */}
            <div style={{
              position: 'absolute',
              top: '-120px', left: '50%', transform: 'translateX(-50%)',
              width: '8px', height: '120px',
              background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(249,212,64,0.8) 30%, rgba(252,113,51,0.5) 70%, transparent 100%)',
            }} />
            
            {/* The Plane */}
            <div style={{
              transform: 'rotate(135deg)',
              background: 'linear-gradient(135deg, rgba(20,20,25,1), rgba(5,5,10,1))',
              borderRadius: '50%',
              padding: '12px',
              border: '1px solid rgba(249,212,64,0.5)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.9), inset 0 0 20px rgba(249,212,64,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Plane size={32} color="#fff" strokeWidth={1.5} />
            </div>
            
            {/* Intense Halo */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(249,212,64,0.25)',
              pointerEvents: 'none',
            }} />
          </motion.div>

          {/* ── Timeline rows (Premium Glassmorphism) ── */}
          {TIMELINE.map((item, i) => (
            <TimelineCard 
                key={i} 
                item={item} 
                i={i} 
                TOTAL_ROWS={TOTAL_ROWS} 
                ROW_HEIGHT={ROW_HEIGHT} 
                smoothProgress={smoothProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}


function OurMission() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #020205 0%, #080f1e 100%)', padding: '150px 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background Orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '0%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(249,212,64,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '0%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(125,193,177,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', width: '100%' }}>
            
            {/* Clean, Massive Typography Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ marginBottom: '100px' }}
            >
                <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px', fontWeight: 800, fontSize: '1rem' }}>
                  The Vision
                </p>
                <h2 style={{ color: '#fff', fontSize: 'clamp(3.5rem, 6vw, 6rem)', fontFamily: 'var(--font-serif)', margin: '0 auto', maxWidth: '1000px', lineHeight: 1.1 }}>
                    Architects of <br/><span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Global Futures.</span>
                </h2>
            </motion.div>
            
            {/* Safe, Ultra-Premium CSS Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(249,212,64,0.1)' }}
                  style={{ background: 'rgba(15, 20, 35, 0.95)', padding: '60px 50px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', position: 'relative' }}
                >
                    <div style={{ fontSize: '3.5rem', marginBottom: '30px' }}>🎯</div>
                    <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Strategic Profiling</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>We don't just edit essays. We build multi-year strategies that transform applicants into undeniable assets for Ivy League admissions committees.</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(125,193,177,0.1)' }}
                  style={{ background: 'rgba(15, 20, 35, 0.95)', padding: '60px 50px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', position: 'relative' }}
                >
                    <div style={{ fontSize: '3.5rem', marginBottom: '30px' }}>🛂</div>
                    <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Visa Mastery</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>Led by former consular officers, our visa team boasts a 99% success rate, ensuring that administrative hurdles never block your academic journey.</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(214,122,67,0.1)' }}
                  style={{ background: 'rgba(15, 20, 35, 0.95)', padding: '60px 50px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', position: 'relative' }}
                >
                    <div style={{ fontSize: '3.5rem', marginBottom: '30px' }}>💰</div>
                    <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Scholarship Access</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>With over 25 Million USD secured in funding, we identify and aggressively pursue high-value merit scholarships and university-specific financial grants.</p>
                </motion.div>
            </div>
        </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div style={{ background: 'radial-gradient(ellipse at top, #0c1220 0%, #020205 70%)', position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <AboutNav />
      <ParallaxHero />
      <StatsBar />
      <CampusGallery />
      <ZigZagTimeline />
      <OurMission />
    </div>
  );
}