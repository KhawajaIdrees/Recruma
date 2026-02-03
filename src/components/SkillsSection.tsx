"use client";

import { Plus, Trash2, Award } from "lucide-react";
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
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 font-montserrat flex items-center space-x-2">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <span>Skills</span>
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium font-poppins transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => onUpdate(skill.id, e.target.value)}
              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-slate-900 placeholder:text-slate-400"
            />
            {index > 0 && (
              <button
                onClick={() => onRemove(skill.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
