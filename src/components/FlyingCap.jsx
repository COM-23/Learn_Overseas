import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function FlyingCap({ targetRef }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // As user scrolls through the specific section, cap flies UP and rotates
  const y = useTransform(smooth, [0, 1], ['100vh', '-100vh']);
  const rotate = useTransform(smooth, [0, 1], [-20, 720]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.5, 1.5, 0.8]);
  const x = useTransform(smooth, [0, 0.5, 1], ['-20vw', '10vw', '-10vw']);
  const opacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      style={{ 
        position: 'fixed', 
        top: 0, left: '50%', 
        y, rotate, scale, x, opacity,
        zIndex: 9999, 
        pointerEvents: 'none',
        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
      }}
    >
      {/* Majestic Golden/Black Graduation Cap SVG */}
      <svg width="150" height="150" viewBox="0 0 200 200" fill="none">
        {/* Tassel String */}
        <path d="M100 80 Q 140 120 130 180" stroke="var(--accent-gold)" strokeWidth="4" fill="none" />
        {/* Tassel End */}
        <circle cx="130" cy="180" r="8" fill="var(--accent-gold)" />
        <path d="M125 180 L120 195 M130 180 L130 198 M135 180 L140 195" stroke="var(--accent-gold)" strokeWidth="2" />
        {/* Cap Base (Skull part) */}
        <path d="M70 100 L130 100 L120 140 C 120 150 80 150 80 140 Z" fill="#111" />
        <path d="M70 100 L130 100 L120 140 C 120 150 80 150 80 140 Z" fill="none" stroke="#333" strokeWidth="2" />
        {/* Cap Top (Diamond part) */}
        <path d="M100 40 L180 80 L100 120 L20 80 Z" fill="#1a1a1e" />
        <path d="M100 40 L180 80 L100 120 L20 80 Z" fill="none" stroke="var(--accent-gold)" strokeWidth="3" />
        {/* Center Button */}
        <circle cx="100" cy="80" r="6" fill="var(--accent-gold)" />
      </svg>
    </motion.div>
  );
}
