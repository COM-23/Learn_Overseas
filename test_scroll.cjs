const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => {
    if (msg.text().includes('SCROLL_PROGRESS_')) {
      console.log(msg.text());
    }
  });
  
  await page.goto('http://localhost:5714/about/team');
  await page.waitForTimeout(2000);
  
  await page.click('.team-card');
  await page.waitForTimeout(3000);
  
  await browser.close();
})();
