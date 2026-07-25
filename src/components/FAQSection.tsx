"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How to use Recruma - Resume Creator?",
    answer:
      "Select a professional template, customize your sections with our intuitive editor, and export your high-resolution ATS-friendly PDF resume in minutes.",
  },
  {
    question: "Why do I have to make a different resume for every job application?",
    answer:
      "Tailoring your resume to each role highlights key skills matching the job description, significantly improving ATS pass rates and recruiter response times.",
  },
  {
    question: "Should I use a resume template in 2026?",
    answer:
      "Yes. Modern resume templates ensure proper visual hierarchy and clean formatting that seamlessly passes Applicant Tracking Systems (ATS) while looking executive-ready.",
  },
  {
    question: "Should my resume be in PDF or Word format?",
    answer:
      "PDF is recommended because it preserves layout formatting across all operating systems and devices. Use Word only if explicitly requested by the employer.",
  },
  {
    question: "Should I send a cover letter with my resume?",
    answer:
      "Yes, attaching a tailored cover letter demonstrates genuine interest, provides context for your career achievements, and sets you apart from competing candidates.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 sm:py-24 bg-white font-poppins">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-10 sm:mb-14 font-montserrat tracking-tight">
          Frequently asked questions from Recruma
        </h2>

        <div className="border-t border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-slate-200/90 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors pr-2 font-poppins">
                    {faq.question}
                  </span>
                  <div className="text-slate-800 shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed font-poppins">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
