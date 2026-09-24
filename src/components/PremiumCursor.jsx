import React, { useEffect, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

export default function PremiumCursor() {
  const [isFinePointer, setIsFinePointer] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Raw motion values for instant tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring tracking for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);
    const handler = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      let isPointer = false;
      try {
        isPointer = window.getComputedStyle(target).cursor === 'pointer';
      } catch (_) { }

      const isHover =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.team-card') ||
        target.closest('.glass-panel') ||
        target.closest('input') ||
        target.closest('textarea') ||
        isPointer;

      setIsHovering(!!isHover);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor globally
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'cursor-hide-style';
    style.innerHTML = `body, body * { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => {
      const s = document.getElementById('cursor-hide-style');
      if (s) document.head.removeChild(s);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999999 }}>
      {/* Inner Dot - tracks instantly */}
      <motion.div
        style={{
          position: 'absolute',
          left: -3, top: -3, // Offset by half width/height to center
          x: cursorX, y: cursorY,
          width: 6, height: 6,
          backgroundColor: 'var(--accent-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(249, 212, 64, 0.8)',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Ring - trails with spring physics */}
      <motion.div
        style={{
          position: 'absolute',
          left: -18, top: -18, // Offset by half width/height to center
          x: ringX, y: ringY,
          width: 36, height: 36,
          borderRadius: '50%',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          border: isHovering ? '1px solid rgba(249, 212, 64, 0.1)' : '1.5px solid rgba(249, 212, 64, 0.6)',
          backgroundColor: isHovering ? 'rgba(249, 212, 64, 0.15)' : 'rgba(249, 212, 64, 0)',
          boxShadow: isHovering ? '0 0 30px rgba(249, 212, 64, 0.3)' : '0 0 0px rgba(249, 212, 64, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Optional inner reticle when hovering over links (crosshairs) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
          style={{ width: 4, height: 4, backgroundColor: 'var(--accent-gold)', borderRadius: '50%' }}
        />
      </motion.div>
    </div>
  );
}
