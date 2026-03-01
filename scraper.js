const { chromium } = require('playwright');

(async () => {
  console.log("🚀 Starting table scraper...");
  
  // 10 websites with tables
  const websites = [
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
  
  let allNumbersSum = 0;
  
  // Visit each website
  for (let pageNum = 0; pageNum < websites.length; pageNum++) {
    console.log(`📱 Visiting page ${pageNum + 1}/10`);
    
    const browser = await chromium.launch();
    const browserTab = await browser.newPage();
    await browserTab.goto(websites[pageNum]);
    
    // FIND NUMBERS IN TABLES (magic part!)
    const pageNumbers = await browserTab.evaluate(() => {
      const numbers = [];
      // Look in ALL table cells
      document.querySelectorAll('td, th').forEach(cell => {
        const cellText = cell.textContent.trim();
        const number = parseFloat(cellText);
        if (!isNaN(number)) numbers.push(number);
      });
      return numbers;
    });
    
    // Add up this page's numbers
    const thisPageTotal = pageNumbers.reduce((sum, num) => sum + num, 0);
    allNumbersSum += thisPageTotal;
    
    console.log(`✅ Page ${pageNum + 1}: ${pageNumbers.length} numbers = ${thisPageTotal.toFixed(2)}`);
    await browser.close();
  }
  
  console.log(`🎯 FINAL ANSWER - TOTAL FROM ALL TABLES: ${allNumbersSum.toFixed(2)}`);
})();
