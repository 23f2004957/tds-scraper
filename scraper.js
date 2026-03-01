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
    console.log(`\n📊 Processing Seed ${35+i}: ${urls[i]}`);
    await page.goto(urls[i], { waitUntil: 'networkidle' });
    
    // Extract ALL numbers from table cells
    const numbers = await page.evaluate(() => {
      const nums = [];
      // Target all table cells containing numbers
      document.querySelectorAll('td, th').forEach(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`✅ Found ${numbers.length} numbers. Page sum: ${pageSum.toLocaleString()}`);
    grandTotal += pageSum;
  }
  
  console.log(`\n🎉 GRAND TOTAL FROM ALL 10 SEED PAGES: ${grandTotal.toLocaleString()}`);
  await browser.close();
})();
