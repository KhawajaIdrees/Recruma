"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Skill } from "./types";

interface SkillsSectionProps {
  skills: Skill[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
}

export default function SkillsSection({
  skills,
  onAdd,
  onRemove,
  onUpdate,
}: SkillsSectionProps) {
  return (
    <div className="space-y-3 font-poppins">
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => onUpdate(skill.id, e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemove(skill.id)}
                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors shrink-0"
                title="Remove Skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Skill</span>
      </button>
    </div>
  );
}
