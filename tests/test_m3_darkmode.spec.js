const { test, expect } = require('@playwright/test');

test.describe('M3 UI and Dark Mode Toggle', () => {
  test('Dark mode toggle works and updates DOM', async ({ page }) => {
    await page.goto('/ja-jp/');

    // There must be a theme toggle button
    const themeBtn = page.locator('#themeToggle');
    await expect(themeBtn).toBeVisible();

    // The dark mode class should NOT be on the HTML element by default
    // or if the OS preference is dark, we can just test the toggle functionality

    // Explicitly toggle to dark
    await themeBtn.click();

    // The html element should have 'dark' applied or a specific data-theme
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    // Check localStorage persistence
    const themePref = await page.evaluate(() => localStorage.getItem('theme'));
    expect(themePref).toBe('dark');

    // Toggle back to light
    await themeBtn.click();
    await expect(htmlElement).not.toHaveClass(/dark/);
    const updatedPref = await page.evaluate(() => localStorage.getItem('theme'));
    expect(updatedPref).toBe('light');
  });
});
