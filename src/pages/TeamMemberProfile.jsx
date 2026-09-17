import React, { useRef, useEffect } from 'react';
import { TEAM_MEMBERS } from '../data/teamData';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Image, Sparkles, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useTransform, useScroll as useFramerScroll } from 'framer-motion';



const Figure3D = ({ image, scrollYProgress }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse tracking rotation
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
    groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);

    // Zoom and position based on scroll
    const scrollVal = scrollYProgress.get(); // 0 to 1
    
    const targetScale = 1 + scrollVal * 0.2; // Reduced zoom
    groupRef.current.scale.set(targetScale, targetScale, targetScale);
    
    groupRef.current.position.y = -2.8 - (scrollVal * 0.5); // Push down to hide legs, showing upper body
    groupRef.current.position.z = 0;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {image && (
        <Image url={image} transparent scale={[7, 9.1]} />
      )}

      {/* Swirling Particles / Data nodes */}
      <Sparkles count={400} scale={20} size={10} speed={0.4} opacity={0.6} color="cyan" />
      <Sparkles count={400} scale={20} size={5} speed={0.8} opacity={0.4} color="red" />
    </group>
  );
};

const BackgroundTypography = ({ name, scrollYProgress }) => {
  const { viewport } = useThree();
  const textRef = useRef();

  const nameParts = name.toUpperCase().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const fontSize = Math.min(viewport.width / 8, 3);
  const gap = 1.5; // Space for the figure

  return (
    <group position={[0, 0, -5]} ref={textRef}>
      {firstName && (
        <Text
          position={[-gap, 0, 0]}
          fontSize={fontSize}
          color="white"
          anchorX="right"
          anchorY="middle"
          letterSpacing={-0.05}
          fillOpacity={0.05}
          strokeOpacity={1}
          strokeWidth={1}
          strokeColor="rgba(255,255,255,0.2)"
          material-toneMapped={false}
        >
          {firstName}
        </Text>
      )}
      {lastName && (
        <Text
          position={[gap, 0, 0]}
          fontSize={fontSize}
          color="white"
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.05}
          fillOpacity={0.05}
          strokeOpacity={1}
          strokeWidth={1}
          strokeColor="rgba(255,255,255,0.2)"
          material-toneMapped={false}
        >
          {lastName}
        </Text>
      )}
    </group>
  );
};

