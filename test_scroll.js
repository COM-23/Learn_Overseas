import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  
  // Wait for the container to load
  await page.waitForSelector('.hero-ui');
  
  const getInfo = async (scroll) => {
    await page.evaluate((y) => window.scrollTo(0, y), scroll);
    await page.waitForTimeout(500); // let framer motion update
    
    return await page.evaluate(() => {
      const plane = document.querySelector('img[alt="Airplane"]');
      const metrics = Array.from(document.querySelectorAll('.glass-panel'));
      return {
        plane: plane ? {
          opacity: window.getComputedStyle(plane.parentElement).opacity,
          transform: window.getComputedStyle(plane.parentElement).transform,
          display: window.getComputedStyle(plane.parentElement).display,
        } : null,
        metrics: metrics.map(m => ({
          text: m.innerText.replace(/\n/g, ' '),
          opacity: window.getComputedStyle(m.parentElement).opacity
        }))
      };
    });
  };

  console.log("Scroll 0:", await getInfo(0));
  console.log("Scroll 200:", await getInfo(200));
  console.log("Scroll 400:", await getInfo(400));
  console.log("Scroll 600:", await getInfo(600));

  await browser.close();
})();
