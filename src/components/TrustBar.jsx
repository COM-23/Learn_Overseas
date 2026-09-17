import React from 'react';
import { motion } from 'framer-motion';

const LOGOS = [
  'University of Oxford','Harvard University','MIT','NUS Singapore','University of Toronto',
  'University of Melbourne','Sorbonne','TU Munich','Trinity College Dublin','University of Auckland',
  'Imperial College London','UC Berkeley','McGill University','UNSW Sydney','University of Warsaw',
];

export default function TrustBar() {
  return (
    <section style={{ padding:'56px 0', background:'#04040A', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', overflow:'hidden' }}>
      <div style={{ marginBottom:24, textAlign:'center' }}>
        <span style={{ fontSize:11, letterSpacing:5, color:'rgba(255,255,255,0.25)', textTransform:'uppercase', fontWeight:600 }}>Our Students Get Into</span>
      </div>
      <div style={{ overflow:'hidden', maskImage:'linear-gradient(to right,transparent,black 15%,black 85%,transparent)', WebkitMaskImage:'linear-gradient(to right,transparent,black 15%,black 85%,transparent)' }}>
        <div className="trust-bar-track" style={{ gap:0 }}>
          {[...LOGOS,...LOGOS].map((name,i) => (
            <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:0, padding:'0 40px', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.25)', letterSpacing:0.5 }}>{name}</span>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'rgba(255,255,255,0.1)', marginLeft:40 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
