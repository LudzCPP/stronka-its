import sharp from 'sharp'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const W = 1200
const H = 630

// SVG overlay: ciemna warstwa + gradient + tekst
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#080b14" stop-opacity="0.55"/>
      <stop offset="45%"  stop-color="#080b14" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#080b14" stop-opacity="0.92"/>
    </linearGradient>
    <linearGradient id="leftfade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#080b14" stop-opacity="0.7"/>
      <stop offset="60%"  stop-color="#080b14" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Bazowa ciemna warstwa -->
  <rect width="${W}" height="${H}" fill="#080b14" opacity="0.62"/>
  <!-- Gradient pionowy -->
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <!-- Gradient lewy (strefa tekstu) -->
  <rect width="700" height="${H}" fill="url(#leftfade)"/>

  <!-- Akcent blue - pionowa kreska -->
  <rect x="60" y="255" width="4" height="120" rx="2" fill="#0075C4"/>

  <!-- Eyebrow: lokalizacja -->
  <text x="82" y="285"
    font-family="Segoe UI, Arial, Helvetica, sans-serif"
    font-size="14" font-weight="700" letter-spacing="5"
    fill="#0075C4">&#x141;&#xD3;D&#x179;  UL. &#x15A;NIE&#x17B;NA 5</text>

  <!-- Główny tytuł -->
  <text x="82" y="348"
    font-family="Segoe UI Black, Segoe UI, Arial, Helvetica, sans-serif"
    font-size="54" font-weight="900"
    fill="white">Instytut Tenisa</text>
  <text x="82" y="414"
    font-family="Segoe UI Black, Segoe UI, Arial, Helvetica, sans-serif"
    font-size="54" font-weight="900"
    fill="white">Sto&#x142;owego</text>

  <!-- Podtytuł -->
  <text x="82" y="455"
    font-family="Segoe UI, Arial, Helvetica, sans-serif"
    font-size="22" fill="#94a3b8">Profesjonalna sala ping-ponga w &#x141;odzi</text>

  <!-- Dolny pasek -->
  <rect x="0" y="555" width="${W}" height="75" fill="#0075C4" opacity="0.12"/>
  <rect x="0" y="555" width="${W}" height="2" fill="#0075C4" opacity="0.6"/>

  <!-- Lewy tekst dolnego paska -->
  <text x="60" y="601"
    font-family="Segoe UI, Arial, Helvetica, sans-serif"
    font-size="18" fill="#cbd5e1">
    Czynne 6:00-24:00  |  Rezerwacje: its.nakiedy.pl  |  533 644 535
  </text>

  <!-- Prawa strona dolnego paska -->
  <text x="${W - 60}" y="601"
    font-family="Segoe UI, Arial, Helvetica, sans-serif"
    font-size="18" font-weight="700" text-anchor="end"
    fill="#0075C4">gramnaits.pl</text>
</svg>`

// Zmień rozmiar logo do wbudowania
const logoBuffer = await sharp(resolve(root, 'src/assets/its_logo-removebg-preview.png'))
  .resize(148, 148, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

await sharp(resolve(root, 'src/assets/its1.jpg'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([
    { input: Buffer.from(svg), blend: 'over' },
    { input: logoBuffer, top: 55, left: 60, blend: 'over' },
  ])
  .jpeg({ quality: 92 })
  .toFile(resolve(root, 'public/og-image.jpg'))

console.log('Gotowe: public/og-image.jpg')
