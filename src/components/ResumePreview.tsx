"use client";

import { PersonalInfo, Experience, Education, Skill, ProfilePicture } from "./types";
import { templates } from "@/lib/templateData";
import { getTemplateColors } from "@/lib/colorUtils";

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  summary: string;
  template: number;
  profile?: ProfilePicture | null;
}

export default function ResumePreview({
  personalInfo,
  experiences,
  educations,
  skills,
  summary,
  template,
  profile,
}: ResumePreviewProps) {
  const templateData = templates.find(t => t.id === Number(template)) || templates[0];
  const colors = getTemplateColors(templateData.accentColor);
  const showProfile = templateData.hasProfile && profile;

  // Debug logging to check if data is coming through
  console.log("Template selected:", template);
  console.log("Personal Info:", personalInfo);
  console.log("Experiences:", experiences);
  console.log("Skills:", skills);

  // Apply CSS variables for accent colors
  const templateStyle = {
    '--accent': colors.accent,
    '--accent-rgb': colors.accentRgb,
    '--accent-bg': colors.bgLight.replace('bg-', '') // Convert Tailwind class to custom property
  } as React.CSSProperties;

  const HeaderBlock = ({ minimal = false, withBackground = false }) => (
    <div className={`resume-header ${withBackground ? 'px-6 py-8 rounded-xl text-center' : ''}`} 
         style={withBackground ? { background: 'var(--accent-bg)' } : {}}>
      {showProfile && !minimal && (
        <div className="text-center mb-4">
          <img
            src={profile!.url}
            alt="Profile"
            className="resume-profile-pic w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-200 shadow-lg"
            loading="lazy"
          />
        </div>
      )}

      {personalInfo.fullName && (
        <div className={`mb-4 ${minimal ? 'text-left' : 'text-center'} ${!minimal ? `border-b-2 ${colors.border} pb-3` : ''}`}>
          <h1 className={`${minimal ? 'text-2xl' : 'text-3xl'} font-bold text-slate-900 mb-1 font-montserrat`}>
            {personalInfo.fullName || "Your Name Here"}
          </h1>
          <div className={`flex flex-wrap ${minimal ? 'justify-start' : 'justify-center'} gap-3 text-sm text-slate-600 font-poppins`}>
            {personalInfo.email && <span>{personalInfo.email || "your.email@example.com"}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone || "(123) 456-7890"}</span>}
            {personalInfo.address && !minimal && <span>• {personalInfo.address || "Your City, State"}</span>}
          </div>
        </div>
      )}
    </div>
  );

  const SummaryBlock = ({ compact = false }) => (
    summary ? (
      <div className="mb-4">
        <h2 className={`resume-section-title text-lg font-semibold text-slate-900 mb-2 font-montserrat border-b ${colors.border} pb-1`}>
          Professional Summary
        </h2>
        <p className={`text-slate-700 ${compact ? 'text-xs' : 'text-sm'} leading-relaxed font-poppins`}>
          {summary || "Experienced professional with a proven track record..."}
        </p>
      </div>
    ) : null
  );

  const ExperienceBlock = ({ compact = false }) => (
    experiences.length > 0 ? (
      <div className="mb-4">
        <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
          Work Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-slate-900 font-montserrat">
                    {exp.position || "Your Position"}
                  </h3>
                  <p className="text-slate-700 text-sm font-poppins">
                    {exp.company || "Company Name"}
                  </p>
                </div>
                <span className="text-sm text-slate-600 font-poppins whitespace-nowrap ml-4">
                  {exp.startDate || "Start Date"} - {exp.current ? 'Present' : (exp.endDate || "End Date")}
                </span>
              </div>
              {exp.description && (
                <p className={`text-slate-600 ${compact ? 'text-xs' : 'text-sm'} mt-1 font-poppins whitespace-pre-line`}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="mb-4">
        <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
          Work Experience
        </h2>
        <div className="text-slate-500 italic text-sm">
          Add your work experience to see it here
        </div>
      </div>
    )
  );

  const EducationBlock = ({ compact = false }) => (
    educations.length > 0 ? (
      <div className="mb-4">
        <h2 className={`resume-section-title text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
          Education
        </h2>
        <div className="space-y-3">
          {educations.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className={`font-semibold text-slate-900 font-montserrat ${compact ? 'text-sm' : ''}`}>
                {edu.degree || "Your Degree"} {edu.field && `in ${edu.field}`}
              </h3>
              <p className={`text-slate-700 ${compact ? 'text-xs' : 'text-sm'} font-poppins`}>
                {edu.school || "University Name"}
              </p>
              <div className={`flex justify-between ${compact ? 'text-xs' : 'text-sm'} text-slate-600 font-poppins`}>
                <span>{edu.startDate || "Start"} - {edu.endDate || "End"}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="mb-4">
        <h2 className={`resume-section-title text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
          Education
        </h2>
        <div className="text-slate-500 italic text-sm">
          Add your education to see it here
        </div>
      </div>
    )
  );

  const SkillsBlock = ({ vertical = false, inline = false }) => (
    skills.length > 0 ? (
      <div className={vertical ? 'space-y-2' : inline ? 'flex flex-wrap gap-1' : ''}>
        <h2 className={`resume-section-title text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
          Skills
        </h2>
        {vertical ? (
          <ul className="list-disc pl-5 text-sm text-slate-700 font-poppins">
            {skills.map(s => <li key={s.id}>{s.name || "Your Skill"}</li>)}
          </ul>
        ) : inline ? (
          <div className="text-sm text-slate-700 font-poppins">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name || "Skill"}
                {index < skills.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const badgeClass = templateData.badgeColor;
              return (
                <span
                  key={skill.id}
                  className={`${badgeClass} resume-skill-badge px-3 py-1 rounded text-sm font-poppins`}
                >
                  {skill.name || "Skill"}
                </span>
              );
            })}
          </div>
        )}
      </div>
    ) : (
      <div className="space-y-2">
        <h2 className={`resume-section-title text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
          Skills
        </h2>
        <div className="text-slate-500 italic text-sm">
          Add your skills to see them here
        </div>
      </div>
    )
  );

  const ContactInfoBlock = ({ compact = false }) => (
    <div className={`${compact ? 'text-xs' : 'text-sm'} text-slate-600 font-poppins space-y-1`}>
      {personalInfo.email && <div className="flex items-center gap-2">
        <span className="font-medium">Email:</span>
        <span>{personalInfo.email}</span>
      </div>}
      {personalInfo.phone && <div className="flex items-center gap-2">
        <span className="font-medium">Phone:</span>
        <span>{personalInfo.phone}</span>
      </div>}
      {personalInfo.linkedin && <div className="flex items-center gap-2">
        <span className="font-medium">LinkedIn:</span>
        <span>{personalInfo.linkedin}</span>
      </div>}
      {personalInfo.github && <div className="flex items-center gap-2">
        <span className="font-medium">GitHub:</span>
        <span>{personalInfo.github}</span>
      </div>}
      {personalInfo.address && <div className="flex items-center gap-2">
        <span className="font-medium">Address:</span>
        <span>{personalInfo.address}</span>
      </div>}
    </div>
  );

  const RenderTemplate = () => {
    switch (templateData.id) {
      case 1: // Creative Professional
        return (
          <div className="space-y-6">
            <HeaderBlock withBackground />
            <SummaryBlock />
            <ExperienceBlock />
            <EducationBlock />
            <SkillsBlock />
          </div>
        );

      case 2: // Corporate Executive
        return (
          <div className="space-y-5">
            <div className="border-b-4" style={{ borderColor: colors.accent }}>
              <div className="flex items-start justify-between pb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-1 font-montserrat">
                    {personalInfo.fullName || "Your Name"}
                  </h1>
                  <div className="text-sm text-slate-600 font-poppins space-y-0.5">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                  </div>
                </div>
                <div className="text-right text-sm text-slate-600 font-poppins">
                  {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
                  {personalInfo.github && <div>GitHub: {personalInfo.github}</div>}
                </div>
              </div>
            </div>
            <SummaryBlock />
            <ExperienceBlock />
            <EducationBlock />
            <SkillsBlock />
          </div>
        );

      case 3: // Tech Professional
        return (
          <div className="grid grid-cols-4 gap-8">
            <aside className="col-span-1 space-y-6">
              {showProfile && (
                <div>
                  <img src={profile!.url} alt="Profile" className="w-full aspect-square rounded-lg object-cover border-2 border-slate-300" />
                </div>
              )}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 font-montserrat">Contact</h3>
                <ContactInfoBlock />
              </div>
              <SkillsBlock vertical />
            </aside>
            <main className="col-span-3 space-y-5">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-montserrat">
                  {personalInfo.fullName || "Your Name"}
                </h1>
              </div>
              <SummaryBlock />
              <ExperienceBlock />
              <EducationBlock />
            </main>
          </div>
        );

      case 4: // Marketing Specialist
        return (
          <div className="space-y-6">
            <div className="px-6 py-6 rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, rgba(${colors.accentRgb},0.7) 100%)` }}>
              {showProfile && (
                <div className="mb-4 flex justify-center">
                  <img src={profile!.url} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                </div>
              )}
              <h1 className="text-3xl font-bold text-center mb-2 font-montserrat">
                {personalInfo.fullName || "Your Name"}
              </h1>
              <div className="flex flex-wrap justify-center gap-3 text-sm font-poppins">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>•</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
              </div>
            </div>
            <div className="pl-4 border-l-4" style={{ borderColor: colors.accent }}>
              <SummaryBlock />
            </div>
            <div className="pl-4 border-l-4" style={{ borderColor: colors.accent }}>
              <ExperienceBlock />
            </div>
            <div className="pl-4 border-l-4" style={{ borderColor: colors.accent }}>
              <EducationBlock />
            </div>
            <div className="pl-4 border-l-4" style={{ borderColor: colors.accent }}>
              <SkillsBlock />
            </div>
          </div>
        );

      case 5: // Sales Professional
        return (
          <div className="space-y-6">
            <div className="pb-4 border-b-2" style={{ borderColor: colors.accent }}>
              {showProfile && (
                <div className="mb-3 w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-300">
                  <img src={profile!.url} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <h1 className="text-3xl font-bold text-slate-900 font-montserrat">
                {personalInfo.fullName || "Your Name"}
              </h1>
              <div className="flex gap-4 mt-2 text-sm text-slate-600 font-poppins">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
              </div>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 5).map(s => (
                  <span key={s.id} className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: colors.accent }}>
                    {s.name || "Skill"}
                  </span>
                ))}
              </div>
            )}
            <SummaryBlock />
            <ExperienceBlock />
            <EducationBlock />
          </div>
        );

      case 6: // Universal Professional
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                {showProfile && (
                  <div className="mb-3 w-24 h-24 rounded-lg overflow-hidden border border-slate-300">
                    <img src={profile!.url} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <h1 className="text-2xl font-bold text-slate-900 font-montserrat">
                  {personalInfo.fullName || "Your Name"}
                </h1>
                <ContactInfoBlock />
              </div>
              <SummaryBlock />
              <SkillsBlock vertical />
            </div>
            <div className="space-y-5">
              <ExperienceBlock />
              <EducationBlock />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <HeaderBlock withBackground />
            <SummaryBlock />
            <ExperienceBlock />
            <EducationBlock />
            <SkillsBlock />
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto" style={templateStyle}>
      {/* Hidden print version */}
      <div 
        id="resume-preview-print" 
        className={`hidden print:block resume-print bg-white p-8 template-${templateData.id}`} 
        style={{ width: '8.5in', minHeight: '11in', ...templateStyle }}
      >
        <RenderTemplate />
      </div>

      {/* Visible preview */}
      <div 
        id="resume-preview" 
        className={`resume-print bg-white p-8 shadow-lg template-${templateData.id} overflow-auto`}
        style={{ minHeight: '11in', maxHeight: 'calc(100vh - 200px)', ...templateStyle }}
      >
        <RenderTemplate />
      </div>
    </div>
  );
}