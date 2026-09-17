import React, { useRef } from 'react';
import VisionSection from '../components/VisionSection';
import VisionExtendedContent from '../components/VisionExtendedContent';
import AboutNav from '../components/AboutNav';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiquidCanvas from '../components/LiquidCanvas';

export default function OurVision() {
  const containerRef = useRef(null);
  
  // Track scroll progress for the exploding typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Scale the text up massively as you scroll down
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  // Fade out as it flies past the camera
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  // Add extreme blur as it scales up
  const blur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(30px)']);
  
  // Paragraph fades out faster
  const pOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const pY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  return (
    <div style={{ background: 'radial-gradient(ellipse at top, #080c14 0%, #020205 70%)', minHeight: '100vh', position: 'relative', overflowX: 'clip' }}>
      
      {/* Add LiquidCanvas so the background is lively and premium instead of empty */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.8 }}>
        <LiquidCanvas />
      </div>

      {/* Cinematic Ambient Glows */}
      <div style={{ position: 'fixed', top: '-20%', left: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'fixed', top: '10%', right: '-30%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      
      {/* Subtle Grid Overlay */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', maskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)', zIndex: 1 }} />
      
      <div style={{ position: 'relative', zIndex: 20 }}>
        <AboutNav />
      </div>
      
      {/* Exploding Typography Container */}
      <div ref={containerRef} style={{ position: 'relative', height: '150vh', zIndex: 10 }}>
        {/* Sticky section keeps the text in viewport while scaling */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', padding: '0 5vw' }}>
            <motion.div
              style={{ 
                scale, 
                opacity,
                transformOrigin: 'center center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <h1 style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', fontFamily: 'var(--font-serif)', margin: 0, color: '#fff', letterSpacing: 2, lineHeight: 1, textShadow: '0 20px 60px rgba(0,0,0,0.8)', textAlign: 'center' }}>
                <span style={{ display: 'inline-block' }}>OUR</span>{' '}
                <span style={{ display: 'inline-block', background: 'linear-gradient(to right, var(--accent-gold), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>VISION</span>
              </h1>
            </motion.div>
            
            <motion.p 
              style={{ 
                opacity: pOpacity,
                y: pY,
                maxWidth: '850px', 
                margin: '40px auto 0', 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '1.4rem', 
                lineHeight: 1.8, 
                fontWeight: 300,
                textAlign: 'center'
              }}>
              Our mission is to obliterate borders and redefine human potential. We look beyond academic excellence, focusing on cultivating extraordinary leaders who will innovate, inspire, and shape the global future.
            </motion.p>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 20, background: '#020205' }}>
        <VisionSection />
        <VisionExtendedContent />
      </div>
    </div>
  );
}
