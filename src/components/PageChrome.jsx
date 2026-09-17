import React from 'react';

export default function PageChrome() {
  return (
    <>
      {/* Light Noise Overlay for Texture */}
      <div style={{
        position: 'fixed', 
        inset: 0, 
        zIndex: 8800, 
        pointerEvents: 'none',
        /* Removed global film grain for performance */
        mixBlendMode: 'multiply', 
        opacity: 0.8
      }} />
    </>
  );
}
