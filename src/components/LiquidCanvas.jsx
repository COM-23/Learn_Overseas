import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function LiquidCanvas() {
  // Use MotionValues instead of React state for mouse tracking to eliminate re-renders on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // High performance mouse tracking that bypasses React render cycle
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: '#010205',
        pointerEvents: 'none',
        perspective: '1000px' // Add 3D perspective for glass panes
      }}
    >
      {/* --- AURORA GRADIENT BASE --- */}
      <motion.div
        animate={{ x: ['-20%', '30%', '-10%', '-20%'], y: ['-10%', '20%', '30%', '-10%'], scale: [1, 1.3, 0.9, 1], rotate: [0, 90, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '0%', left: '10%', width: '70vw', height: '70vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14, 42, 120, 0.5) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <motion.div
        animate={{ x: ['30%', '-25%', '10%', '30%'], y: ['30%', '-10%', '10%', '30%'], scale: [1, 0.8, 1.4, 1], rotate: [0, -90, -180, -360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '20%', right: '-10%', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(70, 15, 120, 0.5) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <motion.div
        animate={{ x: ['-15%', '25%', '-15%', '-15%'], y: ['10%', '25%', '-5%', '10%'], scale: [1, 1.5, 0.9, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '75vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(180, 120, 20, 0.25) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <motion.div
        animate={{ x: ['15%', '-30%', '15%', '15%'], y: ['-25%', '20%', '-15%', '-25%'], scale: [0.9, 1.4, 1, 0.9] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-15%', right: '15%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(10, 100, 120, 0.4) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <motion.div
        animate={{ x: ['-25%', '15%', '-20%', '-25%'], y: ['20%', '-25%', '10%', '20%'], scale: [1.1, 0.7, 1.2, 1.1] }}
        transition={{ duration: 29, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '40%', left: '30%', width: '45vw', height: '45vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(120, 10, 30, 0.35) 0%, rgba(0,0,0,0) 70%)' }}
      />

      {/* --- MOUSE SPOTLIGHT --- */}
      <motion.div
        style={{ position: 'absolute', top: 0, left: 0, width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(0,0,0,0) 60%)', x: useTransform(mouseX, x => x - (typeof window !== 'undefined' ? window.innerWidth * 0.2 : 0)), y: useTransform(mouseY, y => y - (typeof window !== 'undefined' ? window.innerHeight * 0.2 : 0)), zIndex: 5 }}
      />

      {/* --- FLOATING 3D GLASS PANES (Optimized for performance) --- */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ x: ['-10%', '10%', '-10%'], y: ['-10%', '10%', '-10%'], rotateX: [10, -20, 10], rotateY: [-15, 25, -15], rotateZ: [0, 45, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', left: '15%', width: '30vw', height: '40vw', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.0))', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px' }}
        />
        <motion.div
          animate={{ x: ['15%', '-5%', '15%'], y: ['15%', '-15%', '15%'], rotateX: [-25, 15, -25], rotateY: [20, -10, 20], rotateZ: [0, -30, 0] }}
          transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '15%', right: '10%', width: '40vw', height: '25vw', background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.0))', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px' }}
        />
        <motion.div
          animate={{ x: ['0%', '10%', '0%'], y: ['20%', '-5%', '20%'], rotateX: [5, 25, 5], rotateY: [-10, -30, -10], rotateZ: [-15, 10, -15] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '35%', left: '45%', width: '20vw', height: '20vw', background: 'linear-gradient(135deg, rgba(249, 212, 64, 0.02), rgba(255,255,255,0.0))', border: '1px solid rgba(249, 212, 64, 0.1)', borderRadius: '50%' }}
        />
      </div>

      {/* --- PHYSICAL FILM GRAIN (Optimized) --- */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, backgroundImage: 'url("/noise.png")', opacity: 0.03, pointerEvents: 'none' }} />

      {/* --- HEAVY VIGNETTE --- */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 11, background: 'radial-gradient(circle at center, transparent 20%, rgba(1,2,5,0.9) 110%)', pointerEvents: 'none' }} />
    </div>
  );
}
