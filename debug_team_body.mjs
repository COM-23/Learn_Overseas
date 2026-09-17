import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4000/about/team/kunal-shah', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(4000);
  
  const content = await page.innerHTML('body');
  console.log("BODY HTML:", content.substring(0, 1500));
  
  await browser.close();
})();
