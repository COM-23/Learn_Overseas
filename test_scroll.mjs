import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating to Home page...");
  try {
    await page.goto('http://localhost:4000/', { waitUntil: 'networkidle', timeout: 10000 });
    console.log("Page loaded. Checking console for errors...");
    
    // Check scroll height
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log("Body Scroll Height:", scrollHeight);
    
    // Simulate scroll to trigger animations
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000);
    
    const elements = await page.evaluate(() => {
      return {
        homeHeight: document.querySelector('.destinations-dashboard')?.style.height,
      }
    });
    console.log("Elements:", elements);

  } catch (e) {
    console.log("Navigation failed or timed out:", e.message);
  }

  await browser.close();
})();
