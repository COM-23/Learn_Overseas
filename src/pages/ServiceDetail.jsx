import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const found = SERVICES.find(s => s.id === id);
    if (found) {
      setService(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/services');
    }
  }, [id, navigate]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  if (!service) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: '#020205',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}
    >
      {/* Background Spotlight */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 50%)`
        }} 
      />

      {/* Return Button */}
      <div style={{ position: 'absolute', top: 120, left: 40, zIndex: 100 }}>
          <Link to="/services" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease' }} className="hover-gold-border">
                  ←
              </div>
              Back to Services
          </Link>
      </div>

      <style>{`
          .hover-gold-border:hover {
              border-color: ${service.color} !important;
              color: ${service.color};
          }
      `}</style>

      {/* Hero Image Section */}
      <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '400px', flexShrink: 0 }}>
        <motion.img 
            initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 5, ease: 'easeOut' }}
            src={service.img} alt={service.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) grayscale(20%)' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,1) 0%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 40, left: '10vw', zIndex: 10 }}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontSize: 14, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', color: service.color, background: `${service.color}15`, padding: '8px 16px', borderRadius: 100, border: `1px solid ${service.color}30`, display: 'inline-block', marginBottom: 15 }}>
                {service.tag}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', color: '#fff', margin: 0, lineHeight: 1 }}>
                {service.title}
            </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ position: 'relative', zIndex: 10, padding: '60px 10vw', display: 'flex', gap: '60px', flexWrap: 'wrap', flexGrow: 1 }}>
          
          {/* Left Column: Description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ flex: '2 1 500px' }}
          >
            <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: 30, fontFamily: 'var(--font-serif)' }}>About the Service</h2>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px' }}>
              {service.detailedDesc}
            </p>
            
            <div style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 20, padding: '30px 40px', background: 'rgba(255,255,255,0.02)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', boxShadow: `inset 0 0 40px ${service.color}05` }}>
                <div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>{service.statLabel}</div>
                  <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: service.color, fontWeight: 800, lineHeight: 1 }}>{service.stat}</div>
                </div>
            </div>
          </motion.div>

          {/* Right Column: Features & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ flex: '1 1 350px' }}
          >
            <div style={{ background: 'rgba(20,20,25,0.6)', padding: '40px', borderRadius: '24px', border: `1px solid rgba(255,255,255,0.05)`, boxShadow: `0 20px 40px rgba(0,0,0,0.5)` }}>
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 25, textTransform: 'uppercase', letterSpacing: 2 }}>What's Included</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {service.features.map((f, j) => (
                    <motion.div 
                      key={j}
                      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 15, 
                        fontSize: '1.05rem', 
                        color: 'rgba(255,255,255,0.8)',
                        padding: '16px 20px',
                        borderRadius: '16px',
                        cursor: 'default',
                        transition: 'background 0.3s ease',
                        border: '1px solid rgba(255,255,255,0.02)'
                      }}
                    >
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: service.color, flexShrink: 0, boxShadow: `0 0 15px ${service.color}` }} />
                      {f}
                    </motion.div>
                  ))}
                </div>

                <motion.a 
                  href="/contact" 
                  whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${service.color}40` }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'block', textAlign: 'center', marginTop: 50, padding: '20px 32px', background: `linear-gradient(135deg, ${service.color}, var(--accent-copper))`, color: '#000', borderRadius: 100, fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none' }}
                >
                  Book Consultation
                </motion.a>
            </div>
          </motion.div>
      </div>
    </motion.div>
  );
}
