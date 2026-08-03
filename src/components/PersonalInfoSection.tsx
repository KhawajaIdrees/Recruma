"use client";

import type { PersonalInfo } from "./types";

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onUpdate: (field: keyof PersonalInfo, value: string) => void;
}

export default function PersonalInfoSection({
  personalInfo,
  onUpdate,
}: PersonalInfoSectionProps) {
  const fields: Array<{ key: keyof PersonalInfo; placeholder: string; type: string }> = [
    { key: "fullName", placeholder: "Full Name", type: "text" },
    { key: "email", placeholder: "Email", type: "email" },
    { key: "phone", placeholder: "Phone", type: "tel" },
    { key: "address", placeholder: "Address", type: "text" },
    { key: "linkedin", placeholder: "LinkedIn Profile", type: "text" },
    { key: "github", placeholder: "GitHub Profile", type: "text" },
    { key: "website", placeholder: "Website", type: "text" },
  ];

  return (
    <div className="space-y-3 font-poppins">
      {fields.map((field) => (
        <input
          key={field.key}
          type={field.type}
          placeholder={field.placeholder}
          value={personalInfo[field.key]}
          onChange={(e) => onUpdate(field.key, e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
        />
      ))}
    </div>
  );
}
