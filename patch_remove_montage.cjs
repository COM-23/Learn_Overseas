const fs = require('fs');

let wall = fs.readFileSync('src/components/StudentSuccessWall.jsx', 'utf8');
wall = wall.replace(/<CinematicBackgroundMontage \/>/g, "");
fs.writeFileSync('src/components/StudentSuccessWall.jsx', wall);

