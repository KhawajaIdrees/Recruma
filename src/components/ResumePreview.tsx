"use client";

import {
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { PersonalInfo, Experience, Education, Skill, ProfilePicture } from "./types";
import { templates } from "@/lib/templateData";

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  summary: string;
  template: number;
  profile?: ProfilePicture | null;
}

function getJobTitle(experiences: Experience[]): string {
  const current = experiences.find((e) => e.current && e.position);
  if (current?.position) return current.position;
  return experiences.find((e) => e.position)?.position || "";
}

function formatDateRange(start: string, end: string, current?: boolean): string {
  const endStr = current ? "Present" : end;
  if (!start && !endStr) return "";
  if (start && endStr) return `${start} - ${endStr}`;
  return start || endStr;
}

function parseBullets(text: string): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function DescriptionList({
  description,
  className = "text-sm text-slate-600",
}: {
  description: string;
  className?: string;
}) {
  const bullets = parseBullets(description);
  if (bullets.length <= 1) {
    return <p className={`${className} leading-relaxed whitespace-pre-line`}>{description}</p>;
  }
  return (
    <ul className={`${className} list-disc pl-4 space-y-0.5 mt-1`}>
      {bullets.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function ContactRow({
  personalInfo,
  iconColor = "text-slate-700",
  textClass = "text-xs text-slate-700",
  variant = "default",
}: {
  personalInfo: PersonalInfo;
  iconColor?: string;
  textClass?: string;
  variant?: "default" | "light";
}) {
  const resolvedIconColor = variant === "light" ? "text-white" : iconColor;
  const resolvedTextClass = variant === "light" ? "text-xs text-white" : textClass;
  const iconClass = `block shrink-0 ${resolvedIconColor}`;

  const items = [
    {
      key: "phone",
      value: personalInfo.phone,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      key: "email",
      value: personalInfo.email,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      key: "address",
      value: personalInfo.address,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      key: "website",
      value: personalInfo.website,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      value: personalInfo.linkedin,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      key: "github",
      value: personalInfo.github,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
  ].filter((item) => item.value);

  if (!items.length) return null;

  return (
    <div className="space-y-2.5">
      {items.map(({ key, icon, value }) => (
        <div key={key} className="flex items-start gap-2.5 leading-snug">
          <span className="contact-icon-wrap flex items-center justify-center w-4 h-4 mt-0.5 shrink-0 overflow-visible">
            {icon}
          </span>
          <span className={`${resolvedTextClass} break-words`}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-800">{title}</h3>
      <div className="w-full border-b border-slate-400 mt-1.5 mb-3" />
      {children}
    </div>
  );
}

function SidebarEducation({
  educations,
  light = false,
}: {
  educations: Education[];
  light?: boolean;
}) {
  const textTitle = light ? "text-white" : "text-slate-800";
  const textSub = light ? "text-white/80" : "text-slate-600";
  return (
    <div className="space-y-3">
      {educations.map((edu) => (
        <div key={edu.id}>
          {formatDateRange(edu.startDate, edu.endDate) && (
            <p className={`text-xs font-bold ${textTitle}`}>
              {formatDateRange(edu.startDate, edu.endDate)}
            </p>
          )}
          <p className={`text-xs font-bold uppercase ${textTitle} mt-0.5`}>
            {edu.school}
          </p>
          {(edu.degree || edu.field) && (
            <p className={`text-xs ${textSub} mt-0.5`}>
              {edu.degree}
              {edu.field && ` in ${edu.field}`}
            </p>
          )}
          {edu.gpa && <p className={`text-xs ${textSub} mt-0.5`}>GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>
  );
}

function SkillBulletList({
  skills,
  className = "text-xs text-slate-700",
  columns = 2,
  bulletColor = "bg-slate-700",
}: {
  skills: Skill[];
  className?: string;
  columns?: 1 | 2;
  bulletColor?: string;
}) {
  const filtered = skills.filter((s) => s.name && s.name.trim() !== "");
  if (!filtered.length) return null;

  if (columns === 2) {
    return (
      <div className="w-full flex flex-wrap justify-between">
        {filtered.map((s) => (
          <div key={s.id} className="w-[48%] mb-2.5 flex items-start shrink-0 min-w-0">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${bulletColor} shrink-0 mt-1 mr-2`}
            />
            <span className={`${className} leading-snug break-words flex-1 min-w-0`}>
              {s.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {filtered.map((s) => (
        <div key={s.id} className="flex items-start shrink-0 min-w-0">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${bulletColor} shrink-0 mt-1 mr-2`}
          />
          <span className={`${className} leading-snug break-words flex-1 min-w-0`}>
            {s.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function Avatar({
  url,
  size = 96,
  ringColor = "#ffffff",
  className = "",
}: {
  url: string;
  size?: number;
  ringColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`shrink-0 rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        border: `4px solid ${ringColor}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={url}
        alt="Profile"
        className="resume-profile-img w-full h-full object-cover object-center block"
      />
    </div>
  );
}

function SectionTitle({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-sm font-bold uppercase tracking-wide pb-1.5 mb-3 border-b ${
        light ? "border-white/40 text-white" : "border-slate-300"
      } ${className}`}
      style={light ? undefined : { color: "var(--accent)", borderColor: "var(--accent-light, #cbd5e1)" }}
    >
      {children}
    </h2>
  );
}

function TimelineSection({
  icon,
  title,
  titleNode,
  children,
  className = "mb-7",
}: {
  icon: React.ReactNode;
  title?: string;
  titleNode?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-3 items-start ${className}`}>
      <div className="shrink-0 pt-0.5">
        <div
          className="timeline-icon w-6 h-6 rounded-full flex items-center justify-center text-white"
          style={{ background: "var(--accent)" }}
        >
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {titleNode ?? (title ? <SectionTitle>{title}</SectionTitle> : null)}
        {children}
      </div>
    </div>
  );
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
  const templateData = templates.find((t) => t.id === Number(template)) || templates[0];
  const showProfile = templateData.hasProfile && profile;
  const jobTitle = getJobTitle(experiences);
  const activeExperiences = experiences.filter((e) => e && (e.position || e.company));
  const activeEducations = educations.filter((e) => e && (e.school || e.degree));
  const activeSkills = skills.filter((s) => s && s.name && s.name.trim() !== "");
  const fullBleed = [1, 2, 3, 5].includes(templateData.id);

  const RenderTemplate = () => {
    switch (templateData.id) {
      // Template 1 — Navy header, gray sidebar, timeline (Richard Sanchez style)
      case 1:
        return (
          <div className="template-layout-1 min-h-[1056px] h-auto flex flex-col bg-white">
            <div
              className="flex items-center gap-5 text-white text-left py-6 px-7 shrink-0"
              style={{ background: "var(--accent)" }}
            >
              {showProfile && <Avatar url={profile!.url} size={84} />}
              <div className={showProfile ? "" : "text-center w-full"}>
                {personalInfo.fullName && (
                  <h1 className="text-xl font-bold uppercase tracking-widest leading-tight">
                    {personalInfo.fullName}
                  </h1>
                )}
                {jobTitle && (
                  <p className="text-xs uppercase tracking-[0.2em] mt-1.5 opacity-90">{jobTitle}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[34%_1fr] flex-1">
              <aside className="bg-slate-100 px-6 py-7 space-y-6 min-h-full">
                <SidebarSection title="Contact">
                  <ContactRow personalInfo={personalInfo} />
                </SidebarSection>
                {activeEducations.length > 0 && (
                  <SidebarSection title="Education">
                    <SidebarEducation educations={activeEducations} />
                  </SidebarSection>
                )}
                {activeSkills.length > 0 && (
                  <SidebarSection title="Skills">
                    <SkillBulletList skills={skills} columns={2} />
                  </SidebarSection>
                )}
              </aside>

              <main className="px-7 py-7 border-l border-slate-200 min-h-full">
                {summary && (
                  <TimelineSection icon={<User className="w-3.5 h-3.5" />} title="Profile">
                    <p className="text-xs text-slate-600 leading-relaxed">{summary}</p>
                  </TimelineSection>
                )}

                {activeExperiences.length > 0 && (
                  <TimelineSection icon={<Briefcase className="w-3.5 h-3.5" />} title="Work Experience" className="mb-0">
                    <div className="space-y-5 border-l border-slate-300 ml-3 pl-5">
                      {activeExperiences.map((exp) => (
                        <div key={exp.id} className="relative">
                          <div className="absolute -left-[23px] top-1.5 w-2 h-2 rounded-full border-2 border-slate-400 bg-white" />
                          <div className="flex justify-between items-baseline gap-3">
                            <span className="text-sm font-bold text-slate-900">{exp.company}</span>
                            <span className="text-xs text-slate-500 whitespace-nowrap uppercase">
                              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                            </span>
                          </div>
                          {exp.position && <p className="text-xs text-slate-700 mt-0.5">{exp.position}</p>}
                          {exp.description && (
                            <DescriptionList description={exp.description} className="text-xs text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </TimelineSection>
                )}
              </main>
            </div>
          </div>
        );

      // Template 2 — Slate blue bar header, photo overlap (Lorna Alvarado style)
      case 2:
        return (
          <div className="template-layout-2 min-h-[1056px] h-auto flex flex-col bg-white">
            <div
              className="flex items-center gap-5 px-6 py-5 min-h-[104px] shrink-0"
              style={{ background: "var(--accent)" }}
            >
              {showProfile && <Avatar url={profile!.url} size={84} />}
              <div className="flex-1 min-w-0">
                {personalInfo.fullName && (
                  <h1 className="text-2xl font-bold uppercase tracking-wide text-white leading-tight break-words">
                    {personalInfo.fullName}
                  </h1>
                )}
              </div>
              {jobTitle && (
                <p className="text-white text-sm uppercase tracking-[0.2em] font-medium shrink-0 text-right">
                  {jobTitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-[34%_1fr] flex-1">
              <aside className="bg-slate-100 px-6 py-7 space-y-6 min-h-full">
                <SidebarSection title="Contact">
                  <ContactRow personalInfo={personalInfo} iconColor="text-slate-600" />
                </SidebarSection>

                {activeEducations.length > 0 && (
                  <SidebarSection title="Education">
                    <SidebarEducation educations={activeEducations} />
                  </SidebarSection>
                )}

                {activeSkills.length > 0 && (
                  <SidebarSection title="Skills">
                    <SkillBulletList skills={skills} columns={2} />
                  </SidebarSection>
                )}
              </aside>

              <main className="px-6 py-7 space-y-6 min-h-full">
                {summary && (
                  <div>
                    <SectionTitle>Profile</SectionTitle>
                    <p className="text-xs text-slate-600 leading-relaxed">{summary}</p>
                  </div>
                )}

                {activeExperiences.length > 0 && (
                  <div>
                    <SectionTitle>Work Experience</SectionTitle>
                    <div className="space-y-4">
                      {activeExperiences.map((exp) => (
                        <div key={exp.id} className="flex gap-2.5">
                          <div
                            className="w-2 h-2 mt-1.5 shrink-0 rounded-sm"
                            style={{ background: "var(--accent)" }}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-baseline gap-3">
                              <div>
                                <span className="text-sm font-bold text-slate-900">{exp.company}</span>
                                {exp.position && (
                                  <span className="text-sm text-slate-700"> — {exp.position}</span>
                                )}
                              </div>
                              <span className="text-xs text-slate-500 whitespace-nowrap">
                                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                              </span>
                            </div>
                            {exp.description && (
                              <DescriptionList description={exp.description} className="text-xs text-slate-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </main>
            </div>
          </div>
        );

      // Template 3 — Charcoal header, arched photo (Jonathan Patterson style)
      case 3:
        return (
          <div className="template-layout-3 grid grid-cols-[36%_1fr] min-h-[1056px] h-auto bg-white">
            <aside className="bg-slate-100 min-h-full flex flex-col">
              <div
                className="relative flex justify-center pt-6 pb-14 overflow-visible shrink-0"
                style={{ background: "var(--accent-bg)" }}
              >
                <div className="absolute inset-x-0 top-0 h-16 bg-slate-300/50 rounded-b-[50%]" />
                {showProfile ? (
                  <Avatar url={profile!.url} size={112} className="relative z-10" />
                ) : (
                  <div className="relative z-10 w-28 h-28 rounded-full bg-slate-300 border-4 border-white" />
                )}
              </div>

              <div className="px-5 py-5 space-y-6 -mt-7 flex-1">
                <SidebarSection title="Contact">
                  <ContactRow personalInfo={personalInfo} />
                </SidebarSection>

                {activeEducations.length > 0 && (
                  <SidebarSection title="Education">
                    <SidebarEducation educations={activeEducations} />
                  </SidebarSection>
                )}

                {activeSkills.length > 0 && (
                  <SidebarSection title="Skills">
                    <SkillBulletList skills={skills} columns={2} />
                  </SidebarSection>
                )}
              </div>
            </aside>

            <main className="min-h-full flex flex-col">
              <div className="text-white px-7 py-6 shrink-0" style={{ background: "var(--accent)" }}>
                {personalInfo.fullName && (
                  <h1 className="text-2xl font-bold uppercase tracking-wide text-right leading-tight">
                    {personalInfo.fullName}
                  </h1>
                )}
                {jobTitle && (
                  <p className="text-sm italic text-right mt-1.5 opacity-90">{jobTitle}</p>
                )}
              </div>

              <div className="px-7 py-6 space-y-6 flex-1">
                {summary && (
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-400 pb-1.5 mb-2.5">
                      Profile Info
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">{summary}</p>
                  </div>
                )}

                {activeExperiences.length > 0 && (
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-8 bottom-0 w-px bg-slate-300" />
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-400 pb-1.5 mb-4">
                      Experience
                    </h2>
                    <div className="space-y-5">
                      {activeExperiences.map((exp) => (
                        <div key={exp.id} className="relative">
                          <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full border-2 border-slate-500 bg-white" />
                          <div className="flex justify-between items-baseline gap-3">
                            <span className="text-xs font-bold uppercase text-slate-900">{exp.position}</span>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                            </span>
                          </div>
                          <p className="text-xs font-bold uppercase text-slate-700 mt-0.5">{exp.company}</p>
                          {exp.description && (
                            <DescriptionList description={exp.description} className="text-xs text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        );

      // Template 4 — Clean header with timeline divider (AHMDD SAAH style)
      case 4:
        return (
          <div className="template-layout-4 px-8 py-7 min-h-[1056px] h-auto flex flex-col bg-white">
            <header className="text-center pb-5 mb-6 shrink-0">
              {personalInfo.fullName && (
                <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                  {personalInfo.fullName}
                </h1>
              )}
              {jobTitle && (
                <p className="text-sm uppercase tracking-[0.2em] text-slate-600 mt-1.5">{jobTitle}</p>
              )}
              <div className="w-full border-b-2 border-slate-300 mt-5" />
            </header>

            <div className="grid grid-cols-[36%_1fr] gap-0 items-stretch flex-1">
              <aside className="pr-6 border-r border-slate-300 space-y-7 min-h-full">
                <SidebarSection title="Contact">
                  <ContactRow personalInfo={personalInfo} />
                </SidebarSection>
                {activeEducations.length > 0 && (
                  <SidebarSection title="Education">
                    <SidebarEducation educations={activeEducations} />
                  </SidebarSection>
                )}
                {activeSkills.length > 0 && (
                  <SidebarSection title="Skills">
                    <SkillBulletList skills={skills} columns={2} />
                  </SidebarSection>
                )}
              </aside>

              <main className="pl-6 min-w-0 min-h-full">
                {summary && (
                  <TimelineSection
                    icon={<User className="w-3.5 h-3.5" />}
                    titleNode={
                      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1.5 mb-3 w-full">
                        Profile
                      </h2>
                    }
                  >
                    <p className="text-xs text-slate-600 leading-relaxed">{summary}</p>
                  </TimelineSection>
                )}

                {activeExperiences.length > 0 && (
                  <TimelineSection
                    icon={<Briefcase className="w-3.5 h-3.5" />}
                    titleNode={
                      <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1.5 mb-3.5 w-full">
                        Work Experience
                      </h2>
                    }
                    className="mb-0"
                  >
                    <div className="space-y-4">
                      {activeExperiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline gap-3">
                            <span className="text-sm font-bold text-slate-900">{exp.company}</span>
                            <span className="text-xs text-slate-500 whitespace-nowrap uppercase">
                              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                            </span>
                          </div>
                          {exp.position && <p className="text-xs text-slate-700 mt-0.5">{exp.position}</p>}
                          {exp.description && (
                            <DescriptionList description={exp.description} className="text-xs text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </TimelineSection>
                )}
              </main>
            </div>
          </div>
        );

      // Template 5 — Blue sidebar with progress bars (Daniel Gallego style)
      case 5:
        return (
          <div className="template-layout-5 grid grid-cols-[40%_1fr] min-h-[1056px] h-auto bg-white">
            <aside className="text-white px-5 py-0 min-h-full flex flex-col" style={{ background: "var(--accent)" }}>
              <div className="flex justify-center pt-4 pb-3 shrink-0">
                <div
                  className="w-full max-w-[200px] pt-3 pb-4 rounded-b-[50%] flex items-end justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  {showProfile ? (
                    <img
                      src={profile!.url}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover object-center border-4 border-white resume-profile-img"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white" />
                  )}
                </div>
              </div>

              <div className="space-y-5 pb-6 flex-1">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide border-b border-white/40 pb-1 mb-2">
                    Contact
                  </h3>
                  <ContactRow personalInfo={personalInfo} variant="light" />
                </div>

                {activeEducations.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide border-b border-white/40 pb-1 mb-2">
                      Education
                    </h3>
                    <SidebarEducation educations={activeEducations} light={true} />
                  </div>
                )}

                {activeSkills.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide border-b border-white/40 pb-1 mb-3">
                      Skills
                    </h3>
                    <div className="w-full flex flex-wrap justify-between">
                      {activeSkills.map((skill, i) => {
                        const levels = [95, 88, 82, 75, 90, 85];
                        const level = levels[i % levels.length];
                        return (
                          <div key={skill.id} className="w-[48%] mb-3 block">
                            <div className="text-xs font-semibold text-white block mb-1.5 leading-snug overflow-hidden whitespace-nowrap text-ellipsis">
                              {skill.name}
                            </div>
                            <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden block">
                              <div
                                className="h-full bg-white rounded-full"
                                style={{ width: `${level}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            <main className="px-6 py-6 min-h-full flex flex-col">
              {personalInfo.fullName && (
                <div className="mb-6 shrink-0">
                  <h1
                    className="text-3xl font-bold uppercase tracking-wide"
                    style={{ color: "var(--accent)" }}
                  >
                    {personalInfo.fullName}
                  </h1>
                  {jobTitle && (
                    <p className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-600 mt-1">
                      {jobTitle}
                    </p>
                  )}
                </div>
              )}

              {summary && (
                <div className="mb-6">
                  <h2
                    className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2.5"
                    style={{ color: "var(--accent)" }}
                  >
                    About Me
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{summary}</p>
                </div>
              )}

              {activeExperiences.length > 0 && (
                <div className="mb-6 flex-1">
                  <h2
                    className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-4"
                    style={{ color: "var(--accent)" }}
                  >
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {activeExperiences.map((exp) => (
                      <div key={exp.id}>
                        <p className="text-xs text-slate-500">
                          {exp.company}
                          {formatDateRange(exp.startDate, exp.endDate, exp.current) &&
                            ` / ${formatDateRange(exp.startDate, exp.endDate, exp.current)}`}
                        </p>
                        {exp.position && (
                          <p className="text-sm font-bold text-slate-800 mt-0.5">{exp.position}</p>
                        )}
                        {exp.description && (
                          <DescriptionList description={exp.description} className="text-xs text-slate-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        );

      // Template 6 — Single column purple accents (Jacqueline Thompson style)
      case 6:
        return (
          <div className="template-layout-6 px-8 py-6 space-y-4 min-h-[1056px] h-auto flex flex-col bg-white">
            <div>
              <header className="text-center border-b pb-4 mb-4" style={{ borderColor: "var(--accent-light)" }}>
                {personalInfo.fullName && (
                  <h1
                    className="text-2xl font-bold uppercase tracking-wide mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {personalInfo.fullName}
                  </h1>
                )}
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-slate-700">
                  {personalInfo.address && <span>{personalInfo.address}</span>}
                  {personalInfo.phone && (
                    <>
                      <span>•</span>
                      <span>{personalInfo.phone}</span>
                    </>
                  )}
                  {personalInfo.email && (
                    <>
                      <span>•</span>
                      <span>{personalInfo.email}</span>
                    </>
                  )}
                  {personalInfo.website && (
                    <>
                      <span>•</span>
                      <span>{personalInfo.website}</span>
                    </>
                  )}
                </div>
              </header>

              {summary && (
                <section className="border-b pb-4 mb-4" style={{ borderColor: "var(--accent-light)" }}>
                  <h2
                    className="text-sm font-bold uppercase tracking-wide mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    Summary
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
                </section>
              )}

              {activeExperiences.length > 0 && (
                <section className="border-b pb-4 mb-4" style={{ borderColor: "var(--accent-light)" }}>
                  <h2
                    className="text-sm font-bold uppercase tracking-wide mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {activeExperiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-sm font-bold text-slate-900">
                            {exp.position}
                            {exp.company && `, ${exp.company}`}
                          </p>
                          <span className="text-sm text-slate-600 whitespace-nowrap">
                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                          </span>
                        </div>
                        {exp.description && (
                          <DescriptionList description={exp.description} className="text-sm text-slate-700" />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeEducations.length > 0 && (
                <section className="border-b pb-4 mb-4" style={{ borderColor: "var(--accent-light)" }}>
                  <h2
                    className="text-sm font-bold uppercase tracking-wide mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Education
                  </h2>
                  <div className="space-y-3">
                    {activeEducations.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-sm font-bold text-slate-900">
                            {edu.degree}
                            {edu.field && ` in ${edu.field}`}
                          </p>
                          <span className="text-sm text-slate-600 whitespace-nowrap">
                            {formatDateRange(edu.startDate, edu.endDate)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{edu.school}</p>
                        {edu.gpa && (
                          <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                            <li>GPA: {edu.gpa}</li>
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSkills.length > 0 && (
                <section className="border-b pb-4 mb-4" style={{ borderColor: "var(--accent-light)" }}>
                  <h2
                    className="text-sm font-bold uppercase tracking-wide mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Skills
                  </h2>
                  <SkillBulletList skills={skills} columns={2} className="text-xs text-slate-700" />
                </section>
              )}
            </div>

            {(personalInfo.linkedin || personalInfo.github) && (
              <section className="pt-2">
                <h2
                  className="text-sm font-bold uppercase tracking-wide mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Additional Information
                </h2>
                <ul className="text-sm text-slate-700 space-y-1 list-none">
                  {personalInfo.linkedin && (
                    <li className="flex items-center gap-1">
                      <span className="font-bold">LinkedIn:</span> {personalInfo.linkedin}
                    </li>
                  )}
                  {personalInfo.github && (
                    <li className="flex items-center gap-1">
                      <span className="font-bold">GitHub:</span> {personalInfo.github}
                    </li>
                  )}
                </ul>
              </section>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const printClasses = `resume-print bg-white shadow-lg template-${templateData.id} ${
    fullBleed ? "p-0" : "p-0"
  }`;

  return (
    <div className="w-full relative max-w-full overflow-visible">
      <div
        id="resume-preview-print"
        aria-hidden="true"
        className={printClasses}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "8.5in",
          minHeight: "11in",
          height: "auto",
          padding: 0,
          margin: 0,
          overflow: "visible",
          whiteSpace: "normal",
          backgroundColor: "#ffffff",
        }}
      >
        <RenderTemplate />
      </div>

      <div
        id="resume-preview"
        className={`${printClasses} relative z-0 w-full max-w-[8.5in] mx-auto min-h-[1056px] h-auto overflow-visible`}
      >
        <RenderTemplate />
      </div>
    </div>
  );
}