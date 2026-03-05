const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if we already injected breadcrumbs
  if (content.includes('"@type": "BreadcrumbList"')) {
    return;
  }

  // Extract title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'ConvertFileBox';

  // Extract canonical URL
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/>/i);
  let canonicalUrl = canonicalMatch ? canonicalMatch[1] : '';

  if (!canonicalUrl) {
    return;
  }

  let urlObj;
  try {
    urlObj = new URL(canonicalUrl);
  } catch (e) {
    return;
  }

  const pathname = urlObj.pathname;
  const segments = pathname.split('/').filter(Boolean);

  // Build BreadcrumbList
  let breadcrumbs = [];
  if (segments.length >= 1) {
    const lang = segments[0]; // en-us or ja-jp
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `https://www.convertfilebox.net/${lang}/`,
    });

    if (segments.length >= 2 && segments[1] === 'tools') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: lang === 'ja-jp' ? 'ツール一覧' : 'Tools',
        item: `https://www.convertfilebox.net/${lang}/tools/`,
      });

      if (segments.length >= 3) {
        breadcrumbs.push({
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: canonicalUrl,
        });
      }
    } else if (segments.length >= 2 && segments[1] === 'about') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: lang === 'ja-jp' ? 'このサイトについて' : 'About',
        item: canonicalUrl,
      });
    } else if (segments.length >= 2 && segments[1] === 'privacy') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: lang === 'ja-jp' ? 'プライバシーポリシー' : 'Privacy Policy',
        item: canonicalUrl,
      });
    }
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };

  // Build FAQPage
  const faqRegex =
    /<h4[^>]*>([QＱ][.．]?\s*)(.*?)<\/h4>\s*<p[^>]*>([AＡ][.．]?\s*)([\s\S]*?)<\/p>/gi;
  let match;
  let faqContent = [];

  while ((match = faqRegex.exec(content)) !== null) {
    const q = match[2].trim();
    const a = match[4]
      .replace(/<[^>]+>/g, '')
      .trim()
      .replace(/\s+/g, ' ');
    faqContent.push({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    });
  }

  let structuredDataArr = [];
  if (breadcrumbs.length > 0) {
    structuredDataArr.push(breadcrumbData);
  }
  if (faqContent.length > 0) {
    structuredDataArr.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqContent,
    });
  }

  // Inject script
  const scriptContent = structuredDataArr
    .map(
      (d) =>
        `    <script type="application/ld+json">\n${JSON.stringify(d, null, 2)
          .split('\n')
          .map((l, i) => (i === 0 ? l : '      ' + l))
          .join('\n')}\n    </script>`,
    )
    .join('\n');

  if (structuredDataArr.length > 0) {
    // Inject just before </head>
    content = content.replace(/(<\/head>)/i, `${scriptContent}\n  $1`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected structured data into ${filePath}`);
  }
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const ignoredDirs = [
        'en-us_broken',
        'ja-jp_broken',
        'node_modules',
        '.git',
        '.github',
        'assets',
        'scripts',
        'tests',
        'docs',
        '.husky',
      ];
      if (!ignoredDirs.includes(file)) {
        traverse(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

console.log('Starting traversal...');
traverse(path.join(__dirname, '..', 'en-us'));
traverse(path.join(__dirname, '..', 'ja-jp'));

// Also root index.html
const rootIndex = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(rootIndex)) {
  console.log('Processing root index');
  processFile(rootIndex);
}
