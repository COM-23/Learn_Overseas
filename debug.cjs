const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:5714/about/team');
  await page.waitForTimeout(2000);
  
  await page.click('.team-card');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'screenshot2.png' });
  const html = await page.content();
  fs.writeFileSync('dom2.html', html);
  
  console.log("Screenshot and DOM saved.");
  await browser.close();
})();
