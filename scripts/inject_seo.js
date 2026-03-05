const fs = require('fs');
const path = require('path');

const csp = `
    <!-- Strict Content Security Policy -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://pagead2.googlesyndication.com https://www.google.com; frame-src https://googleads.g.doubleclick.net https://www.google.com;" />
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Content-Security-Policy')) return; // Already processed

  // Extract title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'ConvertFileBox';

  // Extract description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/>/i);
  let description = descMatch ? descMatch[1].trim() : '';

  // Extract canonical URL
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/>/i);
  let canonicalUrl = canonicalMatch ? canonicalMatch[1] : '';

  if (!canonicalUrl) {
    console.warn(`No canonical URL found in ${filePath}`);
    return;
  }

  const ogTags = `
    <!-- Open Graph & Twitter Card -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://www.convertfilebox.net/assets/icon-large.png" />
    <meta name="twitter:card" content="summary_large_image" />`;

  // Insert CSP and OG after description tag
  content = content.replace(
    /(<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>)/i,
    `$1\n${csp}\n${ogTags}`,
  );

  // Also fix hreflang="en" to "en-us"
  content = content.replace(/hreflang="en"/g, 'hreflang="en-us"');

  // Insert x-default hreflang
  const enMatch = canonicalUrl.match(/https:\/\/www\.convertfilebox\.net\/en-us\/(.*)/);
  const jpMatch = canonicalUrl.match(/https:\/\/www\.convertfilebox\.net\/ja-jp\/(.*)/);

  let route = '';
  if (enMatch) route = enMatch[1];
  if (jpMatch) route = jpMatch[1];

  const xdefaultUrl = `https://www.convertfilebox.net/en-us/${route}`;
  const xdefaultTag = `\n    <link rel="alternate" hreflang="x-default" href="${xdefaultUrl}" />`;

  // Find the last alternate link to insert after
  const alternateRegex = /<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]+"\s*\/>/g;
  let match;
  let lastIndex = -1;
  while ((match = alternateRegex.exec(content)) !== null) {
    lastIndex = alternateRegex.lastIndex;
  }

  if (lastIndex !== -1 && !content.includes('hreflang="x-default"')) {
    content = content.slice(0, lastIndex) + xdefaultTag + content.slice(lastIndex);
  } else if (!content.includes('hreflang="x-default"')) {
    // If no alternate links found, append to canonical
    content = content.replace(
      /(<link\s+rel="canonical"\s+href="[^"]+"\s*\/>)/i,
      `$1${xdefaultTag}`,
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('en-us_broken') && !fullPath.includes('ja-jp_broken')) {
        traverse(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, '..', 'en-us'));
traverse(path.join(__dirname, '..', 'ja-jp'));
