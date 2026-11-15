// Run from the FRONTEND project root:  node scripts/optimize-images.mjs
// Requires:  npm i -D sharp
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'src/assets'
const OUT = 'src/assets/optimized'

// Hero panels are half the screen on desktop (~960px) and full width on mobile,
// so 640 / 960 / 1440 covers phones, laptops and retina without shipping 4000px photos.
const JOBS = [
  { file: 'Flaws-extra.jpeg',    name: 'flaws-extra',     widths: [640, 960, 1440], quality: 75 },
  { file: 'main-collection.jpg', name: 'main-collection', widths: [640, 960, 1440], quality: 75 },
  { file: 'img-2.jpeg',          name: 'newsletter',      widths: [640, 960],       quality: 75 },
  // Logo is displayed at ~240px; keep quality higher so edges stay crisp. WebP keeps transparency.
  { file: 'flaws-logo.png',      name: 'flaws-logo',      widths: [240, 480],       quality: 85 },
]

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

await mkdir(OUT, { recursive: true })

for (const job of JOBS) {
  const input = path.join(SRC, job.file)
  let originalSize
  try {
    originalSize = (await stat(input)).size
  } catch {
    console.warn(`not found: ${input}`)
    continue
  }
  console.log(`\n${job.file} (${kb(originalSize)})`)

  for (const w of job.widths) {
    const out = path.join(OUT, `${job.name}-${w}.webp`)
    await sharp(input)
      .rotate() // respect EXIF orientation
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(out)
    console.log(`  wrote ${out} (${kb((await stat(out)).size)})`)
  }
}

console.log('\nDone.')
