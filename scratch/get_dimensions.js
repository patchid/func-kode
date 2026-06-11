const fs = require('fs');

// Simple PNG parser to get dimensions
function getPngDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    // PNG signature check
    if (buffer.readUInt32BE(0) !== 0x89504E47) {
      throw new Error('Not a valid PNG');
    }
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  } catch (err) {
    console.error(`Error reading dimensions for ${filePath}:`, err.message);
    return null;
  }
}

console.log('raccoon.png:', getPngDimensions('public/raccoon.png'));
console.log('logo-dark-extracted.png:', getPngDimensions('public/logo-dark-extracted.png'));
console.log('logo-light-extracted.png:', getPngDimensions('public/logo-light-extracted.png'));
