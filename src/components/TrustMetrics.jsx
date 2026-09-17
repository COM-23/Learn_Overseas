import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './TrustMetrics.css';

const Counter = ({ from, to, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.floor(from + (to - from) * progress));
          requestAnimationFrame(animateCount);
        } else {
          setCount(to);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const TrustMetrics = () => {
  const partners = ["Oxford", "Cambridge", "Harvard", "Stanford", "MIT", "Melbourne", "Sydney", "Toronto"];

  return (
    <section className="trust-section">
      
      {/* Infinite Ticker */}
      <div className="ticker-container">
        <motion.div 
          className="ticker-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {/* Double the array for seamless looping */}
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className="ticker-item">
              {partner}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <motion.div 
          className="metric-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 2px 20px rgba(125,193,177,0.3)', borderColor: 'rgba(125,193,177,0.8)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transition: 'box-shadow 0.3s, border-color 0.3s' }}
        >
          <h3 className="metric-number" style={{ color: 'var(--accent-blue)', textShadow: '0 0 20px rgba(125,193,177,0.4)' }}><Counter from={0} to={98} suffix="%" /></h3>
          <p className="metric-label" style={{ fontWeight: 700, letterSpacing: 2 }}>Visa Success Rate</p>
        </motion.div>

        <motion.div 
          className="metric-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ transition: 'box-shadow 0.3s, border-color 0.3s' }}
        >
          <h3 className="metric-number" style={{ color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.4)' }}><Counter from={0} to={19} suffix="k+" /></h3>
          <p className="metric-label" style={{ fontWeight: 700, letterSpacing: 2 }}>Students Guided</p>
        </motion.div>

        <motion.div 
          className="metric-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 2px 20px rgba(249,212,64,0.3)', borderColor: 'rgba(249,212,64,0.8)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ transition: 'box-shadow 0.3s, border-color 0.3s' }}
        >
          <h3 className="metric-number" style={{ color: 'var(--accent-gold)', textShadow: '0 0 20px rgba(249,212,64,0.4)' }}><Counter from={0} to={250} suffix="+" /></h3>
          <p className="metric-label" style={{ fontWeight: 700, letterSpacing: 2 }}>Partner Universities</p>
        </motion.div>
      </div>
      
    </section>
  );
};

export default TrustMetrics;
