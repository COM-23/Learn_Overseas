import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import StunningGlobe from './StunningGlobe';
import './Hero.css';

const Hero = () => {
  const [activeDestination, setActiveDestination] = useState('UK');
  const destinations = ['UK', 'USA', 'Australia'];

  return (
    <section className="saas-hero">
      <div className="container">
        
        {/* Top Centered Content */}
        <div className="hero-content-centered">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-badge"
          >
            <Star size={14} className="star-icon" />
            <span>India's Most Trusted Global Education Partner</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-main-title"
          >
            Design Your <span className="text-gradient">Global Legacy</span>
            <br /> Without Limits.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-main-subtext"
          >
            Premium, end-to-end consulting for top-tier university admissions, visa processing, and financial aid. Your journey starts here.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-actions"
          >
            <button className="btn-primary">
              Get Started <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              View Success Stories
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="interactive-destinations"
          >
            <span className="dest-label">Select Destination:</span>
            {destinations.map(dest => (
              <button 
                key={dest} 
                className={`dest-pill ${activeDestination === dest ? 'active' : ''}`}
                onClick={() => setActiveDestination(dest)}
              >
                {dest}
              </button>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Unique Globe Container below the text */}
      <motion.div 
        className="hero-globe-stage"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <div className="glass-globe-wrapper">
          <StunningGlobe activeDestination={activeDestination} />
          
          {/* Floating UI Elements over the globe to make it look highly designed */}
          <div className="floating-metric top-left">
             <strong>19,000+</strong>
             <span>Students Placed</span>
          </div>
          <div className="floating-metric bottom-right">
             <strong>98%</strong>
             <span>Visa Success</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
