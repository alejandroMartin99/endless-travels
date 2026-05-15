/**
 * If MAPBOX_PUBLIC_TOKEN or NG_APP_MAPBOX_PUBLIC_TOKEN is set, overwrite
 * src/environments/environment.user.ts so prod/CI bundles include the pk.*
 * Local dev without these vars keeps your existing gitignored file.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const target = path.join(root, 'src/environments/environment.user.ts');

const pk = (
  process.env.MAPBOX_PUBLIC_TOKEN ??
  process.env.NG_APP_MAPBOX_PUBLIC_TOKEN ??
  ''
)
  .toString()
  .trim();

if (!pk) {
  process.exit(0);
}

const content =
  '/**\n * Generado por scripts/inject-mapbox-token.cjs (CI). No commitees este valor.\n */\n' +
  `export const USER_MAPBOX_PK = ${JSON.stringify(pk)};\n`;

fs.writeFileSync(target, content, 'utf8');
