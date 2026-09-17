import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UniversityNav from '../components/UniversityNav';
import UnifiedAspireSection from '../components/UnifiedAspireSection';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import UniversityFloaters from '../components/UniversityFloaters';

// ── University data ──────────────────────────────────────────────────────────
const universities = [
  {
    id: 1,
    name: 'University of Oxford',
    shortName: 'Oxford',
    location: 'Oxford, UK',
    country: 'UK',
    acceptance: '17.5%',
    rank: 1,
    rankLabel: '#1 Global',
    tag: 'Research Leader',
    tagColor: '#D4AF37',
    founded: '1096',
    students: '26,000',
    programs: '350+',
    tuition: '£26,770 / yr',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=90',
    featured: true,
    size: 'hero',
    region: 'UK',
  },
  {
    id: 2,
    name: 'Harvard University',
    shortName: 'Harvard',
    location: 'Cambridge, USA',
    country: 'USA',
    acceptance: '3.19%',
    rank: 3,
    rankLabel: '#3 Global',
    tag: 'Ivy League',
    tagColor: '#A41034',
    founded: '1636',
    students: '23,000',
    programs: '200+',
    tuition: '$57,261 / yr',
    image: 'https://images.unsplash.com/photo-1567982047351-76b6f93e38ee?auto=format&fit=crop&w=900&q=90',
    featured: false,
    size: 'tall',
    region: 'USA',
  },
  {
    id: 3,
    name: 'MIT',
    shortName: 'MIT',
    location: 'Cambridge, USA',
    country: 'USA',
    acceptance: '3.96%',
    rank: 2,
    rankLabel: '#2 Global',
    tag: 'STEM Leader',
    tagColor: '#A31F34',
    founded: '1861',
    students: '11,500',
    programs: '150+',
    tuition: '$57,986 / yr',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=90',
    featured: false,
    size: 'tall',
    region: 'USA',
  },
  {
    id: 4,
    name: 'University of Cambridge',
    shortName: 'Cambridge',
    location: 'Cambridge, UK',
    country: 'UK',
    acceptance: '21%',
    rank: 5,
    rankLabel: '#5 Global',
    tag: '800+ Yrs Legacy',
    tagColor: '#003B71',
    founded: '1209',
    students: '24,000',
    programs: '300+',
    tuition: '£24,507 / yr',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=90',
    featured: false,
    size: 'wide',
    region: 'UK',
  },
  {
    id: 5,
    name: 'Stanford University',
    shortName: 'Stanford',
    location: 'California, USA',
    country: 'USA',
    acceptance: '3.95%',
    rank: 4,
    rankLabel: '#4 Global',
    tag: 'Silicon Valley',
    tagColor: '#8C1515',
    founded: '1885',
    students: '17,000',
    programs: '180+',
    tuition: '$56,169 / yr',
    image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=900&q=90',
    featured: false,
    size: 'square',
    region: 'USA',
  },
  {
    id: 6,
    name: 'ETH Zürich',
    shortName: 'ETH',
    location: 'Zürich, Switzerland',
    country: 'Europe',
    acceptance: '27%',
    rank: 7,
    rankLabel: '#7 Global',
    tag: 'Engineering Hub',
    tagColor: '#1B6CA8',
    founded: '1855',
    students: '22,000',
    programs: '120+',
    tuition: 'CHF 730 / yr',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=90',
    featured: false,
    size: 'square',
    region: 'Europe',
  },
  {
    id: 7,
    name: 'NUS Singapore',
    shortName: 'NUS',
    location: 'Singapore',
    country: 'Asia',
    acceptance: '5%',
    rank: 8,
    rankLabel: '#8 Global',
    tag: 'Asia\'s Finest',
    tagColor: '#003D7C',
    founded: '1905',
    students: '40,000',
    programs: '250+',
    tuition: 'SGD 17,550 / yr',
    image: 'https://images.unsplash.com/photo-1529785790013-0f90b4c67b53?auto=format&fit=crop&w=900&q=90',
    featured: false,
    size: 'square',
    region: 'Asia',
  },
  {
    id: 8,
    name: 'University of Toronto',
    shortName: 'UofT',
    location: 'Toronto, Canada',
    country: 'Canada',
    acceptance: '43%',
    rank: 21,
    rankLabel: '#21 Global',
    tag: 'Top Canadian',
    tagColor: '#002A5C',
    founded: '1827',
    students: '97,000',
    programs: '700+',
    tuition: 'CAD 54,020 / yr',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=90',
    featured: false,
    size: 'square',
    region: 'Canada',
  },
];

