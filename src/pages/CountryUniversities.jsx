import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COUNTRIES } from './Countries';
import { DESTINATIONS } from '../data/destinations';
import { motion } from 'framer-motion';
import UniversityFloaters from '../components/UniversityFloaters';

export default function CountryUniversities() {
  const { id } = useParams();
  const country = COUNTRIES.find(d => d.id === id);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!country) return <div style={{ padding: 100, color: 'white' }}>Country not found</div>;

  const destData = DESTINATIONS.find(d => d.country === country.name);
  const allUnis = destData && destData.unis && destData.unis.length > 0 ? destData.unis : country.universities;
  
  const filteredUnis = allUnis.filter(uni => 
    uni.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#020205', color: 'white', paddingTop: 120, paddingBottom: 120, position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${country.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,2,5,0.95) 0%, rgba(2,2,5,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #020205 100%)' }} />
        <UniversityFloaters />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
        
        {/* Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 60 }}>
          <Link to={`/destinations/${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>
            <span style={{ width: 30, height: 1, background: 'var(--accent-gold)' }}></span>
            Back to {country.name}
          </Link>
        </motion.div>
        
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 15, fontWeight: 700 }}>
              Academic Excellence
            </h2>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: 'var(--font-serif)', margin: 0, lineHeight: 1.1 }}>
              Universities in <br/>
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>{country.name}</span>
            </h1>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            type="text"
            placeholder={`Search universities in ${country.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '12px 20px',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
            }}
          />
        </div>

        {/* List Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {filteredUnis.map((uni, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/university/${encodeURIComponent(uni)}`} style={{ textDecoration: 'none' }}>
                <motion.div 
                  whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(249, 212, 64, 0.5)' }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '30px 40px', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.08)', 
                    background: 'rgba(255,255,255,0.02)', 
                    cursor: 'pointer',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                    <div style={{ 
                      width: 60, height: 60, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, var(--accent-gold) 0%, #D67A43 100%)', 
                      color: 'black', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '1.5rem', fontWeight: 800,
                      boxShadow: '0 0 20px rgba(249, 212, 64, 0.3)'
                    }}>
                      {uni.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', fontFamily: 'var(--font-serif)', color: 'white' }}>{uni}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-gold)' }}></span>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: 2 }}>{country.name} Campus</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    width: 50, height: 50, 
                    borderRadius: '50%', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
