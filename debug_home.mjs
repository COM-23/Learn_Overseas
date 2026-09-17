import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating to Home page...");
  try {
    await page.goto('http://localhost:4000/', { waitUntil: 'networkidle', timeout: 10000 });
    console.log("Page loaded. Taking screenshot...");
    await page.screenshot({ path: 'home_debug_after_merge.png', fullPage: true });
    
  } catch (e) {
    console.log("Navigation failed or timed out:", e.message);
  }

  await browser.close();
})();
