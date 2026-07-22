import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { colorToRgb } from "./colorUtils";

export async function generateResumePDF(
  personalFullName: string,
  resumeElementId: string = "resume-preview-print"
) {
  const downloadBtn = document.querySelector("[data-download-btn]") as HTMLButtonElement;
  const originalHTML = downloadBtn?.innerHTML || "Download PDF";

  try {
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<span class="animate-spin">⏳</span> Generating PDF...';
    }

    const resumeElement = document.getElementById(resumeElementId);
    if (!resumeElement) throw new Error("Resume preview element not found.");

    // Clone element to avoid layout issues
    const clone = resumeElement.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "8.5in";
    clone.style.height = "auto";
    clone.style.backgroundColor = "#ffffff";
    clone.style.padding = "0.45in";
    clone.style.visibility = "visible";
    clone.style.display = "block";
    clone.style.boxSizing = "border-box";
    clone.style.overflow = "visible";
    clone.style.clip = "auto";
    clone.style.clipPath = "none";
    clone.style.margin = "0";
    clone.style.whiteSpace = "normal";

    // Apply Tailwind -> RGB inline styles for PDF
    applyTemplateStyles(clone);

    document.body.appendChild(clone);
    await new Promise((r) => setTimeout(r, 500));

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    });

    document.body.removeChild(clone);

    const pdf = new jsPDF({ orientation: "portrait", unit: "in", format: [8.5, 11] });
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;

    let finalWidth = pdfWidth - 0.15;
    let finalHeight = finalWidth / ratio;

    if (finalHeight > pdfHeight - 0.15) {
      finalHeight = pdfHeight - 0.15;
      finalWidth = finalHeight * ratio;
    }

    const offsetX = (pdfWidth - finalWidth) / 2;
    const offsetY = (pdfHeight - finalHeight) / 2;
    pdf.addImage(imgData, "PNG", offsetX, offsetY, finalWidth, finalHeight);

    const filename = personalFullName ? `${personalFullName.replace(/\s+/g, "_")}_Resume.pdf` : "Resume.pdf";
    pdf.save(filename);

    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalHTML;
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalHTML;
    }
    alert(`Error generating PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
// In pdfGenerator.ts, update the applyTemplateStyles function:

function applyTemplateStyles(element: HTMLElement) {
  element.querySelectorAll("*").forEach((el: Element) => {
    const htmlEl = el as HTMLElement;
    const classes = htmlEl.className;
    if (typeof classes === "string") {
      Object.entries(colorToRgb).forEach(([className, rgb]) => {
        if (classes.includes(className)) {
          let styleKey = '';
          if (className.startsWith('bg-')) {
            styleKey = 'background-color';
          } else if (className.startsWith('border-')) {
            styleKey = 'border-color';
          } else if (className.startsWith('text-')) {
            styleKey = 'color';
          }

          const existingStyle = htmlEl.getAttribute("style") || "";
          if (styleKey && !existingStyle.includes(styleKey)) {
            htmlEl.setAttribute("style", `${existingStyle}; ${styleKey}: ${rgb};`);
          }
        }
      });
      
      // Also apply CSS variables
      if (classes.includes('resume-print')) {
        const accent = htmlEl.style.getPropertyValue('--accent');
        if (accent) {
          // Apply accent color to border elements
          const borderElements = htmlEl.querySelectorAll('[style*="border-color: var(--accent)"]');
          borderElements.forEach(borderEl => {
            borderEl.setAttribute('style', `border-color: ${accent}`);
          });
          
          // Apply accent color to background elements
          const bgElements = htmlEl.querySelectorAll('[style*="background: var(--accent)"]');
          bgElements.forEach(bgEl => {
            bgEl.setAttribute('style', `background: ${accent}`);
          });
        }
      }
    }
  });
}
