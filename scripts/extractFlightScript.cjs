const fs = require('fs');
const html = fs.readFileSync('learn-overseas-team-flight-realistic-transition.html', 'utf8');

// There are multiple script tags, the second one has the base64 and the three.js logic
// Wait, the three.js module is imported via importmap in a module script? No, wait.
// Let's find the script containing 'window.ASSET_PLANE_GLB_B64'
const scriptStartStr = '<script>';
const scriptEndStr = '</script>';

const startIndex = html.indexOf('window.ASSET_PLANE_GLB_B64 =');
if (startIndex !== -1) {
  const actualStart = html.lastIndexOf('<script', startIndex);
  const startTagEnd = html.indexOf('>', actualStart) + 1;
  const actualEnd = html.indexOf('</script>', startTagEnd);
  
  if (actualEnd !== -1) {
    const scriptContent = html.substring(startTagEnd, actualEnd);
    fs.writeFileSync('src/utils/flightScriptData.js', scriptContent);
    console.log('Extracted Script successfully.');
  } else {
    console.log('Script end not found.');
  }
} else {
  console.log('Base64 not found.');
}
