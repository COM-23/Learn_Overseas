import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function GraduationScene() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const durationRef  = useRef(10);
  const isSeeking    = useRef(false);

  // ── Draw current video frame to canvas every rAF tick ──────────────────
  const startRenderLoop = useCallback(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (video.readyState >= 2) {
        // Draw at CSS pixel dimensions (no dpr scaling on video — not needed)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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
    const onScroll = () => {
      const container = containerRef.current;
      const video     = videoRef.current;
      if (!container || !video) return;

      const rect       = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight; // 200vh
      const scrolled   = Math.max(0, Math.min(scrollable, -rect.top));
      const progress   = scrolled / scrollable;
      const t          = progress * durationRef.current;

      if (!isSeeking.current) {
        isSeeking.current = true;
        requestAnimationFrame(() => {
          if (!videoRef.current) return;
          if (typeof videoRef.current.fastSeek === 'function') {
            videoRef.current.fastSeek(t);
          } else {
            videoRef.current.currentTime = t;
          }
          videoRef.current.addEventListener(
            'seeked',
            () => { isSeeking.current = false; },
            { once: true }
          );
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: '300vh', background: '#010103', zIndex: 10 }}
    >
      {/* Sticky full-screen panel */}
      <div style={{
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
          }}
        />

        {/* Hidden decoder-only video */}
        <video
          ref={videoRef}
          muted playsInline preload="auto"
          webkit-playsinline="true"
          style={{ display: 'none' }}
        >
          <source src="/graduation_scrub.mp4" type="video/mp4" />
          <source src="/graduation.mp4"        type="video/mp4" />
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
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
                textDecoration: 'none', backdropFilter: 'blur(10px)',
                background: 'rgba(2,2,5,0.7)',
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

