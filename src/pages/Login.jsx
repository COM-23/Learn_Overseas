import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
    // Backend integration will go here later
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020205', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background styling */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(2,2,5,0.9) 0%, rgba(2,2,5,0.7) 100%)' }} />
      
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(252, 113, 51, 0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel"
        style={{
          width: '100%', maxWidth: 420, padding: '40px', borderRadius: 24,
          position: 'relative', zIndex: 10,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(20,20,25,0.6)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
             <div style={{ width: 24, height: 24, background: 'var(--accent-gold)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: 14 }}>L</div>
             <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: '#fff', textTransform: 'uppercase' }}>Learn Overseas</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: '#fff', margin: 0 }}>Student Portal</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>Access your application dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
              style={{
                width: '100%', padding: '14px 16px', background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                color: '#fff', fontSize: 15, outline: 'none', transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>
              <span>Password</span>
              <a href="#" style={{ color: 'var(--accent-gold)', textDecoration: 'none', textTransform: 'none', letterSpacing: 0 }}>Forgot?</a>
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '14px 16px', background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                color: '#fff', fontSize: 15, outline: 'none', transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            style={{ width: '100%', padding: '16px', marginTop: 10, fontSize: 16 }}
          >
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginTop: 24 }}>
          Don't have an account? <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Apply Now</a>
        </p>
      </motion.div>
    </div>
  );
}
