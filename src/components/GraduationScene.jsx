import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function GraduationScene() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const durationRef  = useRef(10);
  const isSeeking    = useRef(false);
  const lastRenderedTimeRef = useRef(-1);
  const isInViewRef  = useRef(true);

  // ── Draw current video frame to canvas every rAF tick ──────────────────
  const startRenderLoop = useCallback(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Chrome perf optimization

    const draw = () => {
      // Chrome perf optimization: Only draw if visible and frame actually changed
      if (isInViewRef.current && video.readyState >= 2 && video.currentTime !== lastRenderedTimeRef.current) {
        const vW = video.videoWidth;
        const vH = video.videoHeight;
        const cW = canvas.width;
        const cH = canvas.height;
        
        // Calculate scale to simulate object-fit: cover
        const scale = Math.max(cW / vW, cH / vH);
        
        // Calculate centered position
        const drawW = vW * scale;
        const drawH = vH * scale;
        const drawX = (cW - drawW) / 2;
        const drawY = (cH - drawH) / 2;

        ctx.drawImage(video, drawX, drawY, drawW, drawH);
        lastRenderedTimeRef.current = video.currentTime;
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Video + Canvas setup ────────────────────────────────────────────────
  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Simple sizing — match viewport, no dpr scaling
    const syncSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    const onMeta = () => { durationRef.current = video.duration || 10; };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta);

    // Prime decoder so fastSeek works instantly
    const prime = async () => {
      try {
        video.muted = true;
        video.currentTime = 0;
        await video.play();
        setTimeout(() => {
          video.pause();
          video.currentTime = 0;
          startRenderLoop();
        }, 150);
      } catch (_) {
        video.currentTime = 0.001;
        startRenderLoop();
      }
    };
    prime();

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('resize', syncSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startRenderLoop]);

  // ── Scroll → video currentTime ──────────────────────────────────────────
  useEffect(() => {
    let cachedTop = 0;
    let cachedHeight = 0;
    let cachedWindowHeight = window.innerHeight;

    const cacheDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        cachedTop = rect.top + window.scrollY;
        cachedHeight = containerRef.current.offsetHeight;
        cachedWindowHeight = window.innerHeight;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      isInViewRef.current = entries[0].isIntersecting;
    }, { threshold: 0 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const onScroll = () => {
      if (!containerRef.current || !videoRef.current) return;

      const scrollable = cachedHeight - cachedWindowHeight; // 200vh
      const scrolled   = Math.max(0, Math.min(scrollable, window.scrollY - cachedTop));
      const progress   = scrolled / scrollable;
      const t          = progress * durationRef.current;

      requestAnimationFrame(() => {
        if (!videoRef.current) return;
        // fastSeek jumps to keyframes causing severe glitches on non-optimized videos. 
        // Direct currentTime assignment is much smoother for scrubbing.
        if (!videoRef.current.seeking) {
          try { videoRef.current.currentTime = t; } catch (e) {}
        }
      });
    };

    window.addEventListener('resize', cacheDimensions, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    
    cacheDimensions();
    onScroll();
    
    return () => {
      window.removeEventListener('resize', cacheDimensions);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="graduation-outer"
      style={{ position: 'relative', height: '300vh', background: '#010103', zIndex: 10 }}
    >
      {/* Sticky full-screen panel */}
      <div className="graduation-sticky" style={{
        position: 'sticky', top: 0,
        width: '100%', height: '100vh',
        overflow: 'hidden',
      }}>

        {/* Canvas fills the entire viewport */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            filter: 'contrast(1.15) saturate(1.1)',
            display: 'block',
            transform: 'scale(1.06) translateX(-3%)',
            transformOrigin: 'center center',
          }}
        />

        {/* Hidden decoder-only video */}
        <video
          ref={videoRef}
          muted playsInline preload="auto"
          webkit-playsinline="true"
          style={{ display: 'none' }}
        >
          <source src="/A_vast_dim_crowd_of_identical.mov" type="video/quicktime" />
          <source src="/A_vast_dim_crowd_of_identical.mov" type="video/mp4" />
        </video>

        {/* Top cinematic fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '18vh',
          background: 'linear-gradient(to bottom, #010103 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Bottom cinematic fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '25vh',
          background: 'linear-gradient(to top, #010103 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        {/* ── Centered text overlay ── */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', zIndex: 10,
          padding: '0 20px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20vh' }}
          >
            {/* Label pill */}
            <div style={{
              fontSize: 12, letterSpacing: 7, textTransform: 'uppercase',
              color: 'var(--accent-gold)', fontWeight: 800,
              background: 'rgba(5,5,8,0.95)', padding: '12px 28px',
              borderRadius: '100px', border: '1px solid rgba(249,212,64,0.4)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              display: 'inline-flex', alignItems: 'center', marginBottom: 24,
            }}>
              The Ultimate Goal
            </div>

            {/* Main headline */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 6rem)', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 0.95,
                fontFamily: 'var(--font-sans)', color: '#ffffff',
                display: 'block', textShadow: '0 20px 50px rgba(0,0,0,0.9)',
              }}>
                Your day to
              </span>
              <span style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 4rem)', fontWeight: 800,
                letterSpacing: '0.10em', textTransform: 'uppercase', lineHeight: 0.9,
                marginTop: '8px', fontFamily: 'var(--font-sans)',
                background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-gold) 40%, var(--accent-copper) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'block',
              }}>
                WALK THE STAGE.
              </span>
            </div>

            {/* Sub-copy */}
            <p style={{
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)',
              maxWidth: 560, lineHeight: 1.65, margin: '0 auto',
              textShadow: '0 2px 12px rgba(0,0,0,0.9)', fontWeight: 300,
            }}>
              Every consultation, every application, every milestone — all building
              toward this single moment. Your global degree. Your future.
            </p>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(249,212,64,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 40, display: 'inline-block',
                padding: '16px 48px', borderRadius: '100px',
                border: '1.5px solid rgba(249,212,64,0.6)',
                color: 'var(--accent-gold)', fontSize: '0.85rem',
                fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
                textDecoration: 'none', background: 'rgba(2,2,5,0.7)',
              }}
            >
              Begin Your Journey
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

