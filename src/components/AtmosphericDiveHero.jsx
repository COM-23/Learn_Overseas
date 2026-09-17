import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function AtmosphericDiveHero() {
  const containerRef = useRef(null);
  
  // Track the scroll over this massive 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress so the zoom feels fluid even if the user stops abruptly
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // ----------------------------------------------------
  // LAYER 1: OUTER SPACE / EARTH
  // ----------------------------------------------------
  // Starts at normal scale (1), zooms in massively (15) as if plummeting toward Earth.
  // Fades out between 30% and 40% of the scroll.
  const earthScale = useTransform(smooth, [0, 0.4], [1, 15]);
  const earthOpacity = useTransform(smooth, [0.3, 0.4], [1, 0]);

  // ----------------------------------------------------
  // LAYER 2: CLOUDS / ATMOSPHERE
  // ----------------------------------------------------
  // Fades in as Earth fades out (25% to 35%).
  // Zooms from scale 1 to 5, passing "through" the clouds.
  // Fades out between 60% and 70%.
  const cloudsScale = useTransform(smooth, [0.25, 0.7], [1, 5]);
  const cloudsOpacity = useTransform(smooth, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);

  // ----------------------------------------------------
  // LAYER 3: CITYSCAPE LANDING
  // ----------------------------------------------------
  // Fades in as clouds fade out (60% to 70%).
  // Starts slightly zoomed in (1.5) and settles perfectly to scale (1) at the end.
  const cityScale = useTransform(smooth, [0.6, 1], [1.5, 1]);
  const cityOpacity = useTransform(smooth, [0.6, 0.7], [0, 1]);

  // ----------------------------------------------------
  // TEXT & UI ELEMENTS
  // ----------------------------------------------------
  const textY = useTransform(smooth, [0, 1], [0, 50]);
  
  // High-Quality Imagery for Cinematic Panning
  const IMG_EARTH = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=90&w=2560';
  const IMG_CLOUDS = 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&q=90&w=2560';
  const IMG_CITY = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=90&w=2560';

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative', background: '#000' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        
        {/* Layer 1: Earth (Cinematic Pan & Scale) */}
        <motion.div style={{ position: 'absolute', inset: 0, scale: earthScale, opacity: earthOpacity, transformOrigin: '50% 50%' }}>
          <motion.div 
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ 
              width: '120%', height: '120%', left: '-10%', top: '-10%', position: 'absolute',
              backgroundImage: `url(${IMG_EARTH})`,
              backgroundSize: 'cover'
            }} 
          />
        </motion.div>

        {/* Layer 2: Clouds (Fast Drift) */}
        <motion.div style={{ position: 'absolute', inset: 0, scale: cloudsScale, opacity: cloudsOpacity, transformOrigin: '50% 50%' }}>
          <motion.div 
            animate={{ 
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              scale: [1.2, 1.3, 1.2]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ 
              width: '120%', height: '120%', left: '-10%', top: '-10%', position: 'absolute',
              backgroundImage: `url(${IMG_CLOUDS})`,
              backgroundSize: 'cover'
            }} 
          />
        </motion.div>

        {/* Layer 3: Cityscape (Slow drone pan) */}
        <motion.div style={{ position: 'absolute', inset: 0, scale: cityScale, opacity: cityOpacity, transformOrigin: '50% 50%' }}>
          <motion.div 
            animate={{ 
              backgroundPosition: ['50% 0%', '50% 100%', '50% 0%'],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            style={{ 
              width: '110%', height: '110%', left: '-5%', top: '-5%', position: 'absolute',
              backgroundImage: `url(${IMG_CITY})`,
              backgroundSize: 'cover'
            }} 
          />
        </motion.div>

        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,5,0.4)', pointerEvents: 'none' }} />

        {/* Foreground Content */}
        <motion.div 
          className="container"
          style={{ 
            position: 'relative', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            y: textY,
            zIndex: 10
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: 24 }}
          >
            A Global Perspective
          </motion.div>
          
          <motion.h1 
            className="heading-hero"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ margin: 0, fontSize: 'clamp(4rem, 10vw, 8rem)', color: '#fff', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            Learn <span style={{ fontStyle: 'italic' }}>Overseas</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="body-large"
            style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 600, marginTop: 24, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
          >
            We don't just open doors. We prepare you to walk through them. Scroll down to enter your future.
          </motion.p>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Scroll to dive</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent-gold), transparent)' }}
            />
          </motion.div>
        </motion.div>

        {/* Airplane Window Frame Overlay (Simulating looking out of a plane) */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
            opacity: useTransform(smooth, [0.1, 0.2, 0.55, 0.7], [0, 1, 1, 0]),
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
           {/* The Window Cutout shape */}
           <div style={{
             position: 'absolute', inset: 0,
             // The wall of the airplane is grey/white, the cutout is transparent. We can use a massive box-shadow to create the wall.
             boxShadow: 'inset 0 0 0 100vw #dcdde1, inset 0 0 100px 20px rgba(0,0,0,0.8)',
             borderRadius: '160px',
             width: '50vw', height: '70vh',
             margin: 'auto',
             border: '15px solid #a4b0be',
             transform: 'perspective(800px) rotateY(-10deg)', // Slight angle for realism
           }} />
           
           {/* Scratches/Reflection on the glass */}
           <div style={{
             position: 'absolute', width: '50vw', height: '70vh', margin: 'auto', borderRadius: '145px',
             background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
             transform: 'perspective(800px) rotateY(-10deg)',
           }} />
        </motion.div>

        {/* Mid-flight Text that appears while in the clouds */}
        <motion.div
          style={{
             position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%', zIndex: 11,
             opacity: useTransform(smooth, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]),
             color: '#fff', textAlign: 'center', pointerEvents: 'none',
             fontSize: 'clamp(3rem, 6vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 700,
             textShadow: '0 10px 40px rgba(0,0,0,0.9)'
          }}
        >
          The Journey <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Begins.</span>
        </motion.div>

      </div>
    </div>
  );
}
