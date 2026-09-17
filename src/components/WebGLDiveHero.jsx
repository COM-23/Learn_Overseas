import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Scroll, Globe2, Plane, Trophy, Telescope } from 'lucide-react';

export default function WebGLDiveHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  // Scroll animations for the Hat and Plane
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  
  // The plane should enter around 0.30, stay from 0.40 to 0.55, and exit rapidly by 0.65
  const planeX = useTransform(scrollYProgress, [0.30, 0.40, 0.55, 0.65], ['100vw', '15vw', '5vw', '-150vw']);
  const planeY = useTransform(scrollYProgress, [0.30, 0.45, 0.65], ['15vh', '5vh', '-10vh']);
  const planeScale = useTransform(scrollYProgress, [0.30, 0.40, 0.55, 0.65], [0.6, 1, 1, 0.6]);

  // Scroll animations for Metric Cards
  // Metrics appear early on, then fade out before the plane enters
  const metricOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.30], [0, 1, 1, 0]);
  const metricY = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.30], [50, 0, 0, -50]);

  // Main UI Text fades out before the airplane takes the stage
  const textOpacity = useTransform(scrollYProgress, [0, 0.20, 0.30], [1, 1, 0]);

  // Fade out the entire sticky wrapper at the very end to seamlessly transition to the GlobeScene
  const wrapperOpacity = useTransform(scrollYProgress, [0.75, 0.90], [1, 0]);

  const uiRef = useRef(null);
  const flashRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x020205, 0.02);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Texture Loading
    const textureLoader = new THREE.TextureLoader();
    const earthDiffuse = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const earthBump = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');
    const earthSpecular = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-water.png');
    const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

    // 3. Build the Earth
    const earthGroup = new THREE.Group();
    earthGroup.visible = false; // Hide the earth so it doesn't conflict with GlobeScene
    scene.add(earthGroup);

    const earthGeometry = new THREE.SphereGeometry(3.5, 48, 48);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthDiffuse,
      bumpMap: earthBump,
      bumpScale: 0.1,
      specularMap: earthSpecular,
      specular: new THREE.Color('grey'),
      shininess: 15
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.rotation.z = 23.5 * Math.PI / 180;
    earthGroup.add(earth);

    // 4. Build the Cloud Layer (Layer 1)
    const cloudGeometry = new THREE.SphereGeometry(3.55, 48, 48);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earth.add(clouds);

    // Build Cloud Layer 2 for massive volume and density
    const cloudGeometry2 = new THREE.SphereGeometry(3.6, 48, 48);
    const cloudMaterial2 = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.30,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const clouds2 = new THREE.Mesh(cloudGeometry2, cloudMaterial2);
    clouds2.rotation.x = Math.PI / 2;
    clouds2.rotation.y = Math.PI / 4;
    earth.add(clouds2);

    // Cloud layer 3 removed for performance
    // 5. Atmospheric Glow
    const atmosphereGeometry = new THREE.SphereGeometry(3.8, 48, 48);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4B90FF,
      transparent: true,
      opacity: 0.10,  // Subtle atmospheric glow — no more blue plastic wrap
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphere);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(15, 10, 15);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x4B90FF, 1.5);
    rimLight.position.set(-15, 5, -15);
    scene.add(rimLight);

    // --- MASSIVE STARFIELD ---
    
    // Star Layer 1 (Bright, medium size)
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000; // Drastically reduced for performance
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 300;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Star Layer 2 (Dense, tiny, distant)
    const starGeometry2 = new THREE.BufferGeometry();
    const starCount2 = 4000; // Drastically reduced for performance
    const starPositions2 = new Float32Array(starCount2 * 3);
    for (let i = 0; i < starCount2 * 3; i++) {
      starPositions2[i] = (Math.random() - 0.5) * 450;
    }
    starGeometry2.setAttribute('position', new THREE.BufferAttribute(starPositions2, 3));
    const starMaterial2 = new THREE.PointsMaterial({
      color: 0xaaccff, 
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    const starField2 = new THREE.Points(starGeometry2, starMaterial2);
    scene.add(starField2);

    // Shooting Stars
    const shootingStars = [];
    const shootingStarMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    // Hat removed per user request

    const createShootingStar = () => {
      if (shootingStars.length > 8) return; // Increased max shooting stars
      const geometry = new THREE.BufferGeometry();
      const startX = (Math.random() - 0.5) * 150;
      const startY = Math.random() * 80 + 20;
      const startZ = (Math.random() - 0.5) * 100 - 20;
      
      const positions = new Float32Array([
        startX, startY, startZ,
        startX, startY, startZ
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const line = new THREE.Line(geometry, shootingStarMaterial);
      scene.add(line);
      
      const speed = Math.random() * 3 + 1.5; // Faster shooting stars
      const direction = new THREE.Vector3(-1, -1, 0.5).normalize();
      
      shootingStars.push({ line, positions, speed, direction, life: 0 });
    };

    let animationFrameId;
    const clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (!isVisible) return; // PAUSE RAF LOGIC WHEN OFFSCREEN
      
      const delta = clock.getDelta();
      
      // Auto-rotation
      earth.rotation.y += 0.05 * delta;
      clouds.rotation.y += 0.07 * delta;
      clouds2.rotation.y += 0.085 * delta; // Second layer rotates slightly differently for parallax
      
      starField.rotation.y += 0.01 * delta;
      starField2.rotation.y += 0.005 * delta; // Distant stars rotate slower

      const time = clock.getElapsedTime();

      // Hat animation logic tied to scroll (fade out AND fly up)
      const scrollVal = scrollYProgress.get();
      if (hatGroup && capMat) {
        hatGroup.position.y = 3.8 + scrollVal * 40; // Flies up quickly
        capMat.opacity = Math.max(0, 1 - scrollVal * 3); // Fades out completely by 33% scroll
        // Keep hat facing the camera, but add a slight float based on time
        hatGroup.rotation.z = Math.sin(time * 2) * 0.05; 
      }

      // Shooting stars logic
      if (Math.random() < 0.04) createShootingStar(); // Higher spawn rate
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.life += delta;
        
        star.positions[3] += star.direction.x * star.speed;
        star.positions[4] += star.direction.y * star.speed;
        star.positions[5] += star.direction.z * star.speed;
        
        if (star.life > 0.1) {
          star.positions[0] += star.direction.x * star.speed * 1.1;
          star.positions[1] += star.direction.y * star.speed * 1.1;
          star.positions[2] += star.direction.z * star.speed * 1.1;
        }

        star.line.geometry.attributes.position.needsUpdate = true;
        
        if (star.life > 2) {
          scene.remove(star.line);
          star.line.geometry.dispose();
          shootingStars.splice(i, 1);
        }
      }

      // --- SCROLL LOGIC ---
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollDistance = -rect.top;
        const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));

        // Plunge the camera from z=18 down to z=5.2 (skimming just above the clouds)
        camera.position.z = 18 - (progress * 12.8);
        
        // Tilt the camera forward slightly to create an "airplane window" horizon view as we get closer
        // At progress 0, we look straight down (rotation x = 0).
        // At progress 1, we look forward slightly (rotation x = ~25 degrees).
        // Reduced from 68 degrees (0.38 * PI) to prevent the Earth from disappearing off-screen.
        camera.rotation.x = progress * (Math.PI * 0.14);
        
        // Slight bank/roll to simulate airplane turning
        camera.rotation.z = Math.sin(progress * Math.PI) * 0.15;

        // UI Fade out (The main Learn Overseas title)
        if (uiRef.current) {
          // uiRef.current.style.opacity = 1 - Math.min(1, progress * 4);
          uiRef.current.style.transform = `translateY(${progress * -100}px)`;
        }

        // Removed fallText2 per user request

        // Removing complex transitions; keep camera logic simpler if needed.
        if (progress === 0) {
          camera.position.y = Math.sin(Date.now() * 0.0005) * 0.3;
          camera.position.x = Math.cos(Date.now() * 0.0003) * 0.2;
        } else {
          camera.position.y = 0;
          camera.position.x = 0;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      cloudGeometry2.dispose();
      cloudMaterial2.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      starGeometry2.dispose();
      starMaterial2.dispose();
      capGeo.dispose();
      capMat.dispose();

      
      earthDiffuse.dispose();
      earthBump.dispose();
      earthSpecular.dispose();
      cloudTexture.dispose();
      capTexture.dispose();

      shootingStars.forEach(star => {
          scene.remove(star.line);
          star.line.geometry.dispose();
      });
      shootingStarMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <>
    {/* Massive 250vh container to allow for a long, cinematic scroll transition without dead space */}
    <div ref={containerRef} style={{ position: 'relative', width: '100vw', height: '250vh', background: 'transparent', zIndex: 2 }}>
      
      {/* Sticky wrapper stays fixed while the user scrolls through the 250vh. Fades out smoothly into the next section. */}
      <motion.div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', overflow: 'hidden', opacity: wrapperOpacity }}>
        
        {/* City / Harvard → University Campus Study Abroad Transition Overlay */}
        <div 
          ref={cityRef} 
          style={{ 
            position: 'absolute', inset: -100,
            backgroundImage: 'url(https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=90&w=2560), url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=90&w=2560)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center top', 
            zIndex: 25,
            opacity: 0, 
            pointerEvents: 'none',
            transformOrigin: 'center center'
          }} 
        >
          {/* Deep library atmosphere */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(2,2,5,0.2) 0%, rgba(2,2,5,0.75) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,2,5,0.6) 0%, transparent 35%, rgba(2,2,5,0.6) 100%)' }} />
        </div>

        {/* Welcome Onboard Text inside City Layer */}
        <div 
          id="welcome-onboard-text" 
          style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
            zIndex: 26, opacity: 0, color: '#fff', textAlign: 'center', pointerEvents: 'none',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontFamily: 'var(--font-serif)', fontWeight: 700,
            textShadow: '0 10px 30px rgba(0,0,0,0.9)'
          }}
        >
          Study at <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Top Universities.</span>
        </div>

        <motion.canvas 
          ref={canvasRef} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, opacity: 1 }} 
        />

        <motion.div ref={uiRef} className="hero-ui container" style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none', opacity: textOpacity }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: 24 }}
          >
            A Global Perspective
          </motion.div>
          
          <motion.h1 
            className="heading-hero"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
          >
            {/* Ambient Background Glow */}
            <div style={{ position: 'absolute', inset: -50, background: 'radial-gradient(ellipse at center, rgba(249,212,64,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <span style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              lineHeight: 1, 
              fontFamily: 'var(--font-sans)', 
              color: '#ffffff',
              filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.4))' 
            }}>
              Learn
            </span>
            
            <span style={{ 
              fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', 
              fontWeight: 700, 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase', 
              lineHeight: 0.9, 
              marginTop: '4px', 
              fontFamily: 'var(--font-sans)',
              background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-gold) 50%, var(--accent-copper) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.9))'
            }}>
              OVERSEAS
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
            className="body-large"
            style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 600, marginTop: 24, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}
          >
            Scroll down to plunge into the future of international education.
          </motion.p>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
            style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 3, color: 'rgba(255,255,255,0.5)' }}>Scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
            />
          </motion.div>

        </motion.div>

        {/* ── Scroll Transition Airplane & Trail Banner ── */}
        <motion.div
          style={{
            position: 'absolute',
            x: planeX,
            y: planeY,
            scale: planeScale,
            opacity: 1,
            zIndex: 15,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            width: '40vw',
            minWidth: '300px',
            maxWidth: '600px',
          }}
        >
          <img 
            src="/airplane.png"
            alt="Airplane"
            style={{ 
              width: '100%', 
              height: 'auto',
              transform: 'scaleX(-1)'
            }}
          />
          {/* Holographic HUD Banner trailing behind the tail */}
          {/* Premium Consulting Data Card trailing the plane (The Ribbon) */}
          <motion.div 
            style={{
              position: 'absolute',
              left: '90%', 
              marginLeft: '20px',
              width: '1000px',
              padding: '50px 60px 50px 120px',
              background: 'linear-gradient(90deg, rgba(20, 20, 25, 0.95), rgba(2, 2, 5, 0.8))',
              ,
              border: '1px solid rgba(249, 212, 64, 0.4)',
              borderLeft: 'none',
              clipPath: 'polygon(0% 0%, 100% 0%, 98% 50%, 100% 100%, 0% 100%, 8% 50%)',
              display: 'flex',
              flexDirection: 'column',
              transform: 'translateY(-20%)'
            }}
          >
            {/* Dynamic Connector to Plane Tail */}
            <div style={{ position: 'absolute', left: '0', top: '50%', width: '60px', height: '3px', background: 'var(--accent-gold)' }}></div>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '25px', marginBottom: '30px' }}>
              <div>
                <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>Bespoke Admissions Strategy</span>
                <h3 style={{ color: '#fff', margin: '12px 0 0 0', fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 400, letterSpacing: -0.5 }}>Architecting Your Academic Future</h3>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '30px' }}>
              <div style={{ padding: '0 15px', borderLeft: '3px solid rgba(255,255,255,0.2)' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '10px' }}>Success Rate</div>
                <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>98.7<span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)' }}>%</span></div>
              </div>
              <div style={{ padding: '0 15px', borderLeft: '3px solid var(--accent-gold)' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '10px' }}>Scholarships</div>
                <div style={{ color: 'var(--accent-gold)', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>$24<span style={{ fontSize: '1.2rem' }}>M+</span></div>
              </div>
              <div style={{ padding: '0 15px', borderLeft: '3px solid var(--accent-blue)' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '10px' }}>Offers Secured</div>
                <div style={{ color: 'var(--accent-blue)', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>500<span style={{ fontSize: '1.2rem' }}>+</span></div>
              </div>
              <div style={{ padding: '0 15px', borderLeft: '3px solid var(--accent-copper)' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '10px' }}>Global Reach</div>
                <div style={{ color: 'var(--accent-copper)', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>35<span style={{ fontSize: '1.2rem' }}>+</span></div>
              </div>
            </div>
            
            {/* Paragraph Content */}
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
              We don't just submit applications—we engineer acceptances. Our tailored approach decodes the complexities of elite university admissions, transforming your unique potential into an undeniable candidate profile. From strategic university selection to mastering scholarship negotiations, we guide you seamlessly into the world's most prestigious institutions.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Study Abroad Floating 3D-style Elements ── */}

        {/* Premium Floating Metric Card — Top Left */}
        <motion.div
          style={{ position: 'absolute', top: '15%', left: '10%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY }}
        >
          <div className="glass-panel" style={{ padding: '24px 32px', borderLeft: '4px solid var(--accent-blue)', display: 'flex', flexDirection: 'column', background: 'rgba(20,20,25,0.6)', }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>99%</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent-blue)', marginTop: 8, fontWeight: 700 }}>Visa Success</span>
          </div>
        </motion.div>

        {/* Premium Floating Metric Card — Top Right */}
        <motion.div
          style={{ position: 'absolute', top: '12%', right: '10%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY }}
        >
          <div className="glass-panel" style={{ padding: '24px 32px', borderRight: '4px solid var(--accent-gold)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', background: 'rgba(20,20,25,0.6)', }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>200+</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent-gold)', marginTop: 8, fontWeight: 700 }}>Universities</span>
          </div>
        </motion.div>

        {/* Premium Floating Metric Card — Bottom Left */}
        <motion.div
          style={{ position: 'absolute', bottom: '22%', left: '12%', zIndex: 20, pointerEvents: 'none', opacity: metricOpacity, y: metricY }}
        >
          <div className="glass-panel" style={{ padding: '24px 32px', borderLeft: '4px solid var(--accent-copper)', display: 'flex', flexDirection: 'column', background: 'rgba(20,20,25,0.6)', }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>$10M+</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent-copper)', marginTop: 8, fontWeight: 700 }}>Scholarships</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
    </>
  );
}
