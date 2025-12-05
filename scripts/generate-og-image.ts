import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOGImage() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2
  });
  
  console.log('Navigating to page...');
  await page.goto('http://localhost:5000', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  await page.waitForSelector('[data-testid="text-hero-title"]');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Taking screenshot...');
  const screenshot = await page.screenshot({
    type: 'png',
    fullPage: false
  });
  
  await browser.close();
  
  console.log('Processing image...');
  const metadata = await sharp(screenshot).metadata();
  const cropHeight = Math.round((metadata.height || 844) * 0.4);
  
  await sharp(screenshot)
    .extract({
      left: 0,
      top: 0,
      width: metadata.width || 780,
      height: cropHeight
    })
    .resize(1200, 630, {
      fit: 'cover',
      position: 'top'
    })
    .toFile(path.join(process.cwd(), 'client/public/og-image.png'));
  
  console.log('OG image saved to client/public/og-image.png');
}

async function generateFavicon() {
  console.log('Generating favicon...');
  
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#d946ef"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#grad)"/>
  <g transform="translate(8, 8)" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </g>
</svg>`;

  fs.writeFileSync(
    path.join(process.cwd(), 'client/public/favicon.svg'),
    svgFavicon
  );
  
  await sharp(Buffer.from(svgFavicon))
    .resize(32, 32)
    .png()
    .toFile(path.join(process.cwd(), 'client/public/favicon.png'));
  
  await sharp(Buffer.from(svgFavicon))
    .resize(180, 180)
    .png()
    .toFile(path.join(process.cwd(), 'client/public/apple-touch-icon.png'));
  
  await sharp(Buffer.from(svgFavicon))
    .resize(192, 192)
    .png()
    .toFile(path.join(process.cwd(), 'client/public/android-chrome-192x192.png'));
  
  await sharp(Buffer.from(svgFavicon))
    .resize(512, 512)
    .png()
    .toFile(path.join(process.cwd(), 'client/public/android-chrome-512x512.png'));
  
  console.log('Favicon files generated!');
}

async function main() {
  try {
    await generateFavicon();
    await generateOGImage();
    console.log('All assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

main();
