const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5714/about/team');
  await page.waitForTimeout(2000);
  
  await page.click('.team-card');
  await page.waitForTimeout(1000);
  
  const metrics = await page.evaluate(() => {
    // Find the scroll sensor by looking for the 500vh child
    const divs = Array.from(document.querySelectorAll('div'));
    const scrollSensor = divs.find(d => d.style.height === '500vh')?.parentElement;
    
    if (!scrollSensor) return "Not found";
    
    return {
      scrollTop: scrollSensor.scrollTop,
      scrollHeight: scrollSensor.scrollHeight,
      clientHeight: scrollSensor.clientHeight,
      height: scrollSensor.style.height,
      windowScrollY: window.scrollY
    };
  });
  
  console.log(metrics);
  await browser.close();
})();
