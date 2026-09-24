import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_MEMBERS } from '../data/teamData';
import { motion, AnimatePresence } from 'framer-motion';
import VideoTransition from './VideoTransition';

export default function TeamSection() {
    const categories = ['Leadership', 'Management', 'Counseling', 'Advisors', 'Operations'];
    const navigate = useNavigate();
    const [isTransitioningDarshan, setIsTransitioningDarshan] = useState(false);

    return (
        <div style={{ position: 'relative', padding: '150px 5vw', background: 'transparent', minHeight: '100vh' }}>
            <style>
                {`
                .team-card .spotlight-overlay {
                    opacity: 0;
                }
                .team-card:hover .spotlight-overlay {
                    opacity: 1;
                }
                `}
            </style>
            
            {/* Ambient Background Glow */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(249,212,64,0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Header removed and moved to OurTeam.jsx */}

                {categories.map((category, catIndex) => {
                    const categoryMembers = TEAM_MEMBERS.filter(m => m.category === category);
                    if (categoryMembers.length === 0) return null;

                    return (
                        <div key={category} style={{ marginBottom: 100 }}>
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "0px" }}
                                style={{ display: 'flex', alignItems: 'center', gap: 30, marginBottom: 50 }}
                            >
                                <h2 style={{ color: '#fff', fontSize: '2rem', fontFamily: 'var(--font-serif)', m: 0, textTransform: 'uppercase', letterSpacing: 2 }}>
                                    {category}
                                </h2>
                                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
                            </motion.div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 30 }}>
                                {categoryMembers.map((member, idx) => {
                                    const handleCardClick = () => {
                                        if (member.id === 'darshan') {
                                            setIsTransitioningDarshan(true);
                                        } else {
                                            navigate(`/about/team/${member.id}`);
                                        }
                                    };

                                    return (
                                        <div onClick={handleCardClick} key={idx} style={{ display: 'block' }}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "0px" }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{ y: -15, scale: 1.02 }}
                                                style={{
                                                    height: '400px',
                                                    background: 'rgba(15, 15, 20, 0.6)',
                                                    borderRadius: 24,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    border: '1px solid rgba(255,255,255,0.05)'
                                                }}
                                                className="team-card"
                                            >
                                            {/* Portrait Image Background */}
                                            {member.image ? (
                                                <motion.img 
                                                    src={member.image} 
                                                    alt={member.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(100%) brightness(0.6)', transition: 'all 0.5s ease' }}
                                                    className="team-img"
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(30,30,40,0.8) 0%, rgba(10,10,15,0.8) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.05)', fontWeight: 900, fontFamily: 'var(--font-serif)', letterSpacing: 5 }}>
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Gradient Overlay for Text Legibility */}
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,0.95) 0%, rgba(2,2,5,0.2) 40%, transparent 100%)', zIndex: 1 }} />
                                            
                                            {/* Hover Styles injected via styled-components / CSS approach */}
                                            <style>{`
                                                .team-card:hover .team-img {
                                                    filter: grayscale(0%) brightness(0.9) !important;
                                                    transform: scale(1.05);
                                                }
                                                .team-card:hover .team-details {
                                                    transform: translateY(0) !important;
                                                    background: rgba(255,255,255,0.1);
                                                    
                                                    border-color: rgba(255,255,255,0.2);
                                                }
                                            `}</style>
                                            
                                            {/* Sliding Glassmorphic Details Panel */}
                                            <div 
                                                className="team-details"
                                                style={{ 
                                                    position: 'absolute', bottom: 15, left: 15, right: 15, zIndex: 2,
                                                    background: 'transparent',
                                                    borderRadius: '16px', padding: '20px',
                                                    transform: 'translateY(15px)',
                                                    transition: 'all 0.4s ease',
                                                    border: '1px solid transparent'
                                                }}
                                            >
                                                <h3 style={{ color: '#fff', fontSize: '1.6rem', fontFamily: 'var(--font-serif)', margin: '0 0 5px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                                    {member.name}
                                                </h3>
                                                <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 2, margin: 0, fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    {member.role}
                                                    {member.linkedin && (
                                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: '#fff', textDecoration: 'none' }}>
                                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '100px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(255,255,255,0.2)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                                                                in
                                                            </div>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <VideoTransition 
                show={isTransitioningDarshan} 
                onComplete={() => {
                    setIsTransitioningDarshan(false);
                    navigate('/about/team/darshan');
                }} 
            />
        </div>
    );
}
