import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating to Team member page...");
  try {
    await page.goto('http://localhost:4000/about/team/kunal-shah', { waitUntil: 'networkidle', timeout: 10000 });
    console.log("Page loaded. Taking screenshot...");
    await page.screenshot({ path: 'team_working.png' });
    
    // Check if React error overlay is present
    const errorOverlay = await page.$('iframe');
    if (errorOverlay) {
        console.log("React Error Overlay found!");
    }
  } catch (e) {
    console.log("Navigation failed or timed out:", e.message);
  }

  await browser.close();
})();
