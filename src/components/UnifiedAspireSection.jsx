import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Shield, FileText, CreditCard, Ban, Clock, Scale,
  ChevronDown, Sparkles, Globe, GraduationCap, Star, ArrowRight
} from 'lucide-react';
import UniversityFloaters from './UniversityFloaters';

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  { text: "Personal Admissions Manager", category: "advisory" },
  { text: "Draft Blueprints", category: "advisory" },
  { text: "SOP & Narrative Refinement", category: "documents" },
  { text: "Academic Strategy Consultations", category: "advisory" },
  { text: "Comprehensive Profile Assessment", category: "advisory" },
  { text: "Strategic University Selection", category: "advisory" },
  { text: "Scholarship & Funding Advisory", category: "financial" },
  { text: "Loan Facilitation Services", category: "financial" },
  { text: "Offer Management & Guidance", category: "documents" },
  { text: "Visa Documentation Support", category: "visa" },
  { text: "Visa Scheduling Assistance", category: "visa" },
  { text: "Visa Interview Coaching", category: "visa" },
  { text: "Pre-Departure Orientation", category: "departure" },
  { text: "Accommodation & Forex Support", category: "departure" },
  { text: "Departure Planning Assistance", category: "departure" },
];

const terms = [
  {
    title: "Scope of Services",
    icon: <FileText size={20} />,
    desc: "Provides personalized one-to-one advisory, application guidance, and admission support. Services are advisory in nature and do not guarantee admission, scholarships, or visas.",
  },
  {
    title: "Service Plan & Pricing",
    icon: <Shield size={20} />,
    desc: "All Aspire Service Plans, inclusions, and applicable Service Fees are standardized and fixed. Pricing or deliverables cannot be modified or negotiated under any circumstances.",
  },
  {
    title: "Payment Terms",
    icon: <CreditCard size={20} />,
    desc: "The full Service Fee must be paid at registration for activation. Partial, split, or installment payments shall not be accepted unless expressly approved in writing.",
  },
  {
    title: "Non-Refundable Fee",
    icon: <Ban size={20} />,
    desc: "Payments are strictly non-refundable and non-transferable. No refunds shall be issued for withdrawal, change of plans, application outcomes, or failure to utilize services.",
  },
  {
    title: "Deferral of Services",
    icon: <Clock size={20} />,
    desc: "Clients may request to defer service utilization for up to three (3) academic terms. Paid Service Fees shall be carried forward, subject to operational feasibility.",
  },
  {
    title: "Limitation of Responsibility",
    icon: <Scale size={20} />,
    desc: "The Company acts solely as an advisory provider. Final decisions regarding admissions, scholarships, visas, or institutional outcomes remain exclusively with the authorities.",
  },
];

const journey = [
  { step: '01', title: 'Profile Assessment', desc: 'Deep-dive evaluation of your academic background, goals, and strengths to map the ideal trajectory.', icon: <Star size={18} /> },
  { step: '02', title: 'University Strategy', desc: 'Curated shortlist of programs matched to your profile, ambitions, and acceptance probability.', icon: <Globe size={18} /> },
  { step: '03', title: 'Application Craft', desc: 'SOP writing, essay refinement, and document blueprinting done with precision by your dedicated manager.', icon: <FileText size={18} /> },
  { step: '04', title: 'Offer & Visa', desc: 'Full support from offer letter to visa documentation, scheduling, and interview coaching.', icon: <Shield size={18} /> },
  { step: '05', title: 'Departure Ready', desc: 'Accommodation, forex, and pre-departure orientation so you land prepared and confident.', icon: <GraduationCap size={18} /> },
];

const testimonials = [
  { name: 'Vishnu Erapalli', uni: 'NCSU, USA', quote: 'Right from providing clarity about the courses to one on one visa interview training, they had my back.', avatar: 'VE' },
  { name: 'Pehal Kothari', uni: 'Purdue, USA', quote: 'They are very cooperative and approachable. Their team helped me with SOPs, LORs and mock visa interviews.', avatar: 'PK' },
  { name: 'Mukta Reddy', uni: 'Parsons, USA', quote: 'They go out of their way to provide the best output and bring clarity to everything they do.', avatar: 'MR' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function FeatureItem({ text, gold, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.035, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', alignItems: 'center', gap: 11,
        padding: '7px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        fontSize: '0.9rem',
        color: gold ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
        fontWeight: gold ? 500 : 400,
      }}
    >
      <CheckCircle2
        size={15}
        style={{
          flexShrink: 0,
          color: gold ? 'var(--accent-gold)' : 'rgba(255,255,255,0.25)',
          filter: gold ? 'drop-shadow(0 0 5px rgba(249,212,64,0.6))' : 'none',
        }}
      />
      {text}
    </motion.li>
  );
}

