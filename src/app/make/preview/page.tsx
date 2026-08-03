"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Download, Edit3, LayoutTemplate, RotateCcw, Check, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { templates } from "@/lib/templateData";
import ResumePreview from "@/components/ResumePreview";
import type { PersonalInfo, Experience, Education, Skill, Language, Reference, ProfilePicture } from "@/components/types";
import { generateResumePDF } from "@/lib/pdfGenerator";

function ResumePreviewPageContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(
    templateParam ? parseInt(templateParam) : 1
  );
  const router = useRouter();
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.dev",
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "init-exp-1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "2020-01",
      endDate: "2023-12",
      description: "Developed and maintained web applications using React and Node.js. Led a team of 3 developers and implemented CI/CD pipelines.",
      current: false,
    },
  ]);
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "init-edu-1",
      school: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014",
      endDate: "2018",
      gpa: "3.8",
    },
  ]);
  const [skills, setSkills] = useState<Skill[]>([
    { id: "init-skill-1", name: "JavaScript" },
    { id: "init-skill-2", name: "React" },
    { id: "init-skill-3", name: "Node.js" },
    { id: "init-skill-4", name: "TypeScript" },
  ]);
  const [languages, setLanguages] = useState<Language[]>([
    { id: "init-lang-1", name: "English", proficiency: "Native / Fluent" },
  ]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [summary, setSummary] = useState("Experienced software engineer with 5+ years in full-stack development.");
  const [profile, setProfile] = useState<ProfilePicture | null>(null);

  // Load saved resume data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.personalInfo) setPersonalInfo(data.personalInfo);
        if (data.experiences) setExperiences(data.experiences);
        if (data.educations) setEducations(data.educations);
        if (data.skills) setSkills(data.skills);
        if (data.languages) setLanguages(data.languages);
        if (data.references) setReferences(data.references);
        if (data.summary !== undefined) setSummary(data.summary);
        if (data.profile !== undefined) setProfile(data.profile);
        if (data.template && !templateParam) {
          setSelectedTemplate(data.template);
        }
      }
    } catch (e) {
      console.error("Failed to parse stored resume data:", e);
    }
  }, [templateParam]);

  // Sync selected template with param
  useEffect(() => {
    if (templateParam) {
      const num = parseInt(templateParam);
      if (!isNaN(num) && num !== selectedTemplate) {
        setSelectedTemplate(num);
      }
    }
  }, [templateParam]);

  // Set responsive initial zoom level: 50% for mobile (<640px), 90% for tablet (640-1023px), 100% for desktop
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) {
        setZoomLevel(50);
      } else if (width < 1024) {
        setZoomLevel(90);
      } else {
        setZoomLevel(100);
      }
    }
  }, []);

  const handleToggleFit = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const defaultZoom = width < 640 ? 50 : width < 1024 ? 90 : 100;
      setZoomLevel(zoomLevel === 100 ? defaultZoom : 100);
    } else {
      setZoomLevel(zoomLevel === 100 ? 50 : 100);
    }
  };

  const handleDownload = async () => {
    await generateResumePDF(personalInfo.fullName, "resume-preview-print");
  };

  const handleEditData = () => {
    router.push(`/make?template=${selectedTemplate}`);
  };

  const handleStartOver = () => {
    if (confirm("Are you sure you want to start over? All your entered resume information will be cleared.")) {
      try {
        localStorage.removeItem("resumeData");
      } catch (e) {}
      router.push("/make");
    }
  };

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
    setShowTemplateModal(false);
    try {
      localStorage.setItem("selectedTemplate", String(templateId));
      const saved = localStorage.getItem("resumeData");
      if (saved) {
        const data = JSON.parse(saved);
        data.template = templateId;
        localStorage.setItem("resumeData", JSON.stringify(data));
      }
    } catch (e) {}
    router.replace(`/make/preview?template=${templateId}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-24 pb-16">
        {/* Title Header matching user screenshot */}
        <div className="text-center pt-4 pb-2 px-4 no-print">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-montserrat tracking-tight">
            Your Resume is Ready!
          </h1>
          <p className="text-slate-500 font-poppins mt-2 text-sm sm:text-base font-normal">
            Review the AI-polished version below.
          </p>
        </div>

        {/* Single Action Toolbar Container */}
        <div className="max-w-4xl mx-auto my-6 px-4 no-print">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              data-download-btn
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold font-montserrat shadow-sm hover:shadow-md transition-all duration-200 text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleEditData}
              className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg font-semibold font-poppins transition-all duration-200 text-sm shadow-xs cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Edit Data</span>
            </button>

            <button
              onClick={() => setShowTemplateModal(true)}
              className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg font-semibold font-poppins transition-all duration-200 text-sm shadow-xs cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4 text-slate-500" />
              <span>Change Template</span>
            </button>

            <button
              onClick={handleStartOver}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-semibold font-poppins transition-all duration-200 text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Start over</span>
            </button>
          </div>
        </div>

        {/* Zoom Controls Bar */}
        <div className="max-w-[950px] mx-auto px-4 mb-3 flex items-center justify-between sm:justify-end gap-2 no-print">
          <span className="sm:hidden text-[11px] text-slate-500 font-poppins">Scroll sideways or zoom to view sheet</span>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 shadow-2xs rounded-lg px-2.5 py-1">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(30, prev - 10))}
              disabled={zoomLevel <= 30}
              className="text-slate-600 hover:text-slate-900 disabled:opacity-30 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold text-slate-700 font-montserrat min-w-[2.8rem] text-center select-none">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
              disabled={zoomLevel >= 130}
              className="text-slate-600 hover:text-slate-900 disabled:opacity-30 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-3.5 bg-slate-200 mx-0.5" />

            <button
              type="button"
              onClick={handleToggleFit}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              title={zoomLevel === 100 ? "Fit to Screen" : "100% Full View"}
            >
              <Maximize2 className="w-3 h-3" />
              <span>{zoomLevel === 100 ? "Fit" : "100%"}</span>
            </button>
          </div>
        </div>

        {/* Centered Resume Preview Sheet Container */}
        <div className="max-w-[950px] mx-auto px-2 sm:px-4 resume-card-wrapper overflow-x-auto pb-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 sm:p-8 flex justify-center overflow-x-auto min-w-full">
            <div
              style={{
                width: "8.5in",
                minWidth: "8.5in",
                transform: zoomLevel === 100 ? undefined : `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
                transition: "transform 0.2s ease-in-out",
                marginBottom: zoomLevel < 100 ? `-${(100 - zoomLevel) * 10.56}px` : undefined,
              }}
            >
              <ResumePreview
                personalInfo={personalInfo}
                experiences={experiences}
                educations={educations}
                skills={skills}
                languages={languages}
                references={references}
                summary={summary}
                profile={profile}
                template={Number(selectedTemplate)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Change Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-montserrat">Choose a Resume Template</h2>
                <p className="text-xs text-slate-500 font-poppins mt-0.5">Select a design template to preview your resume</p>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
              {templates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className={`group relative p-3 border-2 rounded-xl transition-all duration-200 text-left hover:scale-[1.02] cursor-pointer ${
                    selectedTemplate === tmpl.id
                      ? "border-slate-900 bg-slate-50 shadow-md ring-2 ring-slate-200"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="bg-slate-50 rounded-lg p-1.5 overflow-hidden aspect-[8.5/11] mb-2.5 border border-slate-100 flex items-center justify-center">
                    <Image
                      src={`/template${tmpl.id}.png`}
                      alt={`Template ${tmpl.id}`}
                      className="w-full h-full object-contain"
                      width={200}
                      height={260}
                      unoptimized
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-900 font-montserrat truncate">Template {tmpl.id}</p>
                  <p className="text-[11px] text-slate-500 font-poppins truncate">{tmpl.name}</p>

                  {selectedTemplate === tmpl.id && (
                    <div className="absolute top-2 right-2 bg-slate-900 text-white rounded-full p-1 shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function ResumePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600 font-poppins">Loading preview...</p>
          </div>
        </div>
      }
    >
      <ResumePreviewPageContent />
    </Suspense>
  );
}
