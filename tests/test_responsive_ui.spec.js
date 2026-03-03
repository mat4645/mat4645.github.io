const { test, expect } = require('@playwright/test');

test.describe('Responsive and Premium UI (M3 & Glassmorphism)', () => {
  test('Index page has new premium responsive layout', async ({ page, isMobile }) => {
    await page.goto('/');

    // Check main container bounds
    const mainContainer = page.locator('main .container').first();
    await expect(mainContainer).toBeVisible();

    // Cards should use new components classes (from global.css .card)
    const cardElements = page.locator('.card');
    // Ensure at least some cards exist
    const count = await cardElements.count();
    expect(count).toBeGreaterThan(0);

    // Test Glassmorphism header/nav presence
    const header = page.locator('header');
    await expect(header).toHaveClass(/backdrop-blur/);

    if (isMobile) {
      // Test mobile responsive padding
      await page.evaluate(() => {
        return window.getComputedStyle(document.body).padding;
      });
      // specific mobile padding checks if needed
    }
  });

  test('Tools index has premium card UI', async ({ page }) => {
    await page.goto('/en-us/tools/');

    // Check that tool links are presented as cards
    const toolCards = page.locator('.card');
    const count = await toolCards.count();
    expect(count).toBeGreaterThan(1);

    // Ensure hovering triggers transform classes if possible
    const firstCard = toolCards.first();
    await expect(firstCard).toHaveClass(/card-hover/);
  });
});
