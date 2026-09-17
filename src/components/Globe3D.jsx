import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Lat/lon → 3D vector ──────────────────────────────────────── */
function toVec3(lat, lon, r = 2) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ─── City glow dot ────────────────────────────────────────────── */
function CityDot({ lat, lon, color = 'var(--accent-gold)', pulse = false, r = 2.02 }) {
  const m = useRef();
  useFrame(({ clock }) => {
    if (!m.current || !pulse) return;
    const s = 1 + 0.4 * Math.abs(Math.sin(clock.getElapsedTime() * 2 + lat));
    m.current.scale.setScalar(s);
  });
  return (
    <mesh ref={m} position={toVec3(lat, lon, r)}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={color} />
      <pointLight intensity={0.5} distance={0.8} color={color} />
    </mesh>
  );
}

/* ─── Flight arc ───────────────────────────────────────────────── */
function FlightArc({ from, to, color, animated = true }) {
  const lineRef = useRef();
  const progressRef = useRef(0);

  const fullPoints = useMemo(() => {
    const p1 = toVec3(from[0], from[1]);
    const p2 = toVec3(to[0], to[1]);
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(2.8);
    return new THREE.QuadraticBezierCurve3(p1, mid, p2).getPoints(80);
  }, [from, to]);

  useFrame((_, delta) => {
    if (!animated || !lineRef.current) return;
    progressRef.current = Math.min(progressRef.current + delta * 0.4, 1);
    const count = Math.floor(fullPoints.length * progressRef.current);
    if (count < 2) return;
    const pts = fullPoints.slice(0, count);
    lineRef.current.geometry.setFromPoints(pts);
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.55} linewidth={1} />
    </line>
  );
}

/* ─── Airplane ─────────────────────────────────────────────────── */
function Airplane({ from, to, color = '#fff', speed = 0.07, offset = 0 }) {
  const group = useRef();
  const t = useRef(offset % 1);

  const curve = useMemo(() => {
    const p1 = toVec3(from[0], from[1]);
    const p2 = toVec3(to[0], to[1]);
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(2.8);
    return new THREE.QuadraticBezierCurve3(p1, mid, p2);
  }, [from, to]);

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1;
    if (!group.current) return;
    const pos  = curve.getPoint(t.current);
    const tang = curve.getTangent(t.current).normalize();
    group.current.position.copy(pos);
    group.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tang);
  });

  return (
    <group ref={group}>
      {/* Fuselage */}
      <mesh>
        <coneGeometry args={[0.014, 0.09, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wings */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.11, 0.005, 0.022]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.8} />
      </mesh>
      {/* Engine glow */}
      <pointLight intensity={0.8} distance={0.4} color={color} />
    </group>
  );
}

/* ─── Earth globe (GLSL procedural — no texture needed) ────────── */
const VERT = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = `
  uniform float time;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x),
                   mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                   mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
  }

  void main() {
    vec3 dir = normalize(vPosition);
    // Optimized: single octave noise for base continent generation
    float n = noise(dir * 3.5) * 0.8 + 0.2;
    
    // Ocean = deep blue, Land = slightly lighter
    vec3 ocean = vec3(0.02, 0.08, 0.22);
    vec3 land  = vec3(0.04, 0.14, 0.32);
    vec3 base  = mix(ocean, land, smoothstep(0.48, 0.52, n));

    // Atmosphere rim
    float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
    vec3 atmo = vec3(0.08, 0.3, 0.9) * pow(rim, 3.0) * 0.8;

    // Sunlight
    vec3 sun = normalize(vec3(3.0, 2.0, 4.0));
    float diff = max(0.0, dot(vNormal, sun)) * 0.7 + 0.3;
    
    // Grid lines (lat/lon)
    float latLine = step(0.97, abs(sin(dir.y * 12.0 * 3.14159)));
    float lonLine = step(0.97, abs(sin(atan(dir.z, dir.x) * 12.0)));
    float grid = max(latLine, lonLine) * 0.06;

    vec3 col = base * diff + atmo + vec3(grid);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function EarthMesh() {
  const shaderRef = useRef();
  useFrame(({ clock }) => {
    if (shaderRef.current) shaderRef.current.uniforms.time.value = clock.getElapsedTime();
  });
  return (
    <mesh>
      <icosahedronGeometry args={[2, 8]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
}

function AtmosphereShell() {
  return (
    <mesh>
      <sphereGeometry args={[2.18, 32, 32]} />
      <meshBasicMaterial color="#1a6fff" transparent opacity={0.055} side={THREE.BackSide} />
    </mesh>
  );
}

/* ─── Cities and routes ─────────────────────────────────────────── */
const INDIA  = [20.5, 78.9];
const CITIES = [
  { pos: [51.5, -0.1],    color: 'var(--accent-gold)', name: 'London' },
  { pos: [40.7, -74.0],   color: '#E8724A', name: 'New York' },
  { pos: [-33.9, 151.2],  color: '#4ABFB5', name: 'Sydney' },
  { pos: [43.7, -79.4],   color: '#8C8FD6', name: 'Toronto' },
  { pos: [1.3,  103.8],   color: '#6BBF8C', name: 'Singapore' },
  { pos: [48.9, 2.3],     color: '#FF9F40', name: 'Paris' },
];

function GlobeScene() {
  const globeRef = useRef();
  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.07;
  });

  return (
    <group ref={globeRef}>
      <EarthMesh />
      <AtmosphereShell />

      {/* India — origin dot (larger, pulsing orange) */}
      <CityDot lat={INDIA[0]} lon={INDIA[1]} color="#FF6B35" pulse r={2.025} />

      {/* Destination cities */}
      {CITIES.map((c, i) => (
        <CityDot key={i} lat={c.pos[0]} lon={c.pos[1]} color={c.color} r={2.025} />
      ))}

      {/* Flight arcs */}
      {CITIES.map((c, i) => (
        <FlightArc key={i} from={INDIA} to={c.pos} color={c.color} />
      ))}

      {/* Airplanes */}
      {CITIES.map((c, i) => (
        <Airplane key={i} from={INDIA} to={c.pos} color={c.color} offset={i * 0.17} speed={0.06 + i * 0.008} />
      ))}
    </group>
  );
}

/* ─── Exported Globe Canvas ─────────────────────────────────────── */
export default function Globe3D({ style = {} }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', ...style }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 4, 6]} intensity={1.4} color="#ffe8c0" />
      <pointLight position={[-8, -6, -6]} intensity={0.5} color="#1a4aff" />

      <Suspense fallback={null}>
        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.4} />
        <GlobeScene />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.35}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
        autoRotate={false}
      />
    </Canvas>
  );
}
