import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Tag, Search } from 'lucide-react';
import { getBlogs } from '../utils/adminStore';
import { X } from 'lucide-react';

function NewsModal({ article, onClose }) {
  if (!article) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }} onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        style={{ position: 'relative', width: '100%', maxWidth: '800px', maxHeight: '90vh', background: '#0a0a0f', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
          <X size={20} />
        </button>
        <div style={{ position: 'relative', height: 300, flexShrink: 0 }}>
          <img src={article.img} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0f 0%, transparent 100%)' }} />
        </div>
        <div style={{ padding: '30px 40px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ padding: '4px 12px', borderRadius: 100, background: `${article.catColor}22`, border: `1px solid ${article.catColor}55`, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: article.catColor }}>{article.cat}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={11} />{article.readTime}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{article.date}</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.25, color: '#fff', marginBottom: 24 }}>{article.title}</h2>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>{article.excerpt}</p>
            <p style={{ marginBottom: 20 }}>This is a placeholder for the full article body. In a real application, this content would be fetched from a CMS or database. The article discusses important updates regarding international student enrollments, policy changes, and how it impacts prospective applicants.</p>
            <p>Our team at Learn Overseas is actively monitoring these developments to ensure our students have the most up-to-date and accurate information for their applications.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const TICKER_ITEMS = [
  "BREAKING: Canadian Study Permit cap adjusted for 2026",
  "NEW: Application deadlines for Fall Intake approaching",
  "UPDATE: Learn Overseas achieves 99% visa success rate",
  "ALERT: IELTS test formats changing — stay informed",
  "HOT: QS World Rankings 2027 released — UK dominates top 10",
];

const CATEGORIES = ['All', 'Admissions', 'Policy', 'Scholarships', 'Campus Life', 'Visa'];

export default function NewsFeed() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setArticles(getBlogs());
  }, []);

  let filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.cat === activeCategory);

  if (searchQuery.trim()) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.id !== featured?.id);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#04040a', color: '#fff', fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Background ambient ── */}
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

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ── LIVE TICKER ── */}
        <div style={{
          borderBottom: '1px solid rgba(249,212,64,0.15)',
          background: 'rgba(249,212,64,0.04)',
          display: 'flex', overflow: 'hidden',
          paddingTop: 120,
        }}>
          <div style={{
            padding: '14px 28px', background: 'var(--accent-gold)', color: '#000',
            fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em',
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#000', animation: 'pulse 1.5s infinite' }} />
            Live
          </div>
          <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.div
              animate={{ x: [0, -2400] }}
              transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
              style={{
                display: 'flex', gap: 80, alignItems: 'center',
                padding: '14px 60px', fontSize: 12, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
                whiteSpace: 'nowrap',
              }}
            >
              {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  {t}
                  <span style={{ color: 'var(--accent-gold)', fontSize: 10 }}>◆</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 5vw 100px' }}>

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 64 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 20,
            }}>
              <div style={{ width: 32, height: 1, background: 'var(--accent-gold)' }} />
              Global Intel
            </div>
            <h1 style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 300,
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.05, margin: 0, marginBottom: 48,
            }}>
              The <em style={{ fontStyle: 'italic', fontWeight: 700, color: 'var(--accent-gold)' }}>Feed.</em>
            </h1>

            {/* ── Category Filter Tabs & Search ── */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '8px 20px', borderRadius: 100,
                      border: `1px solid ${activeCategory === cat ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'}`,
                      background: activeCategory === cat ? 'rgba(249,212,64,0.15)' : 'transparent',
                      color: activeCategory === cat ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.25s', fontFamily: "'Outfit', sans-serif",
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    padding: '10px 20px 10px 40px',
                    borderRadius: 100,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: 14,
                    width: 250,
                    outline: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >

              {/* ── FEATURED HERO ARTICLE ── */}
              {featured && (
                <motion.div
                  style={{
                    position: 'relative', borderRadius: 24, overflow: 'hidden',
                    height: 520, marginBottom: 24, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={featured.img}
                    alt={featured.title}
                    onError={e => { e.target.style.display = 'none'; }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(4,4,10,0.97) 0%, rgba(4,4,10,0.5) 50%, rgba(4,4,10,0.1) 100%)',
                  }} />
                  {/* Featured badge */}
                  <div style={{
                    position: 'absolute', top: 28, left: 28,
                    padding: '6px 16px', borderRadius: 100,
                    background: 'rgba(249,212,64,0.15)', border: '1px solid rgba(249,212,64,0.4)',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'var(--accent-gold)',
                  }}>
                    Featured
                  </div>
                  {/* Content */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: 100,
                        background: `${featured.catColor}22`,
                        border: `1px solid ${featured.catColor}55`,
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: featured.catColor,
                      }}>{featured.cat}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Clock size={11} />{featured.readTime}
                      </span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{featured.date}</span>
                    </div>
                    <h2 style={{
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600, lineHeight: 1.25,
                      color: '#fff', marginBottom: 12, maxWidth: 700,
                    }}>{featured.title}</h2>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 600, marginBottom: 24 }}>
                      {featured.excerpt}
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      color: 'var(--accent-gold)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer'
                    }} onClick={(e) => { e.stopPropagation(); setSelectedArticle(featured); }}>
                      Read Full Story <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── REST ARTICLES GRID ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 20,
              }}>
                {rest.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    style={{
                      position: 'relative', borderRadius: 20, overflow: 'hidden',
                      height: 340, cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: '#0c0c14',
                    }}
                    whileHover={{ y: -4, borderColor: 'rgba(249,212,64,0.2)' }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <img
                      src={article.img}
                      alt={article.title}
                      onError={e => { e.target.style.display = 'none'; }}
                      style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(4,4,10,0.97) 0%, rgba(4,4,10,0.3) 60%, transparent 100%)',
                    }} />

                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 100,
                          background: `${article.catColor}22`,
                          border: `1px solid ${article.catColor}55`,
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                          textTransform: 'uppercase', color: article.catColor,
                        }}>{article.cat}</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={10} />{article.readTime}
                        </span>
                      </div>
                      <h3 style={{
                        fontSize: '1.1rem', fontFamily: "'Playfair Display', serif",
                        fontWeight: 600, lineHeight: 1.3, color: '#fff',
                        marginBottom: 12,
                      }}>{article.title}</h3>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                        {article.excerpt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ── Load More ── */}
              <div style={{ textAlign: 'center', marginTop: 72 }}>
                <button 
                  onClick={() => navigate('/contact')}
                  style={{
                  padding: '14px 40px', borderRadius: 100,
                  border: '1px solid rgba(249,212,64,0.35)',
                  background: 'transparent', color: 'var(--accent-gold)',
                  fontSize: 14, fontWeight: 600, letterSpacing: '0.08em',
                  cursor: 'pointer', transition: 'all 0.3s',
                  fontFamily: "'Outfit', sans-serif",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,212,64,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Load More Stories
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </AnimatePresence>
    </div>
  );
}