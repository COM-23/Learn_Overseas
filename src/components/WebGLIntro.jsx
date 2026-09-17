import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function PassportBook({ onClick, phase }) {
  const group = useRef();
  const coverTexture = useTexture('/realistic_passport_cover.jpg');
  const insideTexture = useTexture('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=400&auto=format&fit=crop');
  
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered && phase === 'idle' ? 'pointer' : 'auto';
  }, [hovered, phase]);

  useFrame((state) => {
    if (phase === 'idle') {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t * 0.5) * 0.1, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.sin(t * 0.8) * 0.05, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t * 1.5) * 0.1, 0.05);
    }
  });

  return (
    <group 
      ref={group} 
      onClick={() => phase === 'idle' && onClick()}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Front Cover */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[3.2, 4.5, 0.02]} />
        <meshStandardMaterial 
          map={coverTexture} 
          roughness={0.4}
          metalness={0.1}
          color={hovered && phase === 'idle' ? '#ffffff' : '#dddddd'}
        />
      </mesh>
      {/* Pages */}
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[3.1, 4.4, 0.08]} />
        <meshStandardMaterial color="#f0ece1" roughness={0.9} />
      </mesh>
      {/* Back Cover */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.2, 4.5, 0.02]} />
        <meshStandardMaterial map={coverTexture} roughness={0.4} metalness={0.1} color="#1a1a24" />
      </mesh>
    </group>
  );
}

function CloudTunnel({ phase }) {
  const particles = useRef();
  
  // Create thousands of stars/particles for the "hyperspace" cloud rush
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 1.0) * 100; // Deep z-axis
  }

  useFrame((state, delta) => {
    if (phase === 'diving' && particles.current) {
      // Move particles towards camera to simulate speed
      particles.current.position.z += delta * 150;
      if (particles.current.position.z > 50) {
        particles.current.position.z = 0; // loop
      }
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffffff" transparent opacity={phase === 'diving' ? 0.8 : 0} sizeAttenuation={true} />
    </points>
  );
}

function CameraRig({ phase, onComplete }) {
  const camera = useRef();
  
  useEffect(() => {
    if (phase === 'diving') {
      // The camera dive animation
      gsap.to(camera.current.position, {
        z: -20, // Dive deep through the passport and into the clouds
        duration: 2.5,
        ease: 'power3.in',
        onComplete: () => {
          onComplete(); // Trigger DOM fade-in
        }
      });
      // Add camera shake/rumble for intensity
      gsap.to(camera.current.rotation, {
        z: 0.1,
        y: 0.05,
        duration: 0.1,
        repeat: 20,
        yoyo: true,
        ease: 'none',
      });
    }
  }, [phase, onComplete]);

  return <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 8]} fov={45} />;
}

export default function WebGLIntro({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle, diving, done

  if (phase === 'done') return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#020205' }}>
      
      {/* Intro Text Overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'idle' ? 1 : 0, transition: 'opacity 0.5s ease-out'
      }}>
        <div style={{ position: 'absolute', bottom: '15%' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)', , border: '1px solid rgba(249,212,64,0.3)',
            padding: '16px 40px', borderRadius: 100, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 4, fontSize: 13, fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            animation: 'pulse 2s infinite ease-in-out'
          }}>
            Click to enter
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
      `}</style>

      {/* 3D Canvas */}
      <Canvas>
        <color attach="background" args={['#020205']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffedd6" />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color="#4ABFB5" />
        
        <CameraRig phase={phase} onComplete={() => setPhase('done') || onComplete()} />
        
        <group>
          {/* Passport */}
          {phase === 'idle' && (
            <PassportBook phase={phase} onClick={() => setPhase('diving')} />
          )}
          
          {/* Stars background */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Volumetric Clouds Tunnel */}
          <CloudTunnel phase={phase} />
        </group>

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
