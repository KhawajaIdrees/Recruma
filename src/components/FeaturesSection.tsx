"use client";

import { Sparkles, ShieldCheck, Edit3, Download } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Suggestions",
      description: "Get smart content suggestions and improve your resume with AI recommendations."
    },
    {
      icon: ShieldCheck,
      title: "ATS Friendly",
      description: "Our templates are optimized to pass ATS scans and get you noticed."
    },
    {
      icon: Edit3,
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates that stand out."
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "Download your resume in PDF format and apply with confidence."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-montserrat mb-2.5 text-center">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-poppins text-center max-w-xs">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
