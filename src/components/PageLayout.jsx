import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

export default function PageLayout({ children, title, subtitle, bgGradient = 'linear-gradient(to bottom, #F8F9FA, #ffffff)' }) {
  return (
    <div style={{ background: bgGradient, minHeight: '100vh', color: '#111827', fontFamily: "'Inter', sans-serif" }}>
      <Header />
      
      {/* Page Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ 
          paddingTop: 160, 
          paddingBottom: 80, 
          textAlign: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: 'radial-gradient(ellipse at top center, rgba(252, 113, 51, 0.05), transparent 70%)'
        }}
      >
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: 900, 
          letterSpacing: '-2px',
          margin: 0,
          background: 'linear-gradient(135deg, #111827, #4B5563)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6B7280', 
            marginTop: 24, 
            maxWidth: 600, 
            marginLeft: 'auto', 
            marginRight: 'auto',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Page Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ padding: '80px 0', maxWidth: 1200, margin: '0 auto', overflowX: 'hidden' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
