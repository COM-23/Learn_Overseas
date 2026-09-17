import React from 'react';
import { motion } from 'framer-motion';

export default function VisionExtendedContent() {
    return (
        <div style={{ background: '#020205', padding: '100px 5vw 150px 5vw', position: 'relative', zIndex: 20 }}>
            
            {/* The Philosophy Grid */}
            <div style={{ maxWidth: '1400px', margin: '0 auto 150px' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <p style={{ color: 'var(--accent-blue)', letterSpacing: 4, textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>Core Principles</p>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', color: '#fff', margin: 0, lineHeight: 1.1 }}>THE PHILOSOPHY</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                    {[
                        { title: 'Uncompromising Excellence', text: 'We do not settle for the average. We push our students to uncover their deepest passions and translate them into world-class academic profiles that elite universities cannot ignore.', icon: '🎯', color: 'var(--accent-gold)' },
                        { title: 'Global Perspectives', text: 'The leaders of tomorrow must think without borders. We prepare our students not just to attend a university in another country, but to integrate seamlessly into a global society.', icon: '🌍', color: 'var(--accent-blue)' },
                        { title: 'Holistic Development', text: 'True success is multidimensional. Beyond test scores and GPAs, we cultivate emotional intelligence, resilience, and visionary thinking that lasts a lifetime.', icon: '🧠', color: 'var(--accent-copper)' }
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            style={{ background: 'rgba(20,20,25,0.6)', padding: '50px', borderRadius: '24px', border: `1px solid rgba(255,255,255,0.05)`, transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                            whileHover={{ y: -15, scale: 1.02, borderColor: item.color, boxShadow: `0 30px 60px ${item.color.replace(')', ', 0.15)').replace('var(', '').replace(')', '')}` }}
                        >
                            <motion.div 
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                              style={{ fontSize: '3rem', marginBottom: '30px', display: 'inline-block' }}>
                                {item.icon}
                            </motion.div>
                            <h3 style={{ fontSize: '1.8rem', color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>{item.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem' }}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Impact Section */}
            <div style={{ maxWidth: '1400px', margin: '0 auto 150px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(249,212,64,0.05) 0%, transparent 60%)', zIndex: 0 }} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ boxShadow: '0 0 100px rgba(249, 212, 64, 0.15)' }}
                  style={{ position: 'relative', zIndex: 1, background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(249, 212, 64, 0.3)', borderRadius: '40px', padding: '80px 5vw', display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'space-around', alignItems: 'center', transition: 'all 0.5s ease' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 300, lineHeight: 1 }}>98.7%</div>
                        <div style={{ color: '#fff', letterSpacing: 3, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 700, marginTop: '10px' }}>Success Rate</div>
                    </div>
                    <div style={{ width: '1px', height: '100px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)' }} className="divider" />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'var(--accent-blue)', fontWeight: 300, lineHeight: 1 }}>$24M+</div>
                        <div style={{ color: '#fff', letterSpacing: 3, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 700, marginTop: '10px' }}>Scholarships Secured</div>
                    </div>
                    <div style={{ width: '1px', height: '100px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)' }} className="divider" />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'var(--accent-copper)', fontWeight: 300, lineHeight: 1 }}>35+</div>
                        <div style={{ color: '#fff', letterSpacing: 3, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 700, marginTop: '10px' }}>Countries Represented</div>
                    </div>
                </motion.div>
            </div>

            {/* A Letter from the Founders */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ color: 'var(--accent-copper)', letterSpacing: 4, textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>The Origin</p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', color: '#fff', margin: '0 0 50px 0', lineHeight: 1.1 }}>A COMMITMENT TO EXCELLENCE</h2>
                
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.3rem', lineHeight: 2, fontWeight: 300, marginBottom: '30px' }}>
                    "When we founded Learn Overseas, we noticed a critical gap in the international education landscape. Students were being treated as mere applications—data points fed into a generic machine. We knew that gaining admission to the Ivy League and Oxbridge required vastly more."
                </p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.3rem', lineHeight: 2, fontWeight: 300, marginBottom: '50px' }}>
                    "Our vision was to create an elite architectural firm for human potential. We don't just fill out forms; we design decades of success. By combining rigorous academic strategy with profound personal development, we ensure our candidates don't just gain admission—they arrive ready to lead."
                </p>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}>
                    <img src="/ceo.png" alt="Founder" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', background: 'rgba(255,255,255,0.1)' }} />
                    <div>
                        <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>Kunal Shah</div>
                        <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.8rem', marginTop: '5px' }}>Founder & CEO</div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @media (max-width: 900px) {
                    .divider { display: none; }
                }
            `}</style>
        </div>
    );
}
