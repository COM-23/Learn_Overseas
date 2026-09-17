import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stateData } from '../data/stateData';

const OFFICES = [
  {
    id: 'hq-blr',
    stateId: 'ka',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '4th Floor, Donna Bas Tower, 401, 100, Railway Parallel Rd, Kumara Park West, Seshadripuram, Bengaluru, Karnataka 560020',
    phone: '+91 80 4110 5005',
    email: 'bangalore@learnoverseas.com',
    hours: 'Mon–Sat 10:00 – 18:30',
    link: 'https://share.google/LsdbJylQUoJNZ4wiW',
    pipPos: { top: '74%', left: '29%' },
    lat: 12.971,
    lng: 77.594,
  },
  {
    id: 'off-mum',
    stateId: 'mh',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '5th floor, Technopolis Knowledge Park, Mahakali Caves Rd, Chakala, Hanuman Nagar, Andheri East, Mumbai, Maharashtra 400093',
    phone: '+91 76662 10834',
    email: 'info@learnoverseas.com',
    hours: 'Mon–Sat 10:00 – 18:30',
    link: 'https://share.google/L3qpl4DkcjK9jjbxF',
    pipPos: { top: '62%', left: '26%' },
    lat: 19.076,
    lng: 72.877,
  },
  {
    id: 'off-pun',
    stateId: 'mh',
    city: 'Pune',
    state: 'Maharashtra',
    address: '7 Business Square by Naiknavare, Ganeshkhind Rd, near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016',
    phone: '+91 80 4110 5005',
    email: 'info@learnoverseas.com',
    hours: 'Mon–Sat 10:00 – 18:30',
    link: 'https://www.google.com/maps/search/?api=1&query=7+Business+Square+by+Naiknavare+Pune',
    pipPos: { top: '62%', left: '28%' },
    lat: 18.5204,
    lng: 73.8567,
  },
];

