/**
 * Renders the first page of the test PDF to a PNG using Playwright + embedded PDF.js
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = path.join(__dirname, "..", "public", "test-output", "Richard_Sanchez_Resume.pdf");
const outPath = path.join(__dirname, "..", "public", "test-output", "pdf-page-screenshot.png");

const pdfBase64 = fs.readFileSync(pdfPath).toString("base64");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 850, height: 1100 } });

await page.setContent(`<!DOCTYPE html>
<html><head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs" type="module"></script>
</head>
<body style="margin:0;background:#eee;display:flex;justify-content:center;">
<canvas id="c"></canvas>
<script type="module">
import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
const data = atob('${pdfBase64}');
const bytes = new Uint8Array(data.length);
for (let i = 0; i < data.length; i++) bytes[i] = data.charCodeAt(i);
const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
const page = await pdf.getPage(1);
const viewport = page.getViewport({ scale: 1.2 });
const canvas = document.getElementById('c');
canvas.width = viewport.width;
canvas.height = viewport.height;
await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
window.__PDF_RENDERED__ = true;
</script>
</body></html>`);

await page.waitForFunction(() => window.__PDF_RENDERED__ === true, { timeout: 30000 });
await page.locator("#c").screenshot({ path: outPath });
await browser.close();
console.log("Saved PDF render:", outPath);
