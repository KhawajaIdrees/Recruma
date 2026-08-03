"use client";

interface SummarySectionProps {
  summary: string;
  onUpdate: (value: string) => void;
}

export default function SummarySection({
  summary,
  onUpdate,
}: SummarySectionProps) {
  return (
    <div className="space-y-4 font-poppins">
      <textarea
        placeholder="Write a brief summary of your professional background..."
        value={summary}
        onChange={(e) => onUpdate(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white font-poppins resize-none text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}
