import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Line, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

// Helper to convert lat/lon to 3D vector on a sphere
const getPointFromLatLon = (lat, lon, radius = 2) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

// Points
const DESTINATIONS = {
  India: { lat: 20.5937, lon: 78.9629 },
  UK: { lat: 55.3781, lon: -3.436 },
  USA: { lat: 37.0902, lon: -95.7129 },
  Australia: { lat: -25.2744, lon: 133.7751 },
};

const Airplane = ({ startPoint, endPoint, progress }) => {
  const meshRef = useRef();

  // Create a curve
  const curve = useMemo(() => {
    // Control point for the curve (pushed out from center)
    const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    midPoint.normalize().multiplyScalar(startPoint.length() * 1.5); // Arc height

    return new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
  }, [startPoint, endPoint]);

  useFrame(() => {
    if (meshRef.current) {
      // Get position along curve
      const position = curve.getPoint(progress);
      meshRef.current.position.copy(position);

      // Look at next point to orient the plane
      const lookAtPos = curve.getPoint(Math.min(progress + 0.01, 1));
      meshRef.current.lookAt(lookAtPos);
      
      // Rotate 90 deg so the cone points forward
      meshRef.current.rotateX(Math.PI / 2);
    }
  });

  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[0.08, 0.2, 8]} />
      <meshStandardMaterial color="#FC7133" />
    </mesh>
  );
};

const ArcLine = ({ startPoint, endPoint, progress }) => {
  const points = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    midPoint.normalize().multiplyScalar(startPoint.length() * 1.5);
    const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
    return curve.getPoints(50);
  }, [startPoint, endPoint]);

  // Only draw up to progress
  const drawnPoints = points.slice(0, Math.max(2, Math.floor(points.length * progress)));

  if (drawnPoints.length < 2) return null;

  return (
    <Line
      points={drawnPoints}
      color="#F9D440"
      lineWidth={3}
      dashed={false}
    />
  );
};

const LocationMarker = ({ position, label }) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#7DC1B1" />
    </mesh>
    <Billboard position={[0, 0.2, 0]}>
      <Text fontSize={0.15} color="#1a1a1a" backgroundColor="white" padding={0.05} borderRadius={0.05}>
        {label}
      </Text>
    </Billboard>
  </group>
);

const GlobeComponent = ({ activeDestination = 'UK' }) => {
  const globeRef = useRef();
  
  // Animation state
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    // Reset progress when destination changes
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          clearInterval(interval);
          return 1;
        }
        return p + 0.005;
      });
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [activeDestination]);

  const startPoint = useMemo(() => getPointFromLatLon(DESTINATIONS.India.lat, DESTINATIONS.India.lon, 2.05), []);
  const endPoint = useMemo(() => getPointFromLatLon(DESTINATIONS[activeDestination].lat, DESTINATIONS[activeDestination].lon, 2.05), [activeDestination]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#BBCDE2" />
      
      {/* The Globe */}
      <group ref={globeRef}>
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial 
            color="#BBCDE2" 
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </Sphere>
        
        {/* Solid inner sphere to hide backface wires */}
        <Sphere args={[1.98, 32, 32]}>
          <meshBasicMaterial color="#F3EAE3" />
        </Sphere>

        {/* Markers */}
        <LocationMarker position={startPoint} label="India" />
        <LocationMarker position={endPoint} label={activeDestination} />

        {/* Arc and Plane */}
        <ArcLine startPoint={startPoint} endPoint={endPoint} progress={progress} />
        <Airplane startPoint={startPoint} endPoint={endPoint} progress={progress} />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} />
    </group>
  );
};

export default GlobeComponent;
