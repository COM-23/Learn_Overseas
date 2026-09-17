import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AtmosphericTransition from './AtmosphericTransition';
import { CinemaButton, ActMarker, ReelSelector } from './CinemaControls';

const COUNTRIES = [
  { id:'uk',  num:'01', name:'United Kingdom', tagline:'Oxford. Cambridge. Imperial.', stat:'98% Visa Success', cities:['London','Oxford','Cambridge','Edinburgh'], color:'#E8724A', bg:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=90&w=1800', desc:'The world\'s most prestigious institutions await your brilliance.' },
  { id:'usa', num:'02', name:'United States',  tagline:'MIT. Harvard. Stanford.',      stat:'4,000+ Universities', cities:['New York','Boston','San Francisco','Chicago'], color:'var(--accent-gold)', bg:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=90&w=1800', desc:'Where the future of humanity is built, one breakthrough at a time.' },
  { id:'aus', num:'03', name:'Australia',      tagline:'Melbourne. Sydney. ANU.',      stat:'Top Salary ROI', cities:['Sydney','Melbourne','Brisbane','Perth'], color:'#4ABFB5', bg:'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=90&w=1800', desc:'World-class education meets the world\'s most enviable lifestyle.' },
  { id:'can', num:'04', name:'Canada',         tagline:'Toronto. Vancouver. UBC.',     stat:'3-Year Work Visa', cities:['Toronto','Vancouver','Montreal','Calgary'], color:'#9BAEC8', bg:'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=90&w=1800', desc:'Welcoming communities, open futures, and limitless global careers.' },
  { id:'sgp', num:'05', name:'Singapore',      tagline:'NUS. NTU. SMU.',              stat:'Global Financial Hub', cities:['Marina Bay','Jurong','Changi','Sentosa'], color:'#4BC8D4', bg:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=90&w=1800', desc:'The gateway to Asia\'s booming economy and cutting-edge research.' },
  { id:'fra', num:'06', name:'France',         tagline:'Sorbonne. INSEAD. HEC.',       stat:'Innovation & Arts', cities:['Paris','Lyon','Bordeaux','Nice'], color:'#8C8FD6', bg:'https://images.unsplash.com/photo-1502602898657-3e907fa0a586?auto=format&fit=crop&q=90&w=1800', desc:'The global capital of culture, luxury, and engineering excellence.' },
  { id:'deu', num:'07', name:'Germany',        tagline:'TUM. LMU. Heidelberg.',        stat:'Zero Tuition Fees', cities:['Berlin','Munich','Hamburg','Frankfurt'], color:'#D4A84A', bg:'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=90&w=1800', desc:'World-leading engineering with virtually zero tuition costs.' },
  { id:'ire', num:'08', name:'Ireland',        tagline:'Trinity. UCD. Tech Hub.',      stat:'Fast-Track PR', cities:['Dublin','Cork','Galway','Limerick'], color:'#6BBF8C', bg:'https://images.unsplash.com/photo-1590089415225-401ed6f9b8cd?auto=format&fit=crop&q=90&w=1800', desc:'Europe\'s fastest-growing tech and business epicenter.' },
  { id:'esp', num:'09', name:'Spain',          tagline:'Barcelona. Madrid. Valencia.', stat:'Rich Culture & Tech', cities:['Madrid','Barcelona','Valencia','Seville'], color:'#D4874A', bg:'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=90&w=1800', desc:'Vibrant culture meets modern business and innovation schools.' },
  { id:'pol', num:'10', name:'Poland',         tagline:'Warsaw. Jagiellonian. AGH.',   stat:'Affordable Excellence', cities:['Warsaw','Krakow','Wroclaw','Gdansk'], color:'#D46B8C', bg:'https://images.unsplash.com/photo-1519197444223-a16f6b0f9f1b?auto=format&fit=crop&q=90&w=1800', desc:'High-quality education with Europe\'s most affordable living costs.' },
  { id:'nzl', num:'11', name:'New Zealand',    tagline:'Auckland. Otago. Wellington.', stat:'Safe & Welcoming', cities:['Auckland','Wellington','Christchurch','Queenstown'], color:'#8CBF6B', bg:'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=90&w=1800', desc:'Breathtaking landscapes. World-class universities. Extraordinary life.' },
];

const WORDS = ['OXFORD.', 'HARVARD.', 'NUS.', 'TORONTO.', 'SORBONNE.', 'TUM.', 'ANU.'];
const DEST_OPTIONS = [
  { value: 'all', label: 'All Destinations' },
  { value: 'europe', label: 'Europe' },
  { value: 'americas', label: 'Americas' },
  { value: 'apac', label: 'Asia Pacific' },
];

function Hero() {
  const [tick, setTick] = useState(0);
  const [transition, setTransition] = useState(null);
  const [destFilter, setDestFilter] = useState('all');
  const [destFilter, setDestFilter] = useState('all');

  useEffect(() => {
    const t = setInterval(() => setTick(p => (p + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section id="home" style={{ position:'relative', width:'100%', paddingTop: 0, background:'#04040A', overflow:'hidden' }}>
        <div className={`cinematic-aspect-239`} style={{ width: '100%', maxHeight: 'none' }}>

          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize:'80px 80px', zIndex:0, pointerEvents:'none' }} />

          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
            style={{ position:'absolute', top:'-30%', left:'-20%', width:'140%', height:'160%', background:'conic-gradient(from 0deg, transparent 0%, rgba(232,114,74,0.06) 15%, transparent 30%, rgba(249,212,64,0.05) 50%, transparent 70%, rgba(46,91,255,0.05) 85%, transparent 100%)', zIndex:0, pointerEvents:'none' }}
          />

          <div style={{ position:'relative', zIndex:2, padding:'0 10vw', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:80, alignItems:'center', height:'100%', paddingTop:72 }}>

            <div>
              <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.9}}
                style={{ display:'flex', alignItems:'center', gap:14, marginBottom:32 }}>
                <div style={{ width:36, height:1, background:'var(--gold)', boxShadow:'0 0 10px var(--gold-soft)' }} />
                <span style={{ fontSize:11, letterSpacing:7, color:'var(--gold)', fontWeight:600, textTransform:'uppercase', fontFamily:'var(--font-serif)' }}>Prologue · Your gateway to the world</span>
              </motion.div>

              <div style={{ overflow:'hidden', marginBottom:4 }}>
                <motion.div initial={{y:160}} animate={{y:0}} transition={{delay:0.2,duration:1.1,ease:[0.76,0,0.24,1]}}
                  style={{ fontSize:'clamp(60px,8vw,120px)', fontWeight:900, lineHeight:0.88, letterSpacing:-5, color:'#fff', fontFamily:'var(--font-serif)' }}>
                  STUDY
                </motion.div>
              </div>
              <div style={{ overflow:'hidden', marginBottom:4 }}>
                <motion.div initial={{y:160}} animate={{y:0}} transition={{delay:0.32,duration:1.1,ease:[0.76,0,0.24,1]}}
                  style={{ fontSize:'clamp(60px,8vw,120px)', fontWeight:900, lineHeight:0.88, letterSpacing:-5, WebkitTextStroke:'2px rgba(249,212,64,0.25)', color:'transparent', fontFamily:'var(--font-serif)' }}>
                  AT
                </motion.div>
              </div>

              <div style={{ overflow:'hidden', height:'clamp(60px,8vw,120px)', marginBottom:40 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={tick}
                    initial={{ y:'105%', skewY:4 }}
                    animate={{ y:0, skewY:0 }}
                    exit={{ y:'-105%', skewY:-4 }}
                    transition={{ duration:0.6, ease:[0.76,0,0.24,1] }}
                    style={{ fontSize:'clamp(60px,8vw,120px)', fontWeight:900, lineHeight:0.88, letterSpacing:-5, fontFamily:'var(--font-serif)',
                      background:'linear-gradient(135deg,#E8724A 0%,var(--accent-gold) 50%,#F4CF57 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                    {WORDS[tick]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.9,duration:1}}
                style={{ fontSize:17, lineHeight:1.75, color:'rgba(255,255,255,0.48)', maxWidth:400, fontWeight:300, marginBottom:44 }}>
                11 countries. 5,200+ students placed. Your extraordinary global education journey begins with one decision.
              </motion.p>

              <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.1,duration:1}}
                style={{ display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
                <CinemaButton onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  triggerLensFlare((r.left+r.width/2)/window.innerWidth*100, (r.top+r.height/2)/window.innerHeight*100);
                  document.getElementById('countries-start')?.scrollIntoView({behavior:'smooth'});
                }}>
                  Begin Your Journey →
                </CinemaButton>
                <CinemaButton variant="secondary" onClick={() => {}}>
                  View Success Stories
                </CinemaButton>
              </motion.div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45,duration:0.8}} style={{marginBottom:8}}>
                <span style={{ fontSize:10, letterSpacing:4, color:'var(--gold)', fontWeight:600, textTransform:'uppercase', display:'block', marginBottom:10, fontFamily:'var(--font-serif)' }}>Filter Destinations</span>
                <ReelSelector options={DEST_OPTIONS} value={destFilter} onChange={setDestFilter} />
              </motion.div>

              {[
                { num:'11', label:'Destination Countries', sub:'Across 4 continents', color:'#E8724A' },
                { num:'98%', label:'Visa Approval Rate', sub:'Industry-leading success', color:'var(--accent-gold)' },
                { num:'5,200+', label:'Students Placed', sub:'Since 2018 · Real outcomes', color:'#4ABFB5' },
                { num:'24/7', label:'Expert Support', sub:'Dedicated consultants', color:'#8C8FD6' },
              ].map((s,i) => (
                <motion.div key={s.label} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{delay:0.5+i*0.12,duration:0.9}}
                  style={{ display:'flex', alignItems:'center', gap:20, padding:'18px 22px', borderRadius:14,
                    background:'rgba(20,20,25,0.98)', border:`1px solid ${s.color}20`,
                    transition:'all 0.4s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${s.color}50`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = `${s.color}20`}>
                  <div style={{ fontSize:28, fontWeight:800, color:s.color, letterSpacing:-1, minWidth:80, fontFamily:'var(--font-serif)' }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{s.label}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.32)', marginTop:2 }}>{s.sub}</div>
                  </div>
                  <motion.div animate={{ scale:[1,1.5,1], opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:2.5, delay:i*0.6 }}
                    style={{ width:6, height:6, borderRadius:'50%', background:s.color, marginLeft:'auto', boxShadow:`0 0 10px ${s.color}` }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
          style={{ position:'absolute', bottom: 28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:3 }}>
          <span style={{ fontSize:9, letterSpacing:5, color:'rgba(255,255,255,0.25)', textTransform:'uppercase', color:'var(--gold)', opacity:0.6 }}>Scroll · Next Scene</span>
          <motion.div animate={{y:[0,10,0],opacity:[0.2,0.8,0.2]}} transition={{repeat:Infinity,duration:2}}
            style={{ width:1, height:44, background:'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </motion.div>

        {transition && (
          <AtmosphericTransition
            active={true}
            countryBg={transition.bg}
            countryName={transition.name}
            onComplete={() => setTransition(null)}
          />
        )}
      </section>

      <div id="countries-start" style={{ height: 1, position:'relative' }} />

      {COUNTRIES.map((c, i) => (
        <CountrySection key={c.id} c={c} i={i} onExplore={() => setTransition(c)} />
      ))}

      <FinalCTA />
    </>
  );
}

function CountrySection({ c, i, onExplore }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const isEven = i % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold:0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ position:'relative', width:'100%', overflow:'hidden', background:'#02020A' }} className="cinematic-depth-of-field">
      <div className={`cinematic-aspect-169`} style={{ maxHeight: 'none' }}>

        <motion.div initial={{scale:1.12}} animate={inView?{scale:1}:{scale:1.12}} transition={{duration:2.8,ease:[0.25,0.46,0.45,0.94]}}
          style={{ position:'absolute', inset:0, backgroundImage:`url(${c.bg})`, backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.3) saturate(1.2)' }} />

        <div style={{ position:'absolute', inset:0, background:isEven
          ?`linear-gradient(to right, rgba(2,2,10,0.99) 0%, rgba(2,2,10,0.88) 38%, rgba(2,2,10,0.05) 100%)`
          :`linear-gradient(to left, rgba(2,2,10,0.99) 0%, rgba(2,2,10,0.88) 38%, rgba(2,2,10,0.05) 100%)`, pointerEvents:'none' }} />

        <div style={{ position:'absolute', inset:0, background:isEven
          ?`radial-gradient(ellipse at 18% 55%, ${c.color}18 0%, transparent 60%)`
          :`radial-gradient(ellipse at 82% 55%, ${c.color}18 0%, transparent 60%)`, pointerEvents:'none' }} />

        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:160, background:'linear-gradient(to top,#02020A,transparent)', pointerEvents:'none' }} />

        <div style={{
          position:'absolute', [isEven?'right':'left']:'-2vw', top:'50%', transform:'translateY(-50%)',
          fontSize:'clamp(180px,22vw,340px)', fontWeight:900, lineHeight:1, fontFamily:'var(--font-serif)',
          WebkitTextStroke:`1px ${c.color}18`, color:'transparent', pointerEvents:'none',
          letterSpacing:-20, userSelect:'none',
        }}>{c.num}</div>

        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', [isEven?'paddingLeft':'paddingRight']:'10vw', justifyContent:isEven?'flex-start':'flex-end' }}>
          <motion.div
            initial={{opacity:0, x:isEven?-80:80}}
            animate={inView?{opacity:1,x:0}:{opacity:0,x:isEven?-80:80}}
            transition={{duration:1,ease:[0.25,0.46,0.45,0.94],delay:0.15}}
            style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:500 }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <ActMarker actNumber={parseInt(c.num)} actTitle={c.name.toUpperCase()} />
            </div>

            <div style={{ overflow:'hidden' }}>
              <motion.h2 initial={{y:100}} animate={inView?{y:0}:{y:100}} transition={{delay:0.2,duration:0.9,ease:[0.76,0,0.24,1]}}
                style={{ fontSize:'clamp(52px,6.5vw,92px)', fontWeight:900, lineHeight:0.86, letterSpacing:-4, color:'#fff', margin:0, fontFamily:'var(--font-serif)' }}>
                {c.name}
              </motion.h2>
            </div>

            <div style={{ fontSize:16, fontWeight:600, color:`${c.color}`, letterSpacing:0.5 }}>{c.tagline}</div>
            <div style={{ fontSize:15, lineHeight:1.7, color:'rgba(255,255,255,0.48)', fontWeight:300 }}>{c.desc}</div>

            <div style={{ display:'inline-flex', alignItems:'center', gap:12, padding:'11px 22px', borderRadius:100,
              background:`${c.color}14`, border:`1px solid ${c.color}40`, color:c.color, fontSize:13, fontWeight:600,
              alignSelf:'flex-start', boxShadow:`0 4px 24px ${c.color}20`, width:'fit-content', background: 'rgba(20,20,25,0.95)' }}>
              <motion.span animate={{scale:[1,1.6,1],opacity:[1,0.3,1]}} transition={{repeat:Infinity,duration:2}}
                style={{width:6,height:6,borderRadius:'50%',background:c.color,boxShadow:`0 0 8px ${c.color}`}} />
              {c.stat}
            </div>

            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {c.cities.map(city => (
                <span key={city} style={{ padding:'7px 16px', borderRadius:100, fontSize:12, fontWeight:500,
                  color:'rgba(255,255,255,0.55)', background:'rgba(20,20,25,0.95)', border:'1px solid rgba(255,255,255,0.08)' }}>
                  {city}
                </span>
              ))}
            </div>

            <div style={{ display:'flex', gap:12, alignItems:'center', marginTop:4 }}>
              <CinemaButton onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                triggerLensFlare((r.left+r.width/2)/window.innerWidth*100, (r.top+r.height/2)/window.innerHeight*100);
                onExplore();
              }} style={{
                background:`linear-gradient(135deg,${c.color}30,${c.color}10)`,
                border:`1px solid ${c.color}60`,
                boxShadow:`0 8px 32px ${c.color}25`,
              }}>
                Explore {c.name.split(' ')[0]} →
              </CinemaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ position:'relative', padding:'160px 8vw', background:'#04040A', overflow:'hidden', textAlign:'center' }}>
      <motion.div
        initial={{ opacity:0, scale:1.5 }}
        whileInView={{ opacity:1, scale:1 }}
        viewport={{once:true}}
        transition={{ duration:2, ease:'easeOut' }}
        style={{
          position:'absolute', inset:0, zIndex:0,
          background:'radial-gradient(ellipse at 50% 50%, rgba(249,212,64,0.1) 0%, rgba(232,114,74,0.05) 30%, transparent 70%)',
        }}
      />

      <motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} transition={{duration:1}} viewport={{once:true}} style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <ActMarker actNumber={4} actTitle="Epilogue · Your Turn" />
        </div>
        <h2 style={{ fontSize:'clamp(48px,7vw,96px)', fontWeight:900, lineHeight:0.88, letterSpacing:-4, color:'#fff', margin:'0 0 20px', fontFamily:'var(--font-serif)' }}>
          YOUR WORLD<br />
          <span style={{ background:'linear-gradient(135deg,#E8724A 0%,var(--accent-gold) 50%,#F4CF57 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AWAITS.</span>
        </h2>
        <p style={{ fontSize:17, color:'rgba(255,255,255,0.45)', maxWidth:460, margin:'32px auto 0', lineHeight:1.7, fontWeight:300 }}>
          Join 5,200+ students who transformed their lives. Your dream university is one conversation away.
        </p>
        <div style={{ marginTop:52, display:'flex', gap:16, justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
          <CinemaButton>
            Book Free Consultation
          </CinemaButton>
          <CinemaButton variant="secondary">
            View All Countries →
          </CinemaButton>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
