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
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transition-shadow hover:shadow-xl">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-montserrat flex items-center space-x-2">
        <div className="p-2 bg-blue-100 rounded-lg">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <span>Professional Summary</span>
      </h2>
      <textarea
        placeholder="Write a brief summary of your professional background..."
        value={summary}
        onChange={(e) => onUpdate(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins resize-none text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}
