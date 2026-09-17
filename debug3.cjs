const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5714/about/team');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'screenshot3.png' });
  const html = await page.content();
  fs.writeFileSync('dom3.html', html);
  
  console.log("Screenshot before click saved.");
  await browser.close();
})();
