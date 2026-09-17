import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4000/about/team/kunal-shah', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(4000);
  
  console.log("FINAL URL:", page.url());
  
  await browser.close();
})();
