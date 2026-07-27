"use client";

import { Language } from "./types";
import { Plus, Trash2 } from "lucide-react";

interface LanguagesSectionProps {
  languages: Language[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Language, value: string) => void;
}

export default function LanguagesSection({
  languages,
  onAdd,
  onRemove,
  onUpdate,
}: LanguagesSectionProps) {
  return (
    <div className="space-y-4 font-poppins">
      {languages.map((lang) => (
        <div
          key={lang.id}
          className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg"
        >
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Language (e.g., English)"
              value={lang.name}
              onChange={(e) => onUpdate(lang.id, "name", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
            />
            <input
              type="text"
              placeholder="Proficiency (e.g., Native, Fluent)"
              value={lang.proficiency || ""}
              onChange={(e) => onUpdate(lang.id, "proficiency", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
            />
          </div>
          <button
            type="button"
            onClick={() => onRemove(lang.id)}
            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors shrink-0"
            title="Remove Language"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Language</span>
      </button>
    </div>
  );
}
