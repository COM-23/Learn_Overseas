const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  
  // Get text content of hero container
  const heroHtml = await page.evaluate(() => {
    const hero = document.querySelector('.home-hero-container');
    if (!hero) return 'NO HERO';
    return hero.outerHTML;
  });
  
  console.log(heroHtml);
  await browser.close();
})();
