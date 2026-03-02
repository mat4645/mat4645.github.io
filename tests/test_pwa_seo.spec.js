const { test, expect } = require('@playwright/test');

// We will check the English Home page as a representative sample
test.describe('Ultimate Technical SEO & Strict CSP Security', () => {
  const targetUrl = '/en-us/';

  test('Should have a strict Content-Security-Policy meta tag', async ({ page }) => {
    await page.goto(targetUrl);

    // Check if CSP meta tag exists
    const cspMeta = page.locator('meta[http-equiv="Content-Security-Policy"]');
    await expect(cspMeta).toHaveCount(1);

    // Check for essential strict policies (e.g., restricting default-src, script-src)
    const content = await cspMeta.getAttribute('content');
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self'");
  });

  test('Should have comprehensive SEO and Open Graph tags', async ({ page }) => {
    await page.goto(targetUrl);

    // Basic SEO
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

    // Open Graph
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);

    // Twitter Card
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
  });

  test('Should have font preloading for Core Web Vitals', async ({ page }) => {
    await page.goto(targetUrl);

    // Look for Google Fonts preconnect and preload/stylesheet
    const preconnects = page.locator('link[rel="preconnect"][href*="fonts.googleapis.com"]');
    await expect(preconnects).toHaveCount(1);

    const fontStylesheet = page.locator('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
    await expect(fontStylesheet).toHaveCount(1);
  });

  test('Should have x-default hreflang tag', async ({ page }) => {
    await page.goto(targetUrl);

    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xDefault).toHaveCount(1);
  });
});
