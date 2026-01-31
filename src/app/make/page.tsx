"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import {
  Save,
  Download,
  Eye,
  ArrowLeft,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { templates } from "@/lib/templateData";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  website: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
}

function ResumeBuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(
    templateParam ? parseInt(templateParam) : 1,
  );
  const templateData = templates.find(t => t.id === selectedTemplate) || templates[0];

  // Map accent colors to Tailwind classes for borders and headings
  const getTemplateColors = () => {
    switch(templateData.accentColor) {
      case 'purple':
        return { border: 'border-purple-300', text: 'text-purple-600', bgLight: 'bg-purple-50' };
      case 'blue':
        return { border: 'border-blue-300', text: 'text-blue-600', bgLight: 'bg-blue-50' };
      case 'indigo':
        return { border: 'border-indigo-300', text: 'text-indigo-600', bgLight: 'bg-indigo-50' };
      case 'orange':
        return { border: 'border-orange-300', text: 'text-orange-600', bgLight: 'bg-orange-50' };
      case 'amber':
        return { border: 'border-amber-300', text: 'text-amber-600', bgLight: 'bg-amber-50' };
      case 'cyan':
        return { border: 'border-cyan-300', text: 'text-cyan-600', bgLight: 'bg-cyan-50' };
      case 'gray':
        return { border: 'border-gray-300', text: 'text-gray-600', bgLight: 'bg-gray-50' };
      default:
        return { border: 'border-blue-300', text: 'text-blue-600', bgLight: 'bg-blue-50' };
    }
  };

  const colors = getTemplateColors();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    website: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "init-exp-1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  ]);
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "init-edu-1",
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    },
  ]);
  const [skills, setSkills] = useState<Skill[]>([
    { id: "init-skill-1", name: "" },
  ]);
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);

  // Refs for scroll containment to prevent scroll-chaining
  const leftRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const touchStartLeft = useRef<number | null>(null);
  const touchStartPreview = useRef<number | null>(null);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string | boolean,
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string,
  ) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  const addSkill = () => {
    setSkills([...skills, { id: crypto.randomUUID(), name: "" }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, value: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, name: value } : skill,
      ),
    );
  };

  // Prevent scroll-chaining between the left form and the right preview
  useEffect(() => {
    const attachGuard = (
      el: HTMLDivElement | null,
      touchRef: { current: number | null },
    ) => {
      if (!el) return () => {};

      const OVERSCROLL = 3; // px to allow
      let overscroll = 0;
      let resetTimer: number | null = null;

      const resetTransform = () => {
        if (resetTimer) {
          clearTimeout(resetTimer);
          resetTimer = null;
        }
        if (overscroll !== 0) {
          el.style.transition = "transform 150ms";
          el.style.transform = `translateY(0px)`;
          overscroll = 0;
          resetTimer = window.setTimeout(() => {
            el.style.transition = "";
            resetTimer = null;
          }, 160) as unknown as number;
        }
      };

      const applyOverscroll = (sign: number) => {
        overscroll = Math.max(-OVERSCROLL, Math.min(OVERSCROLL, overscroll + sign * 2));
        el.style.transform = `translateY(${overscroll}px)`;
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          resetTransform();
        }, 120) as unknown as number;
      };

      const onWheel = (e: WheelEvent) => {
        const delta = e.deltaY;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;
        const atTop = scrollTop === 0;
        const atBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= 1;

        if (scrollHeight <= clientHeight) {
          // Not scrollable: allow a tiny visual overscroll but prevent page from moving
          applyOverscroll(Math.sign(delta) || 1);
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
          // Overscroll at boundary: show a small rubber-band and prevent page scroll
          applyOverscroll(delta > 0 ? 1 : -1);
          e.preventDefault();
          e.stopPropagation();
        } else {
          // Scrolling within the element: allow internal scroll but stop propagation
          resetTransform();
          e.stopPropagation();
        }
      };

      const onTouchStart = (e: TouchEvent) => {
        touchRef.current = e.touches?.[0]?.clientY ?? null;
        if (resetTimer) {
          clearTimeout(resetTimer);
          resetTimer = null;
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        const startY = touchRef.current ?? 0;
        const currentY = e.touches?.[0]?.clientY ?? 0;
        const delta = startY - currentY; // positive => scroll down
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;
        const atTop = scrollTop === 0;
        const atBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= 1;

        if (scrollHeight <= clientHeight) {
          applyOverscroll(Math.sign(delta) || 1);
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
          applyOverscroll(delta > 0 ? 1 : -1);
          e.preventDefault();
          e.stopPropagation();
        } else {
          resetTransform();
          e.stopPropagation();
        }
      };

      const onTouchEnd = () => {
        resetTransform();
      };

      el.addEventListener("wheel", onWheel as any, { passive: false });
      el.addEventListener("touchstart", onTouchStart as any, { passive: true });
      el.addEventListener("touchmove", onTouchMove as any, { passive: false });
      el.addEventListener("touchend", onTouchEnd as any, { passive: true });

      return () => {
        if (resetTimer) clearTimeout(resetTimer);
        el.removeEventListener("wheel", onWheel as any);
        el.removeEventListener("touchstart", onTouchStart as any);
        el.removeEventListener("touchmove", onTouchMove as any);
        el.removeEventListener("touchend", onTouchEnd as any);
      };
    };

    const cleanLeft = attachGuard(leftRef.current, touchStartLeft);
    const cleanPreview = attachGuard(previewRef.current, touchStartPreview);

    return () => {
      cleanLeft();
      cleanPreview();
    };
  }, []);

  const handleDownload = async () => {
    const downloadBtn = document.querySelector(
      "[data-download-btn]",
    ) as HTMLButtonElement;
    const originalHTML =
      downloadBtn?.innerHTML ||
      '<Download className="w-4 h-4" /><span>Download PDF</span>';

    try {
      // Show loading state
      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML =
          '<span class="animate-spin">⏳</span> Generating PDF...';
      }

      // Check if resume has content
      if (
        !personalInfo.fullName &&
        !summary &&
        experiences.every((exp) => !exp.position) &&
        educations.every((edu) => !edu.school)
      ) {
        alert("Please fill in your resume details before downloading.");
        if (downloadBtn) {
          downloadBtn.disabled = false;
          downloadBtn.innerHTML = originalHTML;
        }
        return;
      }

      // Get the resume preview element
      const resumeElement = document.getElementById("resume-preview-print");
      if (!resumeElement) {
        throw new Error(
          "Resume preview element not found. Please fill in your resume details first.",
        );
      }

      // Create a clone of the element for better PDF rendering
      const clone = resumeElement.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = "8.5in";
      clone.style.backgroundColor = "#ffffff";
      clone.style.padding = "1in";
      clone.style.visibility = "visible";
      clone.style.display = "block";
      
      // Apply template colors to cloned element
      const applyTemplateStylesInline = (element: HTMLElement) => {
        // Get the actual border and text colors from the selected template
        const borderColorMap: { [key: string]: string } = {
          'border-purple-300': 'border-color: rgb(216, 180, 254)',
          'border-blue-300': 'border-color: rgb(147, 197, 253)',
          'border-indigo-300': 'border-color: rgb(165, 180, 252)',
          'border-orange-300': 'border-color: rgb(253, 186, 116)',
          'border-amber-300': 'border-color: rgb(252, 191, 73)',
          'border-cyan-300': 'border-color: rgb(165, 243, 252)',
          'border-gray-300': 'border-color: rgb(209, 213, 219)',
        };

        const textColorMap: { [key: string]: string } = {
          'text-purple-600': 'color: rgb(147, 51, 234)',
          'text-blue-600': 'color: rgb(37, 99, 235)',
          'text-indigo-600': 'color: rgb(79, 70, 229)',
          'text-orange-600': 'color: rgb(234, 88, 12)',
          'text-amber-600': 'color: rgb(217, 119, 6)',
          'text-cyan-600': 'color: rgb(8, 145, 178)',
          'text-gray-600': 'color: rgb(75, 85, 99)',
        };

        const badgeColorMap: { [key: string]: string } = {
          'bg-purple-100': 'background-color: rgb(245, 240, 255)',
          'bg-blue-100': 'background-color: rgb(239, 246, 255)',
          'bg-indigo-100': 'background-color: rgb(238, 242, 255)',
          'bg-orange-100': 'background-color: rgb(255, 237, 213)',
          'bg-amber-100': 'background-color: rgb(254, 243, 199)',
          'bg-cyan-100': 'background-color: rgb(207, 250, 254)',
          'bg-gray-100': 'background-color: rgb(243, 244, 246)',
          'text-purple-700': 'color: rgb(126, 34, 206)',
          'text-blue-700': 'color: rgb(29, 78, 216)',
          'text-indigo-700': 'color: rgb(67, 56, 202)',
          'text-orange-700': 'color: rgb(194, 65, 12)',
          'text-amber-700': 'color: rgb(180, 83, 9)',
          'text-cyan-700': 'color: rgb(14, 116, 144)',
          'text-gray-700': 'color: rgb(55, 65, 81)',
        };

        element.querySelectorAll('*').forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          const classes = htmlEl.className;
          if (typeof classes === 'string') {
            // Apply border colors
            Object.entries(borderColorMap).forEach(([className, style]) => {
              if (classes.includes(className)) {
                const existingStyle = htmlEl.getAttribute('style') || '';
                if (!existingStyle.includes('border-color')) {
                  htmlEl.setAttribute('style', existingStyle + '; ' + style);
                }
              }
            });

            // Apply text colors
            Object.entries(textColorMap).forEach(([className, style]) => {
              if (classes.includes(className)) {
                const existingStyle = htmlEl.getAttribute('style') || '';
                if (!existingStyle.includes('color')) {
                  htmlEl.setAttribute('style', existingStyle + '; ' + style);
                }
              }
            });

            // Apply badge colors
            Object.entries(badgeColorMap).forEach(([className, style]) => {
              if (classes.includes(className)) {
                const existingStyle = htmlEl.getAttribute('style') || '';
                if (className.startsWith('bg-') && !existingStyle.includes('background-color')) {
                  htmlEl.setAttribute('style', existingStyle + '; ' + style);
                } else if (className.startsWith('text-') && !existingStyle.includes('color')) {
                  const colorStyle = style;
                  htmlEl.setAttribute('style', existingStyle + '; ' + colorStyle);
                }
              }
            });
          }
        });
      };

      applyTemplateStylesInline(clone);
      
      document.body.appendChild(clone);

      // Wait for any images to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Convert to canvas
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

      // Remove clone
      document.body.removeChild(clone);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11],
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;

      // Scale to fit page width
      let finalWidth = pdfWidth - 0.2; // Leave small margins
      let finalHeight = finalWidth / ratio;

      // If content is taller than one page, add pages
      if (finalHeight > pdfHeight - 0.2) {
        finalHeight = pdfHeight - 0.2;
        finalWidth = finalHeight * ratio;

        const totalPages = Math.ceil(
          (finalHeight * (imgHeight / finalHeight)) / (pdfHeight - 0.2),
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
            imgHeight - sourceY,
          );

          // Create a temporary canvas for this page
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
              pageHeight,
            );
          }
        }
      } else {
        pdf.addImage(imgData, "PNG", 0.1, 0.1, finalWidth, finalHeight);
      }

      // Generate filename
      const filename = personalInfo.fullName
        ? `${personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
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

      // Offer browser print as fallback
      const usePrint = confirm(
        `Error generating PDF: ${errorMessage}\n\nWould you like to use your browser's print function instead? (Press OK to print, or Cancel to try again)`,
      );

      if (usePrint) {
        window.print();
      }

      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalHTML;
      }
    }
  };

  const handleSave = () => {
    const resumeData = {
      template: selectedTemplate,
      personalInfo,
      experiences,
      educations,
      skills,
      summary,
    };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  };

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      alert(
        "Please enter a prompt describing your background, experience, and skills.",
      );
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          existingData: {
            personalInfo,
            experiences,
            educations,
            skills,
            summary,
          },
        }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = "Failed to generate resume";
        let errorDetails = "";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;

          // Properly format error details
          if (errorData.details) {
            if (typeof errorData.details === "string") {
              errorDetails = errorData.details;
            } else if (typeof errorData.details === "object") {
              // If it's an object, try to extract meaningful info
              if (errorData.details.error?.message) {
                errorDetails = errorData.details.error.message;
              } else if (errorData.details.message) {
                errorDetails = errorData.details.message;
              } else {
                errorDetails = JSON.stringify(errorData.details, null, 2);
              }
            }
          }

          if (errorData.rawResponse && !errorDetails) {
            errorDetails =
              typeof errorData.rawResponse === "string"
                ? errorData.rawResponse
                : JSON.stringify(errorData.rawResponse, null, 2);
          }
        } catch (e) {
          // If JSON parsing fails, try to get text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (textError) {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
        }
        const fullError = errorDetails
          ? `${errorMessage}\n\nDetails: ${errorDetails}`
          : errorMessage;
        throw new Error(fullError);
      }

      // Parse JSON response
      let result;
      try {
        const responseText = await response.text();
        if (!responseText || responseText.trim() === "") {
          throw new Error("Empty response from server");
        }
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid response from server. Please try again.");
      }

      if (result.success && result.data) {
        // Update personal info
        if (result.data.personalInfo) {
          setPersonalInfo((prev) => ({ ...prev, ...result.data.personalInfo }));
        }

        // Update summary
        if (result.data.summary) {
          setSummary(result.data.summary);
        }

        // Update experiences
        if (result.data.experiences && Array.isArray(result.data.experiences)) {
          const newExperiences = result.data.experiences.map(
            (exp: Omit<Experience, "id">) => ({
              ...exp,
              id: Date.now().toString() + Math.random().toString(),
              endDate: exp.endDate === "Present" ? "" : exp.endDate,
              current: exp.endDate === "Present" || exp.current,
            }),
          );
          setExperiences(newExperiences);
        }

        // Update educations
        if (result.data.educations && Array.isArray(result.data.educations)) {
          const newEducations = result.data.educations.map(
            (edu: Omit<Education, "id">) => ({
              ...edu,
              id: Date.now().toString() + Math.random().toString(),
            }),
          );
          setEducations(newEducations);
        }

        // Update skills
        if (result.data.skills && Array.isArray(result.data.skills)) {
          const newSkills = result.data.skills.map((skillName: string) => ({
            id: Date.now().toString() + Math.random().toString(),
            name: skillName,
          }));
          setSkills(newSkills);
        }

        setShowAiModal(false);
        setAiPrompt("");
      } else {
        throw new Error("Invalid response from AI");
      }
      // Inside src/app/make/page.tsx -> handleGenerateWithAI function
    } catch (error) {
      // 1. Log the full error to the console instead of Alerting
      console.error("=============== RESUME GENERATION ERROR ===============");
      console.error(error);

      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;

        // Try to parse JSON details if present in the error message
        try {
          const detailsMatch = errorMessage.match(/Details:\s*(.+)/);
          if (detailsMatch) {
            console.error("--- Error Details JSON ---");
            const detailsStr = detailsMatch[1];
            console.error(detailsStr); // Log just the JSON part
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
      console.error("=====================================================");

      // Optional: You can set a state here to show a small red text in the UI instead
      // setUiError("Failed to generate. Check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      const data = JSON.parse(saved);
      setPersonalInfo(data.personalInfo || personalInfo);
      setExperiences(data.experiences || experiences);
      setEducations(data.educations || educations);
      setSkills(data.skills || skills);
      setSummary(data.summary || summary);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 pt-24 pb-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Link
              href="/templates"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors font-poppins"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Templates</span>
            </Link>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setShowAiModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-poppins shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Generate with AI</span>
                <span className="sm:hidden">AI Generate</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-white text-slate-700 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-all duration-200 font-poppins whitespace-nowrap"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                data-download-btn
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-indigo-600 hover:via-pink-600 hover:to-amber-600 transition-all duration-200 font-montserrat shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:overflow-hidden lg:h-[calc(100vh-200px)]">
            {/* Left Side - Form */}
            <div ref={leftRef} className="space-y-3 overflow-y-auto lg:pr-2 box-border">
              {/* AI Generate Banner */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg border border-purple-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg font-montserrat">
                        Generate Resume with AI
                      </h3>
                      <p className="text-white/90 text-sm font-poppins">
                        Let AI create your resume in seconds
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 font-montserrat shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Now</span>
                  </button>
                </div>
              </div>

              {/* Template Selection */}
              <div className={`bg-white rounded-2xl p-4 shadow-lg border-2 ${colors.border}`}>
                <h2 className="text-xl font-bold text-slate-900 mb-4 font-montserrat flex items-center justify-between">
                  <span>Select Template</span>
                  <span className="text-sm font-normal text-slate-500">
                    6 templates
                  </span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5, 6].map((template) => (
                    <button
                      key={template}
                      onClick={() => setSelectedTemplate(template)}
                      className={`group relative p-3 border-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                        selectedTemplate === template
                          ? `border-${templateData.accentColor}-600 ${colors.bgLight} ring-2 ring-${templateData.accentColor}-200 shadow-lg`
                          : `${colors.bgLight} border-${templateData.accentColor}-300 hover:shadow-md`
                      }`}
                      title={`Template ${template}`}
                    >
                      <div className="bg-white rounded-lg shadow-inner p-2 overflow-hidden">
                        <img
                          src={`/template${template}.png`}
                          alt={`Template ${template}`}
                          className="w-full h-32 sm:h-40 object-contain rounded"
                          onError={(e) => {
                            // Fallback to template 1 if image doesn't exist
                            (e.target as HTMLImageElement).src =
                              "/template1.png";
                          }}
                        />
                      </div>
                      {selectedTemplate === template && (
                        <div className={`absolute top-1 right-1 w-5 h-5 bg-${templateData.accentColor}-600 rounded-full flex items-center justify-center`}>
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
                <h2 className="text-xl font-bold text-slate-900 mb-4 font-montserrat flex items-center space-x-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Personal Information</span>
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={personalInfo.address}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn Profile"
                    value={personalInfo.linkedin}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        linkedin: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="GitHub Profile"
                    value={personalInfo.github}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        github: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Website"
                    value={personalInfo.website}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        website: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
                <h2 className="text-xl font-bold text-slate-900 mb-4 font-montserrat flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <span>Professional Summary</span>
                </h2>
                <textarea
                  placeholder="Write a brief summary of your professional background..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins resize-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Work Experience */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                    </div>
                    <span>Work Experience</span>
                  </h2>
                  <button
                    onClick={addExperience}
                    className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="border border-blue-200 rounded-lg p-4 space-y-3"
                    >
                      {index > 0 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="float-right text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, "position", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Start Date (e.g., Jan 2020)"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="text"
                          placeholder={
                            exp.current
                              ? "Current"
                              : "End Date (e.g., Jan 2023)"
                          }
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          disabled={exp.current}
                          className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins disabled:bg-blue-100 text-slate-900 placeholder:text-slate-400 disabled:text-slate-500"
                        />
                      </div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "current",
                              e.target.checked,
                            )
                          }
                          className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600 font-poppins">
                          I currently work here
                        </span>
                      </label>
                      <textarea
                        placeholder="Job description and achievements..."
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins resize-none text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                    </div>
                    <span>Education</span>
                  </h2>
                  <button
                    onClick={addEducation}
                    className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {educations.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="border border-blue-200 rounded-lg p-4 space-y-3"
                    >
                      {index > 0 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="float-right text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) =>
                          updateEducation(edu.id, "school", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Degree (e.g., Bachelor's)"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) =>
                          updateEducation(edu.id, "field", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "startDate", e.target.value)
                          }
                          className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                        />
                        <input
                          type="text"
                          placeholder="End Date (or Expected)"
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "endDate", e.target.value)
                          }
                          className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) =>
                          updateEducation(edu.id, "gpa", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span>Skills</span>
                  </h2>
                  <button
                    onClick={addSkill}
                    className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, e.target.value)}
                        className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
                      />
                      {index > 0 && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Preview */}
            <div className="lg:flex lg:flex-col lg:overflow-visible">
                  <div ref={previewRef} className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-indigo-200 overflow-y-auto pb-1 box-border"
                    style={{ maxHeight: 'calc(100vh - 200px)', scrollBehavior: 'smooth', boxSizing: 'border-box' }}>
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-slate-700 mb-2 font-montserrat">
                    Resume Preview
                  </h3>
                  <p className="text-sm text-slate-500 font-poppins">
                    Template {selectedTemplate}
                  </p>
                </div>
                {/* Hidden print version for PDF export */}
                <div
                  id="resume-preview-print"
                  className="hidden print:block resume-print bg-white p-8"
                  style={{ width: "8.5in", minHeight: "11in" }}
                >
                  {/* Personal Info Preview */}
                  {personalInfo.fullName && (
                    <div className={`text-center mb-6 border-b-2 ${colors.border} pb-4`}>
                      <h1 className="text-3xl font-bold text-slate-900 mb-2 font-montserrat">
                        {personalInfo.fullName}
                      </h1>
                      <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600 font-poppins">
                        {personalInfo.email && (
                          <span>{personalInfo.email}</span>
                        )}
                        {personalInfo.phone && (
                          <span>• {personalInfo.phone}</span>
                        )}
                        {personalInfo.address && (
                          <span>• {personalInfo.address}</span>
                        )}
                      </div>
                      <div className={`flex flex-wrap justify-center gap-3 text-sm ${colors.text} mt-2 font-poppins`}>
                        {personalInfo.linkedin && <span>LinkedIn</span>}
                        {personalInfo.github && <span>• GitHub</span>}
                        {personalInfo.website && <span>• Website</span>}
                      </div>
                    </div>
                  )}

                  {/* Summary Preview */}
                  {summary && (
                    <div className="mb-6">
                      <h2 className={`text-lg font-semibold text-slate-900 mb-2 font-montserrat border-b ${colors.border} pb-1`}>
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 text-sm leading-relaxed font-poppins">
                        {summary}
                      </p>
                    </div>
                  )}

                  {/* Experience Preview */}
                  {experiences.some((exp) => exp.position || exp.company) && (
                    <div className="mb-6">
                      <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
                        Work Experience
                      </h2>
                      <div className="space-y-4">
                        {experiences
                          .filter((exp) => exp.position || exp.company)
                          .map((exp) => (
                            <div key={exp.id} className="mb-4">
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <h3 className="font-semibold text-slate-900 font-montserrat">
                                    {exp.position}
                                  </h3>
                                  <p className="text-gray-700 text-sm font-poppins">
                                    {exp.company}
                                  </p>
                                </div>
                                <span className="text-sm text-slate-600 font-poppins whitespace-nowrap ml-4">
                                  {exp.startDate} -{" "}
                                  {exp.current ? "Present" : exp.endDate}
                                </span>
                              </div>
                              {exp.description && (
                                <p className="text-slate-600 text-sm mt-1 font-poppins whitespace-pre-line">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Education Preview */}
                  {educations.some((edu) => edu.school || edu.degree) && (
                    <div className="mb-6">
                      <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
                        Education
                      </h2>
                      <div className="space-y-3">
                        {educations
                          .filter((edu) => edu.school || edu.degree)
                          .map((edu) => (
                            <div key={edu.id} className="mb-3">
                              <h3 className="font-semibold text-slate-900 font-montserrat">
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </h3>
                              <p className="text-gray-700 text-sm font-poppins">
                                {edu.school}
                              </p>
                              <div className="flex justify-between text-sm text-slate-600 font-poppins">
                                <span>
                                  {edu.startDate} - {edu.endDate}
                                </span>
                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Preview */}
                  {skills.some((skill) => skill.name) && (
                    <div className="mt-6">
                      <h2 className={`text-lg font-semibold text-slate-900 mb-4 font-montserrat border-b ${colors.border} pb-2`}>
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-3 items-center">
                        {skills
                          .filter((skill) => skill.name)
                          .map((skill) => {
                            const badgeClass = templateData.badgeColor;
                            return (
                              <span
                                key={skill.id}
                                className={`${badgeClass} px-4 py-2 rounded-lg text-sm font-semibold font-poppins inline-block whitespace-nowrap`}
                              >
                                {skill.name}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
                {/* Visible preview for screen */}
                <div className="space-y-6 border-t pt-6 print:hidden">
                  {/* Personal Info Preview */}
                  {personalInfo.fullName && (
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-slate-900 mb-2 font-montserrat">
                        {personalInfo.fullName}
                      </h1>
                      <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600 font-poppins">
                        {personalInfo.email && (
                          <span>{personalInfo.email}</span>
                        )}
                        {personalInfo.phone && (
                          <span>{personalInfo.phone}</span>
                        )}
                        {personalInfo.address && (
                          <span>{personalInfo.address}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 text-sm text-blue-600 mt-2 font-poppins">
                        {personalInfo.linkedin && <span>LinkedIn</span>}
                        {personalInfo.github && <span>GitHub</span>}
                        {personalInfo.website && <span>Website</span>}
                      </div>
                    </div>
                  )}

                  {/* Summary Preview */}
                  {summary && (
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-2 font-montserrat border-b pb-1">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 text-sm leading-relaxed font-poppins">
                        {summary}
                      </p>
                    </div>
                  )}

                  {/* Experience Preview */}
                  {experiences.some((exp) => exp.position || exp.company) && (
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b pb-1">
                        Work Experience
                      </h2>
                      <div className="space-y-4">
                        {experiences
                          .filter((exp) => exp.position || exp.company)
                          .map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <h3 className="font-semibold text-slate-900 font-montserrat">
                                    {exp.position}
                                  </h3>
                                  <p className="text-gray-700 text-sm font-poppins">
                                    {exp.company}
                                  </p>
                                </div>
                                <span className="text-sm text-slate-600 font-poppins">
                                  {exp.startDate} -{" "}
                                  {exp.current ? "Present" : exp.endDate}
                                </span>
                              </div>
                              {exp.description && (
                                <p className="text-slate-600 text-sm mt-1 font-poppins whitespace-pre-line">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Education Preview */}
                  {educations.some((edu) => edu.school || edu.degree) && (
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b pb-1">
                        Education
                      </h2>
                      <div className="space-y-3">
                        {educations
                          .filter((edu) => edu.school || edu.degree)
                          .map((edu) => (
                            <div key={edu.id}>
                              <h3 className="font-semibold text-slate-900 font-montserrat">
                                {edu.degree} in {edu.field}
                              </h3>
                              <p className="text-gray-700 text-sm font-poppins">
                                {edu.school}
                              </p>
                              <div className="flex justify-between text-sm text-slate-600 font-poppins">
                                <span>
                                  {edu.startDate} - {edu.endDate}
                                </span>
                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Preview */}
                  {skills.some((skill) => skill.name) && (
                    <div className="mt-6 relative pr-2">
                      <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-amber-500 rounded-r pointer-events-none"></div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-4 font-montserrat border-b pb-2">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-3 items-center">
                        {skills
                          .filter((skill) => skill.name)
                          .map((skill) => (
                            <span
                              key={skill.id}
                              className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm font-semibold font-poppins inline-block whitespace-nowrap"
                            >
                              {skill.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {!personalInfo.fullName &&
                    !summary &&
                    experiences.every((exp) => !exp.position) && (
                      <div className="text-center py-12 text-gray-400 font-poppins">
                        <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>
                          Start filling out the form to see your resume preview
                          here
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Generation Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <span>Generate Resume with AI</span>
              </h2>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setAiPrompt("");
                }}
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="text-slate-600 mb-4 font-poppins">
              Describe your professional background, experience, education, and
              skills. Our AI will generate a complete resume for you.
            </p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: I'm a software engineer with 5 years of experience in web development. I have worked at Tech Corp as a Senior Developer from 2020 to 2023, where I built React applications and led a team of 3 developers. I have a Bachelor's degree in Computer Science from State University (2016-2020). My skills include JavaScript, React, Node.js, TypeScript, and AWS. I'm looking for a full-stack developer position."
              rows={8}
              className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins resize-none mb-4 text-slate-900 placeholder:text-slate-400"
            />
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGenerateWithAI}
                disabled={isGenerating || !aiPrompt.trim()}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-montserrat shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Resume</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setAiPrompt("");
                }}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors font-poppins"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
     
      <Footer />
      
    </>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-poppins">Loading...</p>
          </div>
        </div>
      }
    >
      <ResumeBuilderContent />
    </Suspense>
  );
}
