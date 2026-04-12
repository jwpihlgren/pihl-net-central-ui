const SUN_RAYS = `
  <g stroke="#FFA500" stroke-width="1.4" stroke-linecap="round">
    <line x1="12" y1="3" x2="12" y2="5.5"/>
    <line x1="12" y1="18.5" x2="12" y2="21"/>
    <line x1="3" y1="12" x2="5.5" y2="12"/>
    <line x1="18.5" y1="12" x2="21" y2="12"/>
    <line x1="5.64" y1="5.64" x2="7.47" y2="7.47"/>
    <line x1="16.53" y1="16.53" x2="18.36" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="16.53" y2="7.47"/>
    <line x1="7.47" y1="16.53" x2="5.64" y2="18.36"/>
  </g>`;

const SUN_FULL = `
  <circle cx="12" cy="12" r="4.5" fill="#FFD700"/>
  ${SUN_RAYS}`;

const SUN_SMALL = `
  <circle cx="8" cy="9" r="3" fill="#FFD700"/>
  <g stroke="#FFA500" stroke-width="1.2" stroke-linecap="round">
    <line x1="8" y1="4.5" x2="8" y2="6.2"/>
    <line x1="8" y1="11.8" x2="8" y2="13.5"/>
    <line x1="3.5" y1="9" x2="5.2" y2="9"/>
    <line x1="10.8" y1="9" x2="12.5" y2="9"/>
    <line x1="4.93" y1="5.93" x2="6.12" y2="7.12"/>
    <line x1="9.88" y1="10.88" x2="11.07" y2="12.07"/>
    <line x1="11.07" y1="5.93" x2="9.88" y2="7.12"/>
    <line x1="6.12" y1="10.88" x2="4.93" y2="12.07"/>
  </g>`;

const CLOUD_SMALL = `
  <path d="M13 15a2.5 2.5 0 010-5h.3a3 3 0 015.9.8A2 2 0 0121 13a2 2 0 01-2 2h-6z"
        fill="#E0E0E0" opacity="0.8"/>`;

const CLOUD_LIGHT = `
  <path d="M7 17.5a4 4 0 010-8h.5a4.5 4.5 0 018.8 1.2A3 3 0 0119 14.5a3 3 0 01-3 3H7z"
        fill="#E8E8E8"/>`;

const CLOUD_MAIN = `
  <path d="M7 17.5a4 4 0 010-8h.5a4.5 4.5 0 018.8 1.2A3 3 0 0119 14.5a3 3 0 01-3 3H7z"
        fill="#D8D8D8"/>`;

const CLOUD_DARK = `
  <path d="M7 17.5a4 4 0 010-8h.5a4.5 4.5 0 018.8 1.2A3 3 0 0119 14.5a3 3 0 01-3 3H7z"
        fill="#C0C0C0"/>`;

const FOG_LINES = `
  <g stroke="#B0B0B0" stroke-width="1.5" stroke-linecap="round">
    <line x1="4" y1="9"  x2="20" y2="9"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="6" y1="18" x2="18" y2="18"/>
  </g>`;

const BOLT = `
  <polygon points="14,11 11,17 13.5,17 10,23 17,16 14.5,16 17,11" fill="#FFD700"/>`;

const BOLT_LARGE = `
  <polygon points="15,5 10,14 13,14 9,23 18,13 15,13 18,5"
           fill="#FFD700" stroke="#FFA500" stroke-width="0.5" stroke-linejoin="round"/>`;

function rain(n: number): string {
  const spacing = 3.5;
  const totalW = (n - 1) * spacing;
  const startX = 12 - totalW / 2;
  const len = n >= 5 ? 4 : 3;
  const sw = n >= 5 ? 1.8 : 1.5;
  let s = `<g stroke="#4A90E2" stroke-width="${sw}" stroke-linecap="round">`;
  for (let i = 0; i < n; i++) {
    const x = +(startX + i * spacing).toFixed(2);
    s += `<line x1="${x}" y1="19.5" x2="${+(x - 1).toFixed(2)}" y2="${19.5 + len}"/>`;
  }
  return s + `</g>`;
}

function snow(n: number): string {
  const spacing = 4;
  const totalW = (n - 1) * spacing;
  const startX = 12 - totalW / 2;
  const cy = 21.5;
  const r = 1.8;
  const rd = +(r * 0.7).toFixed(2);
  let s = `<g stroke="#90B8D8" stroke-width="1.2" stroke-linecap="round">`;
  for (let i = 0; i < n; i++) {
    const cx = +(startX + i * spacing).toFixed(2);
    s += `<line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}"/>`;
    s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"/>`;
    s += `<line x1="${cx - rd}" y1="${cy - rd}" x2="${cx + rd}" y2="${cy + rd}"/>`;
    s += `<line x1="${cx + rd}" y1="${cy - rd}" x2="${cx - rd}" y2="${cy + rd}"/>`;
  }
  return s + `</g>`;
}

