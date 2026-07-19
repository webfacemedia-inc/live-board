const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html',
  `<!doctype html><html><head><title>Git deploy — webface.cloud</title></head>` +
  `<body style="font-family:sans-serif;background:#0a0c10;color:#ecf0f6;display:grid;place-items:center;height:100vh">` +
  `<h1>Deployed from GitHub · build ${new Date().toISOString()}</h1></body></html>`);
console.log('built dist/');
