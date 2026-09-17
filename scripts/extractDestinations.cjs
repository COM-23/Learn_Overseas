const fs = require('fs');
const html = fs.readFileSync('StudyDashboard_With_Borders (1).html', 'utf8');
const match = html.match(/const data = (\[.*?\]);/s);
if (match) {
  fs.writeFileSync('src/data/destinations.js', 'export const DESTINATIONS = ' + match[1] + ';\n');
  console.log('Extracted DESTINATIONS successfully.');
} else {
  console.log('DESTINATIONS not found.');
}
