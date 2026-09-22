const fs = require('fs');
const file = '/Users/dishik/Downloads/Internship /Learn Overseas/src/components/GlobeScene.jsx';
let content = fs.readFileSync(file, 'utf8');

const target = `globeRef.current.pointOfView({ lat: 20, lng: 70, altitude: 2.6 }, 2000);`;
const replacement = `const ratio = window.innerWidth / window.innerHeight;
        // Base altitude 2.6 is optimized for 16:9 widescreen (ratio ~1.77).
        // If the screen is taller (like 16:10 MacBooks or Safari vs Chrome UI differences), 
        // the globe renders too large physically. We calculate a dynamic altitude to compensate.
        const dynamicAltitude = ratio < 1.77 ? 2.6 * (1.77 / ratio) : 2.6;
        globeRef.current.pointOfView({ lat: 20, lng: 70, altitude: dynamicAltitude }, 2000);`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Updated GlobeScene.jsx");
