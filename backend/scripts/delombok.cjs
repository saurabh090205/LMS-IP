const fs = require('fs');
const path = require('path');

function processClass(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const hadBuilder = content.includes('@Builder');
  const hadDataOrGetter = content.includes('@Data') || content.includes('@Getter');

  if (!content.includes('lombok')) {
    return;
  }

  // Handle @Slf4j
  if (content.includes('@Slf4j')) {
    const classNameMatch = content.match(/public\s+(?:class|abstract\s+class)\s+(\w+)/);
    const className = classNameMatch ? classNameMatch[1] : '';
    content = content.replace(/@Slf4j\s*\n?/, '');
    if (!content.includes('org.slf4j.Logger')) {
      content = content.replace(/(package\s+[^;]+;\s*\n)/, `$1\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n`);
    }
    if (className && !content.includes('LoggerFactory.getLogger')) {
      content = content.replace(
        new RegExp(`(public\\s+(?:abstract\\s+)?class\\s+${className}[^{]*\\{)`),
        `$1\n    private static final Logger log = LoggerFactory.getLogger(${className}.class);\n`
      );
    }
  }

  // Remove Lombok annotations & imports
  content = content.replace(/import\s+lombok\.[^;]+;\s*\n?/g, '');
  content = content.replace(/@Getter\s*\n?/g, '');
  content = content.replace(/@Setter\s*\n?/g, '');
  content = content.replace(/@NoArgsConstructor\s*\n?/g, '');
  content = content.replace(/@AllArgsConstructor\s*\n?/g, '');
  content = content.replace(/@Data\s*\n?/g, '');
  content = content.replace(/@Builder\.Default\s*\n?/g, '');
  content = content.replace(/@Builder\s*\n?/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.java')) {
      processClass(filePath);
    }
  }
}

walkDir(path.resolve(__dirname, '../src'));
console.log('Cleaned Lombok annotations.');
