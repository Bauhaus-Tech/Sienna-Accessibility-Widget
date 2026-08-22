import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('built toolbar controls use only local readable-font assets', async () => {
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname === '/') {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end('<!doctype html><html><body><h1>Sample heading</h1><script src="/dist/sienna-accessibility.umd.js"></script></body></html>');
      return;
    }

    const filePath = path.join(repositoryRoot, pathname);
    const content = await readFile(filePath);
    response.writeHead(200);
    response.end(content);
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));

  try {
    await page.goto(origin, { waitUntil: 'domcontentloaded' });
    await page.locator('.asw-menu-btn').click();

    const heading = page.locator('h1');
    const initialSize = await heading.evaluate((element) => getComputedStyle(element).fontSize);
    await page.locator('.asw-plus[data-key="font-size"]').click();
    assert.notEqual(await heading.evaluate((element) => getComputedStyle(element).fontSize), initialSize);

    await page.locator('[data-key="high-contrast"]').click();
    assert.equal(await page.locator('html').evaluate((element) => element.classList.contains('aws-filter')), true);

    const fontResponse = page.waitForResponse((response) => response.url().endsWith('/dist/fonts/OpenDyslexic3-Regular.woff') && response.ok());
    await page.locator('[data-key="readable-font"]').click();
    await fontResponse;
    assert.match(await heading.evaluate((element) => getComputedStyle(element).fontFamily), /OpenDyslexic3/);

    assert.equal(requests.every((url) => new URL(url).origin === origin), true);
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
