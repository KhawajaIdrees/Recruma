"use client";

import { PersonalInfo, Experience, Education, Skill } from "./types";
import { templates } from "@/lib/templateData";

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  summary: string;
  template: number;
}

export default function ResumePreview({
  personalInfo,
  experiences,
  educations,
  skills,
  summary,
  template,
}: ResumePreviewProps) {
  const templateData = templates.find(t => t.id === template) || templates[0];
  
  // Map accent colors to Tailwind classes for borders and headings
  const getTemplateColors = () => {
    switch(templateData.accentColor) {
      case 'purple':
        return { border: 'border-purple-300', text: 'text-purple-600' };
      case 'blue':
        return { border: 'border-blue-300', text: 'text-blue-600' };
      case 'indigo':
        return { border: 'border-indigo-300', text: 'text-indigo-600' };
      case 'orange':
        return { border: 'border-orange-300', text: 'text-orange-600' };
      case 'amber':
        return { border: 'border-amber-300', text: 'text-amber-600' };
      case 'cyan':
        return { border: 'border-cyan-300', text: 'text-cyan-600' };
      case 'gray':
        return { border: 'border-gray-300', text: 'text-gray-600' };
      default:
        return { border: 'border-blue-300', text: 'text-blue-600' };
    }
  };

  const colors = getTemplateColors();

  return (
    <div id="resume-preview" className="resume-print bg-white p-8 max-w-4xl mx-auto shadow-lg" style={{ minHeight: '11in' }}>
      {/* Personal Info Preview */}
      {personalInfo.fullName && (
        <div className={`text-center mb-6 border-b-2 ${colors.border} pb-4`}>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-montserrat">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600 font-poppins">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.address && <span>• {personalInfo.address}</span>}
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
          <p className="text-slate-700 text-sm leading-relaxed font-poppins">{summary}</p>
        </div>
      )}

      {/* Experience Preview */}
      {experiences.some(exp => exp.position || exp.company) && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experiences.filter(exp => exp.position || exp.company).map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-slate-900 font-montserrat">{exp.position}</h3>
                    <p className="text-slate-700 text-sm font-poppins">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-600 font-poppins whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-600 text-sm mt-1 font-poppins whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Preview */}
      {educations.some(edu => edu.school || edu.degree) && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
            Education
          </h2>
          <div className="space-y-3">
            {educations.filter(edu => edu.school || edu.degree).map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-slate-900 font-montserrat">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-slate-700 text-sm font-poppins">{edu.school}</p>
                <div className="flex justify-between text-sm text-slate-600 font-poppins">
                  <span>{edu.startDate} - {edu.endDate}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Preview */}
      {skills.some(skill => skill.name) && (
        <div>
          <h2 className={`text-lg font-semibold text-slate-900 mb-3 font-montserrat border-b ${colors.border} pb-1`}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(skill => skill.name).map((skill) => {
              const badgeClass = templateData.badgeColor;
              return (
                <span
                  key={skill.id}
                  className={`${badgeClass} px-3 py-1 rounded text-sm font-poppins`}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {!personalInfo.fullName && !summary && experiences.every(exp => !exp.position) && (
        <div className="text-center py-12 text-slate-400 font-poppins">
          <p>Start filling out the form to see your resume preview here</p>
        </div>
      )}
    </div>
  );
}

