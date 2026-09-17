import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);
  
  const scrollData = await page.evaluate(async () => {
      let results = [];
      const metric = document.querySelector('div[style*="top: 15%"]');
      for (let s = 0; s <= 500; s += 100) {
          window.scrollTo(0, s);
          await new Promise(r => setTimeout(r, 200));
          // Unfortunately we can't easily extract scrollYProgress from Framer Motion
          // But we can get the element's top position or something.
          // Let's get the container top position relative to viewport.
          const container = metric.closest('div[style*="height: 200vh"]');
          const rect = container.getBoundingClientRect();
          results.push({
              scroll: s,
              top: rect.top,
              height: rect.height,
              windowHeight: window.innerHeight,
              scrollYProgress: -rect.top / rect.height
          });
      }
      return results;
  });
  console.log(scrollData);

  await browser.close();
})();
