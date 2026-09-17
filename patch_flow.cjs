const fs = require('fs');

// 1. Fix Home.jsx background cuts
let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');
home = home.replace(
  "{/* ACT III: The Globe (Global Reach) */}\n        <div style={{ position: 'relative', zIndex: 3, background: '#010103' }}>",
  "{/* ACT III: The Globe (Global Reach) */}\n        <div style={{ position: 'relative', zIndex: 3, background: 'linear-gradient(to bottom, transparent 0%, #010103 25vh, #010103 100%)' }}>"
);
// Make sure Act IV Graduation has transparent background in Home.jsx so the inner fade works
home = home.replace(
  "{/* ACT IV: The Grand Finale (Graduation) */}\n        <div style={{ position: 'relative', zIndex: 4, background: '#010103' }}>",
  "{/* ACT IV: The Grand Finale (Graduation) */}\n        <div style={{ position: 'relative', zIndex: 4, background: 'transparent' }}>"
);
fs.writeFileSync('src/pages/Home.jsx', home);


// 2. Fix GraduationScene.jsx <video> tag for Framer Motion opacity
let gs = fs.readFileSync('src/components/GraduationScene.jsx', 'utf8');
gs = gs.replace(/<video/g, "<motion.video");
gs = gs.replace(/<\/video>/g, "</motion.video>");
// Just in case it was already replaced
gs = gs.replace(/<motion\.motion\.video/g, "<motion.video");
gs = gs.replace(/<\/motion\.motion\.video>/g, "</motion.video>");

fs.writeFileSync('src/components/GraduationScene.jsx', gs);

