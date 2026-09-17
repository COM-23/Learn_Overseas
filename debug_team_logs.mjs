import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating...");
  await page.goto('http://localhost:4000/about/team/kunal-shah', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
