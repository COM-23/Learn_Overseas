import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Globe from 'react-globe.gl';

export const COUNTRIES = [
  {
    id: 'usa', name: 'United States', lat: 38.0, lng: -97.0,
    tagline: 'The land of infinite possibility',
    img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '4,500+', l: 'Institutions' }, { n: '3 Yrs', l: 'OPT Work Permit' }, { n: '$50B+', l: 'Scholarships' }],
    universities: ['Harvard University', 'MIT', 'Stanford University', 'Yale University'],
    desc: 'The American degree is the gold standard — paired with OPT, you can work in Silicon Valley or Wall Street for 3 years after graduation.',
    intake: 'August / September',
  },
  {
    id: 'uk', name: 'United Kingdom', lat: 55.3781, lng: -3.4360,
    tagline: 'Where tradition meets excellence',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '160+', l: 'Universities' }, { n: '2 Yrs', l: 'Post-Study Visa' }, { n: 'Top 5', l: 'Global Ranking' }],
    universities: ['University of Oxford', 'University of Cambridge', 'Imperial College', 'UCL'],
    desc: 'Home to Oxford and Cambridge — universities shaping world leaders for centuries. A 2-year post-study visa lets you launch your career at global companies headquartered in London.',
    intake: 'September & January',
  },
  {
    id: 'aus', name: 'Australia', lat: -25.2744, lng: 133.7751,
    tagline: 'Education under southern stars',
    img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '43', l: 'Top-Ranked Unis' }, { n: '4 Yrs', l: 'Post-Study Visa' }, { n: '#1', l: 'Quality of Life' }],
    universities: ['University of Melbourne', 'ANU', 'University of Sydney', 'UNSW'],
    desc: 'Australia offers one of the world\'s most generous post-study work visa programs — up to 4 years after graduation. World-class universities and outstanding quality of life.',
    intake: 'February & July',
  },
  {
    id: 'can', name: 'Canada', lat: 56.1304, lng: -106.3468,
    tagline: 'Welcoming the world\'s best minds',
    img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '3 Yrs', l: 'PGWP Visa' }, { n: '96%', l: 'Visa Approval' }, { n: '#1', l: 'Most Welcoming' }],
    universities: ['University of Toronto', 'UBC', 'McGill University', 'University of Waterloo'],
    desc: 'Canada combines world-class education with PR pathways that are unmatched globally. With strong multicultural values and a booming tech sector, it\'s the smart strategic choice.',
    intake: 'September & January',
  },
  {
    id: 'nz', name: 'New Zealand', lat: -40.9006, lng: 174.8860,
    tagline: 'A natural environment for learning',
    img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '8', l: 'Top Universities' }, { n: '3 Yrs', l: 'Post-Study Visa' }, { n: '#2', l: 'Safest Country' }],
    universities: ['University of Auckland', 'University of Otago', 'Victoria University', 'Massey University'],
    desc: 'New Zealand offers a progressive education system with globally recognized qualifications in a safe, beautiful environment.',
    intake: 'February & July',
  },
  {
    id: 'ger', name: 'Germany', lat: 51.1657, lng: 10.4515,
    tagline: 'The heart of engineering and innovation',
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '400+', l: 'Institutions' }, { n: '18 Mos', l: 'Post-Study Visa' }, { n: 'Low', l: 'Tuition Fees' }],
    universities: ['TU Munich', 'LMU Munich', 'Heidelberg University', 'Humboldt University'],
    desc: 'Germany is a global powerhouse in engineering and technology, offering world-class education with minimal tuition fees.',
    intake: 'Winter & Summer',
  },
  {
    id: 'fra', name: 'France', lat: 46.2276, lng: 2.2137,
    tagline: 'Art, science, and a rich cultural legacy',
    img: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '3500+', l: 'Institutions' }, { n: '2 Yrs', l: 'Post-Study Visa' }, { n: 'Top 10', l: 'Global Economy' }],
    universities: ['Sorbonne University', 'Ecole Polytechnique', 'Sciences Po', 'HEC Paris'],
    desc: 'France offers elite education in business, art, and sciences, with strong industry connections and a vibrant cultural experience.',
    intake: 'September / October',
  },
  {
    id: 'sg', name: 'Singapore', lat: 1.3521, lng: 103.8198,
    tagline: 'The dynamic hub of Asia',
    img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '6', l: 'Public Unis' }, { n: 'Top 15', l: 'Global Unis' }, { n: 'Hub', l: 'Asian Business' }],
    universities: ['NUS', 'NTU', 'SMU', 'SUTD'],
    desc: 'Singapore is a global financial and technological hub, offering world-leading universities at the crossroads of East and West.',
    intake: 'August',
  },
  {
    id: 'esp', name: 'Spain', lat: 40.4637, lng: -3.7492,
    tagline: 'Sun, culture, and top business schools',
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '76', l: 'Universities' }, { n: 'Top', l: 'Business Schools' }, { n: 'Low', l: 'Living Cost' }],
    universities: ['University of Barcelona', 'IE Business School', 'ESADE', 'Autonomous University of Madrid'],
    desc: 'Spain is renowned for its world-class business schools and vibrant lifestyle, making it a top destination for international students.',
    intake: 'September',
  },
  {
    id: 'pol', name: 'Poland', lat: 51.9194, lng: 19.1451,
    tagline: 'Quality education at the heart of Europe',
    img: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '400+', l: 'Institutions' }, { n: 'Low', l: 'Tuition Fees' }, { n: 'EU', l: 'Member State' }],
    universities: ['University of Warsaw', 'Jagiellonian University', 'Warsaw University of Technology', 'Adam Mickiewicz University'],
    desc: 'Poland offers high-quality education with affordable tuition and living costs, making it an increasingly popular European destination.',
    intake: 'October',
  },
  {
    id: 'ire', name: 'Ireland', lat: 53.1424, lng: -7.6921,
    tagline: 'The Silicon Valley of Europe',
    img: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=1200',
    stats: [{ n: '9', l: 'Universities' }, { n: '2 Yrs', l: 'Post-Study Visa' }, { n: 'HQ', l: 'Global Tech' }],
    universities: ['Trinity College Dublin', 'University College Dublin', 'University of Galway', 'UCC'],
    desc: 'Ireland is home to the European headquarters of many top tech and pharma companies, offering excellent career prospects for graduates.',
    intake: 'September',
  }
];

