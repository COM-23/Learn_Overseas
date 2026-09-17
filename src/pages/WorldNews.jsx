import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Clock } from 'lucide-react';

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
          <img src={article.img} alt={article.headline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0f 0%, transparent 100%)' }} />
        </div>
        <div style={{ padding: '30px 40px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ padding: '4px 12px', borderRadius: 100, background: `rgba(249,212,64,0.22)`, border: `1px solid rgba(249,212,64,0.55)`, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>{article.region}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={11} />4 min read</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Today</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.25, color: '#fff', marginBottom: 24 }}>{article.headline}</h2>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>This is a placeholder for the full article body. In a real application, this content would be fetched from a CMS or database. The article discusses important updates regarding international student enrollments, policy changes, and how it impacts prospective applicants.</p>
            <p>Our team at Learn Overseas is actively monitoring these developments to ensure our students have the most up-to-date and accurate information for their applications.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const ARTICLES = [
  { region: 'EUROPE', headline: 'Schengen Visa Processes Streamlined for 2026', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=100&w=2560' },
  { region: 'NORTH AMERICA', headline: 'Canadian Tech Sector Booms, Driving International Demand', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=100&w=2560' },
];

export default function WorldNews() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  return (
    <div style={{ position: 'relative', background: '#000' }}>
      
      {/* SCENE 0: Intro */}
      <div style={{ height: '100vh', position: 'sticky', top: 0, zIndex: 1, overflow: 'hidden', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <div className="scene-subtitle" style={{ textAlign: 'center', letterSpacing: '8px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontSize: '14px', marginBottom: '20px' }}>Global Perspectives</div>
            <div className="scene-title" style={{ textAlign: 'center', fontSize: 'clamp(40px, 10vw, 150px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-4px' }}>WORLD<br/>NEWS</div>
          </motion.div>
          <div className="movie-text" style={{ position: 'absolute', bottom: '10%', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '12px' }}>Scroll to explore</div>
        </div>
      </div>

      {/* Cinematic Article Reel */}
      {ARTICLES.map((article, index) => (
        <div key={index} style={{ height: '100vh', position: 'sticky', top: 0, zIndex: index + 2, overflow: 'hidden', background: '#000' }}>
          <motion.div 
            initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 1.5 }}
            style={{ position: 'absolute', inset: 0, backgroundImage: `url(${article.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9), transparent 80%)' }} />
          
          <div style={{ position: 'absolute', bottom: '20%', left: '10%', maxWidth: '800px' }}>
            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              <div className="scene-subtitle" style={{ letterSpacing: '4px', color: 'var(--accent-gold)', fontSize: '16px', marginBottom: '20px' }}>{article.region}</div>
              <div className="scene-title" style={{ fontSize: 'clamp(30px, 5vw, 70px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px' }}>{article.headline}</div>
              <button onClick={() => setSelectedArticle(article)} style={{ marginTop: '40px', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 600, background: 'none', border: '1px solid #fff', padding: '12px 32px', borderRadius: '100px', cursor: 'pointer' }}>
                Read Full Story
              </button>
            </motion.div>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </AnimatePresence>
    </div>
  );
}