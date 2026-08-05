import { showAlert } from "@/components/ui/Dialog";
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

    // Dynamically load heavy PDF generation libraries on demand
    const [html2canvasModule, jsPDFModule] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const html2canvas = html2canvasModule.default;
    const { jsPDF } = jsPDFModule;

    // Clone element to avoid layout issues
    const clone = resumeElement.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "8.5in";
    clone.style.minHeight = "11in";
    clone.style.height = "auto";
    clone.style.backgroundColor = "#ffffff";
    clone.style.padding = "0";
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
    await new Promise((r) => setTimeout(r, 400));

    // Calculate actual height ensuring a minimum full page height (1056px = 11 inches at 96 DPI)
    const targetHeight = Math.max(clone.offsetHeight, clone.scrollHeight, 1056);
    const targetWidth = clone.scrollWidth || 816;

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: targetWidth,
      height: targetHeight,
      windowWidth: targetWidth,
      windowHeight: targetHeight,
    });

    document.body.removeChild(clone);

    const pdf = new jsPDF({ orientation: "portrait", unit: "in", format: [8.5, 11] });
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pageWidth = 8.5; // in inches
    const pageHeight = 11; // in inches

    // Total rendered height of the canvas in PDF inches
    const renderedHeightInInches = (canvas.height * pageWidth) / canvas.width;

    if (renderedHeightInInches <= pageHeight + 0.1) {
      // Standard 1-page resume
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    } else {
      // Multi-page resume for long content (lots of skills, experience, etc.)
      let heightLeft = renderedHeightInInches;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, renderedHeightInInches);
      heightLeft -= pageHeight;

      while (heightLeft > 0.1) {
        position -= pageHeight;
        pdf.addPage([pageWidth, pageHeight], "portrait");
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, renderedHeightInInches);
        heightLeft -= pageHeight;
      }
    }

    const filename = personalFullName ? `${personalFullName.replace(/\s+/g, "_")}_Resume.pdf` : "Resume.pdf";
    pdf.save(filename);

    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalHTML;
    }
  } catch (error) {
    console.error("PDF generation failed");
    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalHTML;
    }
    showAlert({
      title: "Could not download PDF",
      message: "We could not create your PDF right now. Please try again, or use your browser print dialog as a backup.",
      variant: "error",
    });
  }
}

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
