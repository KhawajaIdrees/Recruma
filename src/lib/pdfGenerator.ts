import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { colorToRgb } from "./colorUtils";

const PDF_WIDTH_IN = 8.5;
const PDF_HEIGHT_IN = 11;
const PDF_MARGIN_IN = 0.1;
const CAPTURE_WIDTH_PX = 816;

async function waitForImages(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    )
  );
}

function inlineCssVariables(source: HTMLElement, target: HTMLElement): void {
  const computed = getComputedStyle(source);
  ["--accent", "--accent-rgb", "--accent-bg", "--accent-light"].forEach((name) => {
    const value = computed.getPropertyValue(name).trim();
    if (value) target.style.setProperty(name, value);
  });
}

function applyTemplateStyles(element: HTMLElement) {
  element.querySelectorAll("*").forEach((el: Element) => {
    const htmlEl = el as HTMLElement;
    const classes = htmlEl.className;
    if (typeof classes === "string") {
      Object.entries(colorToRgb).forEach(([className, style]) => {
        if (classes.includes(className)) {
          const existingStyle = htmlEl.getAttribute("style") || "";
          const styleKey = className.startsWith("bg-")
            ? "background-color"
            : className.startsWith("border-")
              ? "border-color"
              : "color";
          if (!existingStyle.includes(styleKey)) {
            htmlEl.setAttribute("style", `${existingStyle}; ${styleKey}: ${style}`);
          }
        }
      });
    }
  });
}

function preparePdfCaptureElement(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.id = "resume-pdf-clone";
  clone.style.position = "fixed";
  clone.style.left = `${-(CAPTURE_WIDTH_PX + 40)}px`;
  clone.style.top = "0";
  clone.style.width = `${CAPTURE_WIDTH_PX}px`;
  clone.style.maxWidth = `${CAPTURE_WIDTH_PX}px`;
  clone.style.minHeight = "auto";
  clone.style.height = "auto";
  clone.style.overflow = "visible";
  clone.style.backgroundColor = "#ffffff";
  clone.style.boxShadow = "none";
  clone.style.zIndex = "2147483646";
  clone.style.opacity = "1";
  clone.style.visibility = "visible";
  clone.style.pointerEvents = "none";

  inlineCssVariables(source, clone);
  applyTemplateStyles(clone);

  clone.querySelectorAll("img").forEach((img) => {
    const el = img as HTMLImageElement;
    el.style.objectFit = "cover";
    el.style.objectPosition = "center";
  });

  return clone;
}

function getCaptureSource(): HTMLElement {
  const printEl = document.getElementById("resume-preview-print");
  const previewEl = document.getElementById("resume-preview");

  if (printEl && printEl.scrollHeight > 50) return printEl;
  if (previewEl) return previewEl;
  throw new Error("Resume preview element not found. Please fill in your resume details first.");
}

export async function generateResumePDF(
  personalFullName: string,
  _resumeElementId?: string
) {
  const downloadBtn = document.querySelector("[data-download-btn]") as HTMLButtonElement;
  const originalHTML =
    downloadBtn?.innerHTML || '<Download className="w-4 h-4" /><span>Download PDF</span>';

  let clone: HTMLElement | null = null;
  let pdfStyle: HTMLStyleElement | null = null;

  try {
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<span class="animate-spin">⏳</span> Generating PDF...';
    }

    const sourceElement = getCaptureSource();
    clone = preparePdfCaptureElement(sourceElement);
    document.body.appendChild(clone);

    pdfStyle = document.createElement("style");
    pdfStyle.textContent = `
      #resume-pdf-clone svg { display: block !important; overflow: visible !important; }
      #resume-pdf-clone .contact-icon-wrap { overflow: visible !important; display: flex !important; align-items: center !important; justify-content: center !important; }
      #resume-pdf-clone img { object-fit: cover !important; object-position: center !important; }
      #resume-pdf-clone * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    `;
    document.head.appendChild(pdfStyle);

    await waitForImages(clone);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const captureHeight = Math.max(clone.scrollHeight, clone.offsetHeight);
    if (captureHeight < 50) {
      throw new Error("Resume content is empty. Please add your resume details before downloading.");
    }

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: CAPTURE_WIDTH_PX,
      height: captureHeight,
      windowWidth: CAPTURE_WIDTH_PX,
      windowHeight: captureHeight,
      scrollX: 0,
      scrollY: 0,
    });

    document.body.removeChild(clone);
    clone = null;
    if (pdfStyle?.parentNode) pdfStyle.parentNode.removeChild(pdfStyle);
    pdfStyle = null;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [PDF_WIDTH_IN, PDF_HEIGHT_IN],
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const contentWidth = PDF_WIDTH_IN - PDF_MARGIN_IN * 2;
    const contentHeight = PDF_HEIGHT_IN - PDF_MARGIN_IN * 2;
    const imgHeightIn = (canvas.height * contentWidth) / canvas.width;

    if (imgHeightIn <= contentHeight) {
      pdf.addImage(imgData, "PNG", PDF_MARGIN_IN, PDF_MARGIN_IN, contentWidth, imgHeightIn);
    } else {
      const pageHeightPx = (contentHeight / contentWidth) * canvas.width;
      let offsetY = 0;
      let pageIndex = 0;

      while (offsetY < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - offsetY);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (!ctx) break;

        ctx.drawImage(
          canvas,
          0,
          offsetY,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );

        const pageImg = pageCanvas.toDataURL("image/png", 1.0);
        const sliceHeightIn = (sliceHeight / canvas.width) * contentWidth;

        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(pageImg, "PNG", PDF_MARGIN_IN, PDF_MARGIN_IN, contentWidth, sliceHeightIn);

        offsetY += sliceHeight;
        pageIndex += 1;
      }
    }

    const filename = personalFullName
      ? `${personalFullName.replace(/\s+/g, "_")}_Resume.pdf`
      : "Resume.pdf";

    pdf.save(filename);

    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalHTML;
    }
  } catch (error) {
    if (clone?.parentNode) clone.parentNode.removeChild(clone);
    if (pdfStyle?.parentNode) pdfStyle.parentNode.removeChild(pdfStyle);

    console.error("Error generating PDF:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    const usePrint = confirm(
      `Error generating PDF: ${errorMessage}\n\nWould you like to use your browser's print function instead? (Press OK to print, or Cancel to try again)`
    );

    if (usePrint) {
      window.print();
    }

    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalHTML;
    }
  }
}
