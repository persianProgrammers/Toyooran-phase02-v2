import sharp from 'sharp';
import path from 'path';
(async () => {
  const p = path.join(process.cwd(), 'public/images/products/TS-001.webp');
  const buffer1 = await sharp(p).resize(400).webp({ quality: 60 }).toBuffer();
  console.log('Old size (bytes):', buffer1.length);
  const buffer2 = await sharp(p).resize(200).webp({ quality: 35 }).toBuffer();
  console.log('New size (bytes):', buffer2.length);
})();
