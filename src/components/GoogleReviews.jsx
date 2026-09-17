import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    id: 1, author: 'Siddharth M.', avatar: 'SM', rating: 5, date: '3 weeks ago',
    text: 'Learn Overseas Bengaluru completely changed my trajectory. Their team didn\'t just help with applications; they crafted a master strategy that got me into Columbia University with a 40% scholarship. The visa mock interviews were incredibly precise.',
  },
  {
    id: 2, author: 'Ananya Reddy', avatar: 'AR', rating: 5, date: '1 month ago',
    text: 'I was overwhelmed by the UK admission process until I met the Learn Overseas team. They meticulously handled everything from my SOP to securing my accommodation at Imperial College London. Flawless execution and highly professional.',
  },
  {
    id: 3, author: 'Rahul V.', avatar: 'RV', rating: 5, date: '2 months ago',
    text: 'If you want to study in Germany, look no further. Their expertise in public university requirements and APS certification saved me months of stress. I am now pursuing my Masters at RWTH Aachen. Absolute lifesavers!',
  },
  {
    id: 4, author: 'Priya Sharma', avatar: 'PS', rating: 5, date: '3 months ago',
    text: 'What sets Learn Overseas apart is their honesty. They didn\'t push me towards low-tier partner universities. They genuinely evaluated my profile and helped me target top-tier Australian universities. Visa approved in 4 days!',
  },
  {
    id: 5, author: 'Karthik N.', avatar: 'KN', rating: 5, date: '4 months ago',
    text: 'The best education consultants in Bangalore, hands down. From the initial profiling session to the pre-departure briefing, the transparency and dedication of the counselors were unmatched. Highly recommend for US/Canada aspirants.',
  }
];

export default function GoogleReviews() {
  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      width: '100%',
      padding: '120px 20px',
      background: 'rgba(2, 2, 5, 0.85)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.58C14.73 18.24 13.48 18.64 12 18.64C9.13 18.64 6.7 16.7 5.82 14.07H2.13V16.92C3.95 20.54 7.69 23 12 23Z" fill="#34A853"/>
            <path d="M5.82 14.07C5.59 13.4 5.47 12.71 5.47 12C5.47 11.29 5.59 10.6 5.82 9.93V7.08H2.13C1.38 8.57 0.96 10.24 0.96 12C0.96 13.76 1.38 15.43 2.13 16.92L5.82 14.07Z" fill="#FBBC05"/>
            <path d="M12 5.36C13.62 5.36 15.07 5.92 16.21 7.02L19.35 3.88C17.46 2.13 14.97 1 12 1C7.69 1 3.95 3.46 2.13 7.08L5.82 9.93C6.7 7.3 9.13 5.36 12 5.36Z" fill="#EA4335"/>
          </svg>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: 1 }}>Google Reviews</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-gold)' }}>4.9</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="26" height="26" viewBox="0 0 24 24" fill="var(--accent-gold)" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginTop: 12, letterSpacing: 1 }}>Based on 120+ authentic student success stories</p>
      </motion.div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 1100, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1500 }}>
        {reviews.map((review, idx) => {
          const isActive = idx === activeIndex;
          const isLeft = idx === (activeIndex - 1 + reviews.length) % reviews.length;
          const isFarLeft = idx === (activeIndex - 2 + reviews.length) % reviews.length;
          const isRight = idx === (activeIndex + 1) % reviews.length;
          const isFarRight = idx === (activeIndex + 2) % reviews.length;

          let x = '0%'; let rotateY = 0; let scale = 1; let opacity = 0; let zIndex = 1;
          
          if (isActive) { x = '0%'; rotateY = 0; scale = 1; opacity = 1; zIndex = 10; }
          else if (isLeft) { x = '-50%'; rotateY = 20; scale = 0.85; opacity = 0.6; zIndex = 5; }
          else if (isRight) { x = '50%'; rotateY = -20; scale = 0.85; opacity = 0.6; zIndex = 5; }
          else if (isFarLeft) { x = '-85%'; rotateY = 30; scale = 0.7; opacity = 0.2; zIndex = 2; }
          else if (isFarRight) { x = '85%'; rotateY = -30; scale = 0.7; opacity = 0.2; zIndex = 2; }

          return (
            <motion.div
              key={review.id} onClick={() => setActiveIndex(idx)}
              animate={{ x, rotateY, scale, opacity, zIndex }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', width: 380, cursor: 'pointer', transformStyle: 'preserve-3d', borderRadius: 24, padding: '45px 35px', display: 'flex', flexDirection: 'column', gap: 24,
                background: isActive ? 'linear-gradient(145deg, rgba(20,25,35,0.95) 0%, rgba(5,8,12,0.95) 100%)' : 'rgba(8, 10, 15, 0.5)',
                border: isActive ? '1px solid rgba(249,212,64,0.4)' : '1px solid rgba(255,255,255,0.05)',
                boxShadow: isActive ? '0 40px 80px rgba(0,0,0,0.9), inset 0 2px 20px rgba(249,212,64,0.15)' : '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, transform: 'translateZ(30px)' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-copper))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '1.4rem', boxShadow: '0 10px 20px rgba(249,212,64,0.3)' }}>
                  {review.avatar}
                </div>
                <div>
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>{review.author}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Verified Student · {review.date}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, transform: 'translateZ(20px)' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <p style={{ color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, transform: 'translateZ(40px)' }}>"{review.text}"</p>
            </motion.div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
        {reviews.map((_, idx) => (
          <div key={idx} onClick={() => setActiveIndex(idx)} style={{ width: 40, height: 4, borderRadius: 2, background: idx === activeIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'background 0.4s ease', boxShadow: idx === activeIndex ? '0 0 15px var(--accent-gold)' : 'none' }} />
        ))}
      </div>
    </section>
  );
}