function TermCard({ term, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen(o => !o)}
      style={{
        background: open ? 'rgba(249,212,64,0.04)' : 'rgba(255,255,255,0.018)',
        border: open ? '1px solid rgba(249,212,64,0.22)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 18, padding: '22px 26px', cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: open ? 'rgba(249,212,64,0.1)' : 'rgba(255,255,255,0.04)',
            border: open ? '1px solid rgba(249,212,64,0.3)' : '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: open ? 'var(--accent-gold)' : 'rgba(255,255,255,0.35)',
            transition: 'all 0.3s',
          }}>
            {term.icon}
          </div>
          <h4 style={{ color: open ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>
            {term.title}
          </h4>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
          <ChevronDown size={16} color={open ? 'var(--accent-gold)' : 'rgba(255,255,255,0.25)'} />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0, overflow: 'hidden',
              paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
            }}
          >
            {term.desc}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function UnifiedAspireSection() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div style={{ color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Background ambient */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(252, 113, 51, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* ── Full-width dark hero banner ──────────────────────────────────── */}
      <div style={{
        position: 'relative',
        paddingTop: 140, paddingBottom: 100,
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(249,212,64,0.04) 0%, transparent 60%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        {/* Animated orb */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.07, 0.16, 0.07] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: '100vw', pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(249,212,64,0.15) 0%, transparent 60%)',
          }}
        />
        
        <div className="ambient-orb-1" style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.08) 0%, transparent 60%)', filter: 'blur(40px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div className="ambient-orb-2" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.05) 0%, transparent 60%)', filter: 'blur(40px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />

        <UniversityFloaters />

        {/* Horizontal scan lines for texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1px solid rgba(249,212,64,0.35)', borderRadius: 100,
              padding: '9px 26px', marginBottom: 30,
              background: 'rgba(249,212,64,0.06)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-gold)', display: 'inline-block' }}
            />
            <span style={{ fontSize: 10, letterSpacing: 6, fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
              Aspire Placement Services
            </span>
          </motion.div>

          {/* Giant headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(4rem, 9vw, 9rem)',
              fontFamily: 'var(--font-serif)', fontWeight: 400,
              lineHeight: 0.95, margin: '0 auto 24px', maxWidth: 1000,
            }}
          >
            Engineer Your<br />
            <span style={{
              background: 'linear-gradient(135deg, #fff 0%, var(--accent-gold) 45%, #D4803A 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(249,212,64,0.2))',
            }}>
              Legacy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            style={{
              fontSize: '1.15rem', color: 'rgba(255,255,255,0.45)',
              maxWidth: 580, margin: '0 auto 56px', lineHeight: 1.8,
            }}
          >
            Standardized pricing for every degree objective — UG, Masters, MBA, PhD.
            Your dedicated advisor handles everything from strategy to departure.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              display: 'inline-flex', borderRadius: 20, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {[
              { val: '98.7%', label: 'Visa Success' },
              { val: '$24M+', label: 'Scholarships' },
              { val: '200+', label: 'Universities' },
              { val: '15', label: 'Services Included' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '18px 36px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontFamily: 'var(--font-serif)', color: i === 0 ? 'var(--accent-gold)' : '#fff', lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 7, fontWeight: 800 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Journey timeline ─────────────────────────────────────────────── */}
      <div style={{
        padding: '100px 6vw',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontWeight: 800 }}>
            Your Path With Us
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            color: '#fff', margin: 0, fontWeight: 400, lineHeight: 1.1,
          }}>
            From Application to{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>Arrival.</span>
          </h2>
        </motion.div>

        <div className="grid-5-col" style={{ gap: 2, position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: 28, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(to right, transparent, rgba(249,212,64,0.3), rgba(249,212,64,0.3), transparent)',
            pointerEvents: 'none',
          }} />

          {journey.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', padding: '0 12px', position: 'relative' }}
            >
              {/* Circle node */}
              <motion.div
                whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(249,212,64,0.4)' }}
                style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, rgba(249,212,64,0.15), rgba(212,163,115,0.08))',
                  border: '1px solid rgba(249,212,64,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-gold)', position: 'relative', zIndex: 1,
                  cursor: 'default',
                }}
              >
                {step.icon}
              </motion.div>

              <div style={{ fontSize: 10, letterSpacing: 4, color: 'rgba(249,212,64,0.5)', fontWeight: 900, marginBottom: 8 }}>
                {step.step}
              </div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 10px' }}>
                {step.title}
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Pricing cards ─────────────────────────────────────────────────── */}
      <div style={{ padding: '100px 6vw', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontWeight: 800 }}>
            Investment
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            color: '#fff', margin: 0, fontWeight: 400, lineHeight: 1.1,
          }}>
            Choose Your{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>Trajectory.</span>
          </h2>
        </motion.div>

        <div className="grid-2-col" style={{ gap: 24, alignItems: 'start' }}>

          {/* ── Aspire ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            style={{
              background: 'linear-gradient(160deg, rgba(20,22,28,0.98) 0%, rgba(10,11,15,0.99) 100%)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32,
              padding: '48px 44px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 10, letterSpacing: 5, fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 10 }}>
                Standard Plan
              </div>
              <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: '#fff', margin: '0 0 10px', lineHeight: 1 }}>
                Aspire
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                Focused expertise for targeted university applications.
              </p>
            </div>

            {/* Price */}
            <div style={{
              padding: '28px 0', marginBottom: 28,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>₹</span>
                <span style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', letterSpacing: -2, lineHeight: 1 }}>38,800</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }}>+ GST</span>
              </div>
            </div>

            {/* Scope */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {['Up to 4 Universities', 'Single Destination'].map(b => (
                <div key={b} style={{
                  padding: '9px 20px', borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.09)',
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                }}>
                  {b}
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 16, fontWeight: 800 }}>
                All Services Included
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {features.map((f, i) => <FeatureItem key={i} text={f.text} gold={false} index={i} />)}
              </ul>
            </div>

            <button
              onClick={() => navigate('/contact')}
              style={{
                width: '100%', padding: '18px 0', borderRadius: 100,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.14)',
                color: '#fff', fontSize: '0.88rem', fontWeight: 900,
                textTransform: 'uppercase', letterSpacing: 3, cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
            >
              Get Started with Aspire
            </button>
          </motion.div>

          {/* ── Aspire Plus+ ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            whileHover={{ y: -10 }}
            style={{
              position: 'relative',
              background: 'linear-gradient(160deg, rgba(28,22,10,0.99) 0%, rgba(14,11,4,0.99) 100%)',
              border: '1px solid rgba(212,163,115,0.3)', borderRadius: 32,
              padding: '48px 44px',
              boxShadow: '0 50px 120px rgba(212,163,115,0.1), inset 0 1px 0 rgba(249,212,64,0.12)',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            {/* Animated border glow */}
            <motion.div
              animate={{ opacity: [0.18, 0.45, 0.18] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -1.5, borderRadius: 33,
                background: 'linear-gradient(135deg, rgba(249,212,64,0.45) 0%, rgba(212,163,115,0.2) 50%, transparent 100%)',
                zIndex: -1, pointerEvents: 'none',
              }}
            />

            {/* Recommended badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 5, fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 10, opacity: 0.8 }}>
                  Premium Plan
                </div>
                <h3 style={{
                  fontSize: '3rem', fontFamily: 'var(--font-serif)', margin: '0 0 10px', lineHeight: 1,
                  background: 'linear-gradient(135deg, #fff 0%, var(--accent-gold) 55%, #D4803A 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Aspire Plus+
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0, maxWidth: 320 }}>
                  Maximum flexibility. Limitless applications. For elite candidates who settle for nothing less.
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-gold), #D4803A)',
                  color: '#000', fontSize: 10, fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: 2,
                  padding: '8px 16px', borderRadius: 100, flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(212,163,115,0.4)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <Star size={11} fill="currentColor" /> Recommended
              </motion.div>
            </div>

            {/* Price */}
            <div style={{
              padding: '28px 0', marginBottom: 28,
              borderTop: '1px solid rgba(249,212,64,0.15)',
              borderBottom: '1px solid rgba(249,212,64,0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: '1rem', color: 'rgba(249,212,64,0.5)', fontWeight: 300 }}>₹</span>
                <span style={{
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: -2, lineHeight: 1,
                  background: 'linear-gradient(135deg, #fff, var(--accent-gold))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  72,800
                </span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>+ GST</span>
              </div>
            </div>

            {/* Scope */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {['Unlimited Universities', 'All Destinations'].map(b => (
                <div key={b} style={{
                  padding: '9px 20px', borderRadius: 100,
                  border: '1px solid rgba(249,212,64,0.25)',
                  background: 'rgba(249,212,64,0.07)',
                  fontSize: 13, fontWeight: 700, color: 'var(--accent-gold)',
                }}>
                  {b}
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(249,212,64,0.5)', marginBottom: 16, fontWeight: 800 }}>
                All Services Included
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {features.map((f, i) => <FeatureItem key={i} text={f.text} gold={true} index={i} />)}
              </ul>
            </div>

            <button
              onClick={() => navigate('/contact')}
              style={{
                width: '100%', padding: '20px 0', borderRadius: 100,
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, #D4803A 100%)',
                border: 'none', color: '#000',
                fontSize: '0.88rem', fontWeight: 900,
                textTransform: 'uppercase', letterSpacing: 3, cursor: 'pointer',
                boxShadow: '0 12px 40px rgba(212,163,115,0.3)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(212,163,115,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,163,115,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Select Aspire Plus+
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '80px 6vw',
        background: 'rgba(249,212,64,0.02)',
      }}>
        <div className="grid-2-col" style={{ maxWidth: 1100, margin: '0 auto', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontWeight: 800 }}>
              Student Voices
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 3rem)', color: '#fff', margin: '0 0 24px', fontWeight: 400, lineHeight: 1.15 }}>
              Real students.<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>Real results.</span>
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 32 : 8, height: 8, borderRadius: 100,
                    background: i === activeTestimonial ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, padding: '40px 44px',
              }}
            >
              {/* Gold quote mark */}
              <div style={{ fontSize: '5rem', lineHeight: 0.7, color: 'var(--accent-gold)', opacity: 0.3, fontFamily: 'Georgia, serif', marginBottom: 20 }}>
                "
              </div>
              <p style={{ fontSize: '1.25rem', color: '#fff', lineHeight: 1.65, margin: '0 0 28px', fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                {testimonials[activeTestimonial].quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-gold), #D4803A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 900, color: '#000',
                }}>
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', letterSpacing: 1 }}>
                    {testimonials[activeTestimonial].uni}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Terms section ─────────────────────────────────────────────────── */}
      <div style={{ padding: '100px 6vw 120px', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100,
            padding: '8px 22px', marginBottom: 22,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <Shield size={12} color="rgba(255,255,255,0.3)" />
            <span style={{ fontSize: 9, letterSpacing: 5, fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              Legal Framework
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
            color: '#fff', margin: '0 0 16px', fontWeight: 400, lineHeight: 1.1,
          }}>
            Service Terms &{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>Conditions</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Tap any term below to expand. By registering for Aspire, you agree to all conditions outlined here.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
          {terms.map((t, i) => <TermCard key={i} term={t} index={i} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginTop: 80, textAlign: 'center',
            padding: '64px', borderRadius: 32,
            background: 'linear-gradient(135deg, rgba(28,22,10,0.8) 0%, rgba(10,8,3,0.9) 100%)',
            border: '1px solid rgba(249,212,64,0.15)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '80%', height: '200%', pointerEvents: 'none',
              background: 'radial-gradient(circle, rgba(249,212,64,0.2) 0%, transparent 65%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(249,212,64,0.6)', marginBottom: 16, fontWeight: 800 }}>
              Ready to begin?
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              color: '#fff', margin: '0 0 20px', fontWeight: 400,
            }}>
              Your Acceptance Awaits.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 460, margin: '0 auto 40px', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Join hundreds of students who've secured offers at the world's most selective institutions.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(249,212,64,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '18px 48px', borderRadius: 100,
                  background: 'linear-gradient(135deg, var(--accent-gold), #D4803A)',
                  border: 'none', color: '#000',
                  fontSize: 12, fontWeight: 900, letterSpacing: 3,
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '18px 48px', borderRadius: 100,
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontSize: 12, fontWeight: 900, letterSpacing: 3,
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Talk to an Advisor
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
