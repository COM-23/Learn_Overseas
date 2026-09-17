import React from 'react';
import { motion } from 'framer-motion';

export default function UniversityFloaters() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[
        { label: 'Oxford',     col: '#4A90D9', x: '8%',  delay: 0,  dur: 28 },
        { label: 'Harvard',    col: '#F9D440', x: '22%', delay: 5,  dur: 34 },
        { label: 'MIT',        col: '#7DC1B1', x: '38%', delay: 9,  dur: 26 },
        { label: 'Cambridge',  col: '#4A90D9', x: '52%', delay: 2,  dur: 32 },
        { label: 'Stanford',   col: '#F9D440', x: '66%', delay: 12, dur: 30 },
        { label: 'Imperial',   col: '#7DC1B1', x: '78%', delay: 7,  dur: 36 },
        { label: 'NUS',        col: '#F9D440', x: '88%', delay: 3,  dur: 27 },
        { label: 'TU Munich',  col: '#7DC1B1', x: '16%', delay: 15, dur: 29 },
        { label: 'Toronto',    col: '#B4783C', x: '44%', delay: 8,  dur: 33 },
        { label: 'Yale',       col: '#4A90D9', x: '60%', delay: 18, dur: 24 },
        { label: 'Caltech',    col: '#7DC1B1', x: '92%', delay: 4,  dur: 31 },
        { label: 'ETH Zurich', col: '#4A90D9', x: '32%', delay: 20, dur: 35 },
      ].map(({ label, col, x, delay, dur }, i) => (
        <motion.div
          key={i}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{
            y: [null, '-10vh'],
            opacity: [0, 0.18, 0.22, 0.18, 0],
          }}
          transition={{
            duration: dur,
            delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
          style={{
            position: 'absolute',
            left: x,
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: col,
            whiteSpace: 'nowrap',
            border: `1px solid ${col}40`,
            padding: '4px 12px',
            borderRadius: '100px',
            background: `${col}0A`,
          }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}
