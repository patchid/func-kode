const fs = require('fs');

function extractBase64(svgPath, outPngPath) {
  try {
    const content = fs.readFileSync(svgPath, 'utf8');
    const match = content.match(/base64,([^"]+)"/);
    if (match) {
      const base64Data = match[1].replace(/\s+/g, '');
      fs.writeFileSync(outPngPath, Buffer.from(base64Data, 'base64'));
      console.log(`Extracted ${svgPath} to ${outPngPath}`);
    } else {
      console.log(`No base64 image found in ${svgPath}`);
    }
  } catch (err) {
    console.error(`Error processing ${svgPath}:`, err);
  }
}

extractBase64('public/logo-dark.svg', 'public/logo-dark-extracted.png');
extractBase64('public/logo-light.svg', 'public/logo-light-extracted.png');
