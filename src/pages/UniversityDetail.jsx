import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function UniversityDetail() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || 'Global University');
  const [activeTab, setActiveTab] = useState('Overview');
  const [isFullStoryOpen, setIsFullStoryOpen] = useState(false);

  return (
    <div style={{ background: '#020205', minHeight: '100vh', color: 'white', position: 'relative' }}>
      
      {/* Cinematic Hero */}
      <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020205 0%, rgba(2,2,5,0) 60%, rgba(2,2,5,0.8) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 100, zIndex: 10 }}>
          <Link to="/universities" style={{ display: 'inline-block', marginBottom: 30, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
            ← Back to Destinations
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16, border: '1px solid var(--accent-gold)', padding: '6px 16px', borderRadius: 100, background: 'rgba(249,212,64,0.1)', }}>
              Elite Partner Institution
            </div>
            <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', margin: 0, lineHeight: 1.1, textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
              {decodedName}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Floating Stats Bar */}
      <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 20 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30, background: '#101520', padding: '40px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}
        >
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent-gold)' }}>Top 1%</div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-secondary)', marginTop: 8 }}>Global Ranking</div>
          </div>
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent-blue)' }}>94%</div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-secondary)', marginTop: 8 }}>Placement Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent-copper)' }}>$4M+</div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-secondary)', marginTop: 8 }}>Avg. Scholarship</div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="container uni-detail-layout" style={{ padding: '100px 0', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80 }}>
        
        {/* Left Column - Deep Dive */}
        <div>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: 30, borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 40 }}>
            {['Overview', 'Campus Life', 'Admissions Journey'].map(tab => (
              <div 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  paddingBottom: 16, cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600,
                  color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeTab === tab ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  transition: 'all 0.3s'
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: isFullStoryOpen ? 20 : 40 }}>
                  Renowned for its academic excellence, cutting-edge research facilities, and a vibrant multicultural campus, {decodedName} offers an unparalleled educational experience. Our strategic partnership ensures that aspiring students gain exclusive insights, tailored application support, and priority scholarship reviews.
                </p>
                <AnimatePresence>
                  {isFullStoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
                        The curriculum is designed in collaboration with industry leaders to ensure graduates are immediately employable and ready to tackle global challenges. Beyond academics, {decodedName} boasts a powerful alumni network that spans across top Fortune 500 companies, cutting-edge startups, and prestigious research institutes worldwide.
                      </p>
                      <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>
                        Students have access to dedicated career services, state-of-the-art laboratories, and extensive library resources, ensuring an environment that fosters innovation and continuous learning.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isFullStoryOpen && (
                  <button 
                    onClick={() => setIsFullStoryOpen(true)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 40, borderBottom: '1px solid var(--accent-gold)' }}
                  >
                    Read Full Story
                  </button>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginBottom: 40 }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: 30, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 24, color: 'var(--accent-gold)', marginBottom: 12 }}>✦ Undergraduate</div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>Comprehensive 3-4 year programs focusing on foundational excellence and early industry immersion.</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: 30, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 24, color: 'var(--accent-blue)', marginBottom: 12 }}>✦ Postgraduate</div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>Intensive 1-2 year research and professional degrees designed for accelerated career trajectories.</p>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: 20 }}>Key Disciplines</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {['Engineering & Tech', 'Business & Management', 'Data Science & AI', 'Biomedical Sciences', 'Arts & Humanities', 'Law & Public Policy'].map((program, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1rem', color: 'rgba(255,255,255,0.9)', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <span style={{ color: 'var(--accent-gold)' }}>✔</span> {program}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'Campus Life' && (
              <motion.div key="campus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>
                  Life at {decodedName} goes far beyond the classroom. With hundreds of student organizations, state-of-the-art sports complexes, and deep integration with the local culture, you'll build a global network of lifelong friends and collaborators.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ height: 250, borderRadius: 16, overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400" alt="Campus Life" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ height: 250, borderRadius: 16, overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" alt="Students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2', height: 300, borderRadius: 16, overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200" alt="Library" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Admissions Journey' && (
              <motion.div key="admissions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>
                  Gaining acceptance to {decodedName} requires a strategic, meticulously crafted application. Here is exactly how our experts guide you through the process.
                </p>
                
                <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: 30, marginLeft: 15 }}>
                  {[
                    { title: 'Profile Assessment', desc: 'We audit your academics, extracurriculars, and test scores to establish a baseline.' },
                    { title: 'Strategic Positioning', desc: 'Crafting a unique narrative that highlights your leadership and global potential.' },
                    { title: 'SOP & Essay Architecture', desc: 'Our editorial board refines your essays until they are Ivy-league caliber.' },
                    { title: 'Interview Preparation', desc: 'Mock interviews with former admissions officers to ensure you project absolute confidence.' }
                  ].map((step, i) => (
                    <div key={i} style={{ position: 'relative', marginBottom: 40 }}>
                      <div style={{ position: 'absolute', left: -39, top: 0, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent-gold)', border: '4px solid #020205' }} />
                      <h4 style={{ fontSize: '1.3rem', color: '#fff', margin: '0 0 10px 0' }}>Step {i + 1}: {step.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - Sticky CTA */}
        <div>
          <div style={{ position: 'sticky', top: 100 }}>
            {/* CTA Card */}
            <div style={{ background: '#101520', padding: 40, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'center', marginBottom: 30 }}>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', margin: 0, color: '#fff' }}>Secure Your Seat</h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', margin: '20px 0 30px', lineHeight: 1.6 }}>
                Connect with our elite placement counselors to engineer your acceptance to {decodedName}.
              </p>
              <Link to="/contact" style={{ display: 'block', width: '100%', padding: '20px 0', background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)', color: 'black', textDecoration: 'none', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, borderRadius: 100, transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(255,255,255,0.2)' }}>
                Begin Application
              </Link>
              <div style={{ marginTop: 24, fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>
                ★ Fast-tracked processing available
              </div>
            </div>

            {/* Tuition Card */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 30, borderRadius: 24 }}>
              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 20 }}>Estimated Financials</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 16, borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tuition (Avg)</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>$35,000 / yr</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 16, borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Living Expenses</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>$15,000 / yr</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--accent-blue)' }}>Learn Overseas Grants</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Up to 40%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
