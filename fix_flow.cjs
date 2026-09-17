const fs = require('fs');

// 1. Fix JourneyBackground.jsx performance (Remove heavy blurs)
let jb = fs.readFileSync('src/components/JourneyBackground.jsx', 'utf8');
jb = jb.replace(/filter: 'blur\\(10px\\) brightness\\(1\\.2\\)'/g, "filter: 'brightness(1.1)'");
jb = jb.replace(/filter: 'blur\\(0px\\) brightness\\(1\\.0\\)'/g, "filter: 'brightness(1.0)'");
jb = jb.replace(/filter: 'blur\\(10px\\) brightness\\(0\\.8\\)'/g, "filter: 'brightness(0.9)'");
jb = jb.replace(/filter: \{ duration: 2, ease: 'easeInOut' \},/g, "");
fs.writeFileSync('src/components/JourneyBackground.jsx', jb);

// 2. Fix GraduationScene.jsx transition
let gs = fs.readFileSync('src/components/GraduationScene.jsx', 'utf8');
// Give GraduationScene a motion background to fade from JourneyBackground gracefully
gs = gs.replace(
  "export default function GraduationScene() {",
  "export default function GraduationScene() {\n  const fadeBgOpacity = useTransform(useScroll({ target: useRef(null), offset: ['start end', 'start center'] }).scrollYProgress, [0, 1], [0, 1]);"
);

gs = gs.replace(
  "background: '#010103', // Solid background to block out the JourneyBackground",
  "background: 'transparent',"
);

// Add the animated solid background behind the video to fade to black
gs = gs.replace(
  "{/* ── Background Video (Scrubbing) ──────────────────────── */}",
  `<motion.div style={{ position: 'absolute', inset: 0, background: '#010103', opacity: fadeBgOpacity, zIndex: 0 }} />\n        {/* ── Background Video (Scrubbing) ──────────────────────── */}`
);

// Give the video an opacity fade
gs = gs.replace(
  "opacity: 1, // Full opacity",
  "opacity: fadeBgOpacity,"
);

fs.writeFileSync('src/components/GraduationScene.jsx', gs);

