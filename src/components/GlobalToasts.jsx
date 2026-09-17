import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOAST_NOTIFICATIONS = [
  { msg: 'Vishnu E. got admitted to NCSU!', flag: '🇺🇸', color: '#4A90D9' },
  { msg: 'Ishita M. received Cardiff offer!', flag: '🇬🇧', color: '#F9D440' },
  { msg: 'Sai Sumeet accepted by UCSD!', flag: '🇺🇸', color: '#B4783C' },
  { msg: 'Pehal K. enrolled at Purdue!', flag: '🇺🇸', color: '#FF7043' },
  { msg: 'Raj K. cleared CU Boulder!', flag: '🇺🇸', color: '#4ADE80' },
  { msg: 'Mukta R. joins Parsons!', flag: '🇺🇸', color: '#7E57C2' },
];

export default function GlobalToasts() {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const show = () => {
      const t = TOAST_NOTIFICATIONS[counterRef.current % TOAST_NOTIFICATIONS.length];
      counterRef.current++;
      const id = Date.now();
      setToasts(prev => [...prev.slice(-2), { ...t, id }]);
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 4500);
    };
    const initial = setTimeout(show, 2000);
    const interval = setInterval(show, 12000); 
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 12, pointerEvents: 'none' }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ background: 'rgba(8,10,18,0.95)', border: `1px solid ${t.color}40`, borderLeft: `3px solid ${t.color}`, borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, minWidth: 280, maxWidth: 320, boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)` }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.color}20`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🎓</div>
            <div>
              <div style={{ fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase', color: t.color, fontWeight: 800, marginBottom: 2 }}>New Admission</div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{t.msg}</div>
            </div>
            <div style={{ fontSize: '1.4rem', marginLeft: 'auto', flexShrink: 0 }}>{t.flag}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
