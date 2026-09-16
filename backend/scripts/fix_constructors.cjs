const fs = require('fs');
const path = require('path');

function processServiceOrController(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('@RequiredArgsConstructor')) return;

  // Find class name
  const classMatch = content.match(/public\s+(?:class)\s+(\w+)/);
  if (!classMatch) return;
  const className = classMatch[1];

  // Remove @RequiredArgsConstructor
  content = content.replace(/@RequiredArgsConstructor\s*\n?/, '');

  // Find all final fields
  const fieldRegex = /private\s+final\s+([A-Za-z0-9_<>,\s\?]+)\s+(\w+);/g;
  const fields = [];
  let match;
  while ((match = fieldRegex.exec(content)) !== null) {
    fields.push({ type: match[1].trim(), name: match[2].trim() });
  }

  if (fields.length > 0) {
    const params = fields.map(f => `${f.type} ${f.name}`).join(',\n                             ');
    let ctor = `\n    public ${className}(${params}) {\n`;
    for (const f of fields) {
      ctor += `        this.${f.name} = ${f.name};\n`;
    }
    ctor += `    }\n`;

    // Insert constructor after the last final field
    const lastFieldMatch = [...content.matchAll(/private\s+final\s+[^;]+;/g)].pop();
    if (lastFieldMatch) {
      const idx = lastFieldMatch.index + lastFieldMatch[0].length;
      content = content.substring(0, idx) + '\n' + ctor + content.substring(idx);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated constructor for ${className}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.java')) {
      processServiceOrController(filePath);
    }
  }
}

walkDir(path.resolve(__dirname, '../src/main/java'));
