"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Star, Download, Eye, Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (templateNumber: number) => {
    setSelectedTemplate(templateNumber);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleUseTemplate = (templateNumber: number) => {
    // Restore body scroll before navigation
    document.body.style.overflow = 'unset';
    window.location.href = `/make?template=${templateNumber}`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  // Cleanup: restore body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-indigo-200 hover:border-indigo-300 hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-gradient-to-br from-indigo-50 to-pink-50 p-4 sm:p-6">
                  <div className="bg-white rounded-lg shadow-inner p-3 sm:p-4 overflow-hidden border border-blue-200">
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
                        onClick={() => handlePreview(template)}
                        className="flex-1 bg-white/95 backdrop-blur-sm text-slate-800 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base hover:scale-105 shadow-lg"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Preview</span>
                      </button>
                      <button 
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base hover:scale-105 shadow-lg"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Use</span>
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 font-montserrat">Template {template}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 fill-current animate-pulse" />
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
          <div className="text-center bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 font-montserrat">
              Ready to Create Your Resume?
            </h2>
            <p className="text-slate-600 mb-6 font-poppins">
              Start building your professional resume now and get hired faster
            </p>
            <Link
              href="/make"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Template Preview Modal */}
        {isModalOpen && selectedTemplate && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-blue-200">
                <h2 className="text-2xl font-bold text-slate-900 font-montserrat">
                  Template {selectedTemplate} Preview
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                      <div className="relative bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 border border-indigo-200">
                    <div className="relative max-w-4xl mx-auto">
                      <img
                        src={`/template${selectedTemplate}.png`}
                        alt={`Template ${selectedTemplate} Preview`}
                        className="w-full h-auto rounded-xl shadow-2xl border-2 border-white/50 object-contain max-h-[60vh] mx-auto"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/template1.png';
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse shadow-lg">
                          <Eye className="w-4 h-4 inline mr-2" />
                          Preview
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4 font-montserrat">
                        Template Features
                      </h3>
                      <ul className="space-y-2 text-slate-600 font-poppins">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>Professional layout</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>ATS-optimized</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>Clean typography</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>Responsive design</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4 font-montserrat">
                        Perfect For
                      </h3>
                      <p className="text-slate-600 font-poppins mb-4">
                        {selectedTemplate === 1 ? 'Creative professionals, designers, and artists looking to showcase their portfolio and creative skills.' :
                         selectedTemplate === 2 ? 'Corporate executives, managers, and business professionals seeking a sophisticated and authoritative look.' :
                         selectedTemplate === 3 ? 'Technology professionals, developers, and IT specialists who want to highlight technical skills and achievements.' :
                         selectedTemplate === 4 ? 'Marketing professionals, content creators, and communications specialists focusing on brand and campaign work.' :
                         selectedTemplate === 5 ? 'Sales professionals, account managers, and business development specialists emphasizing results and relationships.' :
                         'General professionals across various industries looking for a clean, modern, and versatile design.'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-orange-400 fill-current" />
                        <span className="text-sm text-slate-600 font-poppins">Rating: 4.{selectedTemplate + 2}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-indigo-200">
                    <button 
                      onClick={() => handleUseTemplate(selectedTemplate)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 font-montserrat flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Use This Template</span>
                    </button>
                    <button 
                      onClick={closeModal}
                      className="flex-1 bg-indigo-50 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition-all duration-200 font-montserrat"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
