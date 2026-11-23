// Fast parallel Playwright verifier for local interactive components.
// Checks: zero console/page errors, stage renders, clicking controls causes real DOM/state changes, static diff vs ref.
// Usage: node tools/verify-batch.mjs slug1 slug2 ...
import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slugs = process.argv.slice(2);
if (!slugs.length) process.exit(1);

async function verifySlug(browser, slug) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

  let diffPct = 'n/a';
  let clicksChanged = 0;
  let totalTried = 0;
  let stageLen = 0;

  try {
    await page.goto(`http://localhost:5173/preview/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1600);

    const stageEl = page.locator('.stage');
    stageLen = await stageEl.evaluate(el => el.innerHTML.length);

    // Optional static pixel diff against existing shots/ref-<slug>.png
    const refPath = join(root, `shots/ref-${slug}.png`);
    if (existsSync(refPath)) {
      const buf = await stageEl.screenshot();
      const ours = PNG.sync.read(buf);
      const ref = PNG.sync.read(readFileSync(refPath));
      if (ours.width === ref.width && ours.height === ref.height) {
        const diff = new PNG({ width: ref.width, height: ref.height });
        const n = pixelmatch(ref.data, ours.data, diff.data, ref.width, ref.height, { threshold: 0.1 });
        diffPct = ((n / (ref.width * ref.height)) * 100).toFixed(3) + '%';
      } else {
        diffPct = `DIM(${ours.width}x${ours.height} vs ${ref.width}x${ref.height})`;
      }
    }

    // Try clicking interactive controls and confirm DOM changes
    const snap = () => page.evaluate(() => {
      const s = document.querySelector('.stage');
      const pops = document.querySelectorAll('[popover]:popover-open').length;
      return (s ? s.innerHTML : '') + '|POPS:' + pops;
    });

    const targets = await page.evaluate(() => {
      const s = document.querySelector('.stage');
      if (!s) return [];
      const els = [...s.querySelectorAll('button, [role="tab"], [role="radio"], [role="option"], [role="switch"], [role="checkbox"], [role="treeitem"], [role="slider"], input')];
      const out = [];
      const seen = new Set();
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0 || el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true' || (el.tagName === 'INPUT' && el.type === 'file')) continue;
        const k = (typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName) + '|' + (el.getAttribute('aria-checked') || el.getAttribute('aria-selected') || el.getAttribute('aria-expanded') || '');
        if (seen.has(k) && out.length >= 4) continue;
        seen.add(k);
        out.push(i);
        if (out.length >= 6) break;
      }
      return out;
    });

    for (const idx of targets) {
      totalTried++;
      const before = await snap();
      await page.evaluate((i) => {
        const s = document.querySelector('.stage');
        const els = [...s.querySelectorAll('button, [role="tab"], [role="radio"], [role="option"], [role="switch"], [role="checkbox"], [role="treeitem"], [role="slider"], input')];
        const el = els[i];
        if (!el) return;
        if (el.tagName === 'INPUT' && !['checkbox', 'radio', 'button', 'submit'].includes(el.type)) {
          el.focus();
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (setter) setter.call(el, 'a');
          el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          el.click();
        }
      }, idx);
      await page.waitForTimeout(350);
      const after = await snap();
      if (after !== before) clicksChanged++;
    }
  } catch (e) {
    errors.push(e.message);
  } finally {
    await ctx.close();
  }

  const ok = errors.length === 0 && stageLen > 100;
  console.log(`${slug.padEnd(22)} ${ok ? 'OK  ' : 'FAIL'} diff=${diffPct.padEnd(10)} interactive=${clicksChanged}/${totalTried} errs=${errors.length}${errors.length ? ' :: ' + errors[0].slice(0, 80) : ''}`);
  return { slug, ok, diffPct, clicksChanged, totalTried, errors };
}

const browser = await chromium.launch();
const queue = [...slugs];
const results = [];
await Promise.all(Array.from({ length: Math.min(4, slugs.length) }, async () => {
  while (queue.length) {
    const s = queue.shift();
    results.push(await verifySlug(browser, s));
  }
}));
await browser.close();
if (results.some(r => !r.ok)) process.exit(1);
