import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import './FeaturedDestinations.css';

const destinations = [
  { id: 'uk', name: 'United Kingdom', desc: 'Home to Oxford & Cambridge. A legacy of academic excellence.', color: '#FC7133', stat: 'Top 3 globally' },
  { id: 'usa', name: 'United States', desc: 'The hub of innovation and diverse campus cultures.', color: '#F9D440', stat: '4000+ Universities' },
  { id: 'aus', name: 'Australia', desc: 'World-class education combined with an unbeatable lifestyle.', color: '#7DC1B1', stat: 'High ROI' },
  { id: 'can', name: 'Canada', desc: 'Welcoming communities and strong post-study work opportunities.', color: '#BBCDE2', stat: '3Yr Work Visa' }
];

const FeaturedDestinations = () => {
  return (
    <section className="destinations-section">
      <div className="dest-container">
        
        <div className="dest-header">
          <h2 className="dest-title">Featured Destinations</h2>
          <p className="dest-subtitle">Explore the world's most sought-after education hubs.</p>
        </div>

        <div className="bento-grid">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
            >
              <div className="card-top">
                <div className="card-icon" style={{ backgroundColor: `${dest.color}20`, color: dest.color }}>
                  <MapPin size={24} />
                </div>
                <span className="card-stat">{dest.stat}</span>
              </div>
              
              <h3 className="card-title">{dest.name}</h3>
              <p className="card-desc">{dest.desc}</p>
              
              <button className="card-btn">
                Explore {dest.name} <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedDestinations;
