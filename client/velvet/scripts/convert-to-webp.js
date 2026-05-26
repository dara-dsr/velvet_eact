const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '../public/photos');
const ICONS_DIR = path.join(__dirname, '../public/icons');
const AVATARS_DIR = path.join(__dirname, '../public/avatars');

async function convertDir(dir, maxWidth) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    const src = path.join(dir, file);
    const dest = path.join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    const srcStat = fs.statSync(src);
    let pipeline = sharp(src);
    if (maxWidth) pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    await pipeline.webp({ quality: 82 }).toFile(dest);
    const destStat = fs.statSync(dest);
    const saved = (((srcStat.size - destStat.size) / srcStat.size) * 100).toFixed(1);
    console.log(`${file} → ${path.basename(dest)}  ${(srcStat.size / 1024).toFixed(0)}KB → ${(destStat.size / 1024).toFixed(0)}KB  (-${saved}%)`);
  }
}

(async () => {
  console.log('=== /photos (max 1400px) ===');
  await convertDir(PHOTOS_DIR, 1400);
  console.log('=== /icons ===');
  await convertDir(ICONS_DIR, null);
  console.log('=== /avatars (max 400px) ===');
  await convertDir(AVATARS_DIR, 400);
  console.log('Done.');
})();