const regions = ['All', 'USA', 'UK', 'Europe', 'Asia', 'Canada'];

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target, duration = 1.5) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

// ── 3D-tilt card ─────────────────────────────────────────────────────────────
function UniversityCard({ uni, index, onHover }) {
  const navigate = useNavigate();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { damping: 30, stiffness: 250 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { damping: 30, stiffness: 250 });
  const imgX = useTransform(mx, [0, 1], ['3%', '-3%']);
  const imgY = useTransform(my, [0, 1], ['3%', '-3%']);
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); setHovered(false); onHover(null); };
  const onEnter = () => { setHovered(true); onHover(uni); };

  // Height based on size
  const heights = { hero: '600px', wide: '420px', tall: '520px', square: '340px' };
  const h = heights[uni.size] || '380px';

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        height: h,
        borderRadius: '24px',
        cursor: 'pointer',
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        gridColumn: uni.size === 'hero' ? 'span 8' : uni.size === 'wide' ? 'span 8' : uni.size === 'tall' ? 'span 4' : 'span 4',
      }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 60px 120px rgba(0,0,0,0.9), 0 0 60px ${uni.tagColor}30`
            : '0 20px 60px rgba(0,0,0,0.5)',
        }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '24px', overflow: 'hidden',
          border: hovered ? `1px solid ${uni.tagColor}55` : '1px solid rgba(255,255,255,0.06)',
          transition: 'border-color 0.4s',
        }}
      >
        {/* Photo */}
        <motion.img
          src={uni.image} alt={uni.name}
          style={{
            position: 'absolute', top: '-5%', left: '-5%',
            width: '110%', height: '110%', objectFit: 'cover',
            filter: hovered ? 'brightness(0.65) saturate(1.2)' : 'brightness(0.5) saturate(1.0)',
            transition: 'filter 0.5s ease',
            x: imgX, y: imgY,
          }}
        />

        {/* Dark vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)',
        }} />

        {/* Top-right rank badge */}
        <div className="uni-card-badge-right" style={{
          position: 'absolute', top: 18, right: 18,
          background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 100, padding: '5px 14px',
          fontSize: 10, fontWeight: 900, letterSpacing: 3,
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
        }}>
          {uni.rankLabel}
        </div>

        {/* Acceptance top-left */}
        <div className="uni-card-badge-left" style={{
          position: 'absolute', top: 18, left: 18,
          background: `${uni.tagColor}22`,
          border: `1px solid ${uni.tagColor}66`,
          borderRadius: 100, padding: '5px 14px',
          fontSize: 10, fontWeight: 900, letterSpacing: 2,
          textTransform: 'uppercase', color: uni.tagColor,
        }}>
          {uni.acceptance} Accept
        </div>

        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 22px' }}>

          {/* Tag */}
          <motion.div
            animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginBottom: 10,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: uni.tagColor, boxShadow: `0 0 8px ${uni.tagColor}`, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', color: uni.tagColor }}>
              {uni.tag}
            </span>
          </motion.div>

          {/* Name */}
          <h3 style={{
            color: '#fff',
            fontFamily: 'var(--font-serif)',
            fontSize: uni.size === 'hero' || uni.size === 'wide' ? 'clamp(2rem, 3.5vw, 3rem)' : 'clamp(1.4rem, 2vw, 1.9rem)',
            margin: '0 0 10px', lineHeight: 1.05, fontWeight: 400,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}>{uni.name}</h3>

          {/* Separator + location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: hovered ? 14 : 0, transition: 'margin 0.3s' }}>
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.25)' }} />
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>
              {uni.location}
            </span>
          </div>

          {/* Hover-reveal stats row */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8, marginTop: 4,
                }}>
                  {[
                    { label: 'Founded', value: uni.founded },
                    { label: 'Students', value: uni.students },
                    { label: 'Tuition', value: uni.tuition },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, padding: '10px 12px', textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 700 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/university/${encodeURIComponent(uni.name)}`);
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%', marginTop: 10, padding: '12px',
                    borderRadius: 12, border: `1px solid ${uni.tagColor}66`,
                    background: `${uni.tagColor}15`, color: '#fff',
                    fontSize: 11, fontWeight: 800, letterSpacing: 3,
                    textTransform: 'uppercase', cursor: 'pointer',
                  }}
                >
                  View Details →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Stat counter card ─────────────────────────────────────────────────────────
