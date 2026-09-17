import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export default function StunningGlobe({ activeDestination }) {
  const globeEl = useRef();
  const [arcsData, setArcsData] = useState([]);
  const [ringsData, setRingsData] = useState([]);

  // Base coordinates
  const india = { lat: 20.5937, lng: 78.9629, name: 'India' };
  const destinations = {
    UK: { lat: 55.3781, lng: -3.436, name: 'UK' },
    USA: { lat: 37.0902, lng: -95.7129, name: 'USA' },
    Australia: { lat: -25.2744, lng: 133.7751, name: 'Australia' }
  };

  useEffect(() => {
    // When destination changes, create an arc (airplane flight) and rings (radar pulses)
    if (activeDestination && destinations[activeDestination]) {
      const dest = destinations[activeDestination];
      
      // Emit arc from India to Destination
      setArcsData([{
        startLat: india.lat,
        startLng: india.lng,
        endLat: dest.lat,
        endLng: dest.lng,
        color: ['#FC7133', '#F9D440'] // Orange to Yellow gradient
      }]);

      // Emit rings at destination
      setRingsData([
        { lat: dest.lat, lng: dest.lng, maxR: 5, propagationSpeed: 2, repeatPeriod: 1000 },
        { lat: india.lat, lng: india.lng, maxR: 3, propagationSpeed: 1, repeatPeriod: 1000 }
      ]);

      // Point camera at destination smoothly
      if (globeEl.current) {
        globeEl.current.pointOfView({ lat: dest.lat, lng: dest.lng, altitude: 2 }, 1500);
      }
    }
  }, [activeDestination]);

  useEffect(() => {
    // Auto-rotate setup
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      if (entries.length > 0) {
        setDimensions({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {dimensions.width > 0 && (
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          arcsData={arcsData}
          arcColor={'color'}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={1500}
          arcStroke={1}
          ringsData={ringsData}
          ringColor={() => '#7DC1B1'}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          width={dimensions.width}
          height={dimensions.height}
        />
      )}
    </div>
  );
}
