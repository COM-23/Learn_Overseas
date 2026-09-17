import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function useCountUp(end, duration=2, inView=false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start=0, step=end/((duration*1000)/16);
    const t = setInterval(() => { start+=step; if(start>=end){setCount(end);clearInterval(t);}else{setCount(Math.floor(start));} },16);
    return ()=>clearInterval(t);
  },[inView,end]);
  return count;
}

const STATS = [
  { end:8000, suffix:'+', label:'Admissions', sub:'Successful placements', color:'#E8724A' },
  { end:25, suffix:'M+', label:'USD in Financial Aid', sub:'Scholarships & grants', color:'var(--accent-gold)' },
  { end:1200, suffix:'+', label:'Universities', sub:'Global partners', color:'#4ABFB5' },
  { end:20, suffix:' Yrs', label:'Of Excellence', sub:'Industry experience', color:'#8C8FD6' },
];

function StatCard({ stat, inView, delay }) {
  const count = useCountUp(stat.end, 2.2, inView);
  return (
    <motion.div initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{delay,duration:0.9,ease:[0.16,1,0.3,1]}}
      style={{ padding:'40px 32px', borderRadius:24, background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden', textAlign:'center' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right,transparent,${stat.color}60,transparent)` }} />
      <div style={{ fontSize:'clamp(48px,5vw,72px)', fontWeight:900, color:stat.color, letterSpacing:-2, lineHeight:1, marginBottom:12 }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize:15, fontWeight:700, color:'#fff', marginBottom:6 }}>{stat.label}</div>
      <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', letterSpacing:0.5 }}>{stat.sub}</div>
    </motion.div>
  );
}

export default function HeroStats() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>setInView(e.isIntersecting),{threshold:0.1, rootMargin: '100px'});
    if (ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section ref={ref} style={{ padding:'100px 8vw', background:'#04040A' }}>
      <div style={{ marginBottom:56, textAlign:'center' }}>
        <div className="section-label" style={{ justifyContent:'center' }}><span>By The Numbers</span></div>
        <h2 className="section-title" style={{ textAlign:'center' }}>REAL RESULTS.<br /><span style={{ WebkitTextStroke:'2px rgba(255,255,255,0.2)', color:'transparent' }}>REAL STUDENTS.</span></h2>
      </div>
      <div className="hero-stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
        {STATS.map((s,i)=><StatCard key={s.label} stat={s} inView={inView} delay={i*0.12} />)}
      </div>
    </section>
  );
}
