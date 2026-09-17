import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { useNavigate } from 'react-router-dom';

export default function AspirePlusSection() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '150px 5vw' }}>
            
            {/* Cinematic Background Layer */}
            <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80) center/cover', opacity: 0.15, filter: 'contrast(1.5) grayscale(100%)' }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(20, 10, 30, 0.8) 0%, rgba(2, 2, 5, 0.95) 100%)' }}></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ position: 'relative', zIndex: 10, maxWidth: 1000, width: '100%', background: 'rgba(20, 10, 25, 0.4)', , border: '1px solid rgba(180, 150, 255, 0.2)', padding: '80px 60px', borderRadius: 40, boxShadow: '0 50px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(180,150,255,0.1)', textAlign: 'center' }}
            >
                <div style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 100, border: '1px solid rgba(180, 150, 255, 0.4)', background: 'rgba(180, 150, 255, 0.1)', color: '#b496ff', letterSpacing: 5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
                    The Absolute Pinnacle
                </div>
                
                <h2 style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1, marginBottom: 30, fontFamily: 'var(--font-serif)', color: '#fff', background: 'linear-gradient(180deg, #fff, #b496ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 20px 40px rgba(180,150,255,0.3)' }}>
                    ASPIRE <span style={{ fontStyle: 'italic' }}>PLUS</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: 60, fontWeight: 300, maxWidth: 750, margin: '0 auto 60px' }}>
                    Reserved for the top 0.1% of applicants. The Aspire Plus protocol guarantees direct mentorship with Ivy League admissions directors, unlimited placement strategy sessions, and an uncompromised path to the world's most exclusive institutions.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30, textAlign: 'left', marginBottom: 60 }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(180,150,255,0.1) 0%, rgba(2,2,5,0.6) 100%)', padding: 40, borderRadius: 24, border: '1px solid rgba(180,150,255,0.15)' }}>
                        <div style={{ color: '#b496ff', fontSize: '2.5rem', marginBottom: 15, fontFamily: 'var(--font-serif)' }}>01.</div>
                        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: 15, fontWeight: 600, letterSpacing: 1 }}>Bespoke Profiling</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>Every aspect of your academic, social, and digital footprint is curated by a dedicated team of 5 former admissions officers.</p>
                    </div>
                    <div style={{ background: 'linear-gradient(135deg, rgba(180,150,255,0.1) 0%, rgba(2,2,5,0.6) 100%)', padding: 40, borderRadius: 24, border: '1px solid rgba(180,150,255,0.15)' }}>
                        <div style={{ color: '#b496ff', fontSize: '2.5rem', marginBottom: 15, fontFamily: 'var(--font-serif)' }}>02.</div>
                        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: 15, fontWeight: 600, letterSpacing: 1 }}>Venture Incubation</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>We fund and launch a scalable startup or non-profit in your name to prove real-world global impact before you even apply.</p>
                    </div>
                </div>
                <MagneticButton>
                <button 
                    onClick={() => navigate('/contact')}
                    style={{ 
                        display: 'inline-block', padding: '25px 60px', fontSize: '1.1rem', fontWeight: 800, letterSpacing: 3, 
                        textTransform: 'uppercase', background: '#b496ff', color: '#000', borderRadius: 100, border: 'none', 
                        transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 10px 30px rgba(180,150,255,0.4)'
                    }} 
                    onMouseOver={e => {e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 20px 40px rgba(180,150,255,0.6)';}} 
                    onMouseOut={e => {e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(180,150,255,0.4)';}}
                >
                    Apply for Aspire Plus
                </button>
                </MagneticButton>
            </motion.div>
        </div>
    );
}
