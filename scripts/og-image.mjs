// Generise Open Graph sliku 1200x630 (public/assets/og-image.jpg).
//
//   node scripts/og-image.mjs [--src <putanja>] [--position attention|centre|top] [--out <putanja>]
//
// Podrazumevano upisuje kandidata, ne konacnu sliku, da se krop moze
// pogledati pre nego sto ode u produkciju. Za produkcijsku sliku:
//
//   node scripts/og-image.mjs --out public/assets/og-image.jpg
//
// TREBA ZAMENITI IZVOR. Trenutni springs.jpg je 540x960, ispod idealne
// rezolucije: krop uzima punu sirinu od 540px i naduvava je ~2.2x do
// 1200px. Na WhatsApp preview-u (~300px) to se ne vidi, ali Facebook i
// LinkedIn renderuju punih 1200px i slika ce tamo izgledati meko.
// Kada se nabavi original te scene u vecoj rezoluciji, zameniti izvor
// i pregenerisati.

import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const source = argValue("src", "public/assets/springs.jpg");
const position = argValue("position", "centre");
const out = argValue("out", "public/assets/og-image-candidate.jpg");

const POSITIONS = ["attention", "centre", "top"];
if (!POSITIONS.includes(position)) {
  console.error(`Nepoznat position: ${position}. Koristi ${POSITIONS.join(", ")}.`);
  process.exit(1);
}

const meta = await sharp(source).metadata();
if (meta.width < WIDTH) {
  console.warn(
    `Upozorenje: ${source} je ${meta.width}x${meta.height}, uzi od ${WIDTH}px — slika se naduvava.`
  );
}

const info = await sharp(source)
  .resize(WIDTH, HEIGHT, {
    fit: "cover",
    position: position === "attention" ? sharp.strategy.attention : position,
  })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(out);

console.log(`${source} -> ${out}`);
console.log(`  ${info.width}x${info.height}, position: ${position}, ${(info.size / 1024).toFixed(1)} KB`);
