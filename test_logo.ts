import path from 'path';
import sharp from 'sharp';
(async () => {
  const p = path.join(process.cwd(), 'public/images/logo-wide.png');
  try {
    const meta = await sharp(p).metadata();
    console.log(meta);
  } catch (err) {
    console.error(err);
  }
})();
