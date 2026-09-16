const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../src/services/api');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (!file.endsWith('.ts')) continue;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/from\s+['"]@\/types\/api['"]/g, "from '../../types/api'");
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Updated services/api imports to relative paths.');
