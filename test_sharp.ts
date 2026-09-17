import sharp from 'sharp';
import path from 'path';
(async () => {
  const p = path.join(process.cwd(), 'public/images/products/TS-001.webp');
  const buffer = await sharp(p).resize(400).webp({ quality: 60 }).toBuffer();
  console.log('Resized buffer size:', buffer.length);
})();
