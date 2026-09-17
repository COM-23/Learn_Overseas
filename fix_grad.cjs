const fs = require('fs');

let gs = fs.readFileSync('src/components/GraduationScene.jsx', 'utf8');

gs = gs.replace(
  /<motion\.div style=\{\{ position: 'absolute', inset: 0, background: '#010103', opacity: 1, zIndex: 0 \}\} \/>/,
  `<motion.div style={{ position: 'absolute', inset: 0, background: '#010103', opacity: fadeBgOpacity, zIndex: 0 }} />`
);

gs = gs.replace(
  /<motion\.div style=\{\{ position: 'absolute', inset: 0, opacity: 1, zIndex: 1 \}\}>/,
  `<motion.div style={{ position: 'absolute', inset: 0, opacity: fadeBgOpacity, zIndex: 1 }}>`
);

fs.writeFileSync('src/components/GraduationScene.jsx', gs);

