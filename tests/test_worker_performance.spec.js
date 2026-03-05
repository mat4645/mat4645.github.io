const { test, expect } = require('@playwright/test');

test('CSV to JSON tool uses Web Worker to prevent main thread blocking', async ({ page }) => {
  await page.goto('/en-us/tools/csv-to-json/');

  // Wait for the sample button to be visible
  await page.waitForSelector('#btnSample');

  // Inject a script to spy on the Worker constructor
  const workerCreated = await page.evaluate(() => {
    return new Promise((resolve) => {
      let workerFound = false;
      const originalWorker = window.Worker;
      window.Worker = function (scriptUrl, options) {
        workerFound = true;
        resolve(true);
        return new originalWorker(scriptUrl, options);
      };

      // Trigger the conversion
      document.getElementById('btnSample').click();

      // If a worker is not created within 1.5 seconds, we assume it's synchronous/failed
      setTimeout(() => {
        if (!workerFound) {
          resolve(false);
        }
      }, 1500);
    });
  });

  expect(workerCreated).toBe(true);
});

test('JSON to CSV tool uses Web Worker to prevent main thread blocking', async ({ page }) => {
  await page.goto('/en-us/tools/json-to-csv/');

  await page.waitForSelector('#btnSample');

  const workerCreated = await page.evaluate(() => {
    return new Promise((resolve) => {
      let workerFound = false;
      const originalWorker = window.Worker;
      window.Worker = function (scriptUrl, options) {
        workerFound = true;
        resolve(true);
        return new originalWorker(scriptUrl, options);
      };

      document.getElementById('btnSample').click();

      setTimeout(() => {
        if (!workerFound) {
          resolve(false);
        }
      }, 1500);
    });
  });

  expect(workerCreated).toBe(true);
});
