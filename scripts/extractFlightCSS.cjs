const fs = require('fs');
const html = fs.readFileSync('learn-overseas-team-flight-realistic-transition.html', 'utf8');
const match = html.match(/<style>(.*?)<\/style>/s);
if (match) {
  fs.writeFileSync('src/components/FlightTransition.css', match[1]);
  console.log('Extracted CSS successfully.');
} else {
  console.log('CSS not found.');
}
