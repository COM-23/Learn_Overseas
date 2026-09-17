import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StaggeredText({ text, delay = 0, style = {}, staggerDelay = 0.05, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <span ref={ref} style={{ display: 'inline-block', ...style }} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '0.25em', paddingBottom: '0.1em' }}>
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: delay + (i * staggerDelay), 
              ease: [0.16, 1, 0.3, 1] // Apple-style snappy ease
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
