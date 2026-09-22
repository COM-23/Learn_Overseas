import React, { useRef, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import Globe from 'react-globe.gl';
import { Link, useNavigate } from 'react-router-dom';
import './DestinationsDashboard.css';
import { DESTINATIONS } from '../data/destinations.js';

import { useInView } from 'framer-motion';

function LivingStarCanvas() {
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    const generateShadows = (count, size, baseOpacity) => {
      let shadows = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * w);
        const y = Math.floor(Math.random() * h);
        const opacity = baseOpacity + (Math.random() * 0.4);
        shadows.push(`${x}px ${y}px 0 ${size}px rgba(255, 255, 255, ${opacity.toFixed(2)})`);
      }
      return shadows.join(', ');
    };

    setLayers({
      small: generateShadows(250, 0.5, 0.2),
      medium: generateShadows(88, 1, 0.3),
      hero: generateShadows(12, 1.5, 0.5)
    });
  }, []);

  if (!layers) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div style={{ width: 1, height: 1, boxShadow: layers.small, animation: 'twinkleCSS 3s infinite alternate ease-in-out', willChange: 'opacity' }} />
      <div style={{ width: 1, height: 1, boxShadow: layers.medium, animation: 'twinkleCSS 4s infinite alternate-reverse ease-in-out', willChange: 'opacity' }} />
      <div style={{ width: 1, height: 1, boxShadow: layers.hero, animation: 'twinkleCSS 5s infinite alternate ease-in-out', willChange: 'opacity' }} />
      <style>{`
        @keyframes twinkleCSS {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        @keyframes markerPulseBase {
          0% { transform: scale(0.6); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes markerFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

export default function GlobeScene() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [liveRates, setLiveRates] = useState({});
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/INR')
      .then(r => r.json())
      .then(j => { if (j && j.result === 'success' && j.rates) setLiveRates(j.rates); })
      .catch(() => {});
  }, []);

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    // Scroll tracking removed; scaling is handled by the parent component (Home.jsx) via wrappers.
  }, []);
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const globeScale = useTransform(smooth, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  // Airplane orbiting physics removed for performance (caused 60fps re-renders of the entire GlobeScene)

  useEffect(() => {
    if (globeRef.current && globeReady) {
      globeRef.current.controls().autoRotate = !selectedCountry;
      globeRef.current.controls().autoRotateSpeed = 1.0;
      globeRef.current.controls().enableRotate = true; // Ensure drag-to-rotate is enabled
      globeRef.current.controls().enableZoom = false; // Disable scroll zoom so we don't break page flow
      
      if (!selectedCountry) {
        globeRef.current.pointOfView({ lat: 20, lng: 70, altitude: 2.6 }, 2000);
      } else {
        globeRef.current.pointOfView({ lat: selectedCountry.lat, lng: selectedCountry.lng, altitude: 1.5 }, 1200);
      }
    }
  }, [globeReady, selectedCountry]);

  // Pause Globe RAF when off-screen to prevent massive GPU lag
  useEffect(() => {
    if (!globeRef.current || !globeReady) return;
    
    let isPausedByObserver = false;
    let isPausedByScroll = false;

    const updateGlobeState = () => {
      if (globeRef.current) {
        if (isPausedByObserver || isPausedByScroll) {
          globeRef.current.pauseAnimation();
        } else {
          globeRef.current.resumeAnimation();
        }
      }
    };

    // Fallback observer
    const observer = new IntersectionObserver(
      (entries) => {
        isPausedByObserver = !entries[0].isIntersecting;
        updateGlobeState();
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const unsub = scrollYProgress.on('change', (val) => {
      const shouldBePaused = val >= 0.98;
      if (shouldBePaused !== isPausedByScroll) {
        isPausedByScroll = shouldBePaused;
        updateGlobeState();
      }
    });

    return () => {
      observer.disconnect();
      unsub();
    };
  }, [globeReady, scrollYProgress]);

  // Fallback rates
  const FALLBACK_RATES = { USD:0.0118, GBP:0.0091, CAD:0.0163, AUD:0.0182, EUR:0.0102, PLN:0.0450, SGD:0.0154, NZD:0.0197, JPY:1.77, KRW:15.93, CNY:0.085, HKD:0.092, MYR:0.052, AED:0.0433 };

  const getFxInfo = (currency) => {
    const rate = liveRates[currency] || FALLBACK_RATES[currency];
    if (!rate) return null;
    const inv = (1 / rate).toFixed(2);
    return {
      text: `₹1 = ${rate.toFixed(4)} ${currency} · 1 ${currency} ≈ ₹${inv}`,
      live: !!liveRates[currency]
    };
  };

  const totalUnis = DESTINATIONS.reduce((sum, d) => sum + d.totalUnis, 0).toLocaleString() + '+';
  const totalCountries = DESTINATIONS.length;

  return (
    <div className={`destinations-dashboard ${selectedCountry ? 'country-open' : ''}`} ref={containerRef} style={{ height: '100vh', position: 'relative' }}>
      <motion.div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        
        <LivingStarCanvas />

        {/* Static nebula — gradients don't need animation to look atmospheric */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125,193,177,0.12) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(249,212,64,0.07) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
        </div>

        {/* Global Education Network Hero Copy was moved to Home.jsx to allow scroll sequence animation */}

        {/* The Globe (Centered perfectly behind/with text) */}
        <motion.div 
          style={{ 
            position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5
          }}
        >
          
          {/* Graduation Cap removed as requested by user */}

          {!isMobile ? (
            <Globe
              ref={globeRef}
              onGlobeReady={() => setTimeout(() => setGlobeReady(true), 0)}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="rgb(125, 193, 177)"
              atmosphereAltitude={0.25}
              width={windowSize.width}
              height={windowSize.height}
              rendererConfig={{ antialias: false, precision: 'lowp', powerPreference: 'high-performance' }}
              htmlElementsData={DESTINATIONS}
              htmlElement={(d) => {
                const el = document.createElement('div');
                el.innerHTML = `
                  <div class="unique-globe-marker" style="
                    cursor: pointer; pointer-events: auto;
                    display: flex; flex-direction: column; align-items: center;
                    position: relative;
                    margin-top: -30px;
                  ">
                      <div class="globe-marker-pill" style="
                        background: rgba(15, 20, 35, 0.85);
                        border: 1px solid rgba(255, 255, 255, 0.15);
                      border-radius: 20px;
                      padding: 4px 8px 4px 4px;
                      display: flex; align-items: center; gap: 6px;
                      box-shadow: 0 8px 20px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05);
                      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                      transform-origin: bottom center;
                      animation: markerFloat 2s ease-in-out infinite alternate;
                    ">
                      <!-- Flag SVG -->
                      <div style="
                        width: 22px; height: 22px;
                        border-radius: 50%;
                        overflow: hidden;
                        display: flex; align-items: center; justify-content: center;
                        background: #000;
                        border: 1px solid rgba(255,255,255,0.2);
                        flex-shrink: 0;
                      ">
                        <img src="https://flagcdn.com/w40/${d.iso2.toLowerCase()}.png" alt="${d.country}" style="height: 100%; width: auto; min-width: 100%; object-fit: cover;" />
                      </div>
                      <!-- Route Code -->
                      <span style="
                        color: rgba(255,255,255,0.9);
                        font-family: system-ui, -apple-system, sans-serif;
                        font-size: 11px;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        padding-right: 4px;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                      ">${d.route}</span>
                    </div>

                    <!-- Glowing Stem -->
                    <div class="globe-marker-stem" style="
                      width: 1px; height: 25px;
                      background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
                      transition: height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    "></div>
                    
                    <!-- Glowing Base on Globe Surface -->
                    <div class="globe-marker-base" style="
                      position: absolute; bottom: -8px;
                      width: 30px; height: 10px;
                      background: radial-gradient(ellipse at center, rgba(125, 193, 177, 0.8) 0%, rgba(125, 193, 177, 0) 70%);
                      animation: markerPulseBase 2s infinite alternate;
                      pointer-events: none;
                    "></div>
                  </div>
                `;
                const handleSelect = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedCountry(d);
                };
                el.onpointerdown = handleSelect;
                el.ontouchend = handleSelect;
                el.onmouseenter = () => {
                  el.querySelector('.globe-marker-pill').style.transform = 'scale(1.15) translateY(-8px)';
                  el.querySelector('.globe-marker-pill').style.background = 'rgba(255, 255, 255, 0.15)';
                  el.querySelector('.globe-marker-pill').style.borderColor = 'rgba(125, 193, 177, 0.8)';
                  el.querySelector('.globe-marker-pill').style.boxShadow = '0 10px 25px rgba(125, 193, 177, 0.4)';
                  el.querySelector('.globe-marker-stem').style.height = '33px';
                  el.querySelector('.globe-marker-stem').style.background = 'linear-gradient(to bottom, rgba(125, 193, 177, 0.9), transparent)';
                };
                el.onmouseleave = () => {
                  el.querySelector('.globe-marker-pill').style.transform = 'scale(1) translateY(0)';
                  el.querySelector('.globe-marker-pill').style.background = 'rgba(15, 20, 35, 0.45)';
                  el.querySelector('.globe-marker-pill').style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  el.querySelector('.globe-marker-pill').style.boxShadow = '0 8px 20px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)';
                  el.querySelector('.globe-marker-stem').style.height = '25px';
                  el.querySelector('.globe-marker-stem').style.background = 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)';
                };
                return el;
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '90vw', height: '90vw', maxWidth: '500px', maxHeight: '500px',
              borderRadius: '50%',
              backgroundColor: '#0a192f',
              backgroundImage: 'url(https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg)',
              backgroundSize: '200% 100%',
              boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.9), inset 10px 10px 40px rgba(255,255,255,0.2), 0 0 80px rgba(125,193,177,0.3)',
              animation: 'spinDOMGlobe 60s linear infinite'
            }}>
              <style>{`
                @keyframes spinDOMGlobe {
                  from { background-position: 0% 0; }
                  to { background-position: 200% 0; }
                }
              `}</style>
              
              {/* Render DOM-based pins for mobile */}
              {DESTINATIONS.map(d => {
                // Highly simplified pseudo-projection for 2D DOM globe
                const latRad = (d.lat * Math.PI) / 180;
                const lngRad = (d.lng * Math.PI) / 180;
                
                // Animate longitude over time to match spinDOMGlobe
                return (
                  <div key={d.country} style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: 0, height: 0,
                    animation: 'orbitDOMGlobe 60s linear infinite',
                    // Delay animation based on longitude so they are spaced out around the globe
                    animationDelay: `-${((d.lng + 180) / 360) * 60}s`
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: `${-Math.sin(latRad) * 45}vw`, // roughly map latitude
                      transform: 'translate(-50%, -50%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      cursor: 'pointer', padding: '10px'
                    }} onClick={(e) => { e.stopPropagation(); setSelectedCountry(d); }}>
                      {/* Mobile AR Pill */}
                      <div style={{
                        background: 'rgba(15, 20, 35, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        padding: '3px 6px 3px 3px',
                        display: 'flex', alignItems: 'center', gap: '4px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                        animation: 'markerFloat 2s ease-in-out infinite alternate',
                      }}>
                        <div style={{
                          width: '16px', height: '16px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#000',
                          border: '1px solid rgba(255,255,255,0.2)',
                          flexShrink: 0
                        }}>
                          <img src={`https://flagcdn.com/w40/${d.iso2.toLowerCase()}.png`} alt={d.country} style={{ height: '100%', width: 'auto', minWidth: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{
                          color: '#fff',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '9px',
                          fontWeight: '700',
                          letterSpacing: '0.5px'
                        }}>{d.route}</span>
                      </div>
                      
                      <div style={{ width: '1px', height: '12px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
                      
                      <div style={{
                        position: 'absolute', bottom: '2px',
                        width: '20px', height: '6px',
                        background: 'radial-gradient(ellipse at center, rgba(125, 193, 177, 0.8) 0%, rgba(125, 193, 177, 0) 70%)',
                        animation: 'markerPulseBase 2s infinite alternate',
                        pointerEvents: 'none'
                      }}></div>
                    </div>
                  </div>
                );
              })}
              <style>{`
                @keyframes orbitDOMGlobe {
                  0% { transform: rotateY(0deg) translateZ(45vw); opacity: 1; z-index: 10; }
                  25% { transform: rotateY(90deg) translateZ(45vw); opacity: 0; z-index: 0; }
                  75% { transform: rotateY(270deg) translateZ(45vw); opacity: 0; z-index: 0; }
                  100% { transform: rotateY(360deg) translateZ(45vw); opacity: 1; z-index: 10; }
                }
              `}</style>
            </div>
          )}
        </motion.div>

        {/* Invisible Click-out Overlay to close the panel */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCountry(null)}
              style={{ position: 'absolute', inset: 0, zIndex: 90, cursor: 'pointer' }}
            />
          )}
        </AnimatePresence>

        {/* Left Side Country Panel (Ticket) */}
        {createPortal(
          <AnimatePresence>
            {selectedCountry && (
              <motion.div 
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="premium-side-panel"
              data-lenis-prevent="true"
              style={{ 
                pointerEvents: 'auto',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '450px',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(12,12,16,0.98) 0%, rgba(2,2,4,0.99) 100%)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '30px 0 60px rgba(0,0,0,0.8), inset -1px 0 0 rgba(255,255,255,0.03)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 100,
                overflowY: 'auto',
                overflowX: 'hidden',
                overscrollBehavior: 'contain',
              }}
            >
              {/* Dynamic Inner Glow (Restored) */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '-10%', left: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1, willChange: 'transform, opacity', contain: 'strict' }} 
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ position: 'absolute', bottom: '20%', right: '-20%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1, willChange: 'transform, opacity', contain: 'strict' }} 
              />

              {/* X Close button — top right, no overlap */}
              <div style={{ padding: '120px 20px 0', display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 10 }}>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.12)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCountry(null)}
                  style={{
                    background: 'rgba(20,20,25,0.95)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.8)',
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    lineHeight: 1,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    flexShrink: 0,
                  }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Header / Flag */}
              <div style={{ padding: '20px 30px 10px', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                    style={{ position: 'relative', flexShrink: 0, width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <img src={`https://flagcdn.com/w80/${selectedCountry.iso2.toLowerCase()}.png`} alt={selectedCountry.country} style={{ width: '36px', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
                    <div style={{ position: 'absolute', inset: -10, background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', zIndex: -1, borderRadius: '50%' }} />
                  </motion.div>
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ color: 'var(--accent-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, marginBottom: '5px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{selectedCountry.route}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '1px' }}>Global Destination</div>
                  </div>
                </div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', color: '#fff', margin: '0 0 10px 0', lineHeight: 1.1, background: 'linear-gradient(135deg, #fff 0%, #aaa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}
                >
                  {selectedCountry.country}
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.95rem', letterSpacing: '0.5px' }}>From Bengaluru, India</motion.p>
              </div>

              {/* Metrics Grid */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 10 }}>
                
                {/* Metric 1 */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02, x: 10, backgroundColor: 'rgba(30,30,35,0.98)', borderColor: 'rgba(249,212,64,0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }} style={{ background: 'linear-gradient(135deg, rgba(20,20,25,0.95) 0%, rgba(10,10,15,0.95) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(249, 212, 64, 0.2), rgba(249, 212, 64, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid rgba(249, 212, 64, 0.4)', boxShadow: 'inset 0 0 15px rgba(249,212,64,0.1)' }}>💱</div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Exchange Rate</div>
                    <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                      {getFxInfo(selectedCountry.currency)?.text}
                      <span style={{ marginLeft: '12px', fontSize: '0.65rem', background: getFxInfo(selectedCountry.currency)?.live ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 152, 0, 0.15)', border: getFxInfo(selectedCountry.currency)?.live ? '1px solid rgba(76,175,80,0.3)' : '1px solid rgba(255,152,0,0.3)', color: getFxInfo(selectedCountry.currency)?.live ? '#4CAF50' : '#FF9800', padding: '4px 10px', borderRadius: '100px', fontWeight: 800, letterSpacing: '1px' }}>
                        {getFxInfo(selectedCountry.currency)?.live ? 'LIVE' : 'CACHED'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Metric 2 */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02, x: 10, backgroundColor: 'rgba(30,30,35,0.98)', borderColor: 'rgba(125,193,177,0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }} style={{ background: 'linear-gradient(135deg, rgba(20,20,25,0.95) 0%, rgba(10,10,15,0.95) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(125, 193, 177, 0.2), rgba(125, 193, 177, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid rgba(125, 193, 177, 0.4)', boxShadow: 'inset 0 0 15px rgba(125,193,177,0.1)' }}>🎓</div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Universities</div>
                    <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '1px' }}>{selectedCountry.totalUnis}</div>
                  </div>
                </motion.div>

                {/* Metric 3 */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} whileHover={{ scale: 1.02, x: 10, backgroundColor: 'rgba(30,30,35,0.98)', borderColor: 'rgba(214,122,103,0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }} style={{ background: 'linear-gradient(135deg, rgba(20,20,25,0.95) 0%, rgba(10,10,15,0.95) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(214, 122, 103, 0.2), rgba(214, 122, 103, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid rgba(214, 122, 103, 0.4)', boxShadow: 'inset 0 0 15px rgba(214,122,103,0.1)' }}>💰</div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Approx. Tuition / Year</div>
                    <div style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.5px' }}>{selectedCountry.tuition}</div>
                  </div>
                </motion.div>

              </div>

              {/* Universities List */}
              <div style={{ padding: '10px 30px 60px', flex: 1, position: 'relative', zIndex: 10 }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '20px', height: '2px', background: 'var(--accent-gold)' }} />
                  Top Universities
                </motion.div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedCountry.unis.map((u, i) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + (i * 0.1) }}
                      whileHover={{ x: 10, background: 'rgba(255,255,255,0.08)', borderColor: 'var(--accent-gold)', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
                      key={u} 
                      onClick={() => navigate('/university/' + encodeURIComponent(u))}
                      style={{ 
                        color: 'rgba(255,255,255,0.95)', fontSize: '1.1rem', padding: '16px 24px', 
                        background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
                        borderLeft: '4px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                    >
                      <span style={{ fontWeight: 500, letterSpacing: '0.5px' }}>{u}</span>
                      <span style={{ color: 'var(--accent-gold)', opacity: 0.5, fontSize: '1.2rem' }}>→</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          </AnimatePresence>,
          document.body
        )}

      </motion.div>
    </div>
  );
}
