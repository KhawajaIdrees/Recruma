"use client";

import { Plus, Trash2 } from "lucide-react";
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
    <div className="space-y-4 font-poppins">
      {experiences.length === 0 ? (
        <p className="text-xs text-slate-500 italic py-2">
          No work experience added yet. Click &quot;Add Experience&quot; below to add work experience.
        </p>
      ) : (
        experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Experience #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemove(exp.id)}
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                title="Remove Experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>


          <input
            type="text"
            placeholder="Job Title"
            value={exp.position}
            onChange={(e) => onUpdate(exp.id, "position", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Start Date (e.g., Jan 2020)"
              value={exp.startDate}
              onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder={exp.current ? "Current" : "End Date (e.g., Jan 2023)"}
              value={exp.endDate}
              onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
              disabled={exp.current}
              className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white disabled:bg-slate-100 text-slate-900 placeholder:text-slate-400 disabled:text-slate-500"
            />
          </div>
          <label className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => onUpdate(exp.id, "current", e.target.checked)}
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
            />
            <span className="text-xs text-slate-600 font-poppins">I currently work here</span>
          </label>
          <textarea
            placeholder="Job description and achievements..."
            value={exp.description}
            onChange={(e) => onUpdate(exp.id, "description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white resize-none text-slate-900 placeholder:text-slate-400 font-poppins"
          />
        </div>
      )))}



      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Experience</span>
      </button>
    </div>
  );
}
