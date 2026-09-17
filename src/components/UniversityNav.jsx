import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UniversityNav({ activeTab, setActiveTab }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        position: 'fixed', 
        top: 20, 
        left: '50%',
        width: '90%',
        maxWidth: 1200,
        height: 70,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 30px', 
        zIndex: 9999,
        background: 'rgba(20, 20, 25, 0.98)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 100,
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img src="/stencil-logo.png" alt="Learn Overseas" width="121" height="64" width="auto" style={{ height: 36 }} />
      </Link>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {['Universities List', 'Aspire Plan'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div key={tab} onClick={() => setActiveTab && setActiveTab(tab)} style={{ cursor: 'pointer' }}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  transition: 'all 0.3s ease'
                }}
              >
                {tab}
              </motion.div>
            </div>
          );
        })}
      </div>
      
      <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.95 }}
            style={{
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                padding: '10px 20px', letterSpacing: 1
            }}
          >
            ← BACK TO HOME
          </motion.div>
      </Link>
    </motion.div>
  );
}
