import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import { Calendar, MapPin, Clock, ArrowRight, Search, X } from 'lucide-react';
import { getEvents } from '../utils/adminStore';

// Highlight matching text in a string
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: 'rgba(180,150,255,0.35)', color: '#fff', borderRadius: 3, padding: '0 2px' }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

const FILTER_TABS = ['All', 'Summit', 'Fair', 'Webinar', 'Virtual', 'In-Person'];

export default function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const filteredEvents = useMemo(() => {
    let results = events;

    // Filter tab
    if (activeFilter !== 'All') {
      if (activeFilter === 'Virtual') {
        results = results.filter(e => e.location === 'Virtual');
      } else if (activeFilter === 'In-Person') {
        results = results.filter(e => e.location !== 'Virtual');
      } else {
        results = results.filter(e => e.type === activeFilter);
      }
    }

    // Search term — searches across all fields
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase().trim();
      results = results.filter(e =>
        e.title.toLowerCase().includes(lower) ||
        e.description.toLowerCase().includes(lower) ||
        e.location.toLowerCase().includes(lower) ||
        e.type.toLowerCase().includes(lower) ||
        e.date.toLowerCase().includes(lower) ||
        e.tags.some(tag => tag.toLowerCase().includes(lower))
      );
    }

    return results;
  }, [searchTerm, activeFilter]);

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const isFiltering = searchTerm.trim() !== '' || activeFilter !== 'All';

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#020205', color: '#fff', overflow: 'clip', paddingBottom: '120px' }}>

      {/* Dynamic Background Mesh */}
      <style>{`
        @keyframes panGradient {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(-25%, -25%); }
          100% { transform: translate(0, 0); }
        }
        .events-search-input::placeholder { color: rgba(255,255,255,0.35); }
        .events-filter-tab { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .events-filter-tab:hover { color: #fff; border-color: rgba(180,150,255,0.5); }
      `}</style>

      <div style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: 'radial-gradient(circle at center, rgba(180,150,255,0.08) 0%, rgba(125,193,177,0.05) 30%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
        animation: 'panGradient 40s linear infinite',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, transparent 10%, #020205 90%)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '160px 5vw 0', position: 'relative', zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '100px', marginBottom: '30px' }}>
            <div style={{ width: 8, height: 8, background: '#b496ff', borderRadius: '50%', boxShadow: '0 0 10px #b496ff' }} />
            <span style={{ color: '#b496ff', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 800, fontSize: '0.8rem' }}>
              Upcoming Experiences
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontFamily: 'var(--font-serif)', margin: '0 0 20px', lineHeight: 1.1 }}>
            Global <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Events.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Connect with admission directors, network with alumni, and build your profile at our exclusive global events.
          </p>
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ maxWidth: '680px', margin: '0 auto 32px' }}
        >
          <div style={{ position: 'relative' }}>
            {/* Search icon */}
            <Search
              size={20}
              color={searchTerm ? '#b496ff' : 'rgba(255,255,255,0.4)'}
              style={{
                position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
                transition: 'color 0.25s', pointerEvents: 'none',
              }}
            />

            <input
              ref={inputRef}
              id="events-search"
              className="events-search-input"
              type="text"
              placeholder="Search events by name, location, topic, or tag…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '20px 56px 20px 60px',
                borderRadius: '100px',
                background: searchTerm ? 'rgba(180,150,255,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${searchTerm ? 'rgba(180,150,255,0.45)' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff', fontSize: '1.05rem', outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                fontFamily: 'var(--font-sans)',
                boxShadow: searchTerm ? '0 0 0 4px rgba(180,150,255,0.08)' : 'none',
              }}
              onFocus={e => {
                e.target.style.border = '1px solid rgba(180,150,255,0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(180,150,255,0.1)';
              }}
              onBlur={e => {
                if (!searchTerm) {
                  e.target.style.border = '1px solid rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />

            {/* Clear button */}
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  onClick={clearSearch}
                  style={{
                    position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                    width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,150,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  aria-label="Clear search"
                >
                  <X size={14} color="#fff" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          className="filter-pills-scroll"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}
        >
          {FILTER_TABS.map(tab => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                className="events-filter-tab"
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '10px 22px', borderRadius: '100px', fontSize: '0.85rem',
                  fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
                  fontFamily: 'var(--font-sans)',
                  background: isActive ? 'rgba(180,150,255,0.18)' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid rgba(180,150,255,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  color: isActive ? '#c8b4ff' : 'rgba(255,255,255,0.55)',
                  boxShadow: isActive ? '0 0 20px rgba(180,150,255,0.15)' : 'none',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* ── Result count ── */}
        <AnimatePresence mode="wait">
          {isFiltering && (
            <motion.div
              key={`count-${filteredEvents.length}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ textAlign: 'center', marginBottom: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', letterSpacing: 1 }}
            >
              {filteredEvents.length === 0
                ? 'No results'
                : `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} found`}
              {searchTerm && <span style={{ color: 'rgba(180,150,255,0.7)' }}> for "<strong style={{ color: '#c8b4ff' }}>{searchTerm}</strong>"</span>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Events List ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* No results state */}
          <AnimatePresence>
            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                style={{
                  textAlign: 'center', padding: '80px 40px',
                  background: 'rgba(180,150,255,0.04)',
                  border: '1px solid rgba(180,150,255,0.12)',
                  borderRadius: 32,
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 20 }}>🔍</div>
                <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: 12 }}>
                  No events matched
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginBottom: 28, lineHeight: 1.6 }}>
                  Try a different keyword or clear your filters.
                </div>
                <button
                  onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                  style={{
                    padding: '12px 28px', borderRadius: 100, background: 'rgba(180,150,255,0.15)',
                    border: '1px solid rgba(180,150,255,0.4)', color: '#c8b4ff',
                    fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
                  }}
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event cards */}
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01, boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(180,150,255,0.1)' }}
                style={{
                  background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '32px', overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                  {/* Image */}
                  <div style={{ position: 'relative', minHeight: '350px', overflow: 'hidden' }}>
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={event.image}
                      alt={event.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                    />
                    {/* Type badge */}
                    <div style={{ position: 'absolute', top: 30, left: 30, background: 'rgba(0,0,0,0.75)', padding: '10px 20px', borderRadius: 100, border: '1px solid rgba(180,150,255,0.35)', color: '#b496ff', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
                      {event.type}
                    </div>
                    {/* Virtual badge */}
                    {event.location === 'Virtual' && (
                      <div style={{ position: 'absolute', top: 30, right: 30, background: 'rgba(0,0,0,0.75)', padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(125,193,177,0.35)', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 8px var(--accent-blue)', display: 'inline-block' }} />
                        Live Online
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', margin: '0 0 16px', lineHeight: 1.2 }}>
                      <Highlight text={event.title} query={searchTerm} />
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '36px' }}>
                      <Highlight text={event.description} query={searchTerm} />
                    </p>

                    {/* Meta grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
                      {[
                        { icon: <Calendar size={18} color="#b496ff" />, label: 'Date', value: event.date },
                        { icon: <Clock size={18} color="#b496ff" />, label: 'Time', value: event.time },
                        { icon: <MapPin size={18} color="#b496ff" />, label: 'Location', value: event.location },
                      ].map(({ icon, label, value }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 15, color: 'rgba(255,255,255,0.8)' }}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                            {icon}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                            <div style={{ fontWeight: 600 }}>
                              <Highlight text={value} query={searchTerm} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px' }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {event.tags.map(tag => (
                          <span
                            key={tag}
                            onClick={() => setSearchTerm(tag)}
                            style={{
                              padding: '6px 14px', borderRadius: 100, fontSize: '0.78rem',
                              cursor: 'pointer', transition: 'all 0.2s',
                              background: searchTerm.toLowerCase() === tag.toLowerCase()
                                ? 'rgba(180,150,255,0.2)'
                                : 'rgba(255,255,255,0.03)',
                              border: searchTerm.toLowerCase() === tag.toLowerCase()
                                ? '1px solid rgba(180,150,255,0.5)'
                                : '1px solid rgba(255,255,255,0.1)',
                              color: searchTerm.toLowerCase() === tag.toLowerCase()
                                ? '#c8b4ff'
                                : 'rgba(255,255,255,0.55)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(180,150,255,0.4)'; e.currentTarget.style.color = '#c8b4ff'; }}
                            onMouseLeave={e => {
                              if (searchTerm.toLowerCase() !== tag.toLowerCase()) {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                              }
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <MagneticButton>
                        <button 
                          onClick={() => navigate('/contact')}
                          style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '16px 32px', background: '#fff', color: '#000',
                          border: 'none', borderRadius: 100, fontSize: '1rem',
                          fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
                          fontFamily: 'var(--font-sans)',
                        }}>
                          Register <ArrowRight size={18} />
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
