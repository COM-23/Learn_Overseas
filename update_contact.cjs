const fs = require('fs');
const path = '/Users/dishik/Downloads/Internship /Learn Overseas/src/pages/ContactUs.jsx';
let content = fs.readFileSync(path, 'utf8');

const formStartMarker = '{/* Contact Us Form */}';
const mainGridMarker = '{/* Main grid */}';

const formStartIdx = content.indexOf(formStartMarker);
const mainGridIdx = content.indexOf(mainGridMarker);

const formSection = content.substring(formStartIdx, mainGridIdx);
let newContent = content.substring(0, formStartIdx) + content.substring(mainGridIdx);

const mapStartMarker = '{/* Right: Map panel */}';
const mapEndMarker = '          </div>\n\n        </motion.div>\n\n      </div>\n    </div>\n  );\n}';
const mapStartIdx = newContent.indexOf(mapStartMarker);
const mapEndIdx = newContent.indexOf(mapEndMarker);

const finalContent = newContent.substring(0, mapStartIdx) + 
    formSection.trim() + '\n\n' + 
    newContent.substring(mapEndIdx);

let replacedContent = finalContent.replace(
    /gap: 24, background: 'rgba\\(255,255,255,0\\.018\\)',\\n\\s*border: '1px solid rgba\\(255,255,255,0\\.06\\)', borderRadius: 32, padding: '36px',/,
    "gap: 40,"
);

replacedContent = replacedContent.replace(
    /{\/\* Left col \*\/}\n\s*<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>/,
    `{/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 32, padding: '36px' }}>`
);

fs.writeFileSync(path, replacedContent);
console.log("Updated ContactUs.jsx successfully");
