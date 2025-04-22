const fs = require('fs');
const path = require('path');

// Copy 404.html to dist after build
fs.copyFileSync(
  path.join(__dirname, 'public', '404.html'),
  path.join(__dirname, 'dist', '404.html')
);

// Create .nojekyll file
fs.writeFileSync(
  path.join(__dirname, 'dist', '.nojekyll'),
  ''
); 