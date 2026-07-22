"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Star, Download, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
  const router = useRouter();

  const handleUseTemplate = (templateNumber: number) => {
    router.push(`/make?template=${templateNumber}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 font-montserrat animate-fade-in-up">
              Professional Resume Templates
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-poppins animate-fade-in-up stagger-1">
              Choose from our collection of beautifully designed templates that help you stand out in any industry
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((template, index) => (
              <div 
                key={template} 
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-300 hover:border-slate-400 hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-slate-50 p-4 sm:p-6">
                  <div className="bg-white rounded-lg shadow-inner p-3 sm:p-4 overflow-hidden border border-slate-300">
                    <img
                      src={`/template${template > 6 ? template % 6 || 6 : template}.png`}
                      alt={`Template ${template}`}
                      className="w-full h-72 sm:h-96 lg:h-[28rem] object-contain group-hover:scale-[1.05] transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/template1.png';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl">
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                      <button 
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base hover:scale-105 shadow-lg"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Use</span>
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-slate-900 animate-pulse" />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 font-montserrat">Template {template}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs sm:text-sm text-slate-600 font-poppins">4.{template + 2}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-poppins">
                    {template === 1 ? 'Perfect for creative professionals & designers' : 
                     template === 2 ? 'Ideal for corporate executives & managers' : 
                     template === 3 ? 'Best for tech professionals & developers' : 
                     template === 4 ? 'Great for marketing & communications' : 
                     template === 5 ? 'Excellent for sales & business development' : 
                     'Versatile design for all industries'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-slate-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 font-montserrat">
              Ready to Create Your Resume?
            </h2>
            <p className="text-slate-600 mb-6 font-poppins">
              Start building your professional resume now and get hired faster
            </p>
            <Link
              href="/make"
              className="inline-flex items-center space-x-2 bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
