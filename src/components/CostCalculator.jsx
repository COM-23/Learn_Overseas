import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import './CostCalculator.css';

const CostCalculator = () => {
  const [country, setCountry] = useState('UK');
  const [degree, setDegree] = useState('Masters');

  const calculateCost = () => {
    if (country === 'UK') return degree === 'Masters' ? '£20,000 - £35,000' : '£15,000 - £25,000';
    if (country === 'USA') return degree === 'Masters' ? '$30,000 - $60,000' : '$25,000 - $50,000';
    if (country === 'Australia') return degree === 'Masters' ? 'A$35,000 - A$50,000' : 'A$30,000 - A$45,000';
    return "$30,000 - $45,000";
  };

  return (
    <motion.div 
      className="cost-calculator"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="calc-header">
        <div className="calc-icon-wrapper">
          <Calculator size={24} />
        </div>
        <div>
          <h2>Estimate Your Investment</h2>
          <p>Get a quick estimate of tuition and living expenses.</p>
        </div>
      </div>

      <div className="calc-controls">
        <div className="calc-group">
          <label>Destination Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="UK">United Kingdom</option>
            <option value="USA">United States</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        <div className="calc-group">
          <label>Degree Level</label>
          <select value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
          </select>
        </div>
      </div>

      <motion.div 
        className="calc-result"
        key={calculateCost()} // Re-animate on change
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <span>Estimated Yearly Cost</span>
        <h3>{calculateCost()}</h3>
      </motion.div>
    </motion.div>
  );
};

export default CostCalculator;
