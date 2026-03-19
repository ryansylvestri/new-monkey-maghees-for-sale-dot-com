const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip compression for all responses
app.use(compression());

// Cache static assets aggressively (images served via Cloudinary CDN, so this is just for HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Health check endpoint (useful for Hostinger monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: 'monkey-maghees-for-sale' });
});

// SPA fallback — all routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Monkey Maghees site running on port ${PORT}`);
});
