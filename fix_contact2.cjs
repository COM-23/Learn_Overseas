const fs = require('fs');
const path = '/Users/dishik/Downloads/Internship /Learn Overseas/src/pages/ContactUs.jsx';
const lines = fs.readFileSync(path, 'utf8').split('\n');

const duplicateStart = lines.findIndex((line, idx) => line.startsWith('import React') && idx > 100);

if (duplicateStart !== -1) {
    const newLines = lines.slice(0, duplicateStart);
    newLines.push('      </div>');
    newLines.push('    </div>');
    newLines.push('  );');
    newLines.push('}');
    fs.writeFileSync(path, newLines.join('\n'));
    console.log("Fixed syntax error");
} else {
    console.error("Could not find duplicate import");
}
