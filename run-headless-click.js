const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const outDir = './tmp-headless';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    const text = `${msg.type().toUpperCase()}: ${msg.text()}`;
    consoleLogs.push(text);
    console.log(text);
  });

  page.on('pageerror', err => {
    const text = `PAGEERROR: ${err.toString()}`;
    consoleLogs.push(text);
    console.error(text);
  });

  page.on('response', res => {
    const url = res.url();
    if (url.includes('/api/')) {
      console.log(`RESPONSE ${res.status()} ${url}`);
    }
  });

  try {
    console.log('Opening http://localhost:5000');
    await page.goto('http://localhost:5000', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the transcript list items to appear
    await page.waitForSelector('.transcript-item', { timeout: 10000 });
    console.log('Found transcript items, clicking the first one');

    // Click the first transcript item
    await page.click('.transcript-item');

    // Wait a bit for UI updates and potential errors
    await page.waitForTimeout(3000);

    // Capture screenshot
    const screenshotPath = `${outDir}/after-click.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);

    // Save console logs
    fs.writeFileSync(`${outDir}/console.log`, consoleLogs.join('\n\n'));
    console.log(`Saved console logs: ${outDir}/console.log`);
  } catch (err) {
    console.error('Test script error:', err);
  } finally {
    await browser.close();
  }
})();
