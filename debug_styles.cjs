const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5714/about/team');
  await page.waitForTimeout(2000);
  
  await page.click('.team-card');
  await page.waitForTimeout(2000);
  
  const styles = await page.evaluate(() => {
    // Find Kunal Shah text
    const h1s = Array.from(document.querySelectorAll('h1'));
    const targetH1 = h1s.find(h1 => h1.textContent.includes('Kunal'));
    if (!targetH1) return "Kunal not found";
    
    let current = targetH1;
    let path = [];
    while (current && current !== document.body) {
      path.push({
        tag: current.tagName,
        className: current.className,
        style: current.getAttribute('style'),
        opacity: window.getComputedStyle(current).opacity,
        transform: window.getComputedStyle(current).transform,
        display: window.getComputedStyle(current).display,
        zIndex: window.getComputedStyle(current).zIndex
      });
      current = current.parentElement;
    }
    return path;
  });
  
  console.log(JSON.stringify(styles, null, 2));
  await browser.close();
})();
