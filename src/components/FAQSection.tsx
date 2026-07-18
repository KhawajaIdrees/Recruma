"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How to use Recruma - Resume Creator?",
    answer:
      "Choose a template, fill in your personal details, experience, education, and skills, then download your polished resume as a PDF in minutes.",
  },
  {
    question: "Why do I have to make a different resume for every job application?",
    answer:
      "Tailoring your resume to each role helps highlight the skills and experience that match the job, which improves your chances of getting past ATS filters and impressing recruiters.",
  },
  {
    question: "Should I use a resume template in 2026?",
    answer:
      "Yes. A clean, professional template saves time and keeps your layout ATS-friendly while still looking modern and easy to read.",
  },
  {
    question: "Should my resume be in PDF or Word format?",
    answer:
      "PDF is usually best—it preserves your formatting across devices. Use Word only if the employer specifically asks for it.",
  },
  {
    question: "Should I send a cover letter with my resume?",
    answer:
      "Yes, when possible. A short, targeted cover letter shows genuine interest and gives you space to explain why you're a strong fit for the role.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-10 sm:mb-14 font-montserrat">
          Frequently asked questions from Recruma
        </h2>

        <div className="border-t border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg text-slate-900 font-poppins pr-2">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-slate-900 shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-900 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm sm:text-base text-slate-600 leading-relaxed font-poppins">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
