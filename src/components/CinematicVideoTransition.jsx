import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * CinematicVideoTransition
 *
 * A scroll-scrubbed full-screen video bridge placed between two page sections.
 * height: 250vh  →  150vh of scroll travel (250vh outer - 100vh viewport)
 *
 * As the user scrolls through, video_transition.mp4 plays frame-by-frame.
 * The top/bottom edges cross-fade with the surrounding sections.
 *
 * Safari: event-driven fastSeek (seeked → next seek)
 * Chrome/Firefox: requestAnimationFrame loop
 */
export default function CinematicVideoTransition() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const lastSeekRef  = useRef(-1);

  // ── Video scrubbing (native, same engine as GraduationScene) ─────────────
  useEffect(() => {
    const video     = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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

    function getProgress() {
      const travel = cachedHeight - cachedWindowHeight;
      if (travel <= 0) return 0;
      const scrolled = Math.max(0, Math.min(travel, window.scrollY - cachedTop));
      return scrolled / travel;
    }

    // ── Safari: warm up the decoder first, then use scroll-driven currentTime ──
    // Safari keeps its video decoder DORMANT until play() is called at least once.
    // Without this, setting currentTime has zero visible effect.
    let safariScrollThrottle = null;

    function seekSafari() {
      if (video.readyState < 1 || Number.isNaN(video.duration)) return;
      const t = Math.min(getProgress() * video.duration, video.duration - 0.001);
      if (Math.abs(t - lastSeekRef.current) >= 0.08) {
        video.currentTime = t;
        lastSeekRef.current = t;
      }
    }

    function onScrollSafari() {
      // Throttle to ~10fps to avoid overwhelming Safari's decoder
      if (safariScrollThrottle) return;
      safariScrollThrottle = setTimeout(() => {
        seekSafari();
        safariScrollThrottle = null;
      }, 100);
    }

    // ── Chrome/Firefox: rAF loop — untouched ───────────────────────────────
    let rafId = null;
    function updateChrome(timestamp) {
      if (video.readyState >= 1 && !Number.isNaN(video.duration)) {
        const t = Math.min(getProgress() * video.duration, video.duration - 0.001);
        if (!video.seeking && Math.abs(t - lastSeekRef.current) >= 0.033) {
          try { video.currentTime = t; } catch (_) {}
          lastSeekRef.current = t;
        }
      }
      rafId = requestAnimationFrame(updateChrome);
    }

    if (isSafari) {
      // Warm up the decoder: play 1 frame then pause immediately
      // This is the ONLY reliable way to activate Safari's video pipeline
      const warmUp = () => {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            video.pause();
            video.currentTime = 0;
            lastSeekRef.current = 0;
            // Now start listening to scroll
            window.addEventListener('scroll', onScrollSafari, { passive: true });
            // Also do an immediate seek in case we're mid-page
            seekSafari();
          }).catch(() => {
            // Autoplay blocked — fall back to scroll listener directly
            window.addEventListener('scroll', onScrollSafari, { passive: true });
          });
        }
      };

      if (video.readyState >= 2) {
        warmUp();
      } else {
        video.addEventListener('canplay', warmUp, { once: true });
      }
    } else {
      rafId = requestAnimationFrame(updateChrome);
    }

    window.addEventListener('resize', cacheDimensions, { passive: true });

    const onMeta = () => { lastSeekRef.current = -1; };
    video.addEventListener('loadedmetadata', onMeta, { once: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (safariScrollThrottle) clearTimeout(safariScrollThrottle);
      window.removeEventListener('resize', cacheDimensions);
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('scroll', onScrollSafari);
    };


  }, []);

  // ── Framer Motion: fade overlays ─────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Top fade-in: section fades in from black over first 15% of scroll
  const topFadeOpacity    = useTransform(scrollYProgress, [0, 0.10], [0, 1]);
  // Bottom fade-out: section fades to black over last 15% of scroll
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  // Parallax label: rises up as you scroll through
  const labelY       = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [30, 0, -30]);
  const labelOpacity = useTransform(scrollYProgress, [0.18, 0.30, 0.70, 0.82], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '250vh',
        position: 'relative',
        background: '#000',
        // Isolation: keeps this section's stacking context clean
        isolation: 'isolate',
      }}
    >
      {/* ── Sticky viewport ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        {/* ── Scrubbed video ─────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.15) translateZ(0)',
          }}
        >
          <source src="/video_transition.mp4" type="video/mp4" />
        </video>

        {/* ── Top fade-in from black ────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: topFadeOpacity,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* ── Bottom fade-out to black ──────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: bottomFadeOpacity,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* ── Subtle vignette for depth ─────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* ── Cinematic label ───────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
            opacity: labelOpacity,
            y: labelY,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {/* Pill tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
              padding: '6px 18px',
              borderRadius: 100,
              border: '1px solid rgba(249,212,64,0.4)',
              background: 'rgba(249,212,64,0.06)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-gold)',
                boxShadow: '0 0 8px var(--accent-gold)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                fontWeight: 700,
              }}
            >
              Your Journey Begins
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              color: '#fff',
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              margin: '0 0 16px 0',
              lineHeight: 1.1,
              textShadow: '0 4px 40px rgba(0,0,0,0.9)',
              maxWidth: 700,
            }}
          >
            From aspiration to{' '}
            <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
              acceptance.
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 500,
              lineHeight: 1.7,
              margin: 0,
              textShadow: '0 2px 15px rgba(0,0,0,1)',
            }}
          >
            Every milestone. Every decision. Guided by experts who've placed students in the world's most elite institutions.
          </p>
        </motion.div>

        {/* ── Horizontal letterbox bars (cinematic 2.39:1 feel) ─────────── */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '7vh',
            background: '#000',
            opacity: labelOpacity,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '7vh',
            background: '#000',
            opacity: labelOpacity,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
