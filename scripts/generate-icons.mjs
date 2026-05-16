import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const iconsDir = join(publicDir, "icons");
mkdirSync(iconsDir, { recursive: true });

// Drone SVG illustration (quadcopter, top-down view)
function makeSvg(size) {
  const s = size;
  const c = s / 2;
  const scale = s / 512;

  // Colors
  const body = "#1E40AF";      // blue body
  const arm = "#1D4ED8";
  const motor = "#1E3A8A";
  const prop = "#93C5FD";      // light blue propellers
  const propShadow = "#60A5FA";
  const lens = "#BFDBFE";
  const bg = "#0F172A";        // dark navy background

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </radialGradient>
    <radialGradient id="propGrad" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#BFDBFE"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background circle -->
  <circle cx="256" cy="256" r="256" fill="url(#bg)"/>

  <!-- Propeller blur rings (spinning effect) -->
  <ellipse cx="148" cy="148" rx="88" ry="20" fill="${prop}" opacity="0.15" transform="rotate(-35 148 148)"/>
  <ellipse cx="148" cy="148" rx="88" ry="20" fill="${prop}" opacity="0.12" transform="rotate(55 148 148)"/>

  <ellipse cx="364" cy="148" rx="88" ry="20" fill="${prop}" opacity="0.15" transform="rotate(35 364 148)"/>
  <ellipse cx="364" cy="148" rx="88" ry="20" fill="${prop}" opacity="0.12" transform="rotate(-55 364 148)"/>

  <ellipse cx="148" cy="364" rx="88" ry="20" fill="${prop}" opacity="0.15" transform="rotate(35 148 364)"/>
  <ellipse cx="148" cy="364" rx="88" ry="20" fill="${prop}" opacity="0.12" transform="rotate(-55 148 364)"/>

  <ellipse cx="364" cy="364" rx="88" ry="20" fill="${prop}" opacity="0.15" transform="rotate(-35 364 364)"/>
  <ellipse cx="364" cy="364" rx="88" ry="20" fill="${prop}" opacity="0.12" transform="rotate(55 364 364)"/>

  <!-- Arms -->
  <line x1="200" y1="200" x2="148" y2="148" stroke="${arm}" stroke-width="22" stroke-linecap="round" filter="url(#shadow)"/>
  <line x1="312" y1="200" x2="364" y2="148" stroke="${arm}" stroke-width="22" stroke-linecap="round" filter="url(#shadow)"/>
  <line x1="200" y1="312" x2="148" y2="364" stroke="${arm}" stroke-width="22" stroke-linecap="round" filter="url(#shadow)"/>
  <line x1="312" y1="312" x2="364" y2="364" stroke="${arm}" stroke-width="22" stroke-linecap="round" filter="url(#shadow)"/>

  <!-- Motor housings -->
  <circle cx="148" cy="148" r="36" fill="${motor}" filter="url(#shadow)"/>
  <circle cx="364" cy="148" r="36" fill="${motor}" filter="url(#shadow)"/>
  <circle cx="148" cy="364" r="36" fill="${motor}" filter="url(#shadow)"/>
  <circle cx="364" cy="364" r="36" fill="${motor}" filter="url(#shadow)"/>

  <!-- Propellers (2 blades each) -->
  <!-- Top-left -->
  <ellipse cx="148" cy="148" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(-30 148 148)"/>
  <ellipse cx="148" cy="148" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(60 148 148)"/>
  <!-- Top-right -->
  <ellipse cx="364" cy="148" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(30 364 148)"/>
  <ellipse cx="364" cy="148" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(-60 364 148)"/>
  <!-- Bottom-left -->
  <ellipse cx="148" cy="364" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(30 148 364)"/>
  <ellipse cx="148" cy="364" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(-60 148 364)"/>
  <!-- Bottom-right -->
  <ellipse cx="364" cy="364" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(-30 364 364)"/>
  <ellipse cx="364" cy="364" rx="70" ry="14" fill="url(#propGrad)" opacity="0.85" transform="rotate(60 364 364)"/>

  <!-- Motor center dots -->
  <circle cx="148" cy="148" r="10" fill="#93C5FD"/>
  <circle cx="364" cy="148" r="10" fill="#93C5FD"/>
  <circle cx="148" cy="364" r="10" fill="#93C5FD"/>
  <circle cx="364" cy="364" r="10" fill="#93C5FD"/>

  <!-- Main body -->
  <rect x="186" y="186" width="140" height="140" rx="28" ry="28" fill="${body}" filter="url(#shadow)"/>

  <!-- Body detail lines -->
  <line x1="256" y1="194" x2="256" y2="318" stroke="#3B82F6" stroke-width="3" opacity="0.4"/>
  <line x1="194" y1="256" x2="318" y2="256" stroke="#3B82F6" stroke-width="3" opacity="0.4"/>

  <!-- Camera mount -->
  <circle cx="256" cy="256" r="30" fill="#0F172A"/>
  <circle cx="256" cy="256" r="22" fill="#1E3A8A"/>
  <circle cx="256" cy="256" r="14" fill="${lens}"/>
  <circle cx="256" cy="256" r="8" fill="#DBEAFE" opacity="0.9"/>
  <circle cx="250" cy="250" r="3" fill="white" opacity="0.7"/>

  <!-- LED lights -->
  <circle cx="198" cy="198" r="5" fill="#EF4444" opacity="0.9" filter="url(#glow)"/>
  <circle cx="314" cy="198" r="5" fill="#EF4444" opacity="0.9" filter="url(#glow)"/>
  <circle cx="198" cy="314" r="5" fill="#22C55E" opacity="0.9" filter="url(#glow)"/>
  <circle cx="314" cy="314" r="5" fill="#22C55E" opacity="0.9" filter="url(#glow)"/>
</svg>`;
}

const sizes = [16, 32, 180, 192, 512];

for (const size of sizes) {
  const svg = makeSvg(size);
  const svgBuf = Buffer.from(svg);
  const outFile =
    size === 180
      ? join(publicDir, "apple-touch-icon.png")
      : size <= 32
      ? join(iconsDir, `icon-${size}.png`)
      : join(iconsDir, `icon-${size}.png`);

  await sharp(svgBuf).resize(size, size).png().toFile(outFile);
  console.log(`✓ Generated ${outFile}`);
}

// Also save SVG for reference
writeFileSync(join(iconsDir, "drone.svg"), makeSvg(512));
console.log("✓ Saved drone.svg");

// Generate favicon.ico equivalent as 32x32 PNG (placed at public root)
const favicon = Buffer.from(makeSvg(32));
await sharp(favicon).resize(32, 32).png().toFile(join(publicDir, "favicon.png"));
console.log("✓ Generated favicon.png");
