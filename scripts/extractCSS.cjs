const fs = require('fs');
const html = fs.readFileSync('contact-us_1.html', 'utf8');
const match = html.match(/<style>(.*?)<\/style>/s);
if (match) {
  fs.writeFileSync('src/pages/ContactUs.css', match[1]);
  console.log('Extracted CSS successfully.');
} else {
  console.log('CSS not found.');
}
