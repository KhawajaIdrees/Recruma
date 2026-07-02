/**
 * End-to-end PDF test: loads /make with mock resume data, generates PDF, saves preview PNG.
 * Run: node scripts/test-pdf.mjs
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "test-output");

const MOCK_RESUME = {
  template: 4,
  personalInfo: {
    fullName: "Richard Sanchez",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    address: "123 Anywhere St., Any City",
    linkedin: "linkedin.com/in/richardsanchez",
    github: "github.com/richardsanchez",
    website: "www.reallygreatsite.com",
  },
  summary:
    "Results-driven Marketing Manager with 8+ years of experience building brand awareness, leading cross-functional campaigns, and driving measurable revenue growth across B2B and B2C markets. Specialized in digital marketing strategy, content development, and data-driven campaign optimization.",
  experiences: [
    {
      id: "exp-1",
      company: "Borcelle Studio",
      position: "Marketing Manager & Specialist",
      startDate: "2030",
      endDate: "",
      description:
        "Lead integrated marketing campaigns across social, email, and paid channels\nManage a $500K annual marketing budget and improve ROI by 35%\nCollaborate with sales and product teams to launch new offerings",
      current: true,
    },
    {
      id: "exp-2",
      company: "Fauget Studio",
      position: "Marketing Manager",
      startDate: "2025",
      endDate: "2029",
      description:
        "Developed brand positioning and grew social engagement by 120%\nManaged PR and partnership initiatives across three regions",
      current: false,
    },
    {
      id: "exp-3",
      company: "Studio Shodwe",
      position: "Marketing Specialist",
      startDate: "2024",
      endDate: "2025",
      description:
        "Supported campaign execution, market research, and client reporting",
      current: false,
    },
  ],
  educations: [
    {
      id: "edu-1",
      school: "Wardiere University",
      degree: "Master of Business Management",
      field: "Marketing",
      startDate: "2029",
      endDate: "2031",
      gpa: "3.8",
    },
    {
      id: "edu-2",
      school: "Wardiere University",
      degree: "Bachelor of Commerce",
      field: "Marketing",
      startDate: "2025",
      endDate: "2029",
      gpa: "3.6",
    },
  ],
  skills: [
    { id: "s1", name: "Project Management" },
    { id: "s2", name: "Public Relations" },
    { id: "s3", name: "Digital Marketing" },
    { id: "s4", name: "Leadership" },
    { id: "s5", name: "SEO" },
    { id: "s6", name: "Content Strategy" },
  ],
  profile: null,
};

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const baseUrl = process.env.TEST_URL || "http://localhost:3000";
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1600, height: 900 },
  });
  const page = await context.newPage();

  console.log("Loading resume builder...");
  await page.goto(`${baseUrl}/make?template=4`, { waitUntil: "networkidle" });

  await page.evaluate((data) => {
    localStorage.setItem("resumeData", JSON.stringify(data));
    localStorage.setItem("selectedTemplate", String(data.template));
  }, MOCK_RESUME);

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector("#resume-preview", { timeout: 30000 });
  await page.waitForTimeout(1500);

  const name = await page.locator("#resume-preview h1").first().textContent();
  console.log("Preview loaded for:", name?.trim() || "(no name)");

  await page.locator("#resume-preview").screenshot({
    path: path.join(OUT_DIR, "resume-preview-screenshot.png"),
  });

  const printHeight = await page.evaluate(() => {
    const el = document.getElementById("resume-preview-print");
    return el ? el.scrollHeight : 0;
  });
  console.log("Print element height:", printHeight, "px");
  if (printHeight < 50) {
    throw new Error("Print element has no content");
  }

  const downloadPromise = page.waitForEvent("download", { timeout: 60000 });
  await page.click("[data-download-btn]");
  const download = await downloadPromise;

  const pdfPath = path.join(OUT_DIR, "Richard_Sanchez_Resume.pdf");
  await download.saveAs(pdfPath);
  console.log("Saved PDF:", pdfPath);

  const pdfSize = fs.statSync(pdfPath).size;
  console.log("PDF size:", pdfSize, "bytes");

  if (pdfSize < 5000) {
    throw new Error(`PDF appears too small (${pdfSize} bytes) — likely blank`);
  }

  await browser.close();
  console.log("\nTest passed! Output files:");
  console.log(" - public/test-output/Richard_Sanchez_Resume.pdf");
  console.log(" - public/test-output/resume-preview-screenshot.png");
}

main().catch((err) => {
  console.error("Test failed:", err.message);
  process.exit(1);
});
