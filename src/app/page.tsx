"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Star, Download, Eye, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleUseTemplate = (templateNumber: number) => {
    router.push(`/make?template=${templateNumber}`);
  };

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        
        {/* Template Showcase Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 font-montserrat animate-fade-in-up">
                Professional Templates
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-poppins animate-fade-in-up stagger-1">
                Choose from our collection of beautifully designed templates that help you stand out in any industry
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {[1, 2, 3, 4, 5, 6].map((template, index) => (
                <div 
                  key={template} 
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-300 hover:scale-105 animate-fade-in-up hover-lift flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative flex-1 min-h-80">
                    <img
                      src={`/template${template}.png`}
                      alt={`Template ${template}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                        <button 
                          onClick={() => handleUseTemplate(template)}
                          className="flex-1 bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base hover:scale-105 animate-wiggle"
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Use</span>
                        </button>
                      </div>
                    </div>
                    {/* Floating sparkles */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-4 h-4 text-slate-900 animate-pulse" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 border-t border-slate-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 font-montserrat">Template {template}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs sm:text-sm text-slate-600 font-poppins">4.{template + 2}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm font-poppins">
                      Professional design perfect for {template === 1 ? 'creative roles' : template === 2 ? 'corporate positions' : template === 3 ? 'tech careers' : template === 4 ? 'marketing roles' : template === 5 ? 'sales positions' : 'general use'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
                <div className="text-center">
              <Link
                href="/templates"
                className="inline-block bg-slate-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat"
              >
                View All Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-montserrat animate-fade-in-up">
                Why Choose Recruma?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-poppins animate-fade-in-up stagger-1">
                Our platform combines cutting-edge AI technology with beautiful design to help you create resumes that get results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-1 hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-montserrat">AI-Powered Optimization</h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  Our AI analyzes job descriptions and optimizes your resume to match employer requirements
                </p>
              </div>
              
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-2 hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 ">
                  <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-montserrat">Instant Download</h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  Get your professionally formatted resume in PDF format ready to send to employers
                </p>
              </div>
              
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-3 hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-montserrat">ATS-Friendly</h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  All our templates are optimized to pass through Applicant Tracking Systems
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
