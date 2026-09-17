import React from 'react';
import { motion } from 'framer-motion';

export default function PricingSection() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '150px 5vw', background: 'radial-gradient(circle at 50% 0%, #1a1a2e 0%, #020205 70%)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: 'var(--accent-gold)', letterSpacing: 4, textTransform: 'uppercase', fontWeight: 800, fontSize: '0.9rem', marginBottom: 15 }}
                >
                    Investment in your future
                </motion.p>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', margin: 0, color: '#fff', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
                >
                    CONSULTING TIERS
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '20px auto 0', fontSize: '1.2rem', lineHeight: 1.6 }}
                >
                    Elite strategies designed for students who refuse to settle for anything less than the world's best institutions.
                </motion.p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 40, width: '100%', maxWidth: 1100, justifyContent: 'center' }}>
                
                {/* Strategic Advising Tier */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const rotateX = ((y / rect.height) - 0.5) * -20;
                        const rotateY = ((x / rect.width) - 0.5) * 20;
                        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.8)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{ background: 'rgba(15, 15, 20, 0.6)', , border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 50, display: 'flex', flexDirection: 'column', transition: 'transform 0.1s, box-shadow 0.3s' }}
                >
                    <h3 style={{ color: 'white', fontSize: '2rem', margin: '0 0 10px 0', fontFamily: 'var(--font-serif)' }}>Strategic Advising</h3>
                    <div style={{ color: 'var(--accent-gold)', fontSize: '3rem', fontWeight: 800, marginBottom: 30, display: 'flex', alignItems: 'baseline' }}>
                        $5,000 <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginLeft: 10 }}>/ package</span>
                    </div>
                    
                    <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)', marginBottom: 30 }} />
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        {[
                            'University Shortlisting',
                            'Essay Review & Editing',
                            'Interview Preparation',
                            'Visa & Documentation Assistance',
                            'Post-Admissions Support'
                        ].map((feature, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.5 }}>
                                <span style={{ color: 'var(--accent-gold)', marginRight: 15, fontSize: '1.2rem' }}>✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    
                    <button style={{ width: '100%', padding: '15px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: '1rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                        Select Plan
                    </button>
                </motion.div>

                {/* Elite Mentorship Tier */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const rotateX = ((y / rect.height) - 0.5) * -20;
                        const rotateY = ((x / rect.width) - 0.5) * 20;
                        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                        e.currentTarget.style.boxShadow = '0 40px 80px rgba(249,212,64,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
                    }}
                    style={{ position: 'relative', background: 'linear-gradient(145deg, rgba(40, 35, 15, 0.8), rgba(15, 15, 15, 0.95))', , border: '1px solid var(--accent-gold)', borderRadius: 24, padding: 50, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transition: 'transform 0.1s, box-shadow 0.3s' }}
                >
                    <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-gold)', color: '#000', padding: '6px 20px', borderRadius: 100, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 2, boxShadow: '0 4px 15px rgba(249,212,64,0.3)' }}>
                        Most Popular
                    </div>

                    <h3 style={{ color: 'white', fontSize: '2rem', margin: '0 0 10px 0', fontFamily: 'var(--font-serif)' }}>Elite Mentorship</h3>
                    <div style={{ color: 'var(--accent-gold)', fontSize: '3rem', fontWeight: 800, marginBottom: 30, display: 'flex', alignItems: 'baseline' }}>
                        $12,000 <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginLeft: 10 }}>/ package</span>
                    </div>
                    
                    <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(249,212,64,0.3), transparent)', marginBottom: 30 }} />
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', color: '#fff', fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 700 }}>
                            <span style={{ color: 'var(--accent-gold)', marginRight: 15, fontSize: '1.2rem' }}>✓</span>
                            Direct Ivy League Alumni Mentor
                        </li>
                        {[
                            'Everything in Strategic Advising',
                            'Extracurricular Profiling & Strategy',
                            'Unlimited Essay Revisions',
                            'Mock Interviews with Admissions Experts',
                            'Scholarship Negotiation Support'
                        ].map((feature, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: 1.5 }}>
                                <span style={{ color: 'var(--accent-gold)', marginRight: 15, fontSize: '1.2rem' }}>✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    
                    <button style={{ width: '100%', padding: '15px', borderRadius: 100, border: 'none', background: 'var(--accent-gold)', color: '#000', fontSize: '1rem', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(249,212,64,0.2)' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>
                        Select Elite
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
