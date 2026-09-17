const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.jsx'));

const newBg = `<div style={{ position: 'relative', background: '#020205', minHeight: '100vh', overflow: 'hidden' }}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(249, 212, 64, 0.05) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(125, 193, 177, 0.05) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}`;

for (const file of files) {
  const filePath = path.join(PAGES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Basic replacement for flat #020205 backgrounds
  if (content.includes(`<div style={{ background: '#020205'`)) {
     // This handles most cases but we have to close the div at the bottom
     // Since that's complicated to regex, we can just replace the opening tag and leave the closing tag alone? No, we opened an extra <div zIndex:1>. 
     // We need to inject the background elements without adding an extra wrapper if possible, or close it properly.
  }
}
