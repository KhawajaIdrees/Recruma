import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { colorToRgb } from "./colorUtils";

export async function generateResumePDF(
  personalFullName: string,
  resumeElementId: string = "resume-preview-print"
) {
  const downloadBtn = document.querySelector(
    "[data-download-btn]"
  ) as HTMLButtonElement;
  const originalHTML =
    downloadBtn?.innerHTML ||
    '<Download className="w-4 h-4" /><span>Download PDF</span>';

  try {
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<span class="animate-spin">⏳</span> Generating PDF...';
    }

    const resumeElement = document.getElementById(resumeElementId);
    if (!resumeElement) {
      throw new Error(
        "Resume preview element not found. Please fill in your resume details first."
      );
    }

    const clone = resumeElement.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "8.5in";
    clone.style.backgroundColor = "#ffffff";
    clone.style.padding = "1in";
    clone.style.visibility = "visible";
    clone.style.display = "block";

    applyTemplateStyles(clone);
    document.body.appendChild(clone);

    await new Promise((resolve) => setTimeout(resolve, 500));

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

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [8.5, 11],
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;

    let finalWidth = pdfWidth - 0.2;
    let finalHeight = finalWidth / ratio;

    if (finalHeight > pdfHeight - 0.2) {
      finalHeight = pdfHeight - 0.2;
      finalWidth = finalHeight * ratio;

      const totalPages = Math.ceil(
        (finalHeight * (imgHeight / finalHeight)) / (pdfHeight - 0.2)
      );
      let yPosition = 0.1;

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
          yPosition = 0.1;
        }

        const sourceY = i * (pdfHeight - 0.2) * (imgHeight / finalHeight);
        const sourceHeight = Math.min(
          (pdfHeight - 0.2) * (imgHeight / finalHeight),
          imgHeight - sourceY
        );

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(canvas, 0, -sourceY, imgWidth, imgHeight);
          const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
          const pageHeight = (sourceHeight / imgHeight) * finalHeight;
          pdf.addImage(
            pageImgData,
            "PNG",
            0.1,
            yPosition,
            finalWidth,
            pageHeight
          );
        }
      }
    } else {
      pdf.addImage(imgData, "PNG", 0.1, 0.1, finalWidth, finalHeight);
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
    console.error("Error generating PDF:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

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
            htmlEl.setAttribute("style", existingStyle + "; " + style);
          }
        }
      });
    }
  });
}
