<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.38">
<site url="http://localhost:3000" crawled="11" date="2026-03-03T01:43:47.777Z"/>
<score overall="54" grade="F">
 <cat name="Security" score="47"/>
 <cat name="Accessibility" score="93"/>
 <cat name="Core SEO" score="86"/>
 <cat name="Crawlability" score="85"/>
 <cat name="Performance" score="90"/>
 <cat name="Content" score="79"/>
 <cat name="Internationalization" score="87"/>
 <cat name="Links" score="85"/>
 <cat name="E-E-A-T" score="57"/>
 <cat name="Legal Compliance" score="44"/>
 <cat name="Analytics" score="100"/>
 <cat name="Images" score="100"/>
 <cat name="Mobile" score="100"/>
 <cat name="Structured Data" score="100"/>
 <cat name="Social Media" score="100"/>
 <cat name="URL Structure" score="100"/>
</score>
<summary passed="838" warnings="154" failed="19"/>
<issues>
 <category name="Crawlability" errors="1" warnings="12">
  <rule id="crawl/sitemap-domain" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-domain">
   42 URL(s) point to different domain(s)
   Items (5/42):
    - https://www.convertfilebox.net/ [host: www.convertfilebox.net]
    - https://www.convertfilebox.net/ja-jp/ [host: www.convertfilebox.net]
    - https://www.convertfilebox.net/ja-jp/tools/ [host: www.convertfilebox.net]
    - https://www.convertfilebox.net/ja-jp/tools/csv-to-json/ [host: www.convertfilebox.net]
    - https://www.convertfilebox.net/ja-jp/tools/csv-to-json-paste/ [host: www.convertfilebox.net]
  </rule>
  <rule id="crawl/canonical-chain" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/crawl/canonical-chain">
   Page redirects before content is served
   Pages (5/10): /en-us, /ja-jp, /en-us/tools, /ja-jp/tools, /en-us/tools/csv-to-json
   Items (5/10):
    - /ja-jp/ (http://localhost:3000/ja-jp/ → http://localhost:3000/ja-jp) [finalUrl: http://localhost:3000/ja-jp, chain: {&quot;sourceUrl&quot;:&quot;http://localhost:3000/ja-jp&quot;,&quot;finalUrl&quot;:&quot;http://localhost:3000/ja-jp&quot;,&quot;hops&quot;:[{&quot;url&quot;:&quot;http://localhost:3000/ja-jp&quot;,&quot;statusCode&quot;:200,&quot;type&quot;:&quot;http&quot;}],&quot;chainLength&quot;:0,&quot;isLoop&quot;:false,&quot;endsI…]
    - /en-us/ (http://localhost:3000/en-us/ → http://localhost:3000/en-us) [finalUrl: http://localhost:3000/en-us, chain: {&quot;sourceUrl&quot;:&quot;http://localhost:3000/en-us&quot;,&quot;finalUrl&quot;:&quot;http://localhost:3000/en-us&quot;,&quot;hops&quot;:[{&quot;url&quot;:&quot;http://localhost:3000/en-us&quot;,&quot;statusCode&quot;:200,&quot;type&quot;:&quot;http&quot;}],&quot;chainLength&quot;:0,&quot;isLoop&quot;:false,&quot;endsI…]
    - /en-us/tools/ (http://localhost:3000/en-us/tools/ → http://localhost:3000/en-us/tools) [finalUrl: http://localhost:3000/en-us/tools, chain: {&quot;sourceUrl&quot;:&quot;http://localhost:3000/en-us/tools&quot;,&quot;finalUrl&quot;:&quot;http://localhost:3000/en-us/tools&quot;,&quot;hops&quot;:[{&quot;url&quot;:&quot;http://localhost:3000/en-us/tools&quot;,&quot;statusCode&quot;:200,&quot;type&quot;:&quot;http&quot;}],&quot;chainLength&quot;:0,&quot;is…]
    - /ja-jp/tools/ (http://localhost:3000/ja-jp/tools/ → http://localhost:3000/ja-jp/tools) [finalUrl: http://localhost:3000/ja-jp/tools, chain: {&quot;sourceUrl&quot;:&quot;http://localhost:3000/ja-jp/tools&quot;,&quot;finalUrl&quot;:&quot;http://localhost:3000/ja-jp/tools&quot;,&quot;hops&quot;:[{&quot;url&quot;:&quot;http://localhost:3000/ja-jp/tools&quot;,&quot;statusCode&quot;:200,&quot;type&quot;:&quot;http&quot;}],&quot;chainLength&quot;:0,&quot;is…]
    - /ja-jp/tools/json-to-csv/ (http://localhost:3000/ja-jp/tools/json-to-csv/ → http://localhost:3000/ja-jp/tools/json-to-csv) [finalUrl: http://localhost:3000/ja-jp/tools/json-to-csv, chain: {&quot;sourceUrl&quot;:&quot;http://localhost:3000/ja-jp/tools/json-to-csv&quot;,&quot;finalUrl&quot;:&quot;http://localhost:3000/ja-jp/tools/json-to-csv&quot;,&quot;hops&quot;:[{&quot;url&quot;:&quot;http://localhost:3000/ja-jp/tools/json-to-csv&quot;,&quot;statusCode&quot;:200…]
  </rule>
  <rule id="crawl/sitemap-coverage" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-coverage">
   11 indexable page(s) not in sitemap (100%); 21 sitemap URL(s) were not crawled
   Items (5/32):
    - /
    - /ja-jp
    - /en-us
    - /en-us/tools
    - /ja-jp/tools
  </rule>
 </category>
 <category name="Core SEO" errors="1" warnings="26">
  <rule id="core/meta-title" severity="error" status="warn" docs="https://docs.squirrelscan.com/rules/core/meta-title">
   Title too long
   Pages (4): /en-us, /en-us/tools/csv-to-json, /en-us/tools/json-formatter, /en-us/tools/json-to-csv
   Items (4):
    - /en-us/ (ConvertFileBox | Free Online CSV &amp; JSON Tools (Sec (68 chars))
    - /en-us/tools/json-to-csv/ (JSON to CSV Converter - Convert JSON to Excel Onli (70 chars))
    - /en-us/tools/csv-to-json/ (CSV to JSON Converter - Free Online Tool | Excel &amp; (72 chars))
    - /en-us/tools/json-formatter/ (JSON Formatter &amp; Validator - Pretty Print &amp; Minify (66 chars))
  </rule>
  <rule id="core/h1" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/core/h1">
   No H1 tag found
   Pages (1): /
   Items (1):
    - / (No H1 tag found)
  </rule>
  <rule id="core/meta-description" severity="error" status="warn" docs="https://docs.squirrelscan.com/rules/core/meta-description">
   Description too short; Description too long
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (5/11):
    - / (Free online tool collection for CSV and JSON conve (80 chars))
    - /ja-jp/ (登録不要・完全無料。CSVからJSONへの変換、JSON整形、文字コード変換（文字化け解消）がブラウ (91 chars))
    - /en-us/ (Free online tool collection for CSV and JSON conve (80 chars))
    - /ja-jp/tools/ (CSVからJSONへの変換、JSONからCSVへの変換、JSON整形、CSV文字コード変換など、エン (77 chars))
    - /ja-jp/tools/json-to-csv/ (JSON（高度・オブジェクト）をCSVに変換。ヘッダー自動作成・区切り文字指定・ネストのフラット化・ (96 chars))
  </rule>
  <rule id="core/favicon" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/core/favicon">
   No favicon found
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
  </rule>
 </category>
 <category name="Security" errors="11" warnings="13">
  <rule id="security/https" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/security/https">
   Page not served over HTTPS
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
  </rule>
  <rule id="security/csp" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/security/csp">
   No Content-Security-Policy header
  </rule>
  <rule id="security/x-frame-options" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/security/x-frame-options">
   No clickjacking protection
  </rule>
  <rule id="security/third-party-cookies" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/security/third-party-cookies">
   N known tracking domain(s) detected
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (2):
    - pagead2.googlesyndication.com (script)
    - www.googletagmanager.com (script)
  </rule>
 </category>
 <category name="Links" errors="0" warnings="10">
  <rule id="links/orphan-pages" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/links/orphan-pages">
   2 orphan page(s) with &lt;2 incoming links
   Items (2):
    - /ja-jp
    - /en-us
  </rule>
  <rule id="links/internal-links" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/links/internal-links">
   Too few internal links (0, min 1)
   Pages (4): /en-us/tools/json-formatter, /en-us/tools/json-to-csv, /ja-jp/tools/json-formatter, /ja-jp/tools/json-to-csv
   Items (4):
    - /ja-jp/tools/json-to-csv (Too few internal links (0, min 1))
    - /ja-jp/tools/json-formatter (Too few internal links (0, min 1))
    - /en-us/tools/json-to-csv (Too few internal links (0, min 1))
    - /en-us/tools/json-formatter (Too few internal links (0, min 1))
  </rule>
  <rule id="links/dead-end-pages" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/links/dead-end-pages">
   Page has no outgoing internal links (dead-end)
   Pages (4): /en-us/tools/json-formatter, /en-us/tools/json-to-csv, /ja-jp/tools/json-formatter, /ja-jp/tools/json-to-csv
  </rule>
  <rule id="links/weak-internal-links" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/links/weak-internal-links">
   2 page(s) have only 1 internal link
   Items (2):
    - /ja-jp
    - /en-us
  </rule>
 </category>
 <category name="Content" errors="0" warnings="14">
  <rule id="content/duplicate-description" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/duplicate-description">
   1 duplicate description(s) found across 2 pages
   Items (1):
    - free online tool collection for csv and json conversion. saf (&quot;free online tool collection for csv and ...&quot; (2 pages)) [pageCount: 2] (from: /, /en-us)
  </rule>
  <rule id="content/keyword-stuffing" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/keyword-stuffing">
   N word(s) may be overused
   Pages (5): /en-us, /en-us/tools, /en-us/tools/csv-to-json, /en-us/tools/json-formatter, /en-us/tools/json-to-csv
   Items (5/7):
    - json (&quot;json&quot; (5.2%)) [count: 11, density: 5.164319248826291]
    - tools (&quot;tools&quot; (3.8%)) [count: 8, density: 3.755868544600939]
    - csv (&quot;csv&quot; (3.3%)) [count: 7, density: 3.286384976525822]
    - data (&quot;data&quot; (3.3%)) [count: 7, density: 3.286384976525822]
    - open (&quot;open&quot; (4.3%)) [count: 6, density: 4.285714285714286]
  </rule>
  <rule id="content/word-count" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/word-count">
   Thin content: N words (min N)
   Pages (5/8): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (5/8):
    - / (Thin content: 9 words (min 300))
    - /ja-jp (Thin content: 67 words (min 300))
    - /en-us (Thin content: 221 words (min 300))
    - /en-us/tools (Thin content: 146 words (min 300))
    - /ja-jp/tools (Thin content: 50 words (min 300))
  </rule>
 </category>
 <category name="Performance" errors="0" warnings="44">
  <rule id="perf/critical-request-chains" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/critical-request-chains">
   N critical request chain(s) found
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (3):
    - CSS: https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&amp;display=swap
    - CSS: /assets/css/style.css
    - CSS: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&amp;display=swap
  </rule>
  <rule id="perf/unminified-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/unminified-js">
   1 JavaScript file(s) appear unminified
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (1):
    - ui.js (8.5KB, ~3.1KB savings) [reason: high newlines (2.32%), 6 comments, formatted code, excessive whitespace]
  </rule>
  <rule id="perf/cache-headers" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/cache-headers">
   No caching headers found
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
  </rule>
  <rule id="perf/http2" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/http2">
   HTTP/2 requires HTTPS
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (5/11):
    - / (HTTP/2 requires HTTPS)
    - /ja-jp (HTTP/2 requires HTTPS)
    - /en-us (HTTP/2 requires HTTPS)
    - /en-us/tools (HTTP/2 requires HTTPS)
    - /ja-jp/tools (HTTP/2 requires HTTPS)
  </rule>
 </category>
 <category name="Accessibility" errors="6" warnings="20">
  <rule id="a11y/form-labels" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/a11y/form-labels">
   N form input(s) without labels
   Pages (5/6): /en-us/tools/csv-to-json, /en-us/tools/json-formatter, /en-us/tools/json-to-csv, /ja-jp/tools/csv-to-json, /ja-jp/tools/json-formatter
   Items (4):
    - input
    - output
    - outputText
    - ta
  </rule>
  <rule id="a11y/color-contrast" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/color-contrast">
   N potential color contrast issue(s)
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (5/11):
    - White text (verify background): 1 instance(s)
    - p with class &quot;text-muted...&quot; may have low contrast
    - p with class &quot;text-sm text-muted mt-2...&quot; may have low contrast
    - h3 with class &quot;text-muted...&quot; may have low contrast
    - p with class &quot;text-sm text-muted text-center...&quot; may have low contrast
  </rule>
  <rule id="a11y/form-field-multiple-labels" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/form-field-multiple-labels">
   1 input(s) with multiple labels
   Pages (2): /en-us/tools/csv-to-json, /ja-jp/tools/csv-to-json
   Items (1):
    - fileInput (2 labels)
  </rule>
  <rule id="a11y/landmark-one-main" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/landmark-one-main">
   Page has no main landmark
   Pages (1): /
  </rule>
  <rule id="a11y/identical-links-same-purpose" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/identical-links-same-purpose">
   1 link text(s) lead to different destinations
   Pages (4): /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
   Items (4):
    - &quot;ツールを開く →&quot; → 3 different URLs
    - &quot;open tool →&quot; → 3 different URLs
    - &quot;open tool →&quot; → 6 different URLs
    - &quot;ツールを開く →&quot; → 6 different URLs
  </rule>
  <rule id="a11y/skip-link" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/skip-link">
   No bypass mechanism for repetitive content
   Pages (1): /
  </rule>
  <rule id="a11y/landmark-regions" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/landmark-regions">
   No &lt;main&gt; landmark found
   Pages (1): /
  </rule>
 </category>
 <category name="Internationalization" errors="0" warnings="11">
  <rule id="i18n/hreflang" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/i18n/hreflang">
   No self-referencing hreflang found
   Pages (5/11): /, /en-us, /ja-jp, /en-us/tools, /ja-jp/tools
  </rule>
 </category>
 <category name="E-E-A-T" errors="0" warnings="3">
  <rule id="eeat/about-page" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/eeat/about-page">
   No About page found
  </rule>
  <rule id="eeat/contact-page" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/eeat/contact-page">
   No Contact page found
  </rule>
  <rule id="eeat/privacy-policy" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/eeat/privacy-policy">
   No Privacy Policy page found
  </rule>
 </category>
 <category name="Legal Compliance" errors="0" warnings="1">
  <rule id="legal/privacy-policy" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/legal/privacy-policy">
   No privacy policy link found across site
  </rule>
 </category>
</issues>
</audit>
