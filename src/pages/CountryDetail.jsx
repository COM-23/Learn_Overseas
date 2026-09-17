import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COUNTRIES } from './Countries';
import { motion } from 'framer-motion';

export default function CountryDetail() {
  const { id } = useParams();
  const country = COUNTRIES.find(c => c.id === id);
  const [inrAmount, setInrAmount] = useState(1000000);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/INR')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) setExchangeRates(data.rates);
        setIsLoadingRates(false);
      })
      .catch(err => {
        console.error('Failed to fetch live exchange rates:', err);
        setIsLoadingRates(false);
      });
  }, []);

  if (!country) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h2>Destination not found.</h2>
        <Link to="/destinations" style={{ marginLeft: 20, color: 'var(--accent-gold)' }}>Back to map</Link>
      </div>
    );
  }

  const currencyData = {
    usa: { code: 'USD', symbol: '$', fallbackRate: 83.5 },
    uk: { code: 'GBP', symbol: '£', fallbackRate: 105.2 },
    aus: { code: 'AUD', symbol: 'A$', fallbackRate: 54.8 },
    can: { code: 'CAD', symbol: 'C$', fallbackRate: 61.2 },
    nz: { code: 'NZD', symbol: 'NZ$', fallbackRate: 50.1 },
    ger: { code: 'EUR', symbol: '€', fallbackRate: 90.4 },
    fra: { code: 'EUR', symbol: '€', fallbackRate: 90.4 },
    esp: { code: 'EUR', symbol: '€', fallbackRate: 90.4 },
    ire: { code: 'EUR', symbol: '€', fallbackRate: 90.4 },
    sg: { code: 'SGD', symbol: 'S$', fallbackRate: 61.5 },
    pol: { code: 'PLN', symbol: 'zł', fallbackRate: 21.0 }
  };
  const currencyInfo = currencyData[id] || { code: 'USD', symbol: '$', fallbackRate: 83.5 };
  const rate = exchangeRates && exchangeRates[currencyInfo.code] ? (1 / exchangeRates[currencyInfo.code]) : currencyInfo.fallbackRate;


  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: 100 }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        <img 
          src={country.img} 
          alt={country.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, rgba(2,2,5,0.4) 100%)' }} />
        
        <div className="container" style={{ position: 'absolute', bottom: 60, left: 0, right: 0 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: 12 }}>
              {country.tagline}
            </div>
            <h1 className="heading-hero" style={{ fontSize: '5rem', margin: 0 }}>
              {country.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container country-detail-layout" style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: '1fr 350px', gap: 60 }}>
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="heading-section" style={{ fontSize: '2.5rem', marginBottom: 24 }}
          >
            Overview
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: 40 }}
          >
            {country.desc}
          </motion.p>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: 24 }}
          >
            Top Institutions
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
          >
            {country.universities.map((u, i) => (
              <div key={i} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, fontSize: 14, color: '#fff' }}>
                {u}
              </div>
            ))}
            <Link to={`/destinations/${country.id}/universities`} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--accent-gold)', borderRadius: 100, fontSize: 14, color: 'var(--accent-gold)', textDecoration: 'none', transition: 'all 0.3s' }}>
              More...
            </Link>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
        >
          <div className="glass-panel" style={{ padding: 40 }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>Key Metrics</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 40 }}>
              {country.stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent-gold)', marginBottom: 8, fontFamily: 'var(--font-serif)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Next Intake</div>
              <div style={{ fontSize: 16, color: '#fff', fontWeight: 600 }}>{country.intake}</div>
            </div>

            {/* Currency Calculator */}
            <div style={{ marginBottom: 32, padding: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Currency Converter
              </div>
              
              <div style={{ display: 'flex', flexDirection: isReversed ? 'column-reverse' : 'column', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>₹</span>
                  <input 
                    type="number"
                    value={inrAmount}
                    onChange={(e) => setInrAmount(e.target.value)}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px 12px 32px', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                  <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>INR</span>
                </div>
                
                <div 
                  onClick={() => setIsReversed(!isReversed)}
                  style={{ textAlign: 'center', color: 'var(--accent-gold)', margin: '-4px 0', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                  title="Swap Currencies"
                >
                  <div 
                    style={{ padding: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 16V4m0 0L3 8m4-4l4 4"/>
                      <path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
                    </svg>
                  </div>
                </div>
                
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{currencyInfo.symbol}</span>
                  <input 
                    type="number"
                    value={inrAmount ? (inrAmount / rate).toFixed(2) : ''}
                    onChange={(e) => setInrAmount(e.target.value * rate)}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px 12px 32px', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                  <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{currencyInfo.code}</span>
                </div>
              </div>
              
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 16, textAlign: 'center' }}>
                {isLoadingRates ? 'Loading live rates...' : `*Live exchange rate (1 ${currencyInfo.code} = ₹${rate.toFixed(2)})`}
              </div>
            </div>

            <Link to="/contact" className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
              Apply Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
