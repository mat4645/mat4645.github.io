const { test, expect } = require('@playwright/test');

test.describe('ConvertFileBox Existing Conversion Baseline', () => {
  test('Page loads and has correct title', async ({ page }) => {
    await page.goto('/ja-jp/tools/csv-to-json/');
    await expect(page).toHaveTitle(/CSV to JSON 変換/);
  });

  test('Conversion interface is present', async ({ page }) => {
    await page.goto('/ja-jp/tools/csv-to-json/');
    const fileInput = page.locator('#fileInput');
    await expect(fileInput).toBeAttached();

    // Check output area
    const outputText = page.locator('#outputText');
    await expect(outputText).toBeVisible();

    // Check setting elements
    const delimiter = page.locator('#delimiter');
    await expect(delimiter).toBeVisible();
  });
});
