import React from 'react';
import { motion } from 'framer-motion';

const universities = [
  { name: 'CORNELL',   logo: '/logos/cornell.edu.png' },
  { name: 'CALTECH',   logo: '/logos/caltech.edu.png' },
  { name: 'U. CHICAGO',logo: '/logos/uchicago.edu.png' },
  { name: 'UNSW',      logo: '/logos/unsw.edu.au.png' },
  { name: 'TRINITY DUBLIN', logo: '/logos/tcd.ie.png' },
  { name: 'YORK',      logo: '/logos/yorku.ca.png' },
  { name: 'UCD',       logo: '/logos/ucd.ie.png' },
  { name: 'UMASS BOSTON', logo: '/logos/umb.edu.png' },
  { name: 'U. PACIFIC', logo: '/logos/pacific.edu.png' },
  { name: 'U. CALGARY', logo: '/logos/ucalgary.ca.png' },
];

// 4 copies for seamless loop
const marqueeItems = [...universities, ...universities, ...universities, ...universities];

const alumniText = "ALUMNI NETWORK • GLOBAL REACH • ELITE PLACEMENT • ";

export default function InfiniteMarquee() {
  return (
    <div style={{
      position: 'relative', width: '100%', overflowX: 'clip', overflowY: 'visible',
      padding: '40px 0', background: 'transparent', zIndex: 10,
    }}>
      <style>
        {`
          .marquee-track:hover .marquee-item {
            opacity: 0.2;
            filter: grayscale(80%);
            transition: opacity 0.4s ease, filter 0.4s ease;
          }
          .marquee-track .marquee-item {
            transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          }
          .marquee-track .marquee-item:hover {
            opacity: 1 !important;
            filter: grayscale(0%) drop-shadow(0 0 30px rgba(249,212,64,0.6)) !important;
            transform: scale(1.15) translateY(-5px);
            z-index: 20;
          }
        `}
      </style>
      {/* Edge Gradients for seamless fade */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '15vw', background: 'linear-gradient(to right, #020205 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '15vw', background: 'linear-gradient(to left, #020205 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />

      {/* ── Track A: Background Hollow Text (Moves Right) ── */}
      <div style={{ display: 'flex', whiteSpace: 'nowrap', transform: 'translateX(-50%)', marginBottom: '-40px', opacity: 0.6 }}>
        <motion.div
          animate={{ x: ['0%', '50%'] }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
        >
          <h1 style={{
            fontSize: 'clamp(5rem, 12vw, 14rem)',
            fontFamily: 'var(--font-sans)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(249,212,64,0.15)',
            textTransform: 'uppercase',
            margin: 0, letterSpacing: 20, paddingRight: 40, fontWeight: 900,
          }}>
            {alumniText}{alumniText}{alumniText}
          </h1>
        </motion.div>
      </div>

      {/* ── Track B: University Logos (Moves Left) ── */}
      <div style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div
          className="marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
          style={{ display: 'inline-flex', whiteSpace: 'nowrap', alignItems: 'center', willChange: 'transform' }}
        >
          {marqueeItems.map((uni, i) => (
            <div
              key={i}
              className="marquee-item"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '24px',
                paddingRight: '60px',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 10px 30px rgba(0,0,0,0.8)',
                textTransform: 'uppercase',
                letterSpacing: 4,
                position: 'relative',
              }}
            >
              {/* Logo display */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={uni.logo}
                  alt={uni.name}
                  style={{
                    height: '60px',
                    width: 'auto',
                    objectFit: 'contain',
                    flexShrink: 0,
                    filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.1))',
                  }}
                />
                <span style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  letterSpacing: '1px', 
                  color: '#ffffff', 
                  textTransform: 'uppercase',
                  textShadow: 'none'
                }}>
                  {uni.name}
                </span>
              </div>
              <span style={{
                fontSize: '0.4em', lineHeight: 1,
                color: 'rgba(255,255,255,0.2)',
                paddingLeft: '24px',
              }}>✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
