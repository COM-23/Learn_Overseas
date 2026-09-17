import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CinemaButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  style = {},
  icon,
  ...props
}) {
  const handleClick = (e) => {
    onClick?.(e);
  };

  return (
    <motion.button
      className={`cinema-btn ${variant === 'secondary' ? 'secondary' : ''} ${className}`}
      style={style}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}

export function ReelSelector({ options, value, onChange, className = '', style = {} }) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);
  const optionRefs = useRef({});

  useEffect(() => {
    const activeEl = optionRefs.current[value];
    if (activeEl && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      });
    }
  }, [value]);

  const handleChange = (opt) => {
    if (opt !== value) {
      onChange?.(opt);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`reel-selector ${className}`}
      style={style}
      role="tablist"
      aria-label="Navigation selector"
    >
      {options.map((opt) => (
        <div
          key={opt.value ?? opt}
          ref={(el) => (optionRefs.current[opt.value ?? opt] = el)}
          className={`reel-option ${value === (opt.value ?? opt) ? 'active' : ''}`}
          onClick={() => handleChange(opt.value ?? opt)}
          role="tab"
          aria-selected={value === (opt.value ?? opt)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleChange(opt.value ?? opt);
            }
          }}
        >
          {opt.label ?? opt}
        </div>
      ))}
      <div className="reel-indicator" style={indicatorStyle} />
    </div>
  );
}



export function SeatGridNavigation({ items, value, onChange, className = '', style = {} }) {
  const handleSelect = (item, idx, e) => {
    onChange?.(item, idx);
  };

  return (
    <div className={`seat-grid-nav ${className}`} style={style} role="grid" aria-label="Seat-style navigation">
      {items.map((item, idx) => (
        <div
          key={item.value ?? idx}
          className={`seat ${value === (item.value ?? idx) ? 'selected' : ''}`}
          role="gridcell"
          aria-selected={value === (item.value ?? idx)}
          tabIndex={0}
          onClick={(e) => handleSelect(item, idx, e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelect(item, idx, e);
            }
          }}
          title={item.label ?? item.icon ?? `Option ${idx + 1}`}
        >
          {item.icon ?? item.label?.charAt(0) ?? (idx + 1)}
        </div>
      ))}
    </div>
  );
}

export function ActMarker({ actNumber, actTitle, className = '', style = {} }) {
  return (
    <div className={`act-marker ${className}`} style={style}>
      <span className="reel-dot" aria-hidden="true" />
      <span>ACT {String(actNumber).padStart(2, '0')} · {actTitle}</span>
    </div>
  );
}

export function ReelCounter({ reel = 1, scene = 1, take = 1, className = '', style = {} }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s++;
        if (s >= 60) { s = 0; m++; }
        if (m >= 60) { m = 0; h++; }
        if (h >= 24) h = 0;
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={`reel-counter ${className}`} style={style} aria-label="Film reel counter">
      <span style={{ opacity: 0.6 }}>REEL</span>
      <span className="digit">{pad(reel)}</span>
      <span className="sep">:</span>
      <span className="digit">{pad(scene)}</span>
      <span className="sep">:</span>
      <span className="digit">{pad(take)}</span>
      <span style={{ margin: '0 6px', opacity: 0.4 }}>|</span>
      <span style={{ opacity: 0.6 }}>TC</span>
      <span className="digit">{pad(time.h)}</span>
      <span className="sep">:</span>
      <span className="digit">{pad(time.m)}</span>
      <span className="sep">:</span>
      <span className="digit">{pad(time.s)}</span>
    </div>
  );
}