function SatelliteMap({ office }) {
  const zoom = 12;
  const lat = office.lat;
  const lng = office.lng;
  const n = Math.pow(2, zoom);
  const tileX = Math.floor((lng + 180) / 360 * n);
  const tileY = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);

  const tiles = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({ x: tileX + dx, y: tileY + dy, dx, dy });
    }
  }
  const tileSize = 256;
  const gridSize = tileSize * 3;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${gridSize} ${gridSize}`} preserveAspectRatio="xMidYMid slice">
      {tiles.map(({ x, y, dx, dy }) => (
        <image
          key={`${x}-${y}`}
          href={`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`}
          x={(dx + 1) * tileSize}
          y={(dy + 1) * tileSize}
          width={tileSize}
          height={tileSize}
        />
      ))}
      <circle cx={gridSize / 2} cy={gridSize / 2} r={16} fill="rgba(217,30,54,0)" stroke="rgba(217,30,54,0.85)" strokeWidth={2}>
        <animate attributeName="r" values="12;26" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx={gridSize / 2} cy={gridSize / 2} r={7} fill="#d91e36" stroke="#fff" strokeWidth={2.5} />
      <rect x={gridSize / 2 - 52} y={gridSize / 2 + 20} width={104} height={22} rx={4} fill="rgba(0,0,0,0.78)" />
      <text x={gridSize / 2} y={gridSize / 2 + 35} textAnchor="middle" fill="#fff" fontSize={11} fontFamily="monospace" fontWeight="700" letterSpacing="0.1em">
        {office.city.toUpperCase()}
      </text>
    </svg>
  );
}

export default function ContactUs() {
  const [activeId, setActiveId] = useState(null);
  const [envOpen, setEnvOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);
  const [formStep, setFormStep] = useState(1);

  const activeOffice = OFFICES.find(o => o.id === activeId);
  const activeStateId = activeOffice ? activeOffice.stateId : null;

  const handleSelect = (id) => {
    setActiveId(id);
    setEnvOpen(true);
  };

  const resetView = () => {
    setActiveId(null);
    setEnvOpen(false);
  };

  return (
    <div
      className="contact-outer-wrap"
      style={{
        minHeight: '100vh',
        backgroundColor: '#020205',
        color: '#ffffff',
        padding: '120px 0 80px',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
      {/* bg glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(249,212,64,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '100%', margin: '0', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <header className="contact-header" style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', fontWeight: 300, fontFamily: "'Playfair Display', serif", marginBottom: 20, lineHeight: 1.1 }}>
            Contact <em style={{ fontStyle: 'italic', fontWeight: 700, background: 'linear-gradient(to right, var(--accent-gold), var(--accent-copper))', WebkitBackgroundClip: 'text', color: 'transparent' }}>Us</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ maxWidth: 540, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7, color: '#a0a0ab', textAlign: 'center' }}>
            Connect with our elite advisory team. Let's engineer your global legacy and map your trajectory to the world's most prestigious institutions.
          </motion.p>
        </header>

        {/* ── Two-column layout: Find Us LEFT, Form RIGHT ── */}
        <div className="contact-main-wrapper" style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>

        {/* ── Find Us ── */}
        <motion.div 
          className="contact-find-us-card"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          style={{ flex: '0 0 calc(65% - 14px)', marginBottom: 0, padding: '36px', background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>

          {/* Left: selector + envelope */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 18, color: '#e8d8ac', fontWeight: 600 }}>Find Us</h2>
              <div className="contact-office-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {OFFICES.map(o => (
                  <button key={o.id} onClick={() => handleSelect(o.id)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: '14px 20px',
                    background: activeId === o.id ? 'linear-gradient(135deg,rgba(249,212,64,0.18),rgba(249,212,64,0.06))' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${activeId === o.id ? 'rgba(249,212,64,0.45)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14, cursor: 'pointer', transition: 'all 0.3s',
                    boxShadow: activeId === o.id ? '0 0 22px rgba(249,212,64,0.12)' : 'none',
                    width: '100%',
                  }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: activeId === o.id ? '#fff' : '#8a8a9a', marginBottom: 4 }}>{o.city}</span>
                    <span style={{ fontSize: 11, letterSpacing: '0.06em', color: activeId === o.id ? 'var(--accent-gold)' : '#4a4a5a' }}>{o.state}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {activeId && (
                  <motion.button initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    onClick={resetView}
                    style={{ background: 'rgba(249,212,64,0.1)', border: '1px solid rgba(249,212,64,0.3)', color: 'var(--accent-gold)', borderRadius: '20px', fontSize: 12, cursor: 'pointer', padding: '8px 16px', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, boxShadow: '0 0 10px rgba(249,212,64,0.1)', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,212,64,0.2)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(249,212,64,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,212,64,0.1)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(249,212,64,0.1)'; }}>
                    {'\u2190'} Show full India map
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Envelope */}
            <div className="contact-envelope-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 24 }}>
              <div className={`envelope ${envOpen ? 'open' : ''}`} onClick={() => setEnvOpen(!envOpen)}
                style={{ position: 'relative', width: '100%', maxWidth: 340, height: 220, margin: '0 auto', perspective: 1200, cursor: 'pointer' }}>
                <style>{`
                  .env-shadow{position:absolute;left:8%;right:8%;bottom:-12px;height:16px;background:radial-gradient(50% 100% at 50% 0%,rgba(0,0,0,0.55),transparent 75%);border-radius:5px;z-index:0}
                  .envelope .env-body{position:absolute;inset:0;border-radius:9px;background:linear-gradient(155deg,#e8d8ac 0%,#d3ba81 55%,#b6935a 100%);box-shadow:inset 0 0 0 1px rgba(74,48,10,0.35),0 20px 34px -16px rgba(0,0,0,0.65);z-index:1}
                  .envelope .env-left{position:absolute;top:0;left:0;bottom:0;width:51%;background:linear-gradient(140deg,#d6c182,#c09f5a);clip-path:polygon(0 0,100% 50%,0 100%);z-index:3;border-radius:9px 0 0 9px}
                  .envelope .env-right{position:absolute;top:0;right:0;bottom:0;width:51%;background:linear-gradient(220deg,#d6c182,#c09f5a);clip-path:polygon(100% 0,0 50%,100% 100%);z-index:3;border-radius:0 9px 9px 0}
                  .envelope .env-pocket{position:absolute;left:0;right:0;bottom:0;height:62%;background:linear-gradient(160deg,#dcc691,#b8965a);clip-path:polygon(0 100%,50% 20%,100% 100%);border-radius:0 0 9px 9px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.3);z-index:4}
                  .envelope .env-flap{position:absolute;left:0;right:0;top:0;height:58%;background:linear-gradient(200deg,#f0e0b3,#c7a969);clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:top center;transform:rotateX(0deg);transition:transform .95s cubic-bezier(.45,0,.2,1);box-shadow:0 3px 8px rgba(0,0,0,0.3);z-index:6}
                  .envelope.open .env-flap{transform:rotateX(-172deg);z-index:1}
                  @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(249,212,64,0.7), 0 3px 7px rgba(0,0,0,0.45); }
                    70% { box-shadow: 0 0 0 12px rgba(249,212,64,0), 0 3px 7px rgba(0,0,0,0.45); }
                    100% { box-shadow: 0 0 0 0 rgba(249,212,64,0), 0 3px 7px rgba(0,0,0,0.45); }
                  }
                  .envelope .env-seal{position:absolute;left:50%;top:38%;width:34px;height:34px;transform:translate(-50%,-50%);background:radial-gradient(circle at 34% 28%,#f6dda0,#e3b25c 55%,#8a5f22 100%);border-radius:50%;box-shadow:0 3px 7px rgba(0,0,0,0.45),inset 0 1px 1px rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;transition:opacity .3s,transform .3s;z-index:7}
                  .envelope:not(.open) .env-seal.active-pulse { animation: pulse-glow 2s infinite; }
                  .envelope.open .env-seal{opacity:0;transform:translate(-50%,-50%) scale(.4)}
                  .envelope .env-pull-tab { position: absolute; left: 50%; bottom: -24px; transform: translateX(-50%); background: var(--accent-gold); color: #111; font-size: 9px; font-weight: 800; padding: 4px 10px; border-radius: 4px; box-shadow: 0 4px 10px rgba(249,212,64,0.4); opacity: 0; transition: opacity 0.3s; z-index: 8; pointer-events: none; }
                  .envelope .env-pull-tab::before { content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%); border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 4px solid var(--accent-gold); }
                  .envelope:not(.open) .env-seal.active-pulse + .env-pull-tab { opacity: 1; animation: bounce-tab 2s infinite; }
                  @keyframes bounce-tab { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 4px); } }
                  .envelope .env-card{position:absolute;left:6%;right:6%;top:12%;height:75%;background:linear-gradient(180deg,#fbf7ee,#f0e9d7);border-radius:7px;box-shadow:0 8px 18px -10px rgba(0,0,0,0.5),0 0 0 1px rgba(0,0,0,0.07);z-index:2;padding:15px 16px 13px;transform:translateY(0%) scale(.94);transition:transform .95s cubic-bezier(.34,1.28,.4,1) .08s,box-shadow .5s ease .08s;overflow:hidden; isolation: isolate;}
                  .envelope .env-card::before { content: ''; position: absolute; inset: 0; background: url('https://www.transparenttextures.com/patterns/aged-paper.png'); opacity: 0.4; z-index: -1; }
                  .envelope.open .env-card{transform:translateY(-48%) scale(1);box-shadow:0 28px 40px -18px rgba(0,0,0,0.7),0 0 0 1px rgba(0,0,0,0.08);z-index:5}
                  .envelope .env-texture { position:absolute; inset:0; z-index:5; pointer-events:none; border-radius:9px; opacity:0.1; mix-blend-mode:multiply; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
                  .envelope .env-stamp { position:absolute; bottom:15px; right:15px; width:50px; height:50px; border-radius:50%; border:3px dashed rgba(20,20,20,0.7); z-index:4; display:flex; align-items:center; justify-content:center; text-align:center; transform:rotate(-15deg); opacity:0.85; }
                  .envelope .env-stamp::after { content:'AIR\\A MAIL'; white-space:pre-wrap; color:rgba(20,20,20,0.8); font-size:10px; font-weight:800; font-family:monospace; line-height:1.1; }
                  .envelope .env-line { position:absolute; left:20px; bottom:20px; right:85px; border-top:2px solid rgba(20,20,20,0.6); border-bottom:2px solid rgba(20,20,20,0.6); height:6px; z-index:4; transform:rotate(-3deg); opacity: 0.8; }
                  .card-city{font-family:'Playfair Display',serif;font-weight:600;font-size:16px;color:#241a06;letter-spacing:.01em}
                  .card-divider{height:1px;background:linear-gradient(90deg,rgba(36,26,6,0.25),transparent 85%);margin:8px 0 10px}
                  .card-row{display:flex;gap:9px;align-items:flex-start;padding:4px 0}
                  .card-icon{width:16px;flex:none;padding-top:1px;color:#8a5f22}
                  .card-icon svg{width:14px;height:14px;display:block}
                  .card-text{font-size:11.5px;line-height:1.45;color:#3a2c10;text-decoration:none}
                  a.card-text:hover{text-decoration:underline}
                `}</style>
                <div className="env-shadow" />
                <div className="env-body" />
                <div className="env-left" />
                <div className="env-right" />

                {/* Flying sparks when opened */}
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
                  <AnimatePresence>
                    {envOpen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0 }}>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            animate={{
                              x: (Math.random() - 0.5) * 200,
                              y: (Math.random() - 1) * 150,
                              opacity: [0, 1, 0],
                              scale: [0, Math.random() + 0.5, 0]
                            }}
                            transition={{ duration: 1.5 + Math.random(), delay: Math.random() * 0.5, ease: 'easeOut' }}
                            style={{
                              position: 'absolute', top: '50%', left: '50%',
                              width: 6, height: 6, borderRadius: '50%',
                              background: 'var(--accent-gold)',
                              boxShadow: '0 0 10px 2px var(--accent-gold)'
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="env-card">
                  {activeOffice ? (<>
                    <div className="card-city">{activeOffice.city}</div>
                    <div className="card-divider" />
                    <div className="card-row">
                      <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.4" /></svg></span>
                      <a className="card-text" href={activeOffice.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{activeOffice.address}</a>
                    </div>
                    <div className="card-row">
                      <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5c0 8.3 6.7 15 15 15l2-4-6-2-1.5 2A12.5 12.5 0 0 1 8.5 10L10.5 8.5 8.5 2.5 4.5 4.5C4.2 4.6 4 4.8 4 5z" /></svg></span>
                      <a className="card-text" href={`tel:${activeOffice.phone}`}>{activeOffice.phone}</a>
                    </div>
                    <div className="card-row">
                      <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>
                      <a className="card-text" href={`mailto:${activeOffice.email}`}>{activeOffice.email}</a>
                    </div>
                    <div className="card-row">
                      <span className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg></span>
                      <span className="card-text">{activeOffice.hours}</span>
                    </div>

                    {/* Premium Seal Watermark inside the card */}
                    <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.05, pointerEvents: 'none' }}>
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                  </>) : (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#9a8868', fontSize: 12, textAlign: 'center', padding: '0 8px' }}>
                      Select an office from the left to read your letter
                    </div>
                  )}
                </div>
                <div className="env-pocket" />
                <div className="env-texture" />
                <div className="env-stamp" />
                <div className="env-line" />
                <div className="env-flap">
                  <div className={`env-seal ${activeOffice && !envOpen ? 'active-pulse' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3a2408" strokeWidth="1.6" style={{ width: 18, height: 18 }}>
                      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2" fill="#3a2408" stroke="none" />
                    </svg>
                  </div>
                  <div className="env-pull-tab">OPEN</div>
                </div>
              </div>
              <AnimatePresence>
                {!activeOffice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: [0, 5, 0] }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
                    style={{ textAlign: 'center', fontSize: 13, color: 'var(--accent-gold)', marginTop: 30, letterSpacing: '0.04em', fontWeight: 600, textTransform: 'uppercase', textShadow: '0 0 10px rgba(249, 212, 64, 0.4)' }}
                  >
                    ↑ Select an office to open this letter
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: India SVG Map — always visible, active state pops out in 3D */}
          <div style={{ position: 'relative', minHeight: 680, borderRadius: 20, background: '#0a0a14', border: '1px solid rgba(249,212,64,0.12)', overflow: 'visible' }}>
            <div style={{ position: 'absolute', inset: 0, padding: '22px 26px' }}>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
                backgroundSize: '36px 36px',
                maskImage: 'radial-gradient(ellipse at center,black 20%,transparent 72%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center,black 20%,transparent 72%)',
              }} />
              <svg viewBox="0 0 612 696" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <filter id="stateGlow2" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="var(--accent-gold)" floodOpacity="0.5" />
                  </filter>
                  <filter id="hoverGlow2" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="var(--accent-gold)" floodOpacity="0.8" />
                  </filter>
                  <filter id="castShadow2" x="-20%" y="-10%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.8" />
                  </filter>
                  <pattern id="pattern-ka" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href="/karnataka_map.jpg" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" opacity="0.6" />
                  </pattern>
                  <pattern id="pattern-mh" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href="/maharashtra_map.jpg" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" opacity="0.6" />
                  </pattern>
                  <pattern id="pattern-tn" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href="/tamilnadu_map.jpg" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" opacity="0.6" />
                  </pattern>
                </defs>
                <style>{`
                    .interactive-state {
                      transition: fill 0.4s, stroke 0.4s, transform 0.5s cubic-bezier(0.22,1,0.36,1);
                      transform-box: fill-box;
                      transform-origin: center;
                    }
                    .interactive-state:not(.active):hover {
                      stroke: rgba(249,212,64,0.9) !important;
                      stroke-width: 1.5 !important;
                      transform: scale(1.04);
                      fill: #1a1a24 !important;
                    }
                  `}</style>

                {stateData.filter(s => !OFFICES.some(o => o.stateId === s.id)).map(state => (
                  <path key={state.id} d={state.d} fill="#13131c" stroke="rgba(249,212,64,0.25)" strokeWidth={0.8} />
                ))}

                {stateData
                  .filter(s => OFFICES.some(o => o.stateId === s.id))
                  .sort((a, b) => (a.id === activeStateId ? 1 : b.id === activeStateId ? -1 : 0))
                  .map(state => {
                    const isActive = activeStateId === state.id;
                    const stateOffices = OFFICES.filter(o => o.stateId === state.id);
                    const defaultOfficeForState = stateOffices[0];
                    const scaleFactor = isActive ? 3.8 : 1;
                    
                    return (
                      <g key={state.id} style={{ cursor: 'pointer', transform: isActive ? 'scale(3.8) translateY(-20%)' : 'scale(1)', transformOrigin: 'center', transformBox: 'fill-box', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                        onClick={() => handleSelect(defaultOfficeForState.id)}
                        filter={isActive ? 'url(#castShadow2)' : 'none'}
                      >
                        <path
                          className={`interactive-state ${isActive ? 'active' : ''}`}
                          d={state.d}
                          fill={isActive ? `url(#pattern-${state.id})` : '#13131c'}
                          stroke={isActive ? 'var(--accent-gold)' : 'rgba(249,212,64,0.4)'}
                          strokeWidth={isActive ? 2 / scaleFactor : 1}
                        />
                        
                        {/* Pips for this state */}
                        {stateOffices.map(o => {
                          const isPipActive = activeId === o.id;
                          const x = (parseFloat(o.pipPos.left) / 100) * 612;
                          const y = (parseFloat(o.pipPos.top) / 100) * 696;
                          return (
                            <g key={`pip-${o.id}`} style={{ 
                                pointerEvents: 'none', 
                                opacity: (activeId && !isPipActive) ? 0.15 : 1, 
                                transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1)'
                            }}>
                              {isPipActive && (<>
                                <circle cx={x} cy={y} r={18 / scaleFactor} fill="rgba(249,212,64,0)" stroke="rgba(249,212,64,0.7)" strokeWidth={1.5 / scaleFactor}>
                                  <animate attributeName="r" values={`${8 / scaleFactor};${24 / scaleFactor}`} dur="1.8s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
                                </circle>
                                <circle cx={x} cy={y} r={12 / scaleFactor} fill="rgba(249,212,64,0)" stroke="rgba(249,212,64,0.5)" strokeWidth={1 / scaleFactor}>
                                  <animate attributeName="r" values={`${6 / scaleFactor};${18 / scaleFactor}`} dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.7;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                                </circle>
                              </>)}
                              <circle cx={x} cy={y} r={(isPipActive ? 6 : 4) / scaleFactor} fill={isPipActive ? '#fff' : 'var(--accent-gold)'} stroke={isPipActive ? 'var(--accent-gold)' : '#0a0a12'} strokeWidth={2 / scaleFactor} style={{ transition: 'all 0.3s' }} />
                              {isPipActive && (
                                <text x={x} y={y - (18 / scaleFactor)} textAnchor="middle" fill="#fff" fontSize={14 / scaleFactor} fontFamily="monospace" fontWeight="800" letterSpacing="0.1em" style={{ filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.95))' }}>
                                  {o.city.toUpperCase()}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </g>
                    );
                  })}
              </svg>

              {!activeId && (
                <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none', fontSize: 10, color: '#28283a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Click a highlighted state to zoom in
                </div>
              )}
            </div>
          </div>

        </motion.div>

        {/* ── Contact Form (RIGHT of Find Us) ── */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <style>{`
          .premium-input { padding: 18px 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; color: #fff; font-size: 15px; outline: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); width: 100%; box-sizing: border-box; }
          .premium-input::placeholder { color: rgba(255,255,255,0.25); font-weight: 300; letter-spacing: 0.02em; }
          .premium-input:focus { background: rgba(249,212,64,0.03); border-color: rgba(249,212,64,0.4); box-shadow: 0 0 20px rgba(249,212,64,0.1), inset 0 0 0 1px rgba(249,212,64,0.2); }
          .premium-btn-next { grid-column: span 2; padding: 18px; background: linear-gradient(135deg, rgba(249,212,64,0.1), rgba(249,212,64,0.02)); color: var(--accent-gold); border: 1px solid rgba(249,212,64,0.3); border-radius: 16px; cursor: pointer; font-size: 15px; font-weight: 600; letter-spacing: 0.05em; transition: all 0.3s; text-transform: uppercase; }
          .premium-btn-next:hover { background: linear-gradient(135deg, rgba(249,212,64,0.15), rgba(249,212,64,0.05)); border-color: rgba(249,212,64,0.6); box-shadow: 0 8px 20px rgba(249,212,64,0.15); transform: translateY(-2px); }
          .premium-select { appearance: none; -webkit-appearance: none; cursor: pointer; color: rgba(255,255,255,0.8); }
          .premium-select option { background: #0a0a0f; color: #fff; }
          .premium-select:invalid { color: rgba(255,255,255,0.25); font-weight: 300; }
        `}</style>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ flex: 1, marginBottom: 0, padding: '36px 40px', background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', borderRadius: 28, border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>

          <h3 style={{ fontSize: 26, fontFamily: "'Playfair Display', serif", color: '#e8d8ac', marginBottom: 24, fontWeight: 600 }}>
            {formStep === 1 ? 'Your Details' : 'Your Message'}
          </h3>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <div style={{ height: '4px', flex: 1, background: 'var(--accent-gold)', borderRadius: '2px', transition: 'all 0.3s' }} />
            <div style={{ height: '4px', flex: 1, background: formStep === 2 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: 'all 0.3s' }} />
          </div>

          <form style={{ position: 'relative', minHeight: '220px' }}>
            <AnimatePresence mode="wait">
              {formStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="contact-form-step1 contact-form-grid"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
                >
                  <input type="text" placeholder="Full Name" className="premium-input" />
                  <input type="email" placeholder="Email Address" className="premium-input" />
                  <input type="tel" placeholder="Phone Number" className="premium-input" />

                  {/* Destination Country */}
                  <div style={{ position: 'relative' }}>
                    <select className="premium-input premium-select" defaultValue="" required>
                      <option value="" disabled hidden>Destination Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="IE">Ireland</option>
                      <option value="NZ">New Zealand</option>
                      <option value="DE">Germany</option>
                      <option value="SG">Singapore</option>
                      <option value="FR">France</option>
                      <option value="PL">Poland</option>
                      <option value="Other">Other</option>
                    </select>
                    <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>▼</div>
                  </div>

                  {/* Interested Service */}
                  <div style={{ position: 'relative' }}>
                    <select className="premium-input premium-select" defaultValue="" required>
                      <option value="" disabled hidden>Interested Service</option>
                      <option value="Initial Counselling">Initial Counselling</option>
                      <option value="Visa Assistance">Visa Assistance</option>
                      <option value="Scholarship & Financial Assistance">Scholarship &amp; Financial Assistance</option>
                      <option value="Education Loan Assistance">Education Loan Assistance</option>
                      <option value="Coaching Support">Coaching Support</option>
                      <option value="Accommodation Support">Accommodation Support</option>
                    </select>
                    <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>▼</div>
                  </div>

                  {/* Intake */}
                  <div style={{ position: 'relative' }}>
                    <select className="premium-input premium-select" defaultValue="" required>
                      <option value="" disabled hidden>Preferred Intake</option>
                      <option value="Fall">Fall (Aug/Sep)</option>
                      <option value="Spring">Spring (Jan/Feb)</option>
                      <option value="Summer">Summer (May/Jun)</option>
                      <option value="Undecided">Undecided</option>
                    </select>
                    <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>▼</div>
                  </div>

                  {/* Degree Objective */}
                  <div style={{ position: 'relative', gridColumn: 'span 2' }}>
                    <select className="premium-input premium-select" defaultValue="" required>
                      <option value="" disabled hidden>Degree Objective</option>
                      <option value="High School">High School / Diploma</option>
                      <option value="Bachelors">Bachelors (UG)</option>
                      <option value="Masters">Masters (PG)</option>
                      <option value="MBA">MBA</option>
                      <option value="PhD">PhD / Doctorate</option>
                      <option value="Short-term">Short-term Course</option>
                    </select>
                    <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>▼</div>
                  </div>

                  <button type="button" onClick={() => setFormStep(2)} className="premium-btn-next">Continue to Message →</button>
                  
                  <div className="contact-features-grid" style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 16px', marginTop: 28 }}>
                    {[
                      'Free Counseling',
                      'Visa Support',
                      'Scholarship Guidance',
                      'University Matching'
                    ].map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 12l3 3 5-6"></path>
                        </svg>
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, letterSpacing: '0.01em' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="contact-form-grid"
                  style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}
                >
                  <textarea placeholder="Message" rows="6" className="premium-input" style={{ resize: 'vertical' }}></textarea>
                  <div className="contact-step2-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                    <button type="button" onClick={() => setFormStep(1)} style={{ padding: '18px', background: 'transparent', color: '#888', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, cursor: 'pointer', fontSize: 15, transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>← Back</button>
                    <button type="button" style={{ padding: '18px', background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-copper))', color: '#111', fontWeight: 700, borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 15, transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(249,212,64,0.3)'; }} onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>Submit Message</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
        </div>{/* end form right col */}
        </div>{/* end two-column layout */}

        {/* ── Office Info Cards Row ── */}
        <motion.div 
          className="contact-benefits-grid"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 28 }}>
          {OFFICES.map((o, i) => (
            <motion.div key={o.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ padding: '28px 28px', background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(249,212,64,0.18),rgba(249,212,64,0.06))', border: '1px solid rgba(249,212,64,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif" }}>{o.city}</div>
                  <div style={{ fontSize: 11, color: 'var(--accent-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{o.state}</div>
                </div>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(249,212,64,0.6)" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>
                  <a href={o.link} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#a0a0ab', lineHeight: 1.5, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color='#a0a0ab'}>{o.address}</a>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(249,212,64,0.6)" strokeWidth="1.8" style={{ flexShrink: 0 }}><path d="M4 5c0 8.3 6.7 15 15 15l2-4-6-2-1.5 2A12.5 12.5 0 0 1 8.5 10L10.5 8.5 8.5 2.5 4.5 4.5C4.2 4.6 4 4.8 4 5z"/></svg>
                  <a href={`tel:${o.phone}`} style={{ fontSize: 12, color: '#a0a0ab', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color='#a0a0ab'}>{o.phone}</a>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(249,212,64,0.6)" strokeWidth="1.8" style={{ flexShrink: 0 }}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                  <a href={`mailto:${o.email}`} style={{ fontSize: 12, color: '#a0a0ab', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color='#a0a0ab'}>{o.email}</a>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(249,212,64,0.6)" strokeWidth="1.8" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>
                  <span style={{ fontSize: 12, color: '#a0a0ab' }}>{o.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}