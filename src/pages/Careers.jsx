import React from 'react';
import { motion } from 'framer-motion';

function FilmChrome() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '7vh', background: '#000', zIndex: 8999, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '7vh', background: '#000', zIndex: 8999, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9000, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, opacity: 0.1 }} />
      <style>{`@keyframes grain{0%,100%{transform:translate(0,0)}25%{transform:translate(-1%,2%)}50%{transform:translate(2%,-1%)}75%{transform:translate(-2%,1%)}}`}</style>
    </>
  );
}

const ROLES = [
  { title: 'Senior Admissions Counsellor', dept: 'Counselling', loc: 'Mumbai', type: 'Full-time', desc: 'Guide students through the entire admissions process for top universities in the UK, USA, Canada, and Australia.' },
  { title: 'Visa Specialist', dept: 'Visa & Immigration', loc: 'Delhi', type: 'Full-time', desc: 'Manage end-to-end visa applications with a goal of maintaining our 98% success rate across all destination countries.' },
  { title: 'IELTS / TOEFL Coach', dept: 'Test Preparation', loc: 'Remote', type: 'Part-time / Full-time', desc: 'Deliver high-impact coaching sessions to help students achieve Band 7.5+ IELTS scores for their target universities.' },
  { title: 'Digital Marketing Lead', dept: 'Marketing', loc: 'Bangalore', type: 'Full-time', desc: 'Drive growth across digital channels, manage campaigns, and tell the story of thousands of students whose lives we have changed.' },
  { title: 'Scholarship Research Analyst', dept: 'Funding', loc: 'Remote', type: 'Full-time', desc: `Identify and match scholarship opportunities to student profiles, helping secure millions of rupees in funding annually.` },
  { title: 'Operations Associate', dept: 'Operations', loc: 'Mumbai', type: 'Full-time', desc: 'Streamline our processes, manage student pipelines, and ensure every student gets a world-class experience from first call to visa stamp.' },
];

const PERKS = [
  { icon: '🌍', title: 'See the World', desc: 'Annual international conference trips + famil visits to our partner universities.' },
  { icon: '📈', title: 'Real Impact', desc: `You'll change hundreds of lives every year. Not metrics — real human stories.` },
  { icon: '💰', title: 'Competitive Pay', desc: 'Above-market salaries, performance bonuses, and equity for senior roles.' },
  { icon: '🎓', title: 'Learn Constantly', desc: 'Sponsored certifications, conference tickets, and a culture of continuous learning.' },
  { icon: '🏡', title: 'Flexible Work', desc: 'Hybrid and remote options available for most roles.' },
  { icon: '✈️', title: 'Relocation Support', desc: 'Moving to join us? We cover your relocation costs.' },
];

export default function Careers() {
  return (
    <div style={{ background: '#020510', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(252, 113, 51, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <FilmChrome />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 8vw' }}>
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=90&w=2560)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,5,16,0.98) 40%, rgba(2,5,16,0.6) 80%)' }} />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2 }} style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
          <div style={{ fontSize: 10, letterSpacing: 8, color: 'var(--accent-copper)', textTransform: 'uppercase', marginBottom: 24 }}>Join Our Team · {ROLES.length} Open Roles</div>
          <div style={{ fontSize: 'clamp(52px, 8vw, 110px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: -5, fontFamily: '"Playfair Display", Georgia, serif', marginBottom: 24 }}>
            BUILD<br />
            <span style={{ background: 'linear-gradient(135deg, #E8724A, var(--accent-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FUTURES.</span>
          </div>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 480 }}>
            Join the team that has transformed 5,200 lives — and is just getting started. We are looking for passionate people who believe education changes everything.
          </div>
        </motion.div>
        <div style={{ position: 'absolute', top: '7vh', left: 0, right: 0, height: 20, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, zIndex: 3 }}>
          {Array.from({ length: 50 }).map((_, i) => <div key={i} style={{ width: 14, height: 10, borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />)}
        </div>
      </div>

      {/* ── Perks ── */}
      <div style={{ padding: '80px 8vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: 16 }}>Why Learn Overseas</div>
          <div style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, fontFamily: '"Playfair Display", serif', letterSpacing: -2, marginBottom: 52 }}>
            More than a job.<br />A purpose.
          </div>
        </motion.div>
        <div className="careers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PERKS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }}
              style={{ padding: '28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, transition: 'border-color 0.3s ease' }}
              whileHover={{ borderColor: 'rgba(249,212,64,0.25)', y: -4 }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Open Roles ── */}
      <div style={{ padding: '80px 8vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: 'var(--accent-light)', textTransform: 'uppercase', marginBottom: 16 }}>Open Positions</div>
          <div style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, fontFamily: '"Playfair Display", serif', letterSpacing: -2, marginBottom: 52 }}>
            {ROLES.length} roles. All impact.
          </div>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ROLES.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }}
              style={{ padding: '28px 32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24, cursor: 'pointer', transition: 'border-color 0.3s ease, background 0.3s ease' }}
              whileHover={{ borderColor: 'rgba(249,212,64,0.25)', backgroundColor: 'rgba(249,212,64,0.03)' }}
            >
              <div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(249,212,64,0.1)', border: '1px solid rgba(249,212,64,0.2)', fontSize: 10, color: 'var(--accent-gold)', letterSpacing: 1, textTransform: 'uppercase' }}>{r.dept}</span>
                  <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{r.loc}</span>
                  <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{r.type}</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{r.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{r.desc}</div>
              </div>
              <div style={{ color: 'var(--accent-gold)', fontSize: 24, fontWeight: 300 }}>→</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: '80px 8vw', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: 20 }}>Not seeing a fit?</div>
        <div style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, fontFamily: '"Playfair Display", serif', marginBottom: 20, letterSpacing: -2 }}>Send us your resume anyway.</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 36 }}>We are always looking for extraordinary people.</div>
        <a href="mailto:info@learnoverseas.com" style={{ display: 'inline-block', padding: '16px 44px', borderRadius: 100, background: 'linear-gradient(135deg, #E8724A, var(--accent-gold))', color: '#000', fontWeight: 800, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 12px 40px rgba(249,212,64,0.3)' }}>
          info@learnoverseas.com
        </a>
      </div>
    </div>
  );
}