const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=35',
    'https://sanand0.github.io/tdsdata/js_table/?seed=36',
    'https://sanand0.github.io/tdsdata/js_table/?seed=37',
    'https://sanand0.github.io/tdsdata/js_table/?seed=38',
    'https://sanand0.github.io/tdsdata/js_table/?seed=39',
    'https://sanand0.github.io/tdsdata/js_table/?seed=40',
    'https://sanand0.github.io/tdsdata/js_table/?seed=41',
    'https://sanand0.github.io/tdsdata/js_table/?seed=42',
    'https://sanand0.github.io/tdsdata/js_table/?seed=43',
    'https://sanand0.github.io/tdsdata/js_table/?seed=44'
  ];
  
  let grandTotal = 0;
  
  for (let i = 0; i < urls.length; i++) {
    console.log(`📱 Visiting page ${i+1}/10`);
    await page.goto(urls[i], { waitUntil: 'networkidle' });
    
    // Find ALL numbers in ALL table cells
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('td, th').forEach(cell => {
        const num = parseFloat(cell.textContent);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageTotal = numbers.reduce((sum, n) => sum + n, 0);
    grandTotal += pageTotal;
    console.log(`✅ Page ${i+1}: ${numbers.length} numbers = ${pageTotal.toFixed(2)}`);
  }
  
  console.log(`🎯 GRAND TOTAL FROM ALL TABLES: ${grandTotal.toFixed(2)}`);
  await browser.close();
})();
