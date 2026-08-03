"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Save, ArrowLeft, Sparkles, Wand2, CheckCircle2 } from "lucide-react";
import { templates } from "@/lib/templateData";
import PersonalInfoSection from "@/components/PersonalInfoSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ReferencesSection from "@/components/ReferencesSection";
import SummarySection from "@/components/SummarySection";
import ProfilePictureSection from "@/components/ProfilePictureSection";
import type { PersonalInfo, Experience, Education, Skill, Language, Reference, ProfilePicture } from "@/components/types";

const SAMPLE_AI_PROMPT = `My name is Richard Sanchez and I am a Marketing Manager based in 123 Anywhere St., Any City at phone +123-456-7890, email hello@reallygreatsite.com, and website www.reallygreatsite.com. I am a results-driven marketing professional with 8+ years of experience building brand awareness, leading cross-functional campaigns, and driving measurable revenue growth across B2B and B2C markets. I specialize in digital marketing strategy, content development, and data-driven campaign optimization.

I currently work at Borcelle Studio as Marketing Manager & Specialist from 2030 to Present, where I lead integrated marketing campaigns across social, email, and paid channels; manage a $500K annual marketing budget and improve ROI by 35%; and collaborate with sales and product teams to launch new offerings. Before that, I was Marketing Manager at Fauget Studio from 2025 to 2029, where I developed brand positioning, grew social engagement by 120%, and managed PR and partnership initiatives. I also worked as Marketing Specialist at Studio Shodwe from 2024 to 2025, supporting campaign execution, market research, and client reporting.

I have a Master of Business Management from Wardiere University School of Business (2029-2031) with GPA 3.8/4.0, and a Bachelor of Commerce in Marketing from Wardiere University (2025-2029) with GPA 3.6/4.0.

My skills include Project Management, Public Relations, Teamwork, Time Management, Leadership, Effective Communication, Critical Thinking, Digital Marketing, SEO, Google Analytics, Content Strategy, and Brand Development. I speak English (Fluent), French (Fluent), Spanish (Intermediate), and German (Basic). I am seeking a senior marketing leadership role where I can drive brand growth and mentor high-performing teams.`;

function ResumeBuilderFormContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(
    templateParam ? parseInt(templateParam) : 1
  );
  const templateData = templates.find(t => t.id === selectedTemplate) || templates[0];
  const router = useRouter();

  // Keep selectedTemplate in sync with query param and localStorage
  useEffect(() => {
    const param = searchParams.get("template");
    const num = param ? parseInt(param) : NaN;
    if (!isNaN(num) && num !== selectedTemplate) {
      setSelectedTemplate(num);
    }
  }, [searchParams]);

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
  const [languages, setLanguages] = useState<Language[]>([
    { id: "init-lang-1", name: "English", proficiency: "Native / Fluent" },
    { id: "init-lang-2", name: "French", proficiency: "Professional" },
    { id: "init-lang-3", name: "Spanish", proficiency: "Intermediate" },
  ]);
  const [references, setReferences] = useState<Reference[]>([
    {
      id: "init-ref-1",
      name: "Eleanor Vance",
      relationship: "Senior Marketing Manager",
      company: "Borcelle Studio",
      email: "eleanor.vance@borcelle.com",
    },
  ]);
  const [summary, setSummary] = useState("Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable web applications and mentoring junior developers. Proven track record of delivering high-quality software solutions in agile environments.");
  const [profile, setProfile] = useState<ProfilePicture | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [improveSuccess, setImproveSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPersonalInfo(data.personalInfo || personalInfo);
        setExperiences(data.experiences || experiences);
        setEducations(data.educations || educations);
        setSkills(data.skills || skills);
        setLanguages(data.languages || languages);
        setReferences(data.references || references);
        setSummary(data.summary || summary);
        setProfile(data.profile || null);
        if (data.template) setSelectedTemplate(data.template);
      } catch (e) {}
    }
  }, []);

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

  const addLanguage = () => {
    setLanguages([...languages, { id: crypto.randomUUID(), name: "", proficiency: "" }]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang,
      ),
    );
  };

  const addReference = () => {
    setReferences([
      ...references,
      { id: crypto.randomUUID(), name: "", relationship: "", company: "", email: "" },
    ]);
  };

  const removeReference = (id: string) => {
    setReferences(references.filter((ref) => ref.id !== id));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(
      references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref,
      ),
    );
  };

  const handleSave = () => {
    const resumeData = {
      template: selectedTemplate,
      personalInfo,
      experiences,
      educations,
      skills,
      languages,
      references,
      summary,
      profile,
    };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    localStorage.setItem("selectedTemplate", String(selectedTemplate));
  };

  const handleGenerateResume = () => {
    handleSave();
    router.push(`/make/preview?template=${selectedTemplate}`);
  };

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      alert("Please enter a prompt describing your background, experience, and skills.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          existingData: {
            personalInfo,
            experiences,
            educations,
            skills,
            languages,
            references,
            summary,
          },
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to generate resume";
        let errorDetails = "";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            errorDetails = typeof errorData.details === "string" ? errorData.details : JSON.stringify(errorData.details, null, 2);
          }
        } catch (e) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorDetails ? `${errorMessage}\n\nDetails: ${errorDetails}` : errorMessage);
      }

      const responseText = await response.text();
      const result = JSON.parse(responseText);

      if (result.success && result.data) {
        if (result.data.personalInfo) setPersonalInfo((prev) => ({ ...prev, ...result.data.personalInfo }));
        if (result.data.summary) setSummary(result.data.summary);
        if (result.data.experiences && Array.isArray(result.data.experiences)) {
          setExperiences(
            result.data.experiences.map((exp: Omit<Experience, "id">) => ({
              ...exp,
              id: Date.now().toString() + Math.random().toString(),
              endDate: exp.endDate === "Present" ? "" : exp.endDate,
              current: exp.endDate === "Present" || exp.current,
            }))
          );
        }
        if (result.data.educations && Array.isArray(result.data.educations)) {
          setEducations(
            result.data.educations.map((edu: Omit<Education, "id">) => ({
              ...edu,
              id: Date.now().toString() + Math.random().toString(),
            }))
          );
        }
        if (result.data.skills && Array.isArray(result.data.skills)) {
          const sanitize = (n: string) => {
            if (!n) return "";
            let name = n.replace(/\r/g, "").replace(/\s+/g, " ").trim();
            return /^\++$/.test(name) ? "" : name;
          };
          const seen = new Set<string>();
          const newSkills: Skill[] = [];
          result.data.skills.forEach((raw: string) => {
            const name = sanitize(raw);
            const key = name.toLowerCase();
            if (name && !seen.has(key)) {
              seen.add(key);
              newSkills.push({ id: Date.now().toString() + Math.random().toString(), name });
            }
          });
          setSkills(newSkills);
        }
        setShowAiModal(false);
        setAiPrompt("");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate resume.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImproveWithAI = async () => {
    const hasData =
      summary.trim() ||
      personalInfo.fullName.trim() ||
      experiences.some((exp) => exp.company.trim() || exp.position.trim() || exp.description.trim()) ||
      skills.length > 0;

    if (!hasData) {
      alert("Please fill in some information first so AI can polish and improve it for you!");
      return;
    }

    setIsImproving(true);
    setImproveSuccess(false);

    try {
      const prompt = `CRITICAL INSTRUCTION: The user has filled in their resume information below. Your task is to IMPROVE, POLISH, and ELEVATE all their text without changing real factual facts (keep real names, real company names, real dates).
- Rewrite professional summary to sound executive, compelling, concise, and polished.
- Rewrite each experience description to use strong action verbs, clean bullet points, and quantified achievements.
- Enhance skills list to include standard industry terminology based on their experience.
- Fix any spelling or grammar mistakes.

User's Filled Data:
${JSON.stringify({ personalInfo, summary, experiences, educations, skills, languages, references })}`;

      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to improve resume with AI.");
      }

      const result = await response.json();

      if (result.success && result.data) {
        if (result.data.personalInfo) {
          setPersonalInfo((prev) => ({ ...prev, ...result.data.personalInfo }));
        }
        if (result.data.summary) {
          setSummary(result.data.summary);
        }
        if (result.data.experiences && Array.isArray(result.data.experiences)) {
          setExperiences(
            result.data.experiences.map((exp: Omit<Experience, "id">, idx: number) => ({
              ...exp,
              id: experiences[idx]?.id || Date.now().toString() + Math.random().toString(),
              endDate: exp.endDate === "Present" ? "" : exp.endDate,
              current: exp.endDate === "Present" || exp.current,
            }))
          );
        }
        if (result.data.educations && Array.isArray(result.data.educations)) {
          setEducations(
            result.data.educations.map((edu: Omit<Education, "id">, idx: number) => ({
              ...edu,
              id: educations[idx]?.id || Date.now().toString() + Math.random().toString(),
            }))
          );
        }
        if (result.data.skills && Array.isArray(result.data.skills)) {
          const sanitize = (n: string) => {
            if (!n) return "";
            let name = n.replace(/\r/g, "").replace(/\s+/g, " ").trim();
            return /^\++$/.test(name) ? "" : name;
          };
          const seen = new Set<string>();
          const newSkills: Skill[] = [];
          result.data.skills.forEach((raw: string) => {
            const name = sanitize(raw);
            const key = name.toLowerCase();
            if (name && !seen.has(key)) {
              seen.add(key);
              newSkills.push({ id: Date.now().toString() + Math.random().toString(), name });
            }
          });
          if (newSkills.length > 0) setSkills(newSkills);
        }

        setImproveSuccess(true);
        setTimeout(() => setImproveSuccess(false), 5000);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to improve resume with AI.");
    } finally {
      setIsImproving(false);
    }
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-16 no-print">
        {/* Top Header Bar */}
        <div className="sticky top-20 z-40 bg-white border-b border-slate-200 shadow-xs no-print">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-lg shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium font-poppins text-sm sm:text-base">Back</span>
                </button>
                <div className="h-6 w-px bg-slate-300 shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-semibold text-slate-900 font-montserrat truncate">Create Resume</h1>
                  <p className="text-xs text-slate-500 font-poppins truncate">Add your details below</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleImproveWithAI}
                  disabled={isImproving}
                  className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-poppins shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer disabled:opacity-50"
                  title="Improve & polish your entered info with AI"
                >
                  {isImproving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Improving...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>AI Improve</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowAiModal(true)}
                  className="flex items-center justify-center space-x-1.5 bg-[#0f172a] text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 font-poppins shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Fill</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center space-x-1.5 bg-white border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all duration-200 font-poppins whitespace-nowrap cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner when AI Improves Data */}
        {improveSuccess && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 flex items-center gap-3 text-sm font-poppins shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>✨ Your resume details have been improved and polished by AI!</span>
            </div>
          </div>
        )}

        {/* Clean Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* 1. Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">1</div>
              Personal Information
            </h3>
            <PersonalInfoSection
              personalInfo={personalInfo}
              onUpdate={(field, value) => setPersonalInfo({ ...personalInfo, [field]: value })}
            />
          </div>

          {/* 2. Profile Photo */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
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

          {/* 3. Professional Summary */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">3</div>
              Professional Summary
            </h3>
            <SummarySection summary={summary} onUpdate={setSummary} />
          </div>

          {/* 4. Work Experience */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
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

          {/* 5. Education */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
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

          {/* 6. Skills */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
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

          {/* 7. Languages */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">7</div>
              Languages
            </h3>
            <LanguagesSection
              languages={languages}
              onAdd={addLanguage}
              onRemove={removeLanguage}
              onUpdate={updateLanguage}
            />
          </div>

          {/* 8. References */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide font-montserrat flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center text-xs font-bold">8</div>
              References
            </h3>
            <ReferencesSection
              references={references}
              onAdd={addReference}
              onRemove={removeReference}
              onUpdate={updateReference}
            />
          </div>

          {/* Single Generate Resume Button at the bottom matching site theme color #0f172a */}
          <div className="bg-white rounded-xl p-8 shadow-xs border border-slate-200 flex justify-center items-center">
            <button
              type="button"
              onClick={handleGenerateResume}
              className="w-full sm:w-[480px] bg-[#0f172a] hover:bg-slate-800 text-white py-3.5 px-8 rounded-xl font-bold font-montserrat text-lg shadow-md hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
            >
              Generate Resume
            </button>
          </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900 font-montserrat">
                Generate Resume with AI
              </h2>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setAiPrompt("");
                }}
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold p-1 cursor-pointer"
              >
                ×
              </button>
            </div>
            <p className="text-slate-600 mb-4 font-poppins">
              Describe your professional background, experience, education, and skills. Our AI will generate your resume entries.
            </p>
            <button
              type="button"
              onClick={() => setAiPrompt(SAMPLE_AI_PROMPT)}
              className="mb-3 text-sm text-slate-700 hover:text-slate-900 font-medium font-poppins underline underline-offset-2 cursor-pointer"
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
                className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-200 font-montserrat shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Fill with AI</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setAiPrompt("");
                }}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors font-poppins cursor-pointer"
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
      <ResumeBuilderFormContent />
    </Suspense>
  );
}
