import { readFileSync } from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { PRODUCTS } from './src/data/productsData';

function imageToDataUri(imagePath: string | undefined): string {
  if (!imagePath) return '';
  const absolute = path.join(process.cwd(), 'public', imagePath.replace(/^\/+/, ''));
  try {
    const buffer = readFileSync(absolute);
    const ext = path.extname(absolute).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp';
    return `data:${mime};base64,${buffer.toString('base64')}`;
  } catch (e) {
    return '';
  }
}

async function run() {
  console.time('Generate HTML');
  const products = PRODUCTS;
  let html = '<html><body>';
  for (const p of products) {
    html += `<img src="${imageToDataUri(p.image)}" width="200" />`;
  }
  html += '</body></html>';
  console.timeEnd('Generate HTML');

  console.time('Puppeteer');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  console.timeEnd('Puppeteer');
  console.log('PDF Size:', pdf.length);
}
run();
