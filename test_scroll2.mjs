import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);
  
  const scrollData = await page.evaluate(async () => {
      let results = [];
      const plane = document.querySelector('img[alt="Airplane"]').parentElement;
      for (let s = 0; s <= 800; s += 100) {
          window.scrollTo(0, s);
          await new Promise(r => setTimeout(r, 500));
          results.push({
              scroll: s,
              opacity: window.getComputedStyle(plane).opacity,
              transform: window.getComputedStyle(plane).transform
          });
      }
      return results;
  });
  console.log(scrollData);

  await browser.close();
})();
