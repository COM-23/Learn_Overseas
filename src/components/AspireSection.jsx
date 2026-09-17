import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AspireSection() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '150px 5vw' }}>
            
            {/* Cinematic Background Layer */}
            <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80) center/cover', opacity: 0.2, filter: 'contrast(1.2)' }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(2, 2, 5, 0.4) 0%, rgba(2, 2, 5, 0.95) 100%)' }}></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{ position: 'relative', zIndex: 10, maxWidth: 900, width: '100%', background: 'rgba(255, 255, 255, 0.03)', , border: '1px solid rgba(255,255,255,0.1)', padding: '80px 60px', borderRadius: 32, boxShadow: '0 50px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)', textAlign: 'center' }}
            >
                <p style={{ color: 'var(--accent-gold)', letterSpacing: 5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>Exclusive Access</p>
                <h2 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', lineHeight: 1, marginBottom: 30, fontFamily: 'var(--font-serif)', color: '#fff', background: 'linear-gradient(180deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    THE ASPIRE<br/>PROTOCOL
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: 50, fontWeight: 300, maxWidth: 700, margin: '0 auto 50px' }}>
                    Our flagship program designed for students targeting the top 5 universities globally. It's not just an application; it's a multi-year profile building strategy engineered for absolute perfection.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 30, textAlign: 'left', marginBottom: 60 }}>
                    <div style={{ background: 'rgba(2,2,5,0.4)', padding: 30, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: 'var(--accent-gold)', fontSize: '2rem', marginBottom: 15 }}>01</div>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 10, fontFamily: 'var(--font-serif)' }}>Early Intervention</h4>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Starting from 8th Grade, we meticulously craft every academic and extracurricular decision.</p>
                    </div>
                    <div style={{ background: 'rgba(2,2,5,0.4)', padding: 30, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: 'var(--accent-blue)', fontSize: '2rem', marginBottom: 15 }}>02</div>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 10, fontFamily: 'var(--font-serif)' }}>Research Publication</h4>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Direct placement with Ivy League professors to author and publish peer-reviewed papers.</p>
                    </div>
                    <div style={{ background: 'rgba(2,2,5,0.4)', padding: 30, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: 'var(--accent-copper)', fontSize: '2rem', marginBottom: 15 }}>03</div>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 10, fontFamily: 'var(--font-serif)' }}>Global Leadership</h4>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Guaranteed placements in elite global leadership camps and high-impact internships.</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => navigate('/contact')}
                    style={{ 
                        display: 'inline-block', padding: '20px 50px', fontSize: '1rem', fontWeight: 800, letterSpacing: 3, 
                        textTransform: 'uppercase', background: 'rgba(249, 212, 64, 0.1)', border: '1px solid rgba(249, 212, 64, 0.5)', 
                        color: 'var(--accent-gold)', borderRadius: 100, transition: 'all 0.3s ease', cursor: 'pointer' 
                    }} 
                    onMouseOver={e => {e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.background='rgba(249, 212, 64, 0.2)'; e.currentTarget.style.boxShadow='0 0 30px rgba(249, 212, 64, 0.2)';}} 
                    onMouseOut={e => {e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.background='rgba(249, 212, 64, 0.1)'; e.currentTarget.style.boxShadow='none';}}
                >
                    Apply for Aspire
                </button>
            </motion.div>
        </div>
    );
}
