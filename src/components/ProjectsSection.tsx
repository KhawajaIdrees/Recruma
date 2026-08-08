"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Project } from "./types";

interface ProjectsSectionProps {
  projects: Project[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Project, value: string) => void;
}

export default function ProjectsSection({
  projects,
  onAdd,
  onRemove,
  onUpdate,
}: ProjectsSectionProps) {
  return (
    <div className="space-y-4 font-poppins">
      {projects.length === 0 ? (
        <p className="text-xs text-slate-500 italic py-2">
          No projects added yet. Click &quot;Add Project&quot; below to add your first project.
        </p>
      ) : (
        projects.map((proj, index) => (
          <div
            key={proj.id}
            className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Project #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemove(proj.id)}
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                title="Remove Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Project Title / Name"
              value={proj.name}
              onChange={(e) => onUpdate(proj.id, "name", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400 font-poppins"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Project Link / URL (e.g., github.com/user/project)"
                value={proj.link || ""}
                onChange={(e) => onUpdate(proj.id, "link", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400 font-poppins"
              />
              <input
                type="text"
                placeholder="Technologies Used (e.g., React, Node.js, Python)"
                value={proj.technologies || ""}
                onChange={(e) => onUpdate(proj.id, "technologies", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400 font-poppins"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Start Date (e.g., Jan 2024)"
                value={proj.startDate || ""}
                onChange={(e) => onUpdate(proj.id, "startDate", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400 font-poppins"
              />
              <input
                type="text"
                placeholder="End Date (e.g., Present or Mar 2024)"
                value={proj.endDate || ""}
                onChange={(e) => onUpdate(proj.id, "endDate", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400 font-poppins"
              />
            </div>

            <textarea
              placeholder="Project description, key features, and accomplishments..."
              value={proj.description}
              onChange={(e) => onUpdate(proj.id, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white resize-none text-slate-900 placeholder:text-slate-400 font-poppins"
            />
          </div>
        ))
      )}

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors cursor-pointer font-poppins"
      >
        <Plus className="w-4 h-4" />
        <span>Add Project</span>
      </button>
    </div>
  );
}
