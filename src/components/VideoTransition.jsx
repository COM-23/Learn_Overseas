import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoTransition({ show, onComplete }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (show && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video play failed', e));
    }
  }, [show]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            background: '#020205',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <video
            ref={videoRef}
            src="/IMG_9012.MOV"
            muted
            playsInline
            onEnded={onComplete}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.15)',
              mixBlendMode: 'screen' // Attempts to key out black backgrounds
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
