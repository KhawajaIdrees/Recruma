"use client";

import { Plus, Trash2, User } from "lucide-react";
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
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 transition-shadow hover:shadow-xl">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-montserrat flex items-center space-x-2">
        <div className="p-2 bg-slate-100 rounded-lg">
          <User className="w-5 h-5 text-slate-900" />
        </div>
        <span>Personal Information</span>
      </h2>
      <div className="space-y-3">
        {fields.map((field) => (
          <input
            key={field.key}
            type={field.type}
            placeholder={field.placeholder}
            value={personalInfo[field.key]}
            onChange={(e) => onUpdate(field.key, e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
          />
        ))}
      </div>
    </div>
  );
}