function StatCard({ value, label, suffix = '', delay = 0 }) {
  const numVal = parseInt(value.replace(/\D/g, ''));
  const { count, ref } = useCounter(numVal, 2);
  const displayVal = isNaN(numVal) ? value : `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1, textAlign: 'center', padding: '28px 20px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{
        fontSize: 'clamp(2.5rem, 4vw, 4rem)',
        fontFamily: 'var(--font-serif)',
        color: '#fff', lineHeight: 1, marginBottom: 10,
      }}>
        {displayVal}
      </div>
      <div style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 800 }}>
        {label}
      </div>
    </motion.div>
  );
}

// ── Horizontal marquee ticker ────────────────────────────────────────────────
function UniversityTicker() {
  const items = ['Oxford', 'Harvard', 'MIT', 'Stanford', 'Cambridge', 'ETH Zürich', 'NUS', 'Toronto', 'Imperial', 'LSE', 'UCL', 'Yale', 'Princeton', 'Columbia', 'Cornell'];

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0', marginBottom: 60 }}>
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 60 }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(249,212,64,0.3)', display: 'inline-block' }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function UniversitiesHero() {
  return (
    <div style={{ position: 'relative', paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', overflow: 'hidden' }}>

      {/* Gold radial ambient */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '80vw', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(249,212,64,0.2) 0%, transparent 65%)',
        }}
      />
      <div className="ambient-orb-1" style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.08) 0%, transparent 60%)', filter: 'blur(40px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
      <div className="ambient-orb-2" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.05) 0%, transparent 60%)', filter: 'blur(40px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />

      <UniversityFloaters />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            border: '1px solid rgba(249,212,64,0.35)', borderRadius: 100,
            padding: '9px 24px', marginBottom: 32,
            background: 'rgba(249,212,64,0.05)',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-gold)', display: 'inline-block' }}
          />
          <span style={{ fontSize: 10, letterSpacing: 6, fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
            Global Destinations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(4rem, 9vw, 9rem)',
            fontFamily: 'var(--font-serif)', fontWeight: 400,
            lineHeight: 0.95, margin: '0 auto 24px', maxWidth: '1100px',
            color: '#fff',
          }}
        >
          The World's{' '}
          <span style={{
            fontStyle: 'italic', color: 'transparent',
            WebkitTextStroke: '1.5px rgba(249,212,64,0.7)',
            filter: 'drop-shadow(0 0 40px rgba(249,212,64,0.25))',
          }}>
            Elite
          </span>
          <br />
          Universities
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{
            fontSize: '1.1rem', color: 'rgba(255,255,255,0.45)',
            maxWidth: 520, margin: '0 auto 56px', lineHeight: 1.8,
          }}
        >
          200+ partner institutions. 48 countries. Your dream program is closer than you think.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          className="uni-stats-bar"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            display: 'inline-flex', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.02)',
          }}
        >
          {[
            { v: '200', s: '+', label: 'Universities' },
            { v: '48', s: '', label: 'Countries' },
            { v: '98.7', s: '%', label: 'Visa Success' },
            { v: '24', s: 'M+', label: 'Scholarships' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '20px 36px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontFamily: 'var(--font-serif)', color: i === 0 ? 'var(--accent-gold)' : '#fff', lineHeight: 1 }}>
                {s.v}{s.s}
              </div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 8, fontWeight: 800 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Universities() {
  const navigate = useNavigate();
  // We'll track if the component has mounted to prevent SSR issues
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('Universities List');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredUni, setHoveredUni] = useState(null);

  const filtered = universities.filter(u => {
    const matchesRegion = filter === 'All' || u.region === filter;
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div style={{ background: '#020205', minHeight: '100vh', color: '#fff', position: 'relative', fontFamily: 'var(--font-sans)' }}>
      {/* Background ambient */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(252, 113, 51, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Fixed ambient grid lines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Gold top-edge glow */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(249,212,64,0.4), transparent)',
        zIndex: 100, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <UniversityNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === 'Universities List' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UniversitiesHero />
              <UniversityTicker />

              {/* Filter + Grid */}
              <section style={{ padding: '0 4vw 120px', maxWidth: 1700, margin: '0 auto' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
                  {/* Filter pills */}
                  <div className="filter-pills-scroll" style={{ display: 'flex', gap: 8 }}>
                    {regions.map(r => (
                      <motion.button
                        key={r}
                        onClick={() => setFilter(r)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: '10px 24px', borderRadius: 100,
                          border: filter === r ? '1px solid rgba(249,212,64,0.6)' : '1px solid rgba(255,255,255,0.07)',
                          background: filter === r ? 'rgba(249,212,64,0.1)' : 'rgba(255,255,255,0.02)',
                          color: filter === r ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)',
                          fontSize: 11, fontWeight: 800, letterSpacing: 3,
                          textTransform: 'uppercase', cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        {r}
                      </motion.button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div style={{ flexShrink: 0, width: '100%', maxWidth: 300 }}>
                    <input
                      type="text"
                      placeholder="Search universities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: '10px 24px', borderRadius: 100,
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(255,255,255,0.02)',
                        color: 'rgba(255,255,255,0.8)',
                        width: '100%',
                        fontSize: 11, fontWeight: 800, letterSpacing: 3,
                        textTransform: 'uppercase', outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Bento grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: '20px',
                    }}
                  >
                    {filtered.map((uni, i) => (
                      <UniversityCard key={uni.id} uni={uni} index={i} onHover={setHoveredUni} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </section>

              {/* Bottom editorial strip */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '80px 6vw',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40,
                flexWrap: 'wrap',
              }}>
                <div style={{ maxWidth: 500 }}>
                  <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontWeight: 800 }}>
                    Can't find your university?
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 3rem)', color: '#fff', margin: '0 0 16px', lineHeight: 1.1, fontWeight: 400 }}>
                    We work with 200+ institutions{' '}
                    <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>worldwide.</span>
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
                    Our database is just a sample. Talk to an advisor and we'll find the exact right program for your goals, budget, and profile.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(249,212,64,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '20px 56px', borderRadius: 100,
                    background: 'linear-gradient(135deg, var(--accent-gold), #d4a843)',
                    border: 'none', color: '#000',
                    fontSize: 12, fontWeight: 900, letterSpacing: 3,
                    textTransform: 'uppercase', cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(249,212,64,0.2)',
                  }}
                >
                  Talk to an Advisor
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'Aspire Plan' && (
            <motion.div
              key="aspire"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UnifiedAspireSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
