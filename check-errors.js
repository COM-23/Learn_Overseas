import { chromium, webkit } from 'playwright';

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`PAGE ERROR: ${msg.text()}`);
    } else {
      console.log(`PAGE LOG: ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`PAGE EXCEPTION: ${error.message}`);
  });

  try {
    console.log("Navigating...");
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    console.log("Loaded successfully.");
  } catch (err) {
    console.error("Navigation failed:", err);
  }

  await browser.close();
})();
