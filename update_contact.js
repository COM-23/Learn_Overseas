const fs = require('fs');
const path = '/Users/dishik/Downloads/Internship /Learn Overseas/src/pages/ContactUs.jsx';
let content = fs.readFileSync(path, 'utf8');

// We want to extract the form section and put it after the Find Us card
// The form section is from:
// {/* Contact Us Form */}
// down to:
// </motion.div>
// right before:
// {/* Main grid */}

const formStartMarker = '{/* Contact Us Form */}';
const mainGridMarker = '{/* Main grid */}';

const formStartIdx = content.indexOf(formStartMarker);
const mainGridIdx = content.indexOf(mainGridMarker);

if (formStartIdx === -1 || mainGridIdx === -1) {
    console.error("Could not find markers");
    process.exit(1);
}

const formSection = content.substring(formStartIdx, mainGridIdx);

// Now remove the form section from its original place
let newContent = content.substring(0, formStartIdx) + content.substring(mainGridIdx);

// Now find the Map Panel and replace it with the form section
const mapStartMarker = '{/* Right: Map panel */}';
const mapEndMarker = '          </div>\n\n        </motion.div>\n\n      </div>\n    </div>\n  );\n}';
const mapStartIdx = newContent.indexOf(mapStartMarker);
const mapEndIdx = newContent.indexOf(mapEndMarker);

if (mapStartIdx === -1 || mapEndIdx === -1) {
    console.error("Could not find map markers");
    process.exit(1);
}

// Build the final content
const finalContent = newContent.substring(0, mapStartIdx) + 
    formSection.trim() + '\n\n' + 
    newContent.substring(mapEndIdx);

// Wait, we need to adjust the grid container.
// The container is:
/*
        {/* Main grid *\/}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="contact-main-grid"
          style={{
            display: 'grid', gridTemplateColumns: 'minmax(300px,1fr) minmax(340px,1.45fr)',
            gap: 24, background: 'rgba(255,255,255,0.018)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: 32, padding: '36px',
          }}>
*/

// Let's modify the grid container to not have the background and border, and apply them to the left column instead.
let replacedContent = finalContent.replace(
    /gap: 24, background: 'rgba\(255,255,255,0\.018\)',\n\s*border: '1px solid rgba\(255,255,255,0\.06\)', borderRadius: 32, padding: '36px',/,
    "gap: 40,"
);

// Add the background to the left col
replacedContent = replacedContent.replace(
    /{?\/\* Left col \*\/}?/,
    `{/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 32, padding: '36px' }}>`
);

// We should also remove the div wrapping the Left col since we just added one. 
// The original was:
// {/* Left col */}
// <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
replacedContent = replacedContent.replace(
    /<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>/,
    ''
);


fs.writeFileSync(path, replacedContent);
console.log("Updated ContactUs.jsx successfully");
