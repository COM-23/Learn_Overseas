const fs = require('fs');
let gs = fs.readFileSync('src/components/GraduationScene.jsx', 'utf8');

// Change the fade so it's fully black and video is visible by 5% of the scroll instead of 25%
gs = gs.replace(
  "const fadeBgOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);",
  "const fadeBgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);"
);

fs.writeFileSync('src/components/GraduationScene.jsx', gs);
