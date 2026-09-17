import React, { useEffect, useState } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * PremiumCursor — rebuilt for performance.
 *
 * PERF CHANGES vs old version:
 * 1. Removed useSpring for cursorX/cursorY — springs run a RAF loop even when
 *    idle. Replaced with direct useMotionValue + CSS transition on the element.
 * 2. Removed stardust particles — each particle was a React state update which
 *    triggered a full re-render tree on every mouse move (catastrophic).
 * 3. Removed useSpring for cursorScale/dotScale — replaced with CSS transitions.
 * 4. The cursor div now uses CSS `transition` for scale/color changes, which runs
 *    entirely on the compositor thread with zero JS involvement.
 */
export default function PremiumCursor() {
  const [isFinePointer, setIsFinePointer] = useState(true);

  // Raw motion values — no physics springs, no RAF loop when idle
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);
    const handler = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = document.getElementById('premium-cursor-orb');

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (!el) return;
      const target = e.target;
      let isPointer = false;
      try {
        isPointer = window.getComputedStyle(target).cursor === 'pointer';
      } catch (_) {}

      const isHover =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.team-card') ||
        target.closest('.glass-panel') ||
        isPointer;

      if (isHover) {
        el.style.transform = 'translate(-50%, -50%) scale(2.5)';
        el.style.border = '2px solid var(--accent-gold)';
        el.style.backgroundColor = 'transparent';
        el.style.boxShadow = '0 0 20px rgba(249,212,64,0.8)';
      } else {
        el.style.transform = 'translate(-50%, -50%) scale(1)';
        el.style.border = 'none';
        el.style.backgroundColor = 'rgba(249,212,64,0.5)';
        el.style.boxShadow = '0 0 10px rgba(249,212,64,0.5)';
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'cursor-hide-style';
    style.innerHTML = `body, body * { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = 'auto';
      const s = document.getElementById('cursor-hide-style');
      if (s) document.head.removeChild(s);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        // The actual cursor element is positioned via motionValue subscription below
      }}
    >
      {/*
        We use a raw div + motionValue subscription instead of motion.div + useSpring
        to avoid a permanent RAF loop when the mouse is idle.
      */}
      <MotionCursorOrb x={cursorX} y={cursorY} />
    </div>
  );
}

// Separate component so the subscription is isolated
function MotionCursorOrb({ x, y }) {
  useEffect(() => {
    const el = document.getElementById('premium-cursor-wrapper');
    if (!el) return;

    // Use hardware-accelerated translate3d instead of layout-thrashing left/top
    const unsubX = x.on('change', (val) => {
      el.style.transform = `translate3d(${val}px, ${y.get()}px, 0)`;
    });
    const unsubY = y.on('change', (val) => {
      el.style.transform = `translate3d(${x.get()}px, ${val}px, 0)`;
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [x, y]);

  return (
    <div
      id="premium-cursor-wrapper"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 999999,
      }}
    >
      <div
        id="premium-cursor-orb"
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'rgba(249,212,64,0.5)',
          boxShadow: '0 0 10px rgba(249,212,64,0.5)',
          transform: 'translate(-50%, -50%) scale(1)',
          // CSS transition handles hover state changes — zero JS, runs on compositor
          transition: 'transform 0.15s ease, background-color 0.15s ease, border 0.15s ease, box-shadow 0.15s ease',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
