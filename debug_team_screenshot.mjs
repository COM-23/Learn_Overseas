import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4000/about/team/kunal-shah', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'team_black_screen.png' });
  await browser.close();
})();
