import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const heroDir = 'assets/hero-sequence';
const files = (await readdir(heroDir)).filter(f => f.endsWith('.png'));

console.log(`Converting ${files.length} hero frames to WebP...`);

for (const file of files) {
  const input = join(heroDir, file);
  const output = join(heroDir, file.replace('.png', '.webp'));
  
  const info = await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  
  const origSize = (await sharp(input).metadata()).size || 0;
  console.log(`  ${file} → ${file.replace('.png', '.webp')} (${(info.size / 1024).toFixed(0)}KB, ${info.width}x${info.height})`);
}

console.log('\nDone! WebP files created alongside originals.');
