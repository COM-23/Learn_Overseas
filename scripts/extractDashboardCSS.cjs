const fs = require('fs');
const html = fs.readFileSync('StudyDashboard_With_Borders (1).html', 'utf8');
const match = html.match(/<style>(.*?)<\/style>/s);
if (match) {
  fs.writeFileSync('src/components/DestinationsDashboard.css', match[1]);
  console.log('Extracted CSS successfully.');
} else {
  console.log('CSS not found.');
}
