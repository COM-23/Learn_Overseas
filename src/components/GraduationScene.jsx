import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function GraduationScene() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const durationRef  = useRef(0);
  const readyRef     = useRef(false); // true once decoder is warm

  // ── Canvas render loop ─────────────────────────────────────────────────
  const startRenderLoop = useCallback(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (readyRef.current && video.readyState >= 2) {
        const vW = video.videoWidth  || canvas.width;
        const vH = video.videoHeight || canvas.height;
        const cW = canvas.width;
        const cH = canvas.height;
        const scale = Math.max(cW / vW, cH / vH);
        const dW = vW * scale;
        const dH = vH * scale;
        ctx.drawImage(video, (cW - dW) / 2, (cH - dH) / 2, dW, dH);
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Boot: size canvas, warm decoder ────────────────────────────────────
  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // 1. Keep canvas sized to viewport
    const syncSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    // 2. Capture duration once metadata arrives
    const onMeta = () => { durationRef.current = video.duration || 10; };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta);

    // 3. Warm the decoder (play a tiny bit, then pause)
    //    This is required for Safari AND Chrome to enable currentTime seeking.
    const warmDecoder = async () => {
      try {
        video.muted = true;
        await video.play();
        // Give the decoder ~200ms to decode the first keyframe
        setTimeout(() => {
          video.pause();
          video.currentTime = 0;
          readyRef.current = true;
          startRenderLoop();
        }, 200);
      } catch (err) {
        // Autoplay blocked (rare on localhost) — still start the loop;
        // frames will appear once the user interacts.
        readyRef.current = true;
        startRenderLoop();
      }
    };

    // 4. Wait until the video has buffered a bit before warming
    if (video.readyState >= 3) {
      warmDecoder();
    } else {
      video.addEventListener('canplay', warmDecoder, { once: true });
    }

    return () => {
      window.removeEventListener('resize', syncSize);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('canplay', warmDecoder);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startRenderLoop]);

  // ── Scroll → video.currentTime ─────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      const video     = videoRef.current;
      if (!container || !video || !durationRef.current) return;

      const rect       = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight; // 200vh
      const scrolled   = Math.max(0, Math.min(scrollable, -rect.top));
      const progress   = scrolled / scrollable;
      const t          = progress * durationRef.current;

      // Direct assignment is smoother than fastSeek for scrubbing
      if (!video.seeking) {
        try { video.currentTime = t; } catch (_) {}
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount so frame 0 is shown at rest
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="graduation-outer"
      style={{ position: 'relative', height: '300vh', background: '#010103', zIndex: 10 }}
    >
      {/* Sticky viewport-locked panel */}
      <div className="graduation-sticky" style={{
        position: 'sticky', top: 0,
        width: '100%', height: '100vh',
        overflow: 'hidden',
      }}>

        {/* Canvas — receives decoded frames */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            display: 'block',
            transform: 'scale(1.06)',
            transformOrigin: 'center center',
          }}
        />

        {/* Hidden video — only used for decoding */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          disablePictureInPicture
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

        {/* ── Text overlay ── */}
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

            {/* Headline */}
            <div style={{ marginBottom: 20 }}>
              <span className="graduation-headline-main" style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 6rem)', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 0.95,
                fontFamily: 'var(--font-sans)', color: '#ffffff',
                display: 'block', textShadow: '0 20px 50px rgba(0,0,0,0.9)',
              }}>
                Your day to
              </span>
              <span className="graduation-headline-sub" style={{
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
            <p className="graduation-subcopy" style={{
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
              className="graduation-cta-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(249,212,64,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 40, display: 'inline-block',
                padding: '16px 48px', borderRadius: '100px',
                border: '1.5px solid rgba(249,212,64,0.6)',
                color: 'var(--accent-gold)', fontSize: '0.85rem',
                fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
                textDecoration: 'none', background: 'rgba(2,2,5,0.85)',
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