export default function Countries() {
  const [active, setActive] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [zoomedIn, setZoomedIn] = useState(false);
  const globeRef = useRef(null);
  const c = COUNTRIES[active];

  const targetIndex = hoveredCountry !== null ? hoveredCountry : active;

  // Auto-focus globe on the active or hovered country
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ 
        lat: COUNTRIES[targetIndex].lat, 
        lng: COUNTRIES[targetIndex].lng, 
        altitude: zoomedIn && hoveredCountry === null ? 0.8 : 2.5 
      }, 1000); // 1s transition
      
      // Enable auto-rotation only when no specific country is hovered and not zoomed in
      if (globeRef.current.controls) {
        globeRef.current.controls().autoRotate = (hoveredCountry === null && !zoomedIn);
        globeRef.current.controls().autoRotateSpeed = 0.5;
      }
    }
  }, [targetIndex, zoomedIn]);

  const handleSelectCountry = (i) => {
    setActive(i);
    setHoveredCountry(null);
    setZoomedIn(true);
  };

  // Custom marker for globe
  const createMarker = (d) => {
    const el = document.createElement('div');
    el.style.pointerEvents = 'auto';
    el.style.cursor = 'pointer';
    el.innerHTML = `
      <div style="
        width: 14px; 
        height: 14px; 
        background: var(--accent-gold); 
        border-radius: 50%; 
        box-shadow: 0 0 20px 5px rgba(249,212,64,0.8);
        border: 2px solid #fff;
        cursor: pointer;
      "></div>
      <div style="
        color: #fff; 
        font-family: var(--font-sans); 
        font-size: 12px; 
        font-weight: 700;
        margin-top: 4px;
        text-align: center;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        transform: translateX(-30%);
      ">${d.name}</div>
    `;
    el.onclick = (e) => {
      e.stopPropagation();
      const idx = COUNTRIES.findIndex(c => c.id === d.id);
      if (idx !== -1) {
        handleSelectCountry(idx);
      }
    };
    return el;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="countries-outer"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'var(--bg-dark)' }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.15) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.15) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      
      {/* 3D WebGL Globe Background */}
      <div className="countries-globe-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Ambient Backlight to illuminate the globe */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />
        <Globe
          ref={globeRef}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#f9d440"
          atmosphereAltitude={0.25}
          backgroundColor="rgba(0,0,0,0)"
          enablePointerInteraction={true} 
          htmlElementsData={COUNTRIES}
          htmlElement={createMarker}
        />
        {/* Light overlay to ensure text readability without hiding globe - Reduced opacity for brightness */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(2,2,5,0.15) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,2,5,0.6) 0%, rgba(2,2,5,0) 40%, rgba(2,2,5,0.1) 100%)', pointerEvents: 'none' }} />
      </div>
      
      {/* Main Content Grid */}
      <div className="container countries-main-grid" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'grid', gridTemplateColumns: '350px 1fr', gap: '5vw', alignItems: 'center', pointerEvents: 'none' }}>
        
        {/* Left Col: Menu */}
        <div className="countries-left-col" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '100px 0 40px 0', pointerEvents: 'auto' }}>
          <div style={{ marginBottom: 20, flexShrink: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 24, height: 1, background: 'var(--accent-blue)' }} />
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--accent-blue)', fontWeight: 600 }}>Destinations</span>
            </div>
            <h1 className="heading-hero" style={{ fontSize: '2.5rem', margin: 0 }}>The <span className="text-gradient" style={{ fontStyle: 'italic', background: 'linear-gradient(to right, var(--accent-light), var(--accent-blue))', WebkitBackgroundClip: 'text', color: 'transparent' }}>World.</span></h1>
          </div>

          <div className="countries-list-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', paddingRight: '12px', flex: 1 }} onMouseLeave={() => setHoveredCountry(null)}>
            {COUNTRIES.map((country, i) => (
              <motion.button 
                key={country.id} 
                onClick={() => handleSelectCountry(i)}
                onMouseEnter={() => setHoveredCountry(i)}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 2px 10px rgba(249,212,64,0.1)', borderColor: 'rgba(249,212,64,0.4)', background: 'rgba(249,212,64,0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel countries-list-button"
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: active === i ? '1px solid rgba(249,212,64,0.8)' : '1px solid rgba(255,255,255,0.05)',
                  background: active === i ? 'linear-gradient(135deg, rgba(249,212,64,0.1) 0%, rgba(20,24,30,0.95) 100%)' : 'rgba(255,255,255,0.02)',
                  boxShadow: active === i ? '0 15px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(249,212,64,0.15)' : 'none',
                  transition: 'border-color 0.4s, background-color 0.4s, box-shadow 0.4s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <motion.div 
                    initial={false}
                    animate={{ scale: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-gold)', boxShadow: '0 0 15px var(--accent-gold)' }} 
                  />
                  <div style={{ fontSize: 18, fontWeight: 700, color: active === i ? '#fff' : 'var(--text-secondary)', fontFamily: 'var(--font-serif)', textShadow: active === i ? '0 0 10px rgba(255,255,255,0.3)' : 'none', transition: 'color 0.4s, text-shadow 0.4s' }}>{country.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Area: Country Details */}
        <div className="countries-right-col" style={{ flex: 1, height: '80vh', position: 'relative', pointerEvents: zoomedIn ? 'auto' : 'none' }}>
          <AnimatePresence mode="wait">
            {zoomedIn && (
              <motion.div 
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} // Wait for globe to rotate slightly
                className="glass-panel"
                style={{ 
                  height: '100%', 
                  display: 'flex', flexDirection: 'column', 
                  overflow: 'hidden', padding: 0, position: 'relative'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setZoomedIn(false)}
                  style={{
                    position: 'absolute', top: 24, right: 24, width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(249,212,64,0.3)', color: 'var(--accent-gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20,
                    transition: 'all 0.3s ease', fontSize: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(249,212,64,0.15)'; e.currentTarget.style.borderColor = 'rgba(249,212,64,0.8)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.borderColor = 'rgba(249,212,64,0.3)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >✕</button>

                {/* Hero Image of Country */}
                <div style={{ height: '40%', position: 'relative', flexShrink: 0 }}>
                  <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,1) 0%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 24, left: 40 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: 8 }}>{c.tagline}</div>
                    <div className="heading-section" style={{ fontSize: '3rem', margin: 0 }}>{c.name}</div>
                  </div>
                </div>

                {/* Info Panel */}
                <div style={{ padding: 40, flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }} className="custom-scrollbar">
                  <p className="body-large" style={{ fontSize: '1.1rem', marginBottom: 40 }}>{c.desc}</p>
                  
                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--border-light)' }}>
                    {c.stats.map((s, i) => (
                      <div key={i}>
                        <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 4, fontFamily: 'var(--font-serif)' }}>{s.n}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 40 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>Top Institutions</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {c.universities.map((u, i) => (
                        <div key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 100, fontSize: 13, color: '#fff' }}>
                          {u}
                        </div>
                      ))}
                      <Link to={`/destinations/${c.id}/universities`} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--accent-gold)', borderRadius: 100, fontSize: 13, color: 'var(--accent-gold)', textDecoration: 'none', transition: 'all 0.3s' }}>
                        More...
                      </Link>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                      Next Intake: <span style={{ fontWeight: 600, color: '#fff' }}>{c.intake}</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(249,212,64,0.5)' }} whileTap={{ scale: 0.98 }} style={{ width: '100%' }}>
                      <Link to={`/destinations/${c.id}`} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '16px 0', fontSize: '1.1rem', background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)', color: '#000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, borderRadius: 12, textDecoration: 'none', transition: 'background 0.3s' }}>
                        Read More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {!zoomedIn && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--accent-gold)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: 8 }}>Select a destination</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Click on a golden marker or use the list to explore opportunities.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}