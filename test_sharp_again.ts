import sharp from 'sharp';
import path from 'path';
(async () => {
  const p = path.join(process.cwd(), 'public/images/products/TS-001.webp');
  const buffer = await sharp(p).resize(250).webp({ quality: 40 }).toBuffer();
  console.log('Resized buffer size:', buffer.length);
})();
