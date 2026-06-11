const fs = require('fs');
const crypto = require('crypto');

function getHash(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(data).digest('hex');
  } catch (err) {
    return err.message;
  }
}

console.log('raccoon.png:', getHash('public/raccoon.png'));
console.log('logo-dark-extracted.png:', getHash('public/logo-dark-extracted.png'));
console.log('logo-light-extracted.png:', getHash('public/logo-light-extracted.png'));
