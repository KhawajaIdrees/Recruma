"use client";

import { Reference } from "./types";
import { Plus, Trash2 } from "lucide-react";

interface ReferencesSectionProps {
  references: Reference[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Reference, value: string) => void;
}

export default function ReferencesSection({
  references,
  onAdd,
  onRemove,
  onUpdate,
}: ReferencesSectionProps) {
  return (
    <div className="space-y-4 font-poppins">
      {references.map((ref) => (
        <div
          key={ref.id}
          className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Reference #{references.indexOf(ref) + 1}
            </span>
            <button
              type="button"
              onClick={() => onRemove(ref.id)}
              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
              title="Remove Reference"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Eleanor Vance"
                value={ref.name}
                onChange={(e) => onUpdate(ref.id, "name", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Relationship / Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Manager"
                value={ref.relationship || ""}
                onChange={(e) => onUpdate(ref.id, "relationship", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Company</label>
              <input
                type="text"
                placeholder="e.g. Borcelle Studio"
                value={ref.company || ""}
                onChange={(e) => onUpdate(ref.id, "company", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Contact Email / Phone</label>
              <input
                type="text"
                placeholder="e.g. eleanor@company.com / +123456789"
                value={ref.email || ref.phone || ""}
                onChange={(e) => onUpdate(ref.id, "email", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Reference</span>
      </button>
    </div>
  );
}
