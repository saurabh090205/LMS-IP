const fs = require('fs');
const path = require('path');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function processJavaFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip interfaces or Enums or Repositories or Controllers/Services/Configs
  if (
    filePath.includes('Repository.java') ||
    filePath.includes('Controller.java') ||
    filePath.includes('Service.java') ||
    filePath.includes('Config.java') ||
    filePath.includes('Converter.java') ||
    filePath.includes('Utils.java') ||
    filePath.includes('Application.java') ||
    filePath.includes('Exception.java') ||
    filePath.includes('Test.java') ||
    content.includes('public interface ') ||
    content.includes('public enum ')
  ) {
    return;
  }

  // Find class name
  const classMatch = content.match(/public\s+(?:abstract\s+)?class\s+(\w+)(?:<[^>]+>)?(?:\s+extends\s+[\w<>]+)?(?:\s+implements\s+[\w<>,\s]+)?\s*\{/);
  if (!classMatch) return;
  const className = classMatch[1];

  // Extract body
  const startIndex = content.indexOf(classMatch[0]) + classMatch[0].length;
  const lastBraceIndex = content.lastIndexOf('}');
  if (startIndex >= lastBraceIndex) return;

  const header = content.substring(0, startIndex);
  const rawBody = content.substring(startIndex, lastBraceIndex);
  const footer = content.substring(lastBraceIndex);

  // If already has getters/setters/constructors, skip
  if (rawBody.includes(`public ${className}(`) || rawBody.includes(`public String get`)) {
    return;
  }

  // Parse fields
  const fieldRegex = /(?:@[\w()="',\s\n{}]+)*\s*private\s+([A-Za-z0-9_<>,\s\?]+)\s+(\w+)(?:\s*=\s*([^;]+))?;/g;
  const fields = [];
  let match;

  while ((match = fieldRegex.exec(rawBody)) !== null) {
    const fullMatch = match[0];
    const type = match[1].trim();
    const name = match[2].trim();
    const defaultValue = match[3] ? match[3].trim() : null;
    fields.push({ type, name, defaultValue, fullMatch });
  }

  if (fields.length === 0) return;

  let methods = '\n';

  // No-arg constructor
  methods += `    public ${className}() {}\n\n`;

  // All-arg constructor
  const allArgs = fields.map(f => `${f.type} ${f.name}`).join(', ');
  methods += `    public ${className}(${allArgs}) {\n`;
  for (const f of fields) {
    methods += `        this.${f.name} = ${f.name};\n`;
  }
  methods += `    }\n\n`;

  // Getters and Setters
  for (const f of fields) {
    const getterPrefix = f.type === 'boolean' || f.type === 'Boolean' ? (f.name.startsWith('is') ? '' : 'is') : 'get';
    const methodName = (f.name.startsWith('is') && (f.type === 'boolean' || f.type === 'Boolean')) 
      ? f.name 
      : `${getterPrefix}${capitalize(f.name)}`;
    
    // Getter
    methods += `    public ${f.type} ${methodName}() {\n        return this.${f.name};\n    }\n\n`;

    // Setter
    const setterName = `set${capitalize(f.name)}`;
    methods += `    public void ${setterName}(${f.type} ${f.name}) {\n        this.${f.name} = ${f.name};\n    }\n\n`;
  }

  // Static Builder
  methods += `    public static ${className}Builder builder() {\n        return new ${className}Builder();\n    }\n\n`;
  methods += `    public static class ${className}Builder {\n`;
  for (const f of fields) {
    methods += `        private ${f.type} ${f.name}${f.defaultValue ? ' = ' + f.defaultValue : ''};\n`;
  }
  methods += `\n        public ${className}Builder() {}\n\n`;
  for (const f of fields) {
    methods += `        public ${className}Builder ${f.name}(${f.type} ${f.name}) {\n            this.${f.name} = ${f.name};\n            return this;\n        }\n\n`;
  }
  methods += `        public ${className} build() {\n`;
  methods += `            ${className} instance = new ${className}();\n`;
  for (const f of fields) {
    methods += `            instance.${f.name} = this.${f.name};\n`;
  }
  methods += `            return instance;\n`;
  methods += `        }\n`;
  methods += `    }\n`;

  const newContent = header + rawBody + methods + footer;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Generated POJO methods for ${className}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.java')) {
      processJavaFile(filePath);
    }
  }
}

walkDir(path.resolve(__dirname, '../src/main/java'));
console.log('POJO generation complete.');
