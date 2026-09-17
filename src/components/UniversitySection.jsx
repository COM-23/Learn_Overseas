import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import './UniversitySection.css';

const universities = [
    { name: 'University of Oxford', location: 'UK', acceptance: '17.5%', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', span: 8, delay: 0 },
    { name: 'Harvard University', location: 'USA', acceptance: '3.19%', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', span: 4, delay: 0.1 },
    { name: 'Stanford University', location: 'USA', acceptance: '3.95%', image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', span: 4, delay: 0.2 },
    { name: 'MIT', location: 'USA', acceptance: '3.96%', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', span: 8, delay: 0 },
    { name: 'University of Cambridge', location: 'UK', acceptance: '21%', image: 'https://images.unsplash.com/photo-1513622470522-26c314a85ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', span: 12, delay: 0.1 },
];

function SafeGridCard({ uni, yTransform }) {
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // High performance intense 3D rotation mapping
    const rotateX = useTransform(y, [0, 1], [15, -15]);
    const rotateY = useTransform(x, [0, 1], [-15, 15]);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                gridColumn: `span ${uni.span}`,
                position: 'relative',
                height: uni.span === 12 ? '600px' : '450px',
                borderRadius: '40px',
                cursor: 'pointer',
                y: yTransform,
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformPerspective: 1200,
                transformStyle: 'preserve-3d',
                zIndex: 5
            }}
            whileHover={{ scale: 0.98, zIndex: 20 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: uni.delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Inner Wrapper for the Image & Content to handle the overflow properly */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '40px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: '#020205',
                }}
                whileHover={{ boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 80px rgba(249, 212, 64, 0.2)' }}
            >
                {/* Background Image with inverse parallax for 3D depth */}
                <motion.img 
                    src={uni.image} 
                    alt={uni.name} 
                    style={{
                        position: 'absolute',
                        top: '-10%', left: '-10%',
                        width: '120%', height: '120%',
                        objectFit: 'cover',
                        filter: 'brightness(0.5)',
                        // Inverse translation creates a 3D parallax window effect
                        x: useTransform(x, [0, 1], ["5%", "-5%"]),
                        y: useTransform(y, [0, 1], ["5%", "-5%"]),
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                />

                {/* Gradient Overlay for Text */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,0.95) 0%, rgba(2,2,5,0.2) 60%, transparent 100%)', pointerEvents: 'none' }} />

                {/* Premium Glassmorphism Content Container popping out in 3D */}
                <motion.div 
                    style={{ 
                        position: 'absolute', 
                        bottom: '30px', left: '30px', right: '30px', 
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        background: 'rgba(10,10,15,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                        pointerEvents: 'none',
                        translateZ: 50 // Pops out of the card
                    }}
                >
                    <div style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '8px 16px', borderRadius: '100px', 
                        border: '1px solid rgba(249,212,64,0.3)',
                        marginBottom: 15,
                        alignSelf: 'flex-start'
                    }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }} />
                        <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
                            {uni.acceptance} Acceptance
                        </span>
                    </div>
                    
                    <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', color: '#fff', fontFamily: 'var(--font-serif)', margin: '0 0 5px 0', lineHeight: 1.1, textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                        {uni.name}
                    </h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginTop: 5 }}>
                        <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, rgba(255,255,255,0.5), transparent)' }} />
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', letterSpacing: 6, textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>
                            {uni.location}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function UniversitySection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    
    // Parallax effects for grid items
    const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const y3 = useTransform(scrollYProgress, [0, 1], [250, -250]);

    // Background blur deepens as you scroll
    const bgBlur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(80px)", "blur(120px)", "blur(80px)"]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            style={{ position: 'relative', background: '#020205', padding: '200px 0', overflow: 'hidden' }}
        >
            
            {/* Interactive Mouse Spotlight */}
            <motion.div 
                animate={{
                    x: mousePosition.x - 400,
                    y: mousePosition.y - 400,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.5 }}
                style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: 800, height: 800,
                    background: 'radial-gradient(circle, rgba(249, 212, 64, 0.12) 0%, rgba(125, 193, 177, 0.05) 40%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 2,
                    
                }}
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -1000],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1, 0.5]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        bottom: -50,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        background: i % 2 === 0 ? 'var(--accent-gold)' : '#fff',
                        borderRadius: '50%',
                        zIndex: 3,
                        boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--accent-gold)' : '#fff'}`
                    }}
                />
            ))}
            
            {/* ── The Ultimate Animated Mesh Background ── */}
            <motion.div
                animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: 'radial-gradient(circle at center, rgba(249, 212, 64, 0.08) 0%, rgba(125, 193, 177, 0.05) 30%, rgba(214, 122, 67, 0.05) 70%, transparent 100%)',
                    backgroundSize: '200% 200%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.8
                }}
            />
            
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, transparent 10%, #020205 90%)', pointerEvents: 'none', zIndex: 1 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto', padding: '0 5vw' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '120px' }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '100px', marginBottom: '30px' }}
                    >
                        <div style={{ width: 8, height: 8, background: 'var(--accent-gold)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-gold)' }} />
                        <span style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 800, fontSize: '0.8rem' }}>
                            Global Destinations
                        </span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ color: '#fff', fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontFamily: 'var(--font-serif)', margin: '0 auto', maxWidth: '1200px', lineHeight: 1 }}
                    >
                        The Ivy League <br /> 
                        <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)', fontStyle: 'italic' }}>& Beyond.</span>
                    </motion.h2>
                </div>

                {/* Asymmetric Bento Grid Layout with Parallax */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '40px',
                    width: '100%'
                }}>
                    <SafeGridCard uni={universities[0]} yTransform={y1} />
                    <SafeGridCard uni={universities[1]} yTransform={y2} />
                    <SafeGridCard uni={universities[2]} yTransform={y3} />
                    <SafeGridCard uni={universities[3]} yTransform={y1} />
                    <SafeGridCard uni={universities[4]} yTransform={y2} />
                </div>
                
            </div>
        </section>
    );
}
