import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';


const NAV = [
  { name: 'Home', path: '/' },
  {
    name: 'About', path: '/about', openInNewTab: true, dropdown: [
      { name: 'Our Vision', path: '/about/vision', openInNewTab: true },
      { name: 'Our Team', path: '/about/team', openInNewTab: true }
    ]
  },
  { name: 'Services', path: '/services' },
  { name: 'Countries', path: '/countries' },
  { name: 'Blog', path: '/news' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
];

function NavItem({ link, isActive, scrolled }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      {link.externalUrl ? (
        <a href={link.externalUrl} target="_blank" rel="noopener noreferrer" style={{ position: 'relative', textDecoration: 'none', padding: '8px 16px', borderRadius: 100, display: 'block' }}>
          <motion.div whileHover={{ color: '#fff' }}
            style={{ fontSize: 14, fontWeight: 500, color: isActive ? '#fff' : 'var(--text-secondary)', transition: 'color 0.3s' }}>
            {link.name}
          </motion.div>
        </a>
      ) : link.openInNewTab ? (
        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: 'relative', textDecoration: 'none', padding: '8px 16px', borderRadius: 100, display: 'block' }}
        >
          <motion.div whileHover={{ color: '#fff' }}
            style={{ fontSize: 14, fontWeight: 500, color: isActive ? '#fff' : 'var(--text-secondary)', transition: 'color 0.3s' }}>
            {link.name}
          </motion.div>
          {isActive && (
            <motion.div layoutId="nav-pill"
              style={{ position: 'absolute', inset: 0, borderRadius: 100, background: 'rgba(255,255,255,0.08)', zIndex: -1 }} />
          )}
        </a>
      ) : (
        <Link
          to={link.path}
          style={{ position: 'relative', textDecoration: 'none', padding: '8px 16px', borderRadius: 100, display: 'block' }}
        >
          <motion.div whileHover={{ color: '#fff' }}
            style={{ fontSize: 14, fontWeight: 500, color: isActive ? '#fff' : 'var(--text-secondary)', transition: 'color 0.3s' }}>
            {link.name}
          </motion.div>
          {isActive && (
            <motion.div layoutId="nav-pill"
              style={{ position: 'absolute', inset: 0, borderRadius: 100, background: 'rgba(255,255,255,0.08)', zIndex: -1 }} />
          )}
        </Link>
      )}

      {link.dropdown && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(20, 20, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '8px',
                minWidth: '180px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 100
              }}
            >
              {link.dropdown.map((subLink) => (
                subLink.openInNewTab ? (
                  <a
                    key={subLink.path}
                    href={subLink.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <motion.div
                      whileHover={{ background: 'rgba(255,255,255,0.08)', color: 'var(--accent-gold)' }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                    >
                      {subLink.name}
                    </motion.div>
                  </a>
                ) : (
                  <Link
                    key={subLink.path}
                    to={subLink.path}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <motion.div
                      whileHover={{ background: 'rgba(255,255,255,0.08)', color: 'var(--accent-gold)' }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                    >
                      {subLink.name}
                    </motion.div>
                  </Link>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function UniversitiesDropdown({ isActive }) {
  return (
    <div>
      <Link to="/universities" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 24px',
            borderRadius: 8,
            background: 'rgba(2,2,5,0.4)',
            border: '1px solid rgba(249, 212, 64, 0.2)',
            fontSize: 13,
            fontWeight: 800,
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            cursor: 'pointer',
            overflow: 'hidden',
            
          }}
        >
          {/* Unique animated border effect */}
          <motion.div
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)' }}
          />
          <motion.div
            animate={{ left: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)' }}
          />

          <span style={{ fontSize: 16 }}>🏛️</span>
          <span>Top University</span>
        </motion.div>
      </Link>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  // Track scroll direction for hiding/showing header
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
    setHidden(false); // Header is now globally persistent on scroll
  });

  const isCustomHeaderPage = ['/universities', '/about/vision', '/about/team', '/about'].includes(location.pathname) || location.pathname.startsWith('/universities');
  if (isCustomHeaderPage) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -100 : (scrolled ? 16 : 0),
          opacity: hidden ? 0 : 1,
          width: scrolled ? '85vw' : '100%',
          left: scrolled ? '7.5vw' : '0%',
          borderRadius: scrolled ? 40 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, right: 0,
          zIndex: 99999,
          height: scrolled ? 72 : 96,
          display: 'flex',
          alignItems: 'center',
          padding: scrolled ? (window.innerWidth < 768 ? '0 16px' : '0 32px') : '0 5vw',
          background: scrolled ? 'rgba(5, 8, 12, 0.7)' : 'transparent',
          border: scrolled ? `1px solid rgba(255,255,255,0.08)` : '1px solid transparent',
          boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', textDecoration: 'none' }}>
          <img src="/stencil-logo.png" alt="Learn Overseas" style={{ height: scrolled ? 54 : 80, width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }} />
        </Link>

        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="hide-mobile">
          {NAV.map((link) => {
            const isActive = location.pathname === link.path;
            return <NavItem key={link.path} link={link} isActive={isActive} scrolled={scrolled} />;
          })}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }} className="hide-mobile">

          <UniversitiesDropdown isActive={location.pathname.startsWith('/universities')} />
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.15)' }} />
          <a href="https://portal.learnoverseas.com/admin" target="_self" style={{ textDecoration: 'none' }}>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(249,212,64,0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 24px', fontSize: '0.875rem' }}
            >
              Student Login
            </motion.button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          aria-label="Open mobile menu"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-light)',
            padding: 10,
            borderRadius: '50%',
            marginLeft: 16,
            display: 'none',
            color: '#fff'
          }}
          className="show-mobile"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgb(2,2,5)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 16,
              zIndex: 999,
            }}
          >
            {NAV.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.externalUrl ? (
                    <a href={link.externalUrl}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontSize: '2rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? 'var(--accent-gold)' : '#fff',
                        textDecoration: 'none'
                      }}>
                      {link.name}
                    </a>
                  ) : link.openInNewTab ? (
                    <a href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '2rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? 'var(--accent-gold)' : '#fff',
                        textDecoration: 'none'
                      }}>
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontSize: '2rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? 'var(--accent-gold)' : '#fff',
                        textDecoration: 'none'
                      }}>
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}

            {/* Universities & Login — mobile only extras */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: NAV.length * 0.05 }}
              style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
            >
              <Link
                to="/universities"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '0.85rem', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
                  color: 'var(--accent-gold)', padding: '12px 28px', borderRadius: 100,
                  border: '1px solid rgba(249,212,64,0.4)', background: 'rgba(249,212,64,0.05)',
                  textDecoration: 'none'
                }}
              >
                🏛️ Top University
              </Link>
              <a
                href="https://portal.learnoverseas.com/admin"
                target="_self"
                style={{
                  fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1,
                  background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-copper))',
                  color: '#000', padding: '14px 36px', borderRadius: 100,
                  textDecoration: 'none',
                }}
              >
                Student Login
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Basic media query for the hide-mobile/show-mobile classes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
      `}} />
    </>
  );
}
