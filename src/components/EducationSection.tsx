"use client";

import { Plus, Trash2, GraduationCap } from "lucide-react";
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
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 transition-shadow hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
          <div className="p-2 bg-slate-100 rounded-lg">
            <GraduationCap className="w-5 h-5 text-slate-900" />
          </div>
          <span>Education</span>
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 bg-slate-100 text-slate-900 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      <div className="space-y-4">
        {educations.map((edu, index) => (
          <div key={edu.id} className="border border-slate-300 rounded-lg p-4 space-y-3">
            {index > 0 && (
              <button
                onClick={() => onRemove(edu.id)}
                className="float-right text-slate-500 hover:text-slate-900"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <input
              type="text"
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => onUpdate(edu.id, "school", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="Degree (e.g., Bachelor's)"
              value={edu.degree}
              onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => onUpdate(edu.id, "field", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
              />
              <input
                type="text"
                placeholder="End Date (or Expected)"
                value={edu.endDate}
                onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <input
              type="text"
              placeholder="GPA (optional)"
              value={edu.gpa}
              onChange={(e) => onUpdate(edu.id, "gpa", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
