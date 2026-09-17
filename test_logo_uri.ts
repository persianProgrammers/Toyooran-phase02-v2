import path from 'path';
import sharp from 'sharp';
(async () => {
  const p = path.join(process.cwd(), 'public', '/images/logo-wide.png'.replace(/^\/+/, ''));
  try {
    const buffer = await sharp(p)
      .resize(450)
      .jpeg({ quality: 75 })
      .toBuffer();
    console.log(`data:image/jpeg;base64,${buffer.toString('base64').substring(0, 50)}...`);
  } catch (err) {
    console.error(err);
  }
})();
