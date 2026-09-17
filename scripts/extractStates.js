const fs = require('fs');
const html = fs.readFileSync('contact-us_1.html', 'utf8');
const match = html.match(/var STATE_DATA = (\[.*?\]);/s);
if (match) {
  fs.writeFileSync('src/data/indiaStates.js', 'export const STATE_DATA = ' + match[1] + ';\n');
  console.log('Extracted STATE_DATA successfully.');
} else {
  console.log('STATE_DATA not found.');
}