function sleet(n: number): string {
  const totalDrops = Math.ceil(n / 2);
  const totalFlakes = Math.floor(n / 2);
  const dropSpacing = 3.5;
  const flakeSpacing = 4;
  const dropStartX = 12 - ((totalDrops - 1) * dropSpacing) / 2;
  const flakeStartX = 12 - ((totalFlakes - 1) * flakeSpacing) / 2;
  const r = 1.6;
  const rd = +(r * 0.7).toFixed(2);
  let s = `<g stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round">`;
  for (let i = 0; i < totalDrops; i++) {
    const x = +(dropStartX + i * dropSpacing).toFixed(2);
    s += `<line x1="${x}" y1="19.5" x2="${+(x - 0.8).toFixed(2)}" y2="22.5"/>`;
  }
  s += `</g><g stroke="#90B8D8" stroke-width="1.2" stroke-linecap="round">`;
  for (let i = 0; i < totalFlakes; i++) {
    const cx = +(flakeStartX + i * flakeSpacing).toFixed(2);
    const cy = 22;
    s += `<line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}"/>`;
    s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"/>`;
    s += `<line x1="${cx - rd}" y1="${cy - rd}" x2="${cx + rd}" y2="${cy + rd}"/>`;
    s += `<line x1="${cx + rd}" y1="${cy - rd}" x2="${cx - rd}" y2="${cy + rd}"/>`;
  }
  return s + `</g>`;
}

export const iconPaths: Record<number, string> = {
  // 1: Clear
  1: SUN_FULL,

  // 2: Nearly clear
  2: SUN_SMALL + CLOUD_SMALL,

  // 3: Variable cloudiness
  3: SUN_SMALL + CLOUD_LIGHT,

  // 4: Half clear
  4: CLOUD_LIGHT,

  // 5: Cloudy
  5: CLOUD_MAIN,

  // 6: Overcast
  6: CLOUD_DARK,

  // 7: Fog
  7: FOG_LINES,

  // 8: Light rain showers
  8: SUN_SMALL + CLOUD_LIGHT + rain(3),

  // 9: Moderate rain showers
  9: SUN_SMALL + CLOUD_MAIN + rain(4),

  // 10: Heavy rain showers
  10: CLOUD_DARK + rain(5),

  // 11: Thunderstorm
  11: CLOUD_DARK + rain(3) + BOLT,

  // 12: Light sleet showers
  12: SUN_SMALL + CLOUD_LIGHT + sleet(3),

  // 13: Moderate sleet showers
  13: CLOUD_MAIN + sleet(4),

  // 14: Heavy sleet showers
  14: CLOUD_DARK + sleet(5),

  // 15: Light snow showers
  15: SUN_SMALL + CLOUD_LIGHT + snow(2),

  // 16: Moderate snow showers
  16: CLOUD_MAIN + snow(3),

  // 17: Heavy snow showers
  17: CLOUD_DARK + snow(4),

  // 18: Light rain
  18: CLOUD_LIGHT + rain(3),

  // 19: Moderate rain
  19: CLOUD_MAIN + rain(4),

  // 20: Heavy rain
  20: CLOUD_DARK + rain(5),

  // 21: Thunder (no rain)
  21: CLOUD_DARK + BOLT_LARGE,

  // 22: Light sleet
  22: CLOUD_LIGHT + sleet(3),

  // 23: Moderate sleet
  23: CLOUD_MAIN + sleet(4),

  // 24: Heavy sleet
  24: CLOUD_DARK + sleet(5),

  // 25: Light snow
  25: CLOUD_LIGHT + snow(2),

  // 26: Moderate snow
  26: CLOUD_MAIN + snow(3),

  // 27: Heavy snow
  27: CLOUD_DARK + snow(4),
};

/**
 * Renders a weather icon as an inline SVG string.
 * viewBox is "0 0 24 28" to accommodate precipitation below the cloud.
 *
 * @example
 * // In a component template:
 * <span [innerHTML]="getWeatherIcon(wsymb2) | safeHtml"></span>
 */
export function getWeatherIcon(weatherSymbol: number): string {
  const paths = iconPaths[weatherSymbol];
  if (!paths) return '';
  return `<svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${paths}</svg>`;
}