const Scene = ({ member, scrollYProgress }) => {
  return (
    <React.Suspense fallback={null}>
      <BackgroundTypography name={member.name} scrollYProgress={scrollYProgress} />
      <Figure3D image={member.image} scrollYProgress={scrollYProgress} />

      <Environment preset="city">
        <Lightformer intensity={4} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer intensity={4} position={[-10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer type="ring" intensity={2} color="red" position={[0, 0, 5]} scale={[10, 10, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer type="ring" intensity={2} color="cyan" position={[0, 0, -5]} scale={[10, 10, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </Environment>
    </React.Suspense>
  );
}

export default function TeamMemberProfile({ id, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const containerRef = useRef();
  const { scrollYProgress } = useFramerScroll({
    container: containerRef
  });

  const member = TEAM_MEMBERS.find(m => m.id === id);

  if (!member) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', inset: 0, backgroundColor: '#050505', zIndex: 999990, cursor: 'auto' }}>

      {/* 3D Canvas Layer (Fixed) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <Scene member={member} scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>

      {/* HTML Scroll Container (Above Canvas, allows scrolling) */}
      <div ref={containerRef} data-lenis-prevent="true" style={{ position: 'absolute', inset: 0, overflowY: 'auto', zIndex: 2, pointerEvents: 'auto' }}>

        {/* Fixed Header */}
        <div style={{ position: 'fixed', top: 40, left: 40, right: 40, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none' }}>
          <button
            onClick={onClose}
            style={{
              pointerEvents: 'auto',
              background: 'transparent',
              color: 'white',
              padding: '10px 0',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: 2,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              mixBlendMode: 'difference',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ width: '40px', height: '2px', background: 'white' }} />
            RETURN TO DIRECTORY
          </button>

          <div style={{ textAlign: 'right', color: 'white', mixBlendMode: 'difference' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7, fontFamily: 'monospace', letterSpacing: 1 }}>{member.category.toUpperCase()}</p>
          </div>
        </div>

        {/* Page 1: Hero */}
        <div style={{ minHeight: '80vh', padding: '140px 40px 80px', boxSizing: 'border-box', position: 'relative', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: 'white', mixBlendMode: 'difference'
            }}
          >
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.5, letterSpacing: 2 }}>SYS.CORE.ACTIVE // SCROLL_DOWN</p>
            <h1 style={{ margin: 0, fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.85 }}>{member.name}</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ margin: "-10%" }}
            style={{
              position: 'absolute', bottom: '15vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', color: 'white'
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>SCROLL TO EXPLORE</span>
            <div className="bounce-scroll">
              <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))' }} />
            </div>
          </motion.div>
        </div>

        {/* Page 2: Professional Overview */}
        <div style={{ minHeight: '80vh', padding: '60px 10vw', boxSizing: 'border-box', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            style={{
              width: '500px', color: 'white'
            }}
          >
            <div style={{
              background: 'rgba(12,12,18,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '50px', borderRadius: '32px', 
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle at top left, rgba(249,212,64,0.1), transparent 60%)', pointerEvents: 'none' }} />

              <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 4, margin: '0 0 20px 0', color: 'var(--accent-gold)', fontWeight: 600 }}>Professional Overview</p>
              <h3 style={{ fontSize: '2.8rem', margin: '0 0 25px 0', fontFamily: 'var(--font-serif)', lineHeight: 1.1, fontWeight: 400 }}>{member.role}</h3>
              <div style={{ width: '40px', height: '2px', background: 'var(--accent-gold)', marginBottom: '25px' }} />
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8, margin: 0, fontWeight: 300, color: 'rgba(255,255,255,0.75)' }}>
                Pioneering the strategic vision and operational excellence. Focused on driving exponential growth and leveraging cutting-edge methodologies to redefine industry standards across global operations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Page 3: Key Expertise */}
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'flex-end', padding: '60px 10vw', boxSizing: 'border-box', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            style={{
              width: '550px', color: 'white'
            }}
          >
            <div style={{
              background: 'rgba(12,12,18,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '50px', borderRadius: '32px', 
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
              display: 'flex', flexDirection: 'column', gap: '35px', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at top right, rgba(125,193,177,0.08), transparent 50%)', pointerEvents: 'none' }} />

              <div>
                <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 4, margin: '0 0 10px 0', color: 'var(--accent-blue)', fontWeight: 600 }}>Core Competencies</p>
                <h3 style={{ fontSize: '2.4rem', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Expertise & Impact</h3>
              </div>

              {[
                { label: 'Strategic Vision', value: 98, color: 'var(--accent-gold)' },
                { label: 'Execution Velocity', value: 94, color: 'var(--accent-blue)' },
                { label: 'Global Operations', value: 100, color: '#fff' }
              ].map((stat, i) => (
                <div key={i} style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', fontWeight: 400, letterSpacing: 1 }}>{stat.label}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '300', color: stat.color, fontFamily: 'var(--font-serif)' }}>{stat.value}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      viewport={{ amount: 0.8 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      style={{
                        height: '100%', 
                        background: stat.color,
                        borderRadius: 10,
                        boxShadow: `0 0 10px ${stat.color}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Page 4 (formerly 6): Let's Connect */}

        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', padding: '120px 40px', boxSizing: 'border-box', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            style={{
              width: '100%', maxWidth: '800px', color: 'white', textAlign: 'center'
            }}
          >
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: 'var(--font-serif)', fontWeight: 400, margin: '0 0 30px 0', lineHeight: 1.1 }}>
              "Transforming global education, <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>one student at a time.</span>"
            </h2>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', pointerEvents: 'auto' }}>
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '15px 40px', borderRadius: '100px', background: 'var(--accent-gold)', color: '#000',
                    border: 'none', fontSize: '1rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(249,212,64,0.3)'
                  }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Connect on LinkedIn
                  </button>
                </a>
              )}
            </div>
          </motion.div>
        </div>

      </div>

    </motion.div>
  );
}
