import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════════
   SVG Icons
══════════════════════════════════════════════════════════════ */
const PlaneIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22h20" /><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 3.15 1.16c.33.67.24 1.48-.22 2.08l-3.23 4.15a2 2 0 0 1-1.3.74l-8.52 1.44c-.6.1-1.19.12-1.78.08Z" />
  </svg>
);
const GlobeIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);
const CapIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.42 10.922a2 2 0 0 1-.019 3.837l-8.51 3.698a2 2 0 0 1-1.78 0l-8.51-3.698a2 2 0 0 1-.019-3.837l8.53-3.69a2 2 0 0 1 1.762 0Z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);
const BookIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);
const StarIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const AwardIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const CheckIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const QuoteIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);
const MapPinIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const BellIcon = ({ size = 24, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   Data
══════════════════════════════════════════════════════════════ */
const STUDENTS = [
  { name: 'Vishnu E.', uni: 'NCSU', country: '🇺🇸', course: 'MS', year: '2023', color: '#B4783C', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Pehal K.', uni: 'Purdue', country: '🇺🇸', course: 'Undergraduate', year: '2023', color: '#4A90D9', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
  { name: 'Mukta R.', uni: 'Parsons', country: '🇺🇸', course: 'Design', year: '2021', color: '#F9D440', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Ishita M.', uni: 'Cardiff', country: '🇬🇧', course: 'Urban Design', year: '2022', color: '#B4783C', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sai S.', uni: 'UC San Diego', country: '🇺🇸', course: 'MS', year: '2023', color: '#4A90D9', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
  { name: 'Raj K.', uni: 'CU Boulder', country: '🇺🇸', course: 'MS', year: '2022', color: '#F9D440', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Vishnu E.', uni: 'NCSU', country: '🇺🇸', course: 'MS', year: '2023', color: '#B4783C', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Pehal K.', uni: 'Purdue', country: '🇺🇸', course: 'Undergraduate', year: '2023', color: '#4A90D9', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  { name: 'Mukta R.', uni: 'Parsons', country: '🇺🇸', course: 'Design', year: '2021', color: '#F9D440', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' },
  { name: 'Ishita M.', uni: 'Cardiff', country: '🇬🇧', course: 'Urban Design', year: '2022', color: '#B4783C', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sai S.', uni: 'UC San Diego', country: '🇺🇸', course: 'MS', year: '2023', color: '#4A90D9', img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400' },
  { name: 'Raj K.', uni: 'CU Boulder', country: '🇺🇸', course: 'MS', year: '2022', color: '#F9D440', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
];

const FEATURES = [
  { icon: PlaneIcon, color: '#7DC1B1', title: 'Bespoke Strategy', desc: 'Personalized profiling and narrative building tailored to top-tier universities.' },
  { icon: GlobeIcon, color: '#F9D440', title: 'Elite Network', desc: 'Direct mentorship from alumni of Ivy League, Oxbridge, and elite global institutions.' },
  { icon: CapIcon, color: '#B4783C', title: 'End-to-End Care', desc: 'Comprehensive support from test prep and essays to post-arrival settlement.' },
];
const STATS = [
  { value: 8000, suffix: '+', label: 'Admissions', icon: CapIcon, color: '#F9D440' },
  { value: 25, suffix: 'M+', label: 'USD in Financial Aid', icon: CheckIcon, color: '#7DC1B1' },
  { value: 1200, suffix: '+', label: 'Universities', icon: BookIcon, color: '#B4783C' },
  { value: 20, suffix: ' Yrs', label: 'Of Excellence', icon: GlobeIcon, color: '#F9D440' },
];
const PROCESS_STEPS = [
  { step: '01', title: 'Profile Assessment', desc: 'Deep-dive evaluation of your academic background, goals, and strengths.', color: '#F9D440' },
  { step: '02', title: 'University Shortlisting', desc: 'Curated list of best-fit universities across your target countries.', color: '#7DC1B1' },
  { step: '03', title: 'Application Craft', desc: 'Elite-standard SOP, LOR, and resume crafted by former admissions officers.', color: '#B4783C' },
  { step: '04', title: 'Visa & Arrival', desc: 'End-to-end visa support, pre-departure briefings, and post-arrival assistance.', color: '#F9D440' },
];
const TICKER_ITEMS = [
  '🎓 Vishnu → North Carolina State University', '✈️ Pehal → Purdue University', '🏆 Mukta → Parsons',
  '🌟 Ishita → Cardiff University', '📚 Sai Sumeet → UC San Diego', '🎯 Raj → CU Boulder',
  '🚀 Vishnu → NCSU', '💫 Ishita → Cardiff',
  '⭐ Pehal → Purdue', '🌍 Sai Sumeet → UCSD',
  '🏅 Mukta → Parsons', '🎖️ Raj → CU Boulder',
];
const TESTIMONIALS = [
  { quote: "As a confused B-Tech graduate, I approached this consultancy a year back and asked them to assist me through the application process for my masters. Right from providing clarity about the courses to one on one visa interview training, they had my back throughout the process.", name: 'Vishnu Erapalli', course: 'MS', uni: 'North Carolina State University', country: '🇺🇸', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', color: '#4A90D9' },
  { quote: "This consultancy has really made the process of applying for masters so much easier and approachable. A huge thanks to the entire team for helping me every step of the way. Truly the best investment I've made with regards to my career so far.", name: 'Ishita Mathur', course: 'Urban Design', uni: 'Cardiff University', country: '🇬🇧', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', color: '#F9D440' },
  { quote: "They were very cooperative, especially my counsellor. They guided my son and us in a very approachable way. My son's visa is approved and I'm very much thankful to the entire team. Thanks once again.", name: 'Sai Sumeet', course: 'MS', uni: 'University of California, San Diego', country: '🇺🇸', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', color: '#B4783C' },
];
const DESTINATIONS = [
  { flag: '🇬🇧', country: 'United Kingdom', unis: '130+', students: '85', topUni: 'Oxford, LSE, Imperial', color: '#4A90D9', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900' },
  { flag: '🇺🇸', country: 'United States', unis: '200+', students: '120', topUni: 'Harvard, MIT, Stanford', color: '#F9D440', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=900' },
  { flag: '🇨🇦', country: 'Canada', unis: '80+', students: '60', topUni: 'U of Toronto, UBC', color: '#FF7043', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=900' },
  { flag: '🇦🇺', country: 'Australia', unis: '40+', students: '45', topUni: 'Melbourne, Sydney', color: '#4ADE80', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=900' },
  { flag: '🇩🇪', country: 'Germany', unis: '60+', students: '35', topUni: 'TU Munich, Heidelberg', color: '#7E57C2', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=900' },
];


/* ══════════════════════════════════════════════════════════════
   NEW: Study Destination Cards
══════════════════════════════════════════════════════════════ */
function DestinationShowcase({ activeIndex, onSelectIndex }) {

  const d = activeIndex !== null ? DESTINATIONS[activeIndex] : {
    country: 'Global Network',
    flag: '🌍',
    color: '#4A90D9',
    img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=1200',
    unis: '500+',
    students: '10k',
    topUni: 'Ivy League & Russell Group'
  };
  return (
    <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto 0', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 12, letterSpacing: 8, textTransform: 'uppercase', color: '#4A90D9', fontWeight: 800, border: '1px solid rgba(74,144,217,0.3)', padding: '10px 28px', borderRadius: 100, display: 'inline-block', marginBottom: 24, boxShadow: '0 0 20px rgba(74,144,217,0.1)' }}>
          Study Destinations
        </motion.div>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
          Your world,{' '}<span style={{ color: '#4A90D9', textShadow: '0 0 30px rgba(74,144,217,0.5)' }}>your campus</span>
        </motion.h3>
      </div>

      <div className="destinations-showcase-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 12, minHeight: 500 }}>
        {/* Selector column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {DESTINATIONS.map((dest, i) => (
            <motion.div key={i} onClick={() => onSelectIndex(i === activeIndex ? null : i)} whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ padding: '18px 24px', borderRadius: 16, cursor: 'pointer', border: `1px solid ${i === activeIndex ? dest.color + '60' : 'rgba(255,255,255,0.06)'}`, background: i === activeIndex ? `linear-gradient(135deg, ${dest.color}15, rgba(5,7,12,0.9))` : 'rgba(10,12,20,0.6)', display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.4s ease' }}>
              <span style={{ fontSize: '1.8rem' }}>{dest.flag}</span>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }}>{dest.country}</div>
                <div style={{ fontSize: '0.78rem', color: i === activeIndex ? dest.color : 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: 1, transition: 'color 0.3s' }}>{dest.unis} Universities</div>
              </div>
              {i === activeIndex && <motion.div layoutId="activeIndexBar" style={{ marginLeft: 'auto', width: 4, height: 36, borderRadius: 4, background: dest.color }} />}
            </motion.div>
          ))}
        </div>

        {/* Feature panel */}
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', border: `1px solid ${d.color}30`, boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)` }}>
            <img src={d.img} alt={d.country} width={800} height={1000} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(0.7)' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${d.color}20 0%, transparent 50%), linear-gradient(to top, rgba(5,7,12,0.95) 0%, transparent 60%)` }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${d.color}20 0%, transparent 50%), linear-gradient(to top, rgba(5,7,12,0.95) 0%, transparent 60%)` }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '48px 40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>{d.flag}</div>
              <h3 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900, color: '#fff', margin: '0 0 8px 0', fontFamily: 'var(--font-sans)' }}>{d.country}</h3>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 20 }}>
                {[{ label: 'Universities', val: d.unis }, { label: 'Students Placed', val: d.students + '+' }, { label: 'Top Picks', val: d.topUni }].map((s, j) => (
                  <div key={j}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: d.color }}>{s.val}</div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NEW: Cinematic Testimonial Slider
══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   Animated Stats Counter
══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: v => setDisplay(Math.floor(v)) });
    return controls.stop;
  }, [isInView, value, duration]);
  return <span ref={ref}>{display}{suffix}</span>;
}
function StatsRow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for each card to create a staggered, scroll-reactive depth effect
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y4 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const transforms = [y1, y2, y3, y4];

  return (
    <div ref={containerRef} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto 100px', padding: '0 24px' }}>
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(249,212,64,0.5) 30%, rgba(249,212,64,0.5) 70%, transparent 100%)', marginBottom: '60px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40 }}>
        {STATS.map((stat, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${stat.color}40` }}
            style={{
              y: transforms[i % 4],
              textAlign: 'center', position: 'relative', padding: '40px 20px',
              background: 'linear-gradient(145deg, rgba(16,20,32,0.8), rgba(5,7,12,0.9))',
              borderRadius: 20, border: `1px solid rgba(255,255,255,0.06)`,
              borderTop: `1px solid rgba(255,255,255,0.12)`,
              boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
              overflow: 'hidden', cursor: 'default'
            }}
          >
            <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: 120, height: 120, background: `radial-gradient(circle, ${stat.color}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}08)`, border: `1px solid ${stat.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: stat.color }}>
              <stat.icon size={26} strokeWidth={1.5} />
            </div>
            <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: stat.color, letterSpacing: '-0.03em', lineHeight: 1, textShadow: `0 0 30px ${stat.color}60`, marginBottom: 12 }}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(249,212,64,0.3), transparent)', marginTop: '60px' }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Live Placement Ticker
══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   Process Journey Steps
══════════════════════════════════════════════════════════════ */
function ProcessJourney() {
  return (
    <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1800px', margin: '0 auto 160px', padding: '0 40px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 100 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ fontSize: 13, letterSpacing: 8, textTransform: 'uppercase', color: '#7E57C2', fontWeight: 800, border: '1px solid rgba(126,87,194,0.3)', padding: '12px 32px', borderRadius: 100, display: 'inline-block', marginBottom: 32, background: 'rgba(126,87,194,0.05)' }}>
          The Journey
        </motion.div>
        <h3 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
          From Dream to Degree in <span style={{ color: 'transparent', WebkitTextStroke: '2px #7E57C2', textShadow: '0 0 40px rgba(126,87,194,0.4)' }}>4 Steps</span>
        </h3>
      </div>

      {/* Horizontal Timeline Track */}
      <div className="grid-4-col" style={{ position: 'relative', width: '100%', gap: 24, padding: '20px 0' }}>
        {/* Glow Line behind cards */}
        <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 2, background: 'linear-gradient(90deg, rgba(249,212,64,0) 0%, rgba(249,212,64,0.5) 50%, rgba(125,193,177,0) 100%)', zIndex: 0, boxShadow: '0 0 10px rgba(249,212,64,0.5)' }} />

        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -20, scale: 1.03 }}
            style={{ flex: 1, position: 'relative', cursor: 'pointer', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Step Node */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${step.color}20 0%, #05070c 80%)`, border: `2px solid ${step.color}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, boxShadow: `0 0 40px ${step.color}40, inset 0 0 20px ${step.color}20`, position: 'relative', zIndex: 3 }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: step.color, letterSpacing: 2 }}>{step.step}</span>
              {/* Outer ring animation */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: -8, border: `1px dashed ${step.color}40`, borderRadius: '50%' }} />
            </div>

            {/* Content Card */}
            <div style={{ background: 'linear-gradient(160deg, rgba(16,20,32,0.9), rgba(5,7,12,0.95))', borderRadius: 24, padding: '40px 32px', border: `1px solid rgba(255,255,255,0.05)`, borderTop: `2px solid ${step.color}50`, boxShadow: `0 30px 60px rgba(0,0,0,0.6)`, position: 'relative', overflow: 'hidden', width: '100%', boxSizing: 'border-box', textAlign: 'center', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Ambient background glow */}
              <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 150, height: 150, background: `radial-gradient(circle, ${step.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

              <h4 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>{step.title}</h4>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Cinema Poster Feature Cards
══════════════════════════════════════════════════════════════ */

const FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=900',
];
const FEATURE_PALETTES = [
  { bg: 'linear-gradient(160deg,#071a2e 0%,#0a2a4a 50%,#0d1f35 100%)', accent: '#7DC1B1', numColor: 'rgba(125,193,177,0.08)', glow: '#7DC1B1' },
  { bg: 'linear-gradient(160deg,#1a1100 0%,#2a1c00 50%,#201500 100%)', accent: '#F9D440', numColor: 'rgba(249,212,64,0.08)', glow: '#F9D440' },
  { bg: 'linear-gradient(160deg,#1a0900 0%,#2d1200 50%,#1e0b00 100%)', accent: '#E07B39', numColor: 'rgba(224,123,57,0.08)', glow: '#E07B39' },
];

function CinematicHoverGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div style={{
      width: '100%',
      height: '75vh',
      minHeight: '600px',
      maxHeight: '900px',
      display: 'flex',
      gap: 12,
      position: 'relative',
      zIndex: 10,
      marginBottom: 80,
      borderRadius: 32,
      overflow: 'hidden',
    }}>
      {FEATURES.map((feature, i) => {
        const isHovered = hoveredIndex === i;
        const palette = FEATURE_PALETTES[i];

        return (
          <motion.div
            key={i}
            onHoverStart={() => setHoveredIndex(i)}
            onClick={() => {
              const contactElement = document.getElementById('contact-section');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            animate={{ flex: isHovered ? 6 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              height: '100%',
              borderRadius: 24,
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#05070c'
            }}
          >
            {/* Background Image with slow cinematic scale */}
            <motion.img
              src={FEATURE_IMAGES[i]}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center', opacity: 0.8
              }}
            />

            {/* Overlays */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)' }}
            />
            <motion.div
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              style={{ position: 'absolute', inset: 0, background: `linear-gradient(45deg, ${palette.accent}, transparent)` }}
            />

            {/* Top Badge (Always visible, but rotates/fades based on hover) */}
            <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 10 }}>
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                  rotate: isHovered ? 0 : -90,
                  transformOrigin: 'left top'
                }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'rgba(0,0,0,0.8)', border: `1px solid ${palette.accent}50`,
                  padding: '10px 20px', borderRadius: 100
                }}
              >
                <div style={{ color: palette.accent }}><feature.icon size={16} strokeWidth={2.5} /></div>
                <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase' }}>
                  {['Strategy', 'Network', 'Care'][i]}
                </span>
              </motion.div>
            </div>

            {/* Huge Vertical Number for inactive state */}
            <motion.div
              animate={{ opacity: isHovered ? 0 : 0.1 }}
              style={{
                position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
                fontSize: '12rem', fontFamily: 'var(--font-serif)', color: '#fff',
                fontWeight: 900, lineHeight: 1, pointerEvents: 'none'
              }}
            >
              {i + 1}
            </motion.div>

            {/* Content Container (Revealed only on hover) */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 40
              }}
              transition={{ duration: 0.6, delay: isHovered ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0 60px 60px', zIndex: 10,
                display: 'flex', flexDirection: 'column',
                pointerEvents: isHovered ? 'auto' : 'none'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontFamily: 'var(--font-serif)',
                color: '#fff',
                margin: '0 0 24px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                textShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                {feature.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 60 }}>
                <p style={{
                  fontSize: '1.25rem',
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0,
                  maxWidth: '500px',
                  lineHeight: 1.6,
                  fontWeight: 300
                }}>
                  {feature.desc}
                </p>

                {/* Stunning Button */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  border: `1px solid ${palette.accent}50`,
                  padding: '16px 32px', borderRadius: 100,
                  background: 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                  onMouseOver={e => e.currentTarget.style.background = `${palette.accent}20`}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >
                  <span style={{ fontSize: '0.8rem', letterSpacing: 4, textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>
                    Book Free Session
                  </span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: palette.accent, boxShadow: `0 0 15px ${palette.accent}` }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}


function GlassCarouselLoop({ activeCountryIndex }) {
  // Step 1: get the raw filtered list
  let filteredStudents = activeCountryIndex !== null
    ? STUDENTS.filter(s => s.country === DESTINATIONS[activeCountryIndex].flag)
    : STUDENTS;
  if (filteredStudents.length === 0) filteredStudents = STUDENTS;

  // Step 2: Always pad to exactly 12 cards so angular spacing stays consistent
  const TARGET_CARDS = 12;
  let displayStudents = [...filteredStudents];
  while (displayStudents.length < TARGET_CARDS) {
    displayStudents = [...displayStudents, ...filteredStudents];
  }
  displayStudents = displayStudents.slice(0, TARGET_CARDS);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [vpWidth, setVpWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  useEffect(() => {
    const onResize = () => setVpWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const CARD_WIDTH = vpWidth < 1600 ? 240 : 340;
  const radius = Math.round((CARD_WIDTH * TARGET_CARDS) / (2 * Math.PI)) + 60;

  return (
    <>
      <div className="glass-carousel-wrapper" style={{ position: 'relative', width: '100%', height: '100lvh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '2000px', overflow: 'hidden', marginTop: '-40px', zIndex: 5, isolation: 'isolate', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
        <div className="glass-carousel-title" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ fontSize: 13, letterSpacing: 10, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>The Network</div>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '2px rgba(249,212,64,0.25)', margin: 0 }}>Global Alumni</h2>
        </div>
        <motion.div className="glass-carousel-inner" animate={{ rotateY: [0, -360] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, transformStyle: 'preserve-3d' }}>
          {displayStudents.map((student, i) => {
            const angle = (360 / displayStudents.length) * i;
            return (
              <div className="glass-carousel-item-wrapper" key={i} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`, transformStyle: 'preserve-3d' }}>
                <div
                  className="glass-carousel-item"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedStudent(student)}
                  style={{ width: '340px', height: '480px', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: `1px solid ${hoveredIndex === i ? student.color : 'rgba(255,255,255,0.1)'}`, boxShadow: hoveredIndex === i ? `0 40px 80px rgba(0,0,0,0.9), 0 0 40px ${student.color}40` : `0 40px 80px rgba(0,0,0,0.9)`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'rotateX(-5deg)', background: '#020205', cursor: 'pointer', transition: 'box-shadow 0.5s, border-color 0.5s' }}>
                  <img src={student.img} alt={student.name} width={400} height={400} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)', transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: hoveredIndex === i ? 0 : 0.5, transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: 'none', zIndex: 1 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%', background: 'linear-gradient(to top, rgba(5,7,12,0.97) 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 2, padding: '32px 24px', textAlign: 'center', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{student.country}</div>
                    <h4 style={{ fontSize: '1.6rem', color: '#fff', margin: '0 0 4px 0', fontFamily: 'var(--font-serif)' }}>{student.name}</h4>
                    <div style={{ fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', color: student.color, fontWeight: 800, margin: '0 0 12px 0' }}>{student.uni}</div>
                    <div style={{ width: '60%', height: '1px', background: `linear-gradient(90deg, transparent, ${student.color}, transparent)`, margin: '0 auto 12px' }} />
                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>{student.course}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Class of {student.year}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '20vw', background: 'linear-gradient(to right, #020205 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '20vw', background: 'linear-gradient(to left, #020205 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(2,2,5,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', width: '100%', maxWidth: 480, borderRadius: 28, overflow: 'hidden', background: 'linear-gradient(145deg, rgba(14,16,26,0.98), rgba(4,5,10,0.99))', border: `1px solid ${selectedStudent.color}40`, boxShadow: `0 60px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px ${selectedStudent.color}20` }}
            >
              {/* Hero image */}
              <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                <img src={selectedStudent.img} alt={selectedStudent.name} width={800} height={1000} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, rgba(4,5,10,0.98) 100%)` }} />
                {/* Close button */}
                <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(4,5,10,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
              {/* Info */}
              <div style={{ padding: '28px 32px 36px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{selectedStudent.country}</div>
                <h3 style={{ fontSize: '2rem', color: '#fff', margin: '0 0 4px', fontFamily: 'var(--font-serif)' }}>{selectedStudent.name}</h3>
                <div style={{ fontSize: '0.85rem', letterSpacing: 3, textTransform: 'uppercase', color: selectedStudent.color, fontWeight: 800, marginBottom: 20 }}>{selectedStudent.uni}</div>
                <div style={{ width: '100%', height: '1px', background: `linear-gradient(90deg, ${selectedStudent.color}, transparent)`, marginBottom: 20 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Programme</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{selectedStudent.course}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Graduated</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>Class of {selectedStudent.year}</span>
                  </div>
                </div>

                {/* Additional content requested by user */}
                <div style={{ marginTop: 24, padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                    "Learn Overseas transformed my ambition into reality. Their meticulous guidance through the application process was instrumental in securing my place at {selectedStudent.uni}."
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    window.location.href = '/contact';
                  }}
                  style={{ marginTop: 28, padding: '14px', borderRadius: 100, background: `linear-gradient(135deg, ${selectedStudent.color}30, ${selectedStudent.color}10)`, border: `1px solid ${selectedStudent.color}50`, color: selectedStudent.color, textAlign: 'center', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Start Your Journey →
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Section
══════════════════════════════════════════════════════════════ */
export default function StudentSuccessWall() {
  const [activeCountryIndex, setActiveCountryIndex] = useState(null);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <section ref={containerRef} onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '200px', background: 'transparent', overflow: 'hidden', isolation: 'isolate' }}>


      {/* Cinematic Vignette removed to eliminate the seam with InfiniteMarquee */}

      {/* Dynamic Cursor Spotlight */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, x: useTransform(mouseX, v => v - 350), y: useTransform(mouseY, v => v - 350), width: 700, height: 700, background: 'radial-gradient(circle, rgba(249,212,64,0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 3 }} />



      {/* Background Watermark */}
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '8%', left: 0, whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none', display: 'flex' }}>
        <h1 style={{ fontSize: 'clamp(10rem, 25vw, 30rem)', fontFamily: 'var(--font-sans)', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.018)', margin: 0, textTransform: 'uppercase', userSelect: 'none' }}>ELITE ADMISSIONS ELITE ADMISSIONS{' '}</h1>
      </motion.div>

      <div style={{ maxWidth: '1500px', width: '100%', padding: '0 24px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ fontSize: 12, letterSpacing: 8, textTransform: 'uppercase', color: '#F9D440', fontWeight: 800, border: '1px solid rgba(249,212,64,0.3)', padding: '12px 32px', borderRadius: 100, display: 'inline-block', marginBottom: 32, boxShadow: '0 0 30px rgba(249,212,64,0.12)' }}>Our Consultancy</motion.div>
          <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em', lineHeight: 1.05, background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 40, maxWidth: 1200, margin: '0 auto 40px' }}>
            We don't just apply. We <span style={{ color: '#F9D440', WebkitTextFillColor: 'initial', textShadow: '0 0 40px rgba(249,212,64,0.4)' }}>engineer</span> your acceptance.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', color: 'rgba(255,255,255,0.7)', maxWidth: 1000, margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
            Learn Overseas is a boutique international education consultancy dedicated to the top 1%.
            Unlike volume-based agencies, we take a bespoke, highly strategic approach to university admissions.
          </motion.p>
        </div>

        {/* Accordion strip hint text */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24 }}
        >
          Hover to explore
        </motion.p>

        {/* Interactive Cinematic Gallery */}
        <CinematicHoverGallery />
      </div>

      {/* ─── NEW components in order ─── */}
      <StatsRow />
      <DestinationShowcase activeIndex={activeCountryIndex} onSelectIndex={setActiveCountryIndex} />
      <GlassCarouselLoop activeCountryIndex={activeCountryIndex} />
      <ProcessJourney />


    </section>
  );
}
