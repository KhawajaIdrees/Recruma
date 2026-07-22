"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Save, Download, ArrowLeft, Sparkles, ChevronDown } from "lucide-react";
import { templates } from "@/lib/templateData";
import ResumePreview from "@/components/ResumePreview";
import PersonalInfoSection from "@/components/PersonalInfoSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import SummarySection from "@/components/SummarySection";
import ProfilePictureSection from "@/components/ProfilePictureSection";
import type { PersonalInfo, Experience, Education, Skill, ProfilePicture } from "@/components/types";
import { getTemplateColors } from "@/lib/colorUtils";
import { generateResumePDF } from "@/lib/pdfGenerator";

const SAMPLE_AI_PROMPT = `My name is Richard Sanchez and I am a Marketing Manager based in 123 Anywhere St., Any City at phone +123-456-7890, email hello@reallygreatsite.com, and website www.reallygreatsite.com. I am a results-driven marketing professional with 8+ years of experience building brand awareness, leading cross-functional campaigns, and driving measurable revenue growth across B2B and B2C markets. I specialize in digital marketing strategy, content development, and data-driven campaign optimization.

I currently work at Borcelle Studio as Marketing Manager & Specialist from 2030 to Present, where I lead integrated marketing campaigns across social, email, and paid channels; manage a $500K annual marketing budget and improve ROI by 35%; and collaborate with sales and product teams to launch new offerings. Before that, I was Marketing Manager at Fauget Studio from 2025 to 2029, where I developed brand positioning, grew social engagement by 120%, and managed PR and partnership initiatives. I also worked as Marketing Specialist at Studio Shodwe from 2024 to 2025, supporting campaign execution, market research, and client reporting.

I have a Master of Business Management from Wardiere University School of Business (2029-2031) with GPA 3.8/4.0, and a Bachelor of Commerce in Marketing from Wardiere University (2025-2029) with GPA 3.6/4.0.

My skills include Project Management, Public Relations, Teamwork, Time Management, Leadership, Effective Communication, Critical Thinking, Digital Marketing, SEO, Google Analytics, Content Strategy, and Brand Development. I speak English (Fluent), French (Fluent), Spanish (Intermediate), and German (Basic). I am seeking a senior marketing leadership role where I can drive brand growth and mentor high-performing teams.`;

function ResumeBuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(
    templateParam ? parseInt(templateParam) : 1,
  );
  const templateData = templates.find(t => t.id === selectedTemplate) || templates[0];
  const colors = getTemplateColors(templateData.accentColor);
  const router = useRouter();

  // Keep selectedTemplate in sync with the `template` query param
  useEffect(() => {
    const param = searchParams.get("template");
    const num = param ? parseInt(param) : NaN;
    if (!isNaN(num) && num !== selectedTemplate) {
      setSelectedTemplate(num);
    }
  }, [searchParams]);

  // Also read directly from window.location on mount for robustness
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const param = params.get("template");
      const num = param ? parseInt(param) : NaN;
      if (!isNaN(num) && num !== selectedTemplate) {
        setSelectedTemplate(num);
      }
    } catch (e) {
      // ignore in non-browser environments
    }
  }, []);

  // If user navigates away and back, prefer query param, else fall back to saved template
  useEffect(() => {
    try {
      const saved = localStorage.getItem("selectedTemplate");
      if (!searchParams.get("template") && saved) {
        const num = parseInt(saved);
        if (!isNaN(num) && num !== selectedTemplate) setSelectedTemplate(num);
      }
    } catch (e) {}
  }, []);
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
  {
    id: "init-exp-2",
    company: "Startup XYZ",
    position: "Full Stack Developer",
    startDate: "2018-06",
    endDate: "2019-12",
    description: "Built responsive web applications and RESTful APIs. Collaborated with designers to create user-friendly interfaces.",
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
  { id: "init-skill-5", name: "Python" },
  { id: "init-skill-6", name: "AWS" },
]);
const [summary, setSummary] = useState("Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable web applications and mentoring junior developers. Proven track record of delivering high-quality software solutions in agile environments.");
  const [profile, setProfile] = useState<ProfilePicture | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);

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

  const handleDownload = async () => {
    if (
      !personalInfo.fullName &&
      !summary &&
      experiences.every((exp) => !exp.position) &&
      educations.every((edu) => !edu.school)
    ) {
      alert("Please fill in your resume details before downloading.");
      return;
    }
    await generateResumePDF(personalInfo.fullName);
  };

  const handleSave = () => {
    const resumeData = {
      template: selectedTemplate,
      personalInfo,
      experiences,
      educations,
      skills,
      summary,
      profile,
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
      console.error("Resume generation error:", error);

      let errorMessage = "Failed to generate resume. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      alert(errorMessage);
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
      setProfile(data.profile || null);
    }
  }, []);

  // Require minimal personal info before allowing template selection
  const canSelectTemplate = Boolean(personalInfo.fullName && (personalInfo.email || personalInfo.phone));

  const TemplateSelectionCard = () => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative z-0">
      <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat">Select Template</h2>
      {!canSelectTemplate && (
        <p className="text-xs text-rose-600 mb-3 font-poppins">
          Enter your full name and either email or phone to enable template selection.
        </p>
      )}

      <button
        type="button"
        onClick={() => canSelectTemplate && setTemplateDropdownOpen((open) => !open)}
        disabled={!canSelectTemplate}
        className={`w-full flex items-center gap-3 p-3 border-2 rounded-lg transition-all duration-200 ${
          selectedTemplate
            ? "border-slate-900 bg-slate-50 shadow-md ring-2 ring-slate-200"
            : "border-slate-200 bg-white hover:border-slate-300"
        } ${!canSelectTemplate ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-sm"}`}
      >
        <div className="bg-slate-50 rounded p-1 overflow-hidden w-16 h-16 shrink-0">
          <img
            src={`/template${selectedTemplate}.png`}
            alt={`Template ${selectedTemplate}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/template1.png";
            }}
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-semibold text-slate-900 font-montserrat">Template {selectedTemplate}</p>
          <p className="text-xs text-slate-500 font-poppins truncate">{templateData.name}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-600 shrink-0 transition-transform duration-200 ${
            templateDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {templateDropdownOpen && canSelectTemplate && (
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-200">
          {[1, 2, 3, 4, 5, 6].map((template) => (
            <button
              key={template}
              type="button"
              onClick={() => {
                setSelectedTemplate(template);
                setTemplateDropdownOpen(false);
                try {
                  localStorage.setItem("selectedTemplate", String(template));
                  router.replace(`/make?template=${template}`);
                } catch (e) {}
              }}
              className={`group relative p-2 border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                selectedTemplate === template
                  ? "border-slate-900 bg-slate-50 shadow-md ring-2 ring-slate-200"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
              title={`Template ${template}`}
            >
              <div className="bg-slate-50 rounded p-1 overflow-hidden aspect-square">
                <img
                  src={`/template${template}.png`}
                  alt={`Template ${template}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/template1.png";
                  }}
                />
              </div>
              {selectedTemplate === template && (
                <div className="absolute -top-1 -right-1 bg-slate-900 rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const handleBack = () => {
    // Return to the previous page (home, templates, about, etc.)
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-12 no-print">
        {/* Top Header Bar */}
        <div className="sticky top-20 z-40 bg-white border-b border-slate-200 shadow-sm no-print">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-lg shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium font-poppins text-sm sm:text-base">Back</span>
                </button>
                <div className="h-6 w-px bg-slate-300 shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-semibold text-slate-900 font-montserrat truncate">Resume Builder</h1>
                  <p className="text-xs text-slate-500 font-poppins truncate">Template {selectedTemplate} • Customize your resume</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowAiModal(true)}
                  className="flex items-center space-x-1.5 bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 font-poppins shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Generate</span>
                  <span className="sm:hidden">AI</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1.5 bg-white border border-slate-300 text-slate-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all duration-200 font-poppins whitespace-nowrap"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  data-download-btn
                  onClick={handleDownload}
                  className="flex items-center space-x-1.5 bg-slate-900 text-white px-3 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all duration-200 font-montserrat shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:hidden mb-6">
            <TemplateSelectionCard />
          </div>
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Left Side - Form */}
            <div className="space-y-4 pb-8">
              <div className="hidden lg:block">
                <TemplateSelectionCard />
              </div>

              {/* Form Sections - Organized with better hierarchy */}
              <div className="space-y-4">
                {/* Personal Information Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">1</div>
                    Personal Information
                  </h3>
                  <PersonalInfoSection
                    personalInfo={personalInfo}
                    onUpdate={(field, value) =>
                      setPersonalInfo({ ...personalInfo, [field]: value })
                    }
                  />
                </div>

                {/* Profile Picture Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">2</div>
                    Profile Photo
                  </h3>
                  <ProfilePictureSection
                    profile={profile}
                    hasProfileSupport={templateData.hasProfile}
                    onUpdate={setProfile}
                  />
                </div>

                {/* Professional Summary Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">3</div>
                    Professional Summary
                  </h3>
                  <SummarySection
                    summary={summary}
                    onUpdate={setSummary}
                  />
                </div>

                {/* Work Experience Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">4</div>
                    Work Experience
                  </h3>
                  <ExperienceSection
                    experiences={experiences}
                    onAdd={addExperience}
                    onRemove={removeExperience}
                    onUpdate={updateExperience}
                  />
                </div>

                {/* Education Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">5</div>
                    Education
                  </h3>
                  <EducationSection
                    educations={educations}
                    onAdd={addEducation}
                    onRemove={removeEducation}
                    onUpdate={updateEducation}
                  />
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">6</div>
                    Skills
                  </h3>
                  <SkillsSection
                    skills={skills}
                    onAdd={addSkill}
                    onRemove={removeSkill}
                    onUpdate={updateSkill}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Preview */}
            <div className="lg:sticky lg:top-28 self-start w-full min-w-0">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
                <div className="bg-white border-b border-slate-200 p-4 shrink-0">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide font-montserrat">Resume Preview</h3>
                  <p className="text-xs text-slate-500 mt-1">Template {selectedTemplate}</p>
                </div>
                <div className="p-3 flex justify-center overflow-x-auto overflow-y-auto max-w-full">
                  <ResumePreview
                    personalInfo={personalInfo}
                    experiences={experiences}
                    educations={educations}
                    skills={skills}
                    summary={summary}
                    profile={profile}
                    template={Number(selectedTemplate)}
                  />
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
                <Sparkles className="w-6 h-6 text-slate-900" />
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
            <button
              type="button"
              onClick={() => setAiPrompt(SAMPLE_AI_PROMPT)}
              className="mb-3 text-sm text-slate-700 hover:text-slate-900 font-medium font-poppins underline underline-offset-2"
            >
              Use sample prompt (marketing manager example)
            </button>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe your name, contact info, work history, education, skills, and career goals..."
              rows={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins resize-none mb-4 text-slate-900 placeholder:text-slate-400"
            />
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGenerateWithAI}
                disabled={isGenerating || !aiPrompt.trim()}
                className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-200 font-montserrat shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600 font-poppins">Loading...</p>
          </div>
        </div>
      }
    >
      <ResumeBuilderContent />
    </Suspense>
  );
}
