import React, { useRef, useState, Suspense, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import './Home.css';
import StudentSuccessWall from '../components/StudentSuccessWall';
import MagneticButton from '../components/MagneticButton';
import InfiniteMarquee from '../components/InfiniteMarquee';
import JourneyBackground from '../components/JourneyBackground';
import GlobeScene from '../components/GlobeScene';
import GraduationScene from '../components/GraduationScene';
import GoogleReviews from '../components/GoogleReviews';
import ContactForm from '../components/ContactForm';


const TiltCard = ({ children, className, style, innerStyle }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        pointerEvents: 'auto',
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", width: '100%', height: '100%', ...innerStyle }}>
        {children}
      </div>
    </motion.div>
  );
};
export default function Home() {
  const containerRef = useRef(null);
  const finalJourneyRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scrollYProgress = useMotionValue(0);
  const journeyScroll = useMotionValue(0);

  React.useEffect(() => {
    let ticking = false;
    
    // Cached dimensions
    let containerPageTop = 0;
    let containerHeight = 0;
    let journeyPageTop = 0;
    let journeyHeight = 0;
    let windowHeight = window.innerHeight;

    const cacheDimensions = () => {
      if (!containerRef.current || !finalJourneyRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      containerPageTop = cRect.top + window.scrollY;
      containerHeight = cRect.height;

      const jRect = finalJourneyRef.current.getBoundingClientRect();
      journeyPageTop = jRect.top + window.scrollY;
      journeyHeight = jRect.height;
      
      windowHeight = window.innerHeight;
      updateScroll();
    };

    const updateScroll = () => {
      const scrollY = window.scrollY;
      
      // 1. Home container (400vh) progress
      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable > 0) {
        let progress = (scrollY - containerPageTop) / totalScrollable;
        scrollYProgress.set(Math.max(0, Math.min(1, progress)));
      }

      // 2. Journey container progress
      const journeyScrollable = journeyHeight - windowHeight;
      if (journeyScrollable > 0) {
        let jProgress = (scrollY - journeyPageTop) / journeyScrollable;
        journeyScroll.set(Math.max(0, Math.min(1, jProgress)));
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    
    // Initial cache and set
    cacheDimensions();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', cacheDimensions, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cacheDimensions);
    };
  }, [scrollYProgress, journeyScroll]);



  // 1. First Text (Learn OVERSEAS)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // Globe Badges Animation to Center
  const badgeLeftX = useTransform(scrollYProgress, [0, 0.25], ['0vw', '15vw']);
  const badgeRightX = useTransform(scrollYProgress, [0, 0.25], ['0vw', '-15vw']);
  const badgeY = useTransform(scrollYProgress, [0, 0.25], ['0vh', '-10vh']);
  const text1Y = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  // REMOVED: text1Display toggle — caused overlap flash. Opacity alone handles visibility.

  // Metrics (Highlighters)
  const metricOpacity = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [0, 1, 1, 0]);
  const metricY = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [50, 0, 0, -50]);
  const metricScale = useTransform(scrollYProgress, [0.10, 0.25], [0.9, 1]);

  // 2. Second Text (Study Anywhere)
  const text2Opacity = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.10, 0.25, 0.40, 0.55], [50, 0, 0, -50]);
  // REMOVED: text2Display toggle — caused overlap flash. Opacity alone handles visibility.

  // 3. Cinematic Typographic HUD (Engineer Your Acceptance)
  const hudOpacity = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [0, 1, 1, 0]);
  const hudY = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [50, 0, 0, -50]);
  const hudScale = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [0.95, 1, 1, 1.05]);
  // REMOVED: hudDisplay toggle — caused overlap flash. Opacity alone handles visibility.
  
  // Parallax Offsets for HUD Cards
  const hudCard1Y = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [100, 0, 0, -100]);
  const hudCard2Y = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [180, 0, 0, -180]);
  const hudCard3Y = useTransform(scrollYProgress, [0.45, 0.60, 0.85, 0.95], [260, 0, 0, -260]);

  // 4. Earth Zoom — gentle zoom-in over a wide range so it never looks jarring
  const earthScale = useTransform(scrollYProgress, [0.75, 1.0], [1, 1.7]);
  // Earth stays visible while the HUD is up, then fades out as the Gateway portal appears
  const earthExitOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

  // 5. Gateway portal — fades in softly, no aggressive scale punch
  const gatewayOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1]);
  const gatewayScale = useTransform(scrollYProgress, [0.88, 1.0], [0.92, 1.3]);

  // 6. Full scene container: fades out smoothly after earth is already gone
  const sceneOpacity = useTransform(scrollYProgress, [0.94, 1.0], [1, 0]);

  // 7. Pointer Events Disabler
  // The react-globe.gl captures the mouse wheel. When it fades out, we MUST disable its pointer events
  // so the user's mouse wheel actually scrolls the page instead of zooming the invisible globe!
  const globePointerEvents = useTransform(scrollYProgress, (v) => v > 0.75 ? 'none' : 'auto');
  const scenePointerEvents = useTransform(scrollYProgress, (v) => v > 0.94 ? 'none' : 'auto');

  // 8. GPU Memory Saver
  const sceneDisplay = useTransform(scrollYProgress, (v) => v >= 0.999 ? 'none' : 'block');

  // 8. CTA section background opacity
  const ctaBgOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div style={{ color: 'var(--text-primary)', position: 'relative' }}>

      {/* Lightweight Noise Grain Overlay Removed for Performance */}

      {/* Global Interactive Spotlight Removed for Performance */}

      {/* Unified Hero Container (400vh for cinematic scroll pacing) */}
      <div ref={containerRef} className="home-hero-container" style={{ position: 'relative', width: '100%', height: '400vh', zIndex: 10 }}>

        {/* Sticky wrapper stays fixed while the user scrolls through the 300vh. */}
        <motion.div className="home-hero-sticky" style={{
          position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden',
          background: 'radial-gradient(ellipse at top, #0c1220 0%, #020205 70%)',
          opacity: sceneOpacity,
          pointerEvents: scenePointerEvents,
          transform: 'translateZ(0)',
          willChange: 'opacity'
        }}>

          {/* Bottom vignette — bleeds the globe scene into the black sections below */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(2,2,5,0.6) 60%, #020205 100%)',
            zIndex: 30, pointerEvents: 'none'
          }} />

          {/* Liquid Canvas removed for performance */}

          {/* 0. The Interactive Globe Scene — no blur filter (too expensive on scroll) */}
          <motion.div className="home-globe-wrapper" style={{
            position: 'absolute', inset: 0, zIndex: 1,
            opacity: earthExitOpacity,
            scale: earthScale,
            pointerEvents: globePointerEvents,
            willChange: 'opacity, transform'
          }}>
            <GlobeScene />
          </motion.div>

          {/* 1. First Text (Learn OVERSEAS) - Upgraded Cinematic Typography */}
          <motion.div className="hero-ui container" style={{
            position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none',
            opacity: text1Opacity, y: text1Y, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }} 
              transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
              style={{ position: 'absolute', top: '10%', left: '30%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(249,212,64,0.15) 0%, rgba(180,120,60,0.05) 40%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }} 
              transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
              style={{ position: 'absolute', top: '30%', right: '20%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(125,193,177,0.1) 0%, rgba(0,0,0,0) 60%)', pointerEvents: 'none', zIndex: -1 }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.8 }}
              className="home-hero-corner-badge"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249,212,64,0.4)', borderColor: 'rgba(249,212,64,0.8)' }}
              style={{ x: badgeLeftX, y: badgeY, position: 'absolute', bottom: '25%', left: '5%', background: 'linear-gradient(135deg, rgba(20,24,30,0.95) 0%, rgba(5,8,12,0.95) 100%)', border: '1px solid rgba(255,255,255,0.15)', padding: '16px 32px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 2px 15px rgba(255,255,255,0.05)', zIndex: 20, cursor: 'pointer', transition: 'box-shadow 0.3s, border-color 0.3s' }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 400, lineHeight: 1 }}>3M+</span>
              <span style={{ fontSize: '0.9rem', letterSpacing: 2, color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', textShadow: '0 0 10px rgba(249,212,64,0.4)' }}>Scholarships</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 1 }}
              className="home-hero-corner-badge"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(125,193,177,0.4)', borderColor: 'rgba(125,193,177,0.8)' }}
              style={{ x: badgeRightX, y: badgeY, position: 'absolute', bottom: '25%', right: '5%', background: 'linear-gradient(135deg, rgba(20,24,30,0.95) 0%, rgba(5,8,12,0.95) 100%)', border: '1px solid rgba(255,255,255,0.15)', padding: '16px 32px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 2px 15px rgba(255,255,255,0.05)', zIndex: 20, cursor: 'pointer', transition: 'box-shadow 0.3s, border-color 0.3s' }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 400, lineHeight: 1 }}>99%</span>
              <span style={{ fontSize: '0.9rem', letterSpacing: 2, color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', textShadow: '0 0 10px rgba(125,193,177,0.4)' }}>Visa Success</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, willChange: 'transform, opacity', zIndex: 20 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(249,212,64,0.5)', borderColor: 'var(--accent-gold)' }}
                style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 800, background: 'linear-gradient(180deg, rgba(20,24,30,0.95) 0%, rgba(5,8,12,0.95) 100%)', padding: '12px 28px', borderRadius: '100px', border: '1px solid rgba(249,212,64,0.5)', boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 2px 10px rgba(249,212,64,0.1)', display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                A Global Perspective
              </motion.div>
            </motion.div>

            <motion.div
              className="heading-hero"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', willChange: 'transform, opacity' }}
            >
              <div style={{ position: 'absolute', inset: -100, background: 'radial-gradient(ellipse at center, rgba(249,212,64,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
              
              <div style={{ overflow: 'hidden' }}>
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'block', fontSize: 'clamp(4rem, 9vw, 9rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, fontFamily: 'var(--font-sans)', color: '#ffffff', textShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 100px rgba(255,255,255,0.2)' }}>
                  Learn
                </motion.span>
              </div>
              
              <div style={{ overflow: 'hidden', marginTop: '8px' }}>
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'block', fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 0.9, fontFamily: 'var(--font-sans)', background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-gold) 20%, #ff8c00 70%, var(--accent-copper) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  OVERSEAS
                </motion.span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
              className="body-large"
              style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 650, marginTop: 32, fontSize: '1.25rem', lineHeight: 1.7, textShadow: '0 4px 15px rgba(0,0,0,0.9)' }}
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
          <motion.div className="hero-text-2" style={{
            position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none',
            opacity: text2Opacity, y: text2Y, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
              <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', letterSpacing: '0.8em', textTransform: 'uppercase', color: 'var(--accent-gold)', margin: 0, fontWeight: 800, textShadow: '0 0 20px rgba(249,212,64,0.5)' }}>Global Network</p>
              <div style={{ width: '60px', height: '1px', background: 'linear-gradient(-90deg, transparent, var(--accent-gold))' }} />
            </div>

            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 'clamp(4.5rem, 9vw, 9rem)', lineHeight: 1.1, paddingTop: '0.1em', color: '#fff', marginBottom: '24px', textShadow: '0 20px 60px rgba(0,0,0,0.9)' }}>
              Study<br />
              <span style={{ color: 'var(--accent-blue)', fontStyle: 'italic', background: 'linear-gradient(90deg, #fff 0%, var(--accent-blue) 50%, #4CAF50 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Anywhere.</span>
            </h1>

            <p className="study-anywhere-desc" style={{ fontFamily: "var(--font-sans)", fontSize: '1.3rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', maxWidth: '550px', marginBottom: '60px', fontWeight: 300, textShadow: '0 4px 15px rgba(0,0,0,0.9)', background: 'rgba(4,4,8,0.92)', padding: '20px 30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              Interact with the globe to explore our partner universities and live tuition estimates across the world.
            </p>
          </motion.div>

          {/* 3. Metrics Cards (Appear as text2 fades) */}
          <motion.div className="metric-card-wrapper left" style={{ position: 'absolute', top: '15%', left: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <TiltCard innerStyle={{ display: 'flex' }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(125,193,177,0.3)', borderColor: 'rgba(125,193,177,0.8)' }} className="metric-card" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                <span className="metric-value" style={{ background: 'linear-gradient(135deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>99%</span>
                <span className="metric-label blue" style={{ letterSpacing: 2, fontWeight: 700 }}>Visa Success</span>
              </motion.div>
            </TiltCard>
          </motion.div>
          <motion.div className="metric-card-wrapper right" style={{ position: 'absolute', top: '12%', right: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <TiltCard innerStyle={{ display: 'flex' }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(249,212,64,0.3)', borderColor: 'rgba(249,212,64,0.8)' }} className="metric-card" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(249,212,64,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(249,212,64,0.06)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                <span className="metric-value" style={{ color: 'var(--accent-gold)' }}>200+</span>
                <span className="metric-label gold" style={{ letterSpacing: 2, fontWeight: 700 }}>Universities</span>
              </motion.div>
            </TiltCard>
          </motion.div>
          <motion.div className="metric-card-wrapper bottom-left" style={{ position: 'absolute', bottom: '22%', left: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <TiltCard innerStyle={{ display: 'flex' }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(180,120,60,0.4)', borderColor: 'rgba(180,120,60,0.8)' }} className="metric-card copper" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(180,120,60,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(180,120,60,0.06)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                <span className="metric-value" style={{ color: 'var(--accent-copper)' }}>$10M+</span>
                <span className="metric-label copper" style={{ letterSpacing: 2, fontWeight: 700 }}>Scholarships</span>
              </motion.div>
            </TiltCard>
          </motion.div>
          <motion.div className="metric-card-wrapper bottom-right" style={{ position: 'absolute', bottom: '15%', right: '5%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY, scale: metricScale, willChange: 'transform, opacity', WebkitTransform: 'translateZ(0)' }}>
            <TiltCard innerStyle={{ display: 'flex' }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)' }} className="metrics-stats-bar" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
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
                  <div className="stat-label">Programs</div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* 3. Cinematic Typographic HUD (Proper Section Transition) */}
          <motion.div className="hero-hud" style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hudOpacity, y: hudY, scale: hudScale,
            willChange: 'transform, opacity'
          }}>
            <div className="hud-outer" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2vh',
              padding: '20px 4vw',
            }}>
              <div className="hud-pills-row" style={{ display: 'flex', gap: 12, marginBottom: '1vh', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="hud-pill" style={{ display: 'inline-flex', border: '1px solid rgba(249,212,64,0.5)', padding: '8px 16px', borderRadius: '100px', color: '#000', background: 'var(--accent-gold)', letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, boxShadow: '0 10px 30px rgba(249,212,64,0.3)', alignItems: 'center', gap: 8 }}>
                  Top 1% Global Placements
                </div>
                <div className="hud-pill" style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.12)', padding: '8px 16px', borderRadius: '100px', color: 'rgba(255,255,255,0.8)', background: 'rgba(8,8,12,0.9)', letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%', boxShadow: '0 0 10px #4CAF50' }} /> ACCEPTING 2025 COHORT
                </div>
                <div className="hud-pill" style={{ display: 'inline-flex', border: '1px solid rgba(249,212,64,0.3)', padding: '8px 16px', borderRadius: '100px', color: 'var(--accent-gold)', background: 'rgba(8,8,12,0.9)', letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>Ivy League</span> Specialization
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', color: '#fff', margin: 0, fontWeight: 400, lineHeight: 1.05, textShadow: '0 30px 60px rgba(0,0,0,0.9)' }}>
                Engineer Your <br />
                <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)', background: 'linear-gradient(90deg, #fff 0%, var(--accent-gold) 40%, var(--accent-copper) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Acceptance.</span>
              </h2>

              <div className="hud-stat-cards" style={{ display: 'flex', gap: '3vw', marginTop: '3vh', flexWrap: 'wrap', justifyContent: 'center' }}>
                <TiltCard innerStyle={{ display: 'flex', height: '100%' }}>
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(255,255,255,0.2), inset 0 2px 10px rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)' }}
                    className="hud-stat-card" style={{ y: hudCard1Y, willChange: 'transform', background: 'linear-gradient(180deg, rgba(10,14,20,0.8) 0%, rgba(5,8,12,0.8) 100%)', border: '1px solid rgba(255,255,255,0.1)', padding: '30px 45px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 2px 10px rgba(255,255,255,0.05)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                    <div className="hud-stat-value" style={{ fontSize: 'clamp(3rem, 4.5vw, 4rem)', fontFamily: 'var(--font-serif)', color: '#fff', textShadow: '0 10px 20px rgba(0,0,0,0.5)', lineHeight: 1 }}>98.7%</div>
                    <div className="hud-stat-label" style={{ fontSize: '0.9rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: '12px', fontWeight: 800 }}>Placement Rate</div>
                  </motion.div>
                </TiltCard>
                <TiltCard innerStyle={{ display: 'flex', height: '100%' }}>
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(249,212,64,0.3), inset 0 0 30px rgba(249,212,64,0.2)', borderColor: 'rgba(249,212,64,0.8)' }}
                    className="hud-stat-card" style={{ y: hudCard2Y, willChange: 'transform', background: 'linear-gradient(180deg, rgba(10,14,20,0.8) 0%, rgba(5,8,12,0.8) 100%)', border: '1px solid rgba(249,212,64,0.3)', padding: '30px 45px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 20px rgba(249,212,64,0.1)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                    <div className="hud-stat-value" style={{ fontSize: 'clamp(3rem, 4.5vw, 4rem)', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', textShadow: '0 10px 20px rgba(0,0,0,0.5)', lineHeight: 1 }}>$24M+</div>
                    <div className="hud-stat-label" style={{ fontSize: '0.9rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: '12px', fontWeight: 800 }}>Scholarships Secured</div>
                  </motion.div>
                </TiltCard>
                <TiltCard innerStyle={{ display: 'flex', height: '100%' }}>
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(125,193,177,0.3), inset 0 0 30px rgba(125,193,177,0.2)', borderColor: 'rgba(125,193,177,0.8)' }}
                    className="hud-stat-card" style={{ y: hudCard3Y, willChange: 'transform', background: 'linear-gradient(180deg, rgba(10,14,20,0.8) 0%, rgba(5,8,12,0.8) 100%)', border: '1px solid rgba(125,193,177,0.3)', padding: '30px 45px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 20px rgba(125,193,177,0.1)', transition: 'box-shadow 0.3s, border-color 0.3s' }}>
                    <div className="hud-stat-value" style={{ fontSize: 'clamp(3rem, 4.5vw, 4rem)', fontFamily: 'var(--font-serif)', color: 'var(--accent-blue)', textShadow: '0 10px 20px rgba(0,0,0,0.5)', lineHeight: 1 }}>200+</div>
                    <div className="hud-stat-label" style={{ fontSize: '0.9rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: '12px', fontWeight: 800 }}>Global Partners</div>
                  </motion.div>
                </TiltCard>
              </div>

              <div className="hud-description-row" style={{ display: 'flex', gap: '30px', maxWidth: '1000px', marginTop: '2vh', textAlign: 'left', background: 'rgba(10,10,18,0.95)', padding: '25px 35px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="hud-description-col" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, flex: 1, margin: 0, textShadow: '0 5px 15px rgba(0,0,0,0.5)', borderLeft: '3px solid var(--accent-gold)', paddingLeft: '20px' }}>
                  Our bespoke strategy transforms your unique potential into an undeniable candidate profile. We don't just submit applications—we architect your entire trajectory to ensure you secure a position at the world's most elite institutions.
                </p>
                <p className="hud-description-col" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, flex: 1, margin: 0, textShadow: '0 5px 15px rgba(0,0,0,0.5)', borderLeft: '3px solid var(--accent-blue)', paddingLeft: '20px' }}>
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
      <div className="final-journey-wrapper" ref={finalJourneyRef} style={{ position: 'relative', zIndex: 1, marginTop: '-100vh', background: 'transparent' }}>
        
        {/* The continuous sticky animated background */}
        <JourneyBackground scrollYProgress={journeyScroll} />

        {/* ── Content layers scrolling normally over the background ── */}
        
        {/* ACT II: Marquee + Success Wall */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Gradient bridge removed as requested */}

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

        {/* Removed ACT III.5 based on user request */}

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

          {/* Floating Ambient Orbs - Animated */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(180,150,255,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ position: 'absolute', bottom: '10%', right: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(249,212,64,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} 
          />

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
              padding: '60px 60px',
              perspective: 1000,
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
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

            {/* ── AWWWARDS-LEVEL CONTACT SECTION ── */}
            <motion.div
              id="contact-section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              style={{
                width: '100%', maxWidth: 1400,
                marginTop: 80, position: 'relative',
              }}
            >
              {/* ══ SPLIT LAYOUT: Left editorial / Right form ══ */}
              <div className="home-stats-grid" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                minHeight: 720,
              }}>

                {/* ══ LEFT: Full-bleed dark gradient editorial ══ */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'relative', overflow: 'hidden',
                    background: '#020207',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '80px 50px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}
                >
                  {/* Animated radial color blobs */}
                  <div style={{ position: 'absolute', top: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(125,193,177,0.18) 0%, transparent 70%)', animation: 'drift1 8s ease-in-out infinite' }} />
                  <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,212,64,0.12) 0%, transparent 70%)', animation: 'drift2 10s ease-in-out infinite' }} />
                  <div style={{ position: 'absolute', top: '40%', right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,123,57,0.1) 0%, transparent 70%)', animation: 'drift1 12s ease-in-out infinite reverse' }} />

                  {/* Crosshair grid overlay */}
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(249,212,64,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,212,64,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

                  {/* Top section */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
                      <div style={{ width: 40, height: 1, background: 'rgba(249,212,64,0.5)' }} />
                      <span style={{ fontSize: '0.6rem', letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(249,212,64,0.7)', fontWeight: 800 }}>Free Consultation</span>
                    </div>

                    {/* Mega typographic headline */}
                    <h2 style={{
                      fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                      fontFamily: 'var(--font-serif)', color: '#fff',
                      fontWeight: 300, lineHeight: 1.05, margin: '0 0 32px',
                      letterSpacing: '-0.03em',
                    }}>
                      Your story<br />
                      starts with<br />
                      <em style={{ fontStyle: 'italic', WebkitTextStroke: '1px #F9D440', color: 'transparent', display: 'block' }}>one call.</em>
                    </h2>

                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 340, margin: 0 }}>
                      Join 450+ students who transformed their future with our personalized guidance across 12 countries.
                    </p>
                  </div>

                  {/* Bottom: stacked review quotes */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    {[
                      { name: 'Rohan S.', uni: 'Oxford, UK', text: '"Got into my dream university — life changed."', color: '#7DC1B1' },
                      { name: 'Priya D.', uni: 'NUS Singapore', text: '"100% visa success. Best decision I ever made."', color: '#F9D440' },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                        style={{
                          marginTop: 24, paddingTop: 24,
                          borderTop: '1px solid rgba(255,255,255,0.07)',
                          display: 'flex', gap: 16, alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${r.color}50, ${r.color}20)`, border: `1.5px solid ${r.color}70`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: r.color, flexShrink: 0 }}>{r.name[0]}</div>
                        <div>
                          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 6 }}>{r.text}</div>
                          <div style={{ fontSize: '0.65rem', letterSpacing: 3, textTransform: 'uppercase', color: r.color, fontWeight: 700 }}>{r.name} · {r.uni}</div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Stars rating */}
                    <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '1.1rem', color: '#F9D440', letterSpacing: 2 }}>★★★★★</span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>450+ Google Reviews · 5.0 Rating</span>
                    </div>
                  </div>
                </motion.div>

                {/* ══ RIGHT: Integrated Organic Form ══ */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(5, 5, 8, 0.85)',
                    borderRadius: '24px',
                    padding: '50px 60px',
                    position: 'relative',
                  }}
                >
                  <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.4rem', color: '#fff', margin: '0 0 10px 0', fontFamily: 'var(--font-serif)', fontWeight: 500, letterSpacing: -0.5 }}>Start Your Journey</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '1.1rem', letterSpacing: 1 }}>Your future awaits. Let's build it together.</p>
                  </div>

                  {isSubmitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ width: 100, height: 100, margin: '0 auto 24px', borderRadius: '50%', border: '4px solid #7DC1B1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(125, 193, 177, 0.1)', boxShadow: '0 0 30px rgba(125, 193, 177, 0.2)' }}>
                          <span style={{ fontSize: '3rem', color: '#7DC1B1' }}>✓</span>
                        </div>
                        <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: 12, fontFamily: 'var(--font-serif)' }}>Application Received</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Our elite advisory team will contact you shortly.</p>
                      </motion.div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 35, width: '100%' }}>
                      <style>{`
                        .lux-input-group { position: relative; width: 100%; }
                        .lux-input {
                          width: 100%;
                          background: transparent;
                          border: none;
                          border-bottom: 1px solid var(--accent-gold);
                          color: #fff;
                          font-size: 1.1rem;
                          padding: 10px 0;
                          font-family: var(--font-sans);
                          outline: none;
                          transition: all 0.3s ease;
                          border-radius: 0;
                        }
                        .lux-input:focus {
                          box-shadow: 0 10px 10px -10px rgba(249, 115, 22, 0.2);
                        }
                        .lux-label {
                          position: absolute;
                          left: 0;
                          top: 10px;
                          color: var(--accent-gold);
                          font-size: 1.1rem;
                          pointer-events: none;
                          transition: all 0.3s ease;
                          font-family: var(--font-serif);
                        }
                        .lux-input:focus ~ .lux-label,
                        .lux-input:not(:placeholder-shown) ~ .lux-label,
                        .lux-select:valid ~ .lux-label {
                          top: -15px;
                          font-size: 0.8rem;
                          color: var(--accent-gold);
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-family: var(--font-sans);
                        }
                        .lux-select { appearance: none; cursor: pointer; }
                        .lux-select option { background: #0A0A0C; color: #fff; }
                        .lux-select-icon {
                           position: absolute; right: 0; top: 15px;
                           color: rgba(255,255,255,0.3); pointer-events: none; transition: color 0.3s;
                           font-size: 10px;
                        }
                        .lux-input-group:focus-within .lux-select-icon { color: var(--accent-gold); }
                      `}</style>

                      <div className="home-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        <div className="lux-input-group">
                          <input type="text" id="lfname" className="lux-input" placeholder=" " required />
                          <label htmlFor="lfname" className="lux-label">Full Name</label>
                        </div>
                        <div className="lux-input-group">
                          <input type="email" id="lfemail" className="lux-input" placeholder=" " required />
                          <label htmlFor="lfemail" className="lux-label">Email Address</label>
                        </div>
                      </div>

                      <div className="home-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        <div className="lux-input-group">
                          <input type="tel" id="lfphone" className="lux-input" placeholder=" " required />
                          <label htmlFor="lfphone" className="lux-label">Phone Number</label>
                        </div>
                        <div className="lux-input-group">
                          <select required defaultValue="" id="lfcountry" className="lux-input lux-select">
                            <option value="" disabled hidden></option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                            <option value="DE">Germany</option>
                            <option value="SG">Singapore</option>
                            <option value="FR">France</option>
                            <option value="PL">Poland</option>
                          </select>
                          <label htmlFor="lfcountry" className="lux-label">Destination Country</label>
                          <div className="lux-select-icon">▼</div>
                        </div>
                      </div>

                      <div className="home-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        <div className="lux-input-group">
                          <select required defaultValue="" id="lfservice" className="lux-input lux-select">
                            <option value="" disabled hidden></option>
                            <option value="Initial Counselling">Initial Counselling</option>
                            <option value="Visa Assistance">Visa Assistance</option>
                            <option value="Scholarship & Financial Assistance">Scholarship & Financial Assistance</option>
                            <option value="Education Loan Assistance">Education Loan Assistance</option>
                            <option value="Coaching Support">Coaching Support</option>
                            <option value="Accommodation Support">Accommodation Support</option>
                          </select>
                          <label htmlFor="lfservice" className="lux-label">Service</label>
                          <div className="lux-select-icon">▼</div>
                        </div>
                        <div className="lux-input-group">
                          <select required defaultValue="" id="lfintake" className="lux-input lux-select">
                            <option value="" disabled hidden></option>
                            <option value="Fall">Fall (Aug/Sep)</option>
                            <option value="Spring">Spring (Jan/Feb)</option>
                            <option value="Summer">Summer (May/Jun)</option>
                          </select>
                          <label htmlFor="lfintake" className="lux-label">Intake</label>
                          <div className="lux-select-icon">▼</div>
                        </div>
                      </div>

                      <div className="lux-input-group">
                        <select required defaultValue="" id="lfdegree" className="lux-input lux-select">
                          <option value="" disabled hidden></option>
                          <option value="High School">High School / Diploma</option>
                          <option value="Bachelors">Bachelors (UG)</option>
                          <option value="Masters">Masters (PG)</option>
                          <option value="MBA">MBA</option>
                          <option value="PhD">PhD / Doctorate</option>
                        </select>
                        <label htmlFor="lfdegree" className="lux-label">Degree Objective</label>
                        <div className="lux-select-icon">▼</div>
                      </div>

                      <div className="lux-input-group">
                        <textarea required id="lfmsg" placeholder=" " rows={2} className="lux-input" style={{ resize: 'none' }}></textarea>
                        <label htmlFor="lfmsg" className="lux-label">Your Message</label>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(249,115,22,0.6)' }} 
                        whileTap={{ scale: 0.98 }} 
                        style={{ 
                          marginTop: 30, width: '100%', 
                          background: 'linear-gradient(90deg, #f97316, #ea580c, #f97316)',
                          backgroundSize: '200% auto',
                          border: 'none', 
                          color: '#fff', padding: '22px 0', borderRadius: 12, 
                          fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, 
                          cursor: 'pointer', transition: 'all 0.3s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                          boxShadow: '0 15px 30px rgba(249,115,22,0.3)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = 'right center'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundPosition = 'left center'; }}
                      >
                         <span>Start Your Journey</span>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              </div>

              {/* Keyframe animations for blobs */}
              <style>{`
                @keyframes drift1 { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px, -20px) scale(1.05); } 66% { transform: translate(-15px, 25px) scale(0.97); } }
                @keyframes drift2 { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-25px, 15px) scale(1.08); } 66% { transform: translate(20px, -30px) scale(0.96); } }
                @keyframes btnShimmer {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(400%); }
                }
              `}</style>
            </motion.div>          </motion.div>
        </div>
      </div>
    </div>
  );
}

