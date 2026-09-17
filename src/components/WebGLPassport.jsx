import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/* ── CSS Preloader shown while WebGL loads ─────────────────────────── */
function Preloader() {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#020510', zIndex: 1,
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        border: '2px solid rgba(249,212,64,0.15)',
        borderTop: '2px solid var(--accent-gold)',
        animation: 'spin 1.2s linear infinite',
        marginBottom: 24,
        boxShadow: '0 0 30px rgba(249,212,64,0.2)',
      }} />
      <div style={{ fontSize: 10, letterSpacing: 6, color: 'rgba(249,212,64,0.5)', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Loading your journey</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── 3D Passport Book ─────────────────────────────────────────────────── */
function PassportBook({ onDive, phase }) {
  const group = useRef();
  const coverRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Realistic passport textures
  const coverTex = useTexture('/realistic_passport_cover.jpg');
  const pageTex  = useTexture('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop');

  // Idle float animation
  useFrame((state) => {
    if (clicked) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.12;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.04;
    group.current.position.y = Math.sin(t * 0.8) * 0.07;
  });

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // 1. Book opens — front cover flips open
    gsap.to(coverRef.current.rotation, {
      y: -Math.PI, duration: 0.9, ease: 'power3.inOut',
    });
    // 2. Camera rushes forward
    onDive();
  };

  return (
    <group ref={group}
      onClick={handleClick}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Back cover */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[3.2, 4.5, 0.04]} />
        <meshStandardMaterial map={coverTex} color="#1a2040" roughness={0.5} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Pages body */}
      <mesh position={[0.08, 0, 0]}>
        <boxGeometry args={[3.1, 4.4, 0.1]} />
        <meshStandardMaterial map={pageTex} roughness={0.95} color="#f0e8d0" />
      </mesh>

      {/* Spine */}
      <mesh position={[-1.58, 0, 0]}>
        <boxGeometry args={[0.08, 4.5, 0.24]} />
        <meshStandardMaterial color="#111828" roughness={0.7} />
      </mesh>

      {/* Front cover (hinged — flips open on click) */}
      <group ref={coverRef} position={[-1.58, 0, 0.06]}>
        <mesh position={[1.64, 0, 0]}>
          <boxGeometry args={[3.2, 4.5, 0.04]} />
          <meshStandardMaterial
            map={coverTex}
            roughness={0.4}
            metalness={0.12}
            color={hovered ? '#d0d8f0' : '#ffffff'}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Gold edge highlight */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.22, 4.52, 0.26)]} />
        <lineBasicMaterial color="var(--accent-gold)" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

/* ─── Cloud Tunnel Particles ───────────────────────────────────────────── */
function CloudRush({ active }) {
  const pts = useRef();
  const count = 3000;

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = -Math.random() * 200;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!active || !pts.current) return;
    pts.current.position.z += delta * 80;
    if (pts.current.position.z > 0) pts.current.position.z = -200;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.25} color="#a8d0ff" transparent opacity={active ? 0.9 : 0} sizeAttenuation fog={false} />
    </points>
  );
}

/* ─── Camera Rig ─────────────────────────────────────────────────────── */
function Rig({ phase, onComplete }) {
  const cam = useRef();

  useEffect(() => {
    if (phase !== 'diving') return;
    gsap.timeline()
      .to(cam.current.position, { z: -60, duration: 2.4, ease: 'power3.in' })
      .add(() => onComplete(), 2.0);
  }, [phase]);

  return <PerspectiveCamera ref={cam} makeDefault position={[0, 0, 9]} fov={42} near={0.1} far={1000} />;
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function WebGLPassport({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle | diving | done
  const [fade, setFade] = useState(false);

  const handleDive = () => {
    setPhase('diving');
    // Begin white-out fade just before complete
    setTimeout(() => setFade(true), 1800);
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2600);
  };

  if (phase === 'done') return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
      {/* WebGL Scene */}
      <Canvas style={{ background: '#020510' }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#020510']} />
        <fog attach="fog" args={['#020510', 20, 80]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffead0" />
        <pointLight position={[-6, -4, 4]} intensity={1} color="#4a7fcb" />
        <pointLight position={[6, 6, -2]} intensity={0.6} color="var(--accent-gold)" />

        <Rig phase={phase} onComplete={() => {}} />

        <Suspense fallback={null}>
          <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />
          <PassportBook onDive={handleDive} phase={phase} />
          <CloudRush active={phase === 'diving'} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Prompt text */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: '12%',
        opacity: phase === 'idle' ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          animation: 'floatLabel 2.5s ease-in-out infinite',
        }}>
          <div style={{
            padding: '14px 44px', borderRadius: 100,
            background: 'rgba(0,0,0,0.55)', ,
            border: '1px solid rgba(249,212,64,0.45)',
            color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 5, fontSize: 12, fontWeight: 700,
            boxShadow: '0 0 40px rgba(249,212,64,0.25)',
          }}>Open Passport to Enter</div>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(249,212,64,0.6), transparent)' }} />
        </div>
      </div>

      {/* White flash at end of dive */}
      <div style={{
        position: 'absolute', inset: 0, background: '#fff', pointerEvents: 'none',
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.8s ease-in',
      }} />

      <style>{`
        @keyframes floatLabel {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
