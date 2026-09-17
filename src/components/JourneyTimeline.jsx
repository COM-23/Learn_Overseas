import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  { num:'01', icon:'🎯', title:'Free Consultation', sub:'Day 1', color:'#E8724A', desc:'A 30-minute session with your dedicated counselor to assess your profile, understand your goals, and map the right path.' },
  { num:'02', icon:'🔬', title:'Profile Analysis', sub:'Week 1', color:'var(--accent-gold)', desc:'Deep-dive into your academics, extracurriculars, work experience, and financial profile to build your strongest application.' },
  { num:'03', icon:'🏛️', title:'University Shortlist', sub:'Week 2', color:'#4ABFB5', desc:'A curated list of 8-12 universities matched to your profile, ambitions, and budget across your chosen destination.' },
  { num:'04', icon:'✍️', title:'Application Building', sub:'Weeks 3-6', color:'#8C8FD6', desc:'Expert-crafted SOP, LOR coaching, resume polishing, and submission strategy. Every document is reviewed 3 times.' },
  { num:'05', icon:'🛂', title:'Visa Preparation', sub:'After Offer', color:'#D4874A', desc:'From document checklist to interview prep — our 98% visa approval rate speaks for itself.' },
  { num:'06', icon:'✈️', title:'Pre-Departure', sub:'2 Weeks Before', color:'#6BBF8C', desc:'Accommodation, banking, travel, insurance, SIM card, orientation — we make sure you land with zero stress.' },
];

function Step({ step, i, inView }) {
  const isLeft = i % 2 === 0;
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 80px 1fr', gap:0, alignItems:'center', marginBottom:0 }}>
      {/* Left content */}
      <motion.div
        initial={{ opacity:0, x:-60 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ delay:i*0.15, duration:0.9, ease:[0.16,1,0.3,1] }}
        style={{ gridColumn:isLeft?1:3, gridRow:1, padding:'32px', opacity:isLeft?1:0.001 }}
      >
        {isLeft && (
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, padding:'28px', position:'relative', overflow:'hidden', textAlign:'right' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right,transparent,${step.color}50,transparent)` }} />
            <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', marginBottom:12, fontWeight:600 }}>{step.sub}</div>
            <h3 style={{ fontSize:22, fontWeight:900, color:'#fff', letterSpacing:-0.5, marginBottom:12 }}>{step.title}</h3>
            <p style={{ fontSize:14, lineHeight:1.7, color:'rgba(255,255,255,0.45)', fontWeight:300 }}>{step.desc}</p>
          </div>
        )}
      </motion.div>

      {/* Center dot + line */}
      <div style={{ gridColumn:2, gridRow:1, display:'flex', flexDirection:'column', alignItems:'center', position:'relative', height:180 }}>
        {i > 0 && <div style={{ position:'absolute', top:0, width:1, height:'calc(50% - 24px)', background:'rgba(255,255,255,0.06)' }} />}
        <motion.div initial={{ scale:0, opacity:0 }} animate={inView?{scale:1,opacity:1}:{}} transition={{ delay:i*0.15+0.2, duration:0.6, ease:[0.34,1.56,0.64,1] }}
          style={{ width:48, height:48, borderRadius:'50%', background:`${step.color}18`, border:`2px solid ${step.color}50`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginTop:'calc(50% - 24px)', position:'absolute', top:0, boxShadow:`0 0 24px ${step.color}20` }}>
          {step.icon}
        </motion.div>
        {i < STEPS.length - 1 && <div style={{ position:'absolute', bottom:0, width:1, height:'calc(50% - 24px)', background:'rgba(255,255,255,0.06)' }} />}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity:0, x:60 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ delay:i*0.15, duration:0.9, ease:[0.16,1,0.3,1] }}
        style={{ gridColumn:isLeft?3:1, gridRow:1, padding:'32px', opacity:!isLeft?1:0.001 }}
      >
        {!isLeft && (
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, padding:'28px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right,transparent,${step.color}50,transparent)` }} />
            <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', marginBottom:12, fontWeight:600 }}>{step.sub}</div>
            <h3 style={{ fontSize:22, fontWeight:900, color:'#fff', letterSpacing:-0.5, marginBottom:12 }}>{step.title}</h3>
            <p style={{ fontSize:14, lineHeight:1.7, color:'rgba(255,255,255,0.45)', fontWeight:300 }}>{step.desc}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function JourneyTimeline() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold:0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  },[]);

  return (
    <section ref={ref} style={{ padding:'120px 8vw', background:'#04040A', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ textAlign:'center', marginBottom:80 }}>
        <div className="section-label" style={{ justifyContent:'center' }}><span>The Process</span></div>
        <h2 className="section-title" style={{ textAlign:'center' }}>6 STEPS TO<br /><span style={{ WebkitTextStroke:'2px rgba(255,255,255,0.18)', color:'transparent' }}>YOUR DREAM.</span></h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.4)', maxWidth:440, margin:'20px auto 0', lineHeight:1.75, fontWeight:300 }}>
          Our proven, end-to-end process that has placed 5,200+ students at world-class universities.
        </p>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto' }}>
        {STEPS.map((step,i) => (
          <Step key={step.num} step={step} i={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
