import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StaggeredText from './StaggeredText';

export default function VisionSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Translate the inner container from 0 to -66.66% to reveal all 3 panels
    const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);

    // Vertical Parallax for the background images as the user scrolls
    const bgY1 = useTransform(scrollYProgress, [0, 0.33], ["-10%", "10%"]);
    const bgY2 = useTransform(scrollYProgress, [0.33, 0.66], ["-10%", "10%"]);
    const bgY3 = useTransform(scrollYProgress, [0.66, 1], ["-10%", "10%"]);

    // Marquee scroll for background ambient text
    const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const marqueeX2 = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);

    return (
        <div ref={containerRef} style={{ position: 'relative', height: '400vh', background: '#020205' }}>

            {/* Sticky Container */}
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

                {/* Massive Animated Ambient Marquees */}
                <div style={{ position: 'absolute', top: '15%', left: 0, width: '200vw', zIndex: 0, pointerEvents: 'none', opacity: 0.15 }}>
                    <motion.div style={{ x: marqueeX, display: 'flex', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: 'clamp(10rem, 20vw, 25rem)', fontFamily: 'var(--font-sans)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', paddingRight: '100px' }}>
                            GLOBAL CITIZENS • LEARN OVERSEAS •
                        </span>
                        <span style={{ fontSize: 'clamp(10rem, 20vw, 25rem)', fontFamily: 'var(--font-sans)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', paddingRight: '100px' }}>
                            GLOBAL CITIZENS • LEARN OVERSEAS •
                        </span>
                    </motion.div>
                </div>
                <div style={{ position: 'absolute', bottom: '15%', left: '-100vw', width: '200vw', zIndex: 0, pointerEvents: 'none', opacity: 0.15 }}>
                    <motion.div style={{ x: marqueeX2, display: 'flex', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: 'clamp(10rem, 20vw, 25rem)', fontFamily: 'var(--font-sans)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', paddingRight: '100px' }}>
                            BEYOND ACADEMICS • LIFELONG NETWORK •
                        </span>
                        <span style={{ fontSize: 'clamp(10rem, 20vw, 25rem)', fontFamily: 'var(--font-sans)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', paddingRight: '100px' }}>
                            BEYOND ACADEMICS • LIFELONG NETWORK •
                        </span>
                    </motion.div>
                </div>

                {/* Overlays for dark aesthetics */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(2,2,5,0.7) 0%, rgba(2,2,5,0.95) 100%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,2,5,1) 0%, transparent 20%, transparent 80%, rgba(2,2,5,1) 100%)', zIndex: 1 }} />

                {/* --- Horizontal Scroll Panels --- */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '300vw', // 3 panels = 300vw
                        height: '100vh',
                        display: 'flex',
                        x: xTransform,
                        zIndex: 10
                    }}
                >
                    {/* Panel 1 */}
                    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 5vw', position: 'relative', overflow: 'hidden' }}>
                        <motion.div style={{ y: bgY1, position: 'absolute', inset: -100, backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=90&w=2560)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, zIndex: -1 }} />
                        <div style={{ maxWidth: 1000, background: 'rgba(2,2,5,0.9)', padding: '60px', borderRadius: 40, border: '1px solid rgba(75, 144, 255, 0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
                            <p style={{ color: 'var(--accent-blue)', letterSpacing: 6, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 800, marginBottom: 20 }}>The Future</p>
                            <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'var(--font-serif)', color: '#fff', lineHeight: 0.9, marginBottom: '30px' }}>
                                GLOBAL<br />CITIZENS
                            </h1>
                            <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', fontSize: '1.4rem', fontWeight: 300, maxWidth: 800, margin: '0 auto' }}>
                                <StaggeredText text="We believe that borders should never limit potential. Our vision is to empower a new generation of leaders with truly global perspectives, educated at the world's finest institutions." />
                            </p>
                        </div>
                    </div>

                    {/* Panel 2 */}
                    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 5vw', position: 'relative', overflow: 'hidden' }}>
                        <motion.div style={{ y: bgY2, position: 'absolute', inset: -100, backgroundImage: 'url(https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=90&w=2560)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, zIndex: -1 }} />
                        <div style={{ maxWidth: 1000, background: 'rgba(2,2,5,0.9)', padding: '60px', borderRadius: 40, border: '1px solid rgba(249, 212, 64, 0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
                            <p style={{ color: 'var(--accent-gold)', letterSpacing: 6, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 800, marginBottom: 20 }}>Our Method</p>
                            <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'var(--font-serif)', color: '#fff', lineHeight: 0.9, marginBottom: '30px' }}>
                                BEYOND<br />ACADEMICS
                            </h1>
                            <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', fontSize: '1.4rem', fontWeight: 300, maxWidth: 800, margin: '0 auto' }}>
                                <StaggeredText text="Grades are just the baseline. We architect holistic profiles that demonstrate deep intellectual curiosity, relentless ambition, and the capacity to change the world." />
                            </p>
                        </div>
                    </div>

                    {/* Panel 3 */}
                    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 5vw', position: 'relative', overflow: 'hidden' }}>
                        <motion.div style={{ y: bgY3, position: 'absolute', inset: -100, backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=90&w=2560)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, zIndex: -1 }} />
                        <div style={{ maxWidth: 1000, background: 'rgba(2,2,5,0.9)', padding: '60px', borderRadius: 40, border: '1px solid rgba(214, 122, 67, 0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
                            <p style={{ color: 'var(--accent-copper)', letterSpacing: 6, textTransform: 'uppercase', fontSize: '1rem', fontWeight: 800, marginBottom: 20 }}>The Outcome</p>
                            <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'var(--font-serif)', color: '#fff', lineHeight: 0.9, marginBottom: '30px' }}>
                                A LIFELONG<br />NETWORK
                            </h1>
                            <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', fontSize: '1.4rem', fontWeight: 300, maxWidth: 800, margin: '0 auto' }}>
                                <StaggeredText text="Graduating from a top-tier university is only the beginning. We prepare our students to leverage unparalleled alumni networks, accelerating their trajectories for decades to come." />
                            </p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
