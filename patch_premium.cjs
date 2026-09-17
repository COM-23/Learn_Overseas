const fs = require('fs');
let wall = fs.readFileSync('src/components/StudentSuccessWall.jsx', 'utf8');

const cinematicOverlay = `
      {/* Premium Cinematic Darkening Overlay for Text Readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(2,2,5,0.2) 0%, rgba(2,2,5,0.85) 10%, rgba(2,2,5,0.95) 20%, rgba(2,2,5,0.95) 80%, rgba(2,2,5,0.85) 90%, rgba(2,2,5,0.2) 100%)', pointerEvents: 'none', zIndex: 1 }} />
`;

wall = wall.replace(
  "{/* Dynamic Cursor Spotlight */}",
  cinematicOverlay + "\n      {/* Dynamic Cursor Spotlight */}"
);

fs.writeFileSync('src/components/StudentSuccessWall.jsx', wall);

