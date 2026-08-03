"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Education } from "./types";

interface EducationSectionProps {
  educations: Education[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Education, value: string) => void;
}

export default function EducationSection({
  educations,
  onAdd,
  onRemove,
  onUpdate,
}: EducationSectionProps) {
  return (
    <div className="space-y-4 font-poppins">
      {educations.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Education #{index + 1}
            </span>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemove(edu.id)}
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                title="Remove Education"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="School/University"
            value={edu.school}
            onChange={(e) => onUpdate(edu.id, "school", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
          />
          <input
            type="text"
            placeholder="Degree (e.g., Bachelor's)"
            value={edu.degree}
            onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={edu.field}
            onChange={(e) => onUpdate(edu.id, "field", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="End Date (or Expected)"
              value={edu.endDate}
              onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <input
            type="text"
            placeholder="GPA (optional)"
            value={edu.gpa}
            onChange={(e) => onUpdate(edu.id, "gpa", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Education</span>
      </button>
    </div>
  );
}
