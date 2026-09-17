const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:5714/about/team/kunal-shah', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const content = await page.content();
  console.log("DOM LENGTH:", content.length);
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML.substring(0, 500));
  console.log("ROOT HTML:\n", rootHtml);
  
  await page.screenshot({ path: 'team_debug.png' });
  
  await browser.close();
})();
