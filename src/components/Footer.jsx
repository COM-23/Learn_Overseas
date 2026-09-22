import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Mail, Phone } from 'lucide-react';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const OFFICES = [
  { city: 'Bengaluru', badge: 'HQ', state: 'Karnataka', address: '4th Floor, Donna Bas Tower, 401, 100 Railway Parallel Rd, Seshadripuram, 560020', phone: '+91 80 4110 5005', link: 'https://share.google/LsdbJylQUoJNZ4wiW' },
  { city: 'Mumbai', badge: null, state: 'Maharashtra', address: '5th floor, Technopolis Knowledge Park, Mahakali Caves Rd, Andheri East, 400093', phone: '+91 76662 10834', link: 'https://share.google/L3qpl4DkcjK9jjbxF' },
  { city: 'Pune', badge: null, state: 'Maharashtra', address: '7 Business Square by Naiknavare, Ganeshkhind Rd, near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016', phone: '+91 80 4110 5005', link: 'https://www.google.com/maps/search/?api=1&query=7+Business+Square+by+Naiknavare+Pune' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#04040a',
      color: '#fff',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid rgba(249,212,64,0.15)',
    }}>

      {/* ── Single unified layout ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 5vw 32px' }}>

        {/* Top row: brand left | offices right */}
        <div className="footer-top-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, marginBottom: 48 }}>

          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 24, textDecoration: 'none' }}>
              <img src="/stencil-logo.png" alt="Learn Overseas by Stencil" style={{ height: 85, objectFit: 'contain' }} />
            </Link>
            <p style={{ fontSize: 13, color: '#4a4a5a', lineHeight: 1.65, marginBottom: 28, maxWidth: 260 }}>
              Empowering ambitious students to reach elite universities worldwide since 2018.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
                { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
                { icon: <Mail size={15} />, href: 'mailto:info@learnoverseas.com', label: 'Email' },
              ].map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label} style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: '1px solid rgba(249,212,64,0.2)',
                  background: 'rgba(249,212,64,0.04)', color: 'var(--accent-gold)',
                  transition: 'all 0.25s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,212,64,0.15)'; e.currentTarget.style.borderColor = 'rgba(249,212,64,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,212,64,0.04)'; e.currentTarget.style.borderColor = 'rgba(249,212,64,0.2)'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Offices 4-column grid */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#2e2e3e', marginBottom: 32 }}>
              Our Offices
            </p>
            <div className="footer-offices-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
              {OFFICES.map((o, i) => (
                <div key={o.city} className="footer-office-item" style={{
                  paddingRight: 24,
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  paddingLeft: i > 0 ? 24 : 0,
                }}>
                  {/* City */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <MapPin size={12} color="var(--accent-gold)" />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{o.city}</span>
                    {o.badge && (
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent-gold)', padding: '1px 6px', border: '1px solid rgba(249,212,64,0.4)', borderRadius: 3 }}>
                        {o.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: '#333344', letterSpacing: '0.04em', marginBottom: 10 }}>{o.state}</p>
                  <p style={{ fontSize: 12, color: '#3e3e52', lineHeight: 1.6, marginBottom: 12 }}>{o.address}</p>
                  <a href={`tel:${o.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#555568', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#555568'}
                  >
                    <Phone size={10} /> {o.phone}
                  </a>
                  <a href={o.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent-gold)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    View on Map <ArrowUpRight size={10} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }} />

        {/* Bottom bar */}
        <div className="footer-bottom-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#4a4a5a', margin: 0 }}>
            © {new Date().getFullYear()} Learn Overseas by Stencil. All rights reserved.
          </p>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: 24 }}>
            {[{ label: 'Privacy Policy', to: '/privacy' }, { label: 'Terms of Service', to: '/terms' }, { label: 'Careers', to: '/careers' }].map(l => (
              <Link key={l.to} to={l.to} style={{ fontSize: 12, color: '#323240', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                onMouseLeave={e => e.target.style.color = '#323240'}
              >{l.label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
