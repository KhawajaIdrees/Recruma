"use client";

import { Plus, Trash2, Briefcase } from "lucide-react";
import type { Experience } from "./types";

interface ExperienceSectionProps {
  experiences: Experience[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Experience, value: string | boolean) => void;
}

export default function ExperienceSection({
  experiences,
  onAdd,
  onRemove,
  onUpdate,
}: ExperienceSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-orange-600" />
          </div>
          <span>Work Experience</span>
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="border border-blue-200 rounded-lg p-4 space-y-3">
            {index > 0 && (
              <button
                onClick={() => onRemove(exp.id)}
                className="float-right text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <input
              type="text"
              placeholder="Job Title"
              value={exp.position}
              onChange={(e) => onUpdate(exp.id, "position", e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Start Date (e.g., Jan 2020)"
                value={exp.startDate}
                onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
                className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
              />
              <input
                type="text"
                placeholder={exp.current ? "Current" : "End Date (e.g., Jan 2023)"}
                value={exp.endDate}
                onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
                disabled={exp.current}
                className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins disabled:bg-blue-100 text-slate-900 placeholder:text-slate-400 disabled:text-slate-500"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => onUpdate(exp.id, "current", e.target.checked)}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 font-poppins">I currently work here</span>
            </label>
            <textarea
              placeholder="Job description and achievements..."
              value={exp.description}
              onChange={(e) => onUpdate(exp.id, "description", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins resize-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
