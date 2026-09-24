import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ── Cinematic collage: every image is a distinct campus mood ──
const IMAGES = [
  '/harvard-night.jpg',       // 1. Harvard at night – deep red brick
  '/library.jpg',             // 2. Grand reading hall
  '/campus_sunset.jpg',       // 3. Golden-hour courtyard
  '/gothic_library.jpg',      // 4. Gothic vaulted stacks
  '/student-studying.jpg',    // 5. Student focus shot
  '/modern_campus.jpg',       // 6. Contemporary glass campus
  '/aerial_campus.jpg',       // 7. Aerial quad


  // Supplemental Unsplash images (loaded over network – gracefully degrade if missing)
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1600&q=80', // Oxford spire
  'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80', // MIT dome
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1600&q=80', // Students walking
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80', // Graduation caps
];

export default function JourneyBackground({ scrollYProgress }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const timerRef = useRef(null);

  // Parallax removed for performance

  // Preload next image so there's zero network delay when it appears
  useEffect(() => {
    const nextIdx = (currentIdx + 1) % IMAGES.length;
    const src = IMAGES[nextIdx];
    if (src.startsWith('http')) {
      const img = new window.Image();
      img.src = src;
    }
  }, [currentIdx]);

  // Stop-and-play timing: hold each image for 8s, crossfade over 2.5s
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % IMAGES.length);
    }, 8000);
    return () => clearTimeout(timerRef.current);
  }, [currentIdx]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100lvh', overflow: 'hidden', background: '#020205' }}>

        {/* ── Smooth crossfade slideshow ── */}
        {/* Layer 1 — previous image stays fully opaque so there's never a black flash */}
        {prevIdx !== null && prevIdx !== currentIdx && (
          <div
            style={{
              position: 'absolute',
              inset: '-5%',
              backgroundImage: `url(${IMAGES[prevIdx]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
            }}
          />
        )}

        {/* Layer 2 — new image fades in ON TOP of the previous one */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ opacity: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] } }}
            style={{
              position: 'absolute',
              inset: '-5%',
              backgroundImage: `url(${IMAGES[currentIdx]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 2,
            }}
          />
        </AnimatePresence>

        {/* Global Darkening Overlay to replace the 0.75 opacity on individual images, preventing ghosting */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,2,5,0.75)', zIndex: 3 }} />

        {/* Dynamic Light Leaks — CSS animation instead of framer-motion for zero JS overhead */}
        <div
          style={{
            position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%',
            background: 'radial-gradient(circle at 30% 50%, rgba(249, 212, 64, 0.18) 0%, transparent 60%)',
            zIndex: 999,
            animation: 'lightleak1 15s ease-in-out infinite',
            willChange: 'opacity',
          }}
        />

        <div
          style={{
            position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%',
            background: 'radial-gradient(circle at 70% 30%, rgba(126, 87, 194, 0.18) 0%, transparent 50%)',
            zIndex: 999,
            animation: 'lightleak2 20s ease-in-out 2s infinite',
            willChange: 'opacity',
          }}
        />



        {/* Heavy Vignettes for readability — floaters sit ON TOP at zIndex 1010 */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,2,5,0.75) 100%)', zIndex: 1001 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30vh', background: 'linear-gradient(to bottom, #020205 0%, transparent 100%)', zIndex: 1002 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30vh', background: 'linear-gradient(to top, #020205 0%, transparent 100%)', zIndex: 1002 }} />

        {/* Film grain removed for performance */}
      </div>
    </div>
  );
}
