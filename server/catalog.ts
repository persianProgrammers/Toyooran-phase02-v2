import fs from 'fs/promises';
import { readFileSync } from 'fs';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { PRODUCTS } from '../src/data/productsData';
import { getAdminState } from './auth';

type CatalogProduct = {
  id?: string;
  code?: string;
  name?: string;
  nameEn?: string;
  categoryTitle?: string;
  shortDescription?: string;
  fullDescription?: string;
  image?: string;
  gallery?: string[];
  advantages?: string[];
  applications?: string[];
  specs?: Array<{ label?: string; value?: string }>;
  models?: string[];
};

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function imageToDataUri(imagePath: string | undefined): Promise<string> {
  if (!imagePath) return '';
  const absolute = path.join(process.cwd(), 'public', imagePath.replace(/^\/+/, ''));
  try {
    if (imagePath.includes('logo')) {
      const buffer = await fs.readFile(absolute);
      const ext = path.extname(imagePath).toLowerCase() === '.png' ? 'png' : 'jpeg';
      return `data:image/${ext};base64,${buffer.toString('base64')}`;
    }

    const buffer = await sharp(absolute)
      .resize(450)
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 75 })
      .toBuffer();
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (err) {
    return '';
  }
}

async function getFontDataUri(weight: string): Promise<string> {
  const absolute = path.join(process.cwd(), 'node_modules/@fontsource/estedad/files', `estedad-arabic-${weight}-normal.woff2`);
  try {
    const buffer = await fs.readFile(absolute);
    return `data:font/woff2;charset=utf-8;base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error('Failed to read font:', absolute, err);
    return '';
  }
}

function getProductsForCatalog(): CatalogProduct[] {
  const adminProducts = getAdminState('products');
  return Array.isArray(adminProducts) ? adminProducts : (PRODUCTS as CatalogProduct[]);
}

let cachedPdf: Buffer | null = null;
let cachedHash: string | null = null;
let cachedProductCount: number = 0;
let isGenerating = false;
let generationPromise: Promise<void> | null = null;

function getProductsHash(products: CatalogProduct[]): string {
  return crypto.createHash('md5').update(JSON.stringify(products)).digest('hex');
}

export function triggerBackgroundCatalogGeneration() {
  if (isGenerating) return;
  const products = getProductsForCatalog();
  const currentHash = getProductsHash(products);
  if (cachedPdf && cachedHash === currentHash) return;
  
  isGenerating = true;
  generationPromise = (async () => {
    try {
      console.log('Background catalog generation started...');
      const result = await generatePdfInternal(products);
      cachedPdf = result.pdf;
      cachedProductCount = result.productCount;
      cachedHash = currentHash;
      console.log('Background catalog generation finished successfully.');
    } catch (error) {
      console.error('Background catalog generation failed:', error);
    } finally {
      isGenerating = false;
    }
  })();
}

async function generatePdfInternal(products: CatalogProduct[]): Promise<{ pdf: Buffer; productCount: number }> {
  const html = await buildCatalogHtml(products);
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'toyooran-catalog-'));
  const htmlPath = path.join(tempDir, 'catalog.html');
  try {
    await fs.writeFile(htmlPath, html, 'utf8');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files']
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    await page.setDefaultTimeout(120000);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      timeout: 120000
    });
    await browser.close();
    return { pdf: Buffer.from(pdfUint8Array), productCount: products.length };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
}

export async function generateCatalogPdf(): Promise<{ pdf: Buffer; productCount: number }> {
  const products = getProductsForCatalog();
  const currentHash = getProductsHash(products);
  
  if (cachedPdf && cachedHash === currentHash) {
    return { pdf: cachedPdf, productCount: cachedProductCount };
  }
  
  if (isGenerating && generationPromise) {
    await generationPromise;
    if (cachedPdf && cachedHash === currentHash) {
      return { pdf: cachedPdf, productCount: cachedProductCount };
    }
  }
  
  const result = await generatePdfInternal(products);
  cachedPdf = result.pdf;
  cachedProductCount = result.productCount;
  cachedHash = currentHash;
  return result;
}

function productPage(product: CatalogProduct, imageData: string): string {
  const specs = (product.specs || []).filter(item => item?.label || item?.value);
  const advantages = (product.advantages || []).filter(Boolean);
  const applications = (product.applications || []).filter(Boolean);
  return `
    <section class="page product-page">
      <div class="product-header">
        <div>
          <div class="eyebrow">${escapeHtml(product.categoryTitle || 'محصولات طیوران')}</div>
          <h2>${escapeHtml(product.name || product.code || 'محصول')}</h2>
          <div class="code">کد محصول: ${escapeHtml(product.code || '')}</div>
        </div>
        <div class="brand-mark">TOYOORAN</div>
      </div>
      <div class="product-grid">
        <div class="image-frame">${imageData ? `<img src="${imageData}" alt="${escapeHtml(product.name)}" />` : '<div class="image-missing">تصویر محصول موجود نیست</div>'}</div>
        <div class="summary">
          <h3>معرفی محصول</h3>
          <p>${escapeHtml(product.fullDescription || product.shortDescription || '')}</p>
          ${product.models?.length ? `<div class="models"><strong>مدل‌ها:</strong> ${escapeHtml(product.models.join('، '))}</div>` : ''}
        </div>
      </div>
      ${specs.length ? `<div class="section"><h3>مشخصات فنی</h3><div class="specs">${specs.map(spec => `<div class="spec"><span>${escapeHtml(spec.label)}</span><b>${escapeHtml(spec.value)}</b></div>`).join('')}</div></div>` : ''}
      <div class="two-columns">
        ${advantages.length ? `<div class="section"><h3>ویژگی‌های کلیدی</h3><ul>${advantages.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : ''}
        ${applications.length ? `<div class="section"><h3>کاربردها</h3><ul>${applications.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : ''}
      </div>
      <footer><span>طیوران صنعت پویا</span><span>${escapeHtml(product.code || '')}</span></footer>
    </section>`;
}

async function buildCatalogHtml(products: CatalogProduct[]): Promise<string> {
  const logo = await imageToDataUri('/images/logo-wide.png');
  const font400 = await getFontDataUri('400');
  const font600 = await getFontDataUri('600');
  const font700 = await getFontDataUri('700');
  const font800 = await getFontDataUri('800');
  const categories = [...new Set(products.map(product => product.categoryTitle).filter(Boolean))];
  const toc = products.map((product, index) => `<li><span>${String(index + 1).padStart(3, '۰')} — ${escapeHtml(product.name || product.code)}</span><b>${escapeHtml(product.code)}</b></li>`).join('');
  
  const pagesPromises = products.map(async (product) => {
    const imageData = await imageToDataUri(product.image);
    return productPage(product, imageData);
  });
  
  const pagesHtmlArray = await Promise.all(pagesPromises);
  const pages = pagesHtmlArray.join('');
  
  const fontFaces = `
    @font-face { font-family: 'Estedad'; font-style: normal; font-weight: 400; src: url(${font400}) format('woff2'); }
    @font-face { font-family: 'Estedad'; font-style: normal; font-weight: 600; src: url(${font600}) format('woff2'); }
    @font-face { font-family: 'Estedad'; font-style: normal; font-weight: 700; src: url(${font700}) format('woff2'); }
    @font-face { font-family: 'Estedad'; font-style: normal; font-weight: 800; src: url(${font800}) format('woff2'); }
  `;
  
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><style>
    ${fontFaces}
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #e8edf3; color: #162235; font-family: 'Estedad', Tahoma, Arial, sans-serif; }
    .page { width: 210mm; min-height: 297mm; page-break-after: always; position: relative; overflow: hidden; padding: 18mm 16mm 15mm; background: #fff; }
    .cover { background: linear-gradient(145deg, #082a5d 0%, #0d4d83 58%, #d39b3c 58.2%, #f0c36b 100%); color: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .cover .logo { width: 70mm; max-height: 28mm; object-fit: contain; object-position: right; filter: brightness(0) invert(1); }
    .cover-content { margin-top: 40mm; }
    .cover h1 { font-size: 42px; line-height: 1.25; margin: 0 0 8mm; font-weight: 800; }
    .cover h2 { font-size: 19px; font-weight: 400; margin: 0; opacity: .9; }
    .cover-meta { border-top: 1px solid rgba(255,255,255,.5); padding-top: 5mm; font-size: 13px; display: flex; justify-content: space-between; }
    .toc h1 { color: #0b3d70; font-size: 30px; margin: 0 0 8mm; }
    .toc .intro { color: #65758a; line-height: 1.9; margin-bottom: 6mm; }
    .toc ul { list-style: none; padding: 0; margin: 0; columns: 1; }
    .toc li { display: flex; justify-content: space-between; gap: 8px; padding: 2.5mm 0; border-bottom: 1px solid #e5eaf0; font-size: 11px; }
    .toc li b { color: #0a568e; direction: ltr; white-space: nowrap; }
    .category-list { margin-top: 9mm; padding: 5mm; background: #f3f7fb; border-right: 4px solid #d19b40; line-height: 2; font-size: 12px; }
    .product-page { padding-top: 14mm; }
    .product-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #d7e1eb; padding-bottom: 5mm; }
    .eyebrow { color: #c28a2e; font-size: 11px; margin-bottom: 2mm; }
    h2 { color: #0b3d70; font-size: 22px; margin: 0 0 2mm; line-height: 1.4; }
    .code { color: #66788c; font-size: 11px; direction: ltr; text-align: right; }
    .brand-mark { color: #0b4d83; font-weight: 800; letter-spacing: 1px; font-size: 15px; }
    .product-grid { display: grid; grid-template-columns: 46% 1fr; gap: 9mm; direction: ltr; margin: 8mm 0; align-items: center; }
    .image-frame { height: 73mm; border: 1px solid #e1e8ef; border-radius: 4mm; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .image-frame img { width: 100%; height: 100%; object-fit: contain; }
    .image-missing { color: #9aa8b7; font-size: 11px; text-align: center; }
    .summary { direction: rtl; }
    h3 { color: #0b4d83; font-size: 14px; margin: 0 0 3mm; border-right: 3px solid #d19b40; padding-right: 3mm; }
    p { font-size: 11px; line-height: 2; text-align: justify; margin: 0; color: #34475b; }
    .models { margin-top: 5mm; color: #42576d; font-size: 11px; }
    .section { margin-top: 6mm; }
    .specs { border: 1px solid #dfe7ee; border-radius: 2mm; overflow: hidden; }
    .spec { display: grid; grid-template-columns: 34% 1fr; gap: 3mm; padding: 2.4mm 3mm; font-size: 10px; border-bottom: 1px solid #edf1f5; }
    .spec:last-child { border-bottom: 0; }
    .spec span { color: #66788c; }
    .spec b { color: #263c52; font-weight: 600; }
    .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
    ul { margin: 0; padding: 0 5mm 0 0; color: #34475b; font-size: 10px; line-height: 1.9; }
    li::marker { color: #d19b40; }
    footer { position: absolute; bottom: 8mm; left: 16mm; right: 16mm; display: flex; justify-content: space-between; color: #8b9aaa; font-size: 9px; border-top: 1px solid #e5eaf0; padding-top: 3mm; }
  </style></head><body>
    <section class="page cover"><div>${logo ? `<img class="logo" src="${logo}" alt="Toyooran">` : '<div class="brand-mark" style="color:#fff;font-size:24px">TOYOORAN</div>'}</div><div class="cover-content"><h1>کاتالوگ محصولات</h1><h2>طیوران صنعت پویا</h2><p style="color:#fff;margin-top:8mm;max-width:125mm">راهکارهای تخصصی تجهیزات مرغداری، پرورش طیور و ماشین‌آلات صنعتی</p></div><div class="cover-meta"><span>${products.length} محصول</span><span>نسخه آنلاین و به‌روز</span></div></section>
    <section class="page toc"><h1>فهرست محصولات</h1><p class="intro">این کاتالوگ به‌صورت خودکار از آخرین اطلاعات ثبت‌شده در وب‌سایت تولید شده است.</p><ul>${toc}</ul><div class="category-list"><strong>دسته‌بندی‌ها:</strong> ${categories.map(escapeHtml).join('، ')}</div><footer><span>طیوران صنعت پویا</span><span>فهرست محصولات</span></footer></section>
    ${pages}
  </body></html>`;
}

export function catalogFilename(): string {
  return `toyooran-catalog-${new Date().toISOString().slice(0, 10)}.pdf`;
}

export const catalogTemplateSource = 'digital-catalog.zip structure + current website products';
