import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Helper for Lat/Lon to 3D
const getPointFromLatLon = (lat, lon, radius = 2) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

const DESTINATIONS = {
  India: { lat: 20.5937, lon: 78.9629 },
  UK: { lat: 55.3781, lon: -3.436 },
  USA: { lat: 37.0902, lon: -95.7129 },
  Australia: { lat: -25.2744, lon: 133.7751 },
};

const ArcLine = ({ startPoint, endPoint, color }) => {
  const points = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    midPoint.normalize().multiplyScalar(startPoint.length() * 1.5);
    const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
    return curve.getPoints(50);
  }, [startPoint, endPoint]);

  return <Line points={points} color={color} lineWidth={2} transparent opacity={0.8} />;
};

export default function ImmersiveGlobe({ scrollYProgress }) {
  const globeGroupRef = useRef();

  // Load High-Res Earth Textures
  const [colorMap, bumpMap, specularMap] = useLoader(THREE.TextureLoader, [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png'
  ]);

  const startPoint = useMemo(() => getPointFromLatLon(DESTINATIONS.India.lat, DESTINATIONS.India.lon, 2.02), []);
  const dest1 = useMemo(() => getPointFromLatLon(DESTINATIONS.UK.lat, DESTINATIONS.UK.lon, 2.02), []);
  const dest2 = useMemo(() => getPointFromLatLon(DESTINATIONS.USA.lat, DESTINATIONS.USA.lon, 2.02), []);
  const dest3 = useMemo(() => getPointFromLatLon(DESTINATIONS.Australia.lat, DESTINATIONS.Australia.lon, 2.02), []);

  useFrame((state) => {
    if (!globeGroupRef.current) return;
    
    // Read the scroll progress (0 to 1) passed from the parent DOM overlay
    const scroll = scrollYProgress.get();
    
    // Smooth idle rotation + scroll-driven rotation
    const baseRotation = state.clock.getElapsedTime() * 0.05;
    
    // Move the globe based on scroll
    // Start centered, then move left/right to make room for UI
    let targetX = 0;
    let targetZ = 0;
    let rotationY = baseRotation;
    let rotationX = 0;

    if (scroll < 0.25) {
      // Intro: Centered, prominent
      targetX = 0;
      targetZ = 2; 
    } else if (scroll >= 0.25 && scroll < 0.5) {
      // Services: Move left, zoom out slightly
      targetX = -1.5;
      targetZ = 0;
    } else if (scroll >= 0.5 && scroll < 0.75) {
      // Destinations: Move right, rotate to show India & arcs
      targetX = 1.5;
      targetZ = 1;
      rotationY = baseRotation - 1.5; // Rotate to face India
    } else {
      // Contact: Centered and far
      targetX = 0;
      targetZ = -1;
      rotationX = 0.5; // Look down slightly
    }

    // Lerp for smooth transitions
    globeGroupRef.current.position.x = THREE.MathUtils.lerp(globeGroupRef.current.position.x, targetX, 0.05);
    globeGroupRef.current.position.z = THREE.MathUtils.lerp(globeGroupRef.current.position.z, targetZ, 0.05);
    globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(globeGroupRef.current.rotation.y, rotationY, 0.05);
    globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(globeGroupRef.current.rotation.x, rotationX, 0.05);
  });

  return (
    <group>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#BBCDE2" />
      
      <group ref={globeGroupRef}>
        <Sphere args={[2, 64, 64]}>
          <meshPhongMaterial 
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.05}
            specularMap={specularMap}
            specular={new THREE.Color('grey')}
            shininess={10}
          />
        </Sphere>
        
        {/* Draw Arcs - we'll just show them always, but they'll be most visible in the destinations section */}
        <ArcLine startPoint={startPoint} endPoint={dest1} color="#FC7133" />
        <ArcLine startPoint={startPoint} endPoint={dest2} color="#F9D440" />
        <ArcLine startPoint={startPoint} endPoint={dest3} color="#7DC1B1" />
        
        {/* Glowing marker at India */}
        <mesh position={startPoint}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      
    </group>
  );
}
