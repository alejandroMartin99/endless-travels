const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const target = path.join(root, 'src/environments/environment.user.ts');
const source = path.join(root, 'src/environments/environment.user.example.ts');

if (!fs.existsSync(target)) {
  fs.copyFileSync(source, target);
}
