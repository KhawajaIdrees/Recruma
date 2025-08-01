"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Star, Download, Eye, Sparkles, X } from "lucide-react";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (templateNumber: number) => {
    setSelectedTemplate(templateNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <Navbar />
      <main className="">
        <HeroSection />
        
        {/* Template Showcase Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-montserrat animate-fade-in-up">
                Professional Templates
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-poppins animate-fade-in-up stagger-1">
                Choose from our collection of beautifully designed templates that help you stand out in any industry
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {[1, 2, 3, 4, 5, 6].map((template, index) => (
                <div 
                  key={template} 
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100 hover:scale-105 animate-fade-in-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={`/template${template}.png`}
                      alt={`Template ${template}`}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                        <button 
                          onClick={() => handlePreview(template)}
                          className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base hover:scale-105 animate-wiggle"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Preview</span>
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base hover:scale-105 animate-wiggle">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Use</span>
                        </button>
                      </div>
                    </div>
                    {/* Floating sparkles */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-montserrat">Template {template}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 fill-current animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-600 font-poppins">4.{template + 2}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm font-poppins">
                      Professional design perfect for {template === 1 ? 'creative roles' : template === 2 ? 'corporate positions' : template === 3 ? 'tech careers' : template === 4 ? 'marketing roles' : template === 5 ? 'sales positions' : 'general use'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat animate-float hover-glow">
                View All Templates
              </button>
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
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-1 hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-montserrat">AI-Powered Optimization</h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  Our AI analyzes job descriptions and optimizes your resume to match employer requirements
                </p>
              </div>
              
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-2 hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float" style={{ animationDelay: '0.5s' }}>
                  <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-montserrat">Instant Download</h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  Get your professionally formatted resume in PDF format ready to send to employers
                </p>
              </div>
              
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-green-50 hover:from-orange-100 hover:to-green-100 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-3 hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float" style={{ animationDelay: '1s' }}>
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 font-montserrat">ATS-Friendly</h3>
                <p className="text-gray-600 text-sm sm:text-base font-poppins">
                  All our templates are optimized to pass through Applicant Tracking Systems
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Template Preview Modal */}
      {isModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 font-montserrat">
                Template {selectedTemplate} Preview
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Template Image */}
                <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                  <div className="relative max-w-4xl mx-auto">
                    <img
                      src={`/template${selectedTemplate}.png`}
                      alt={`Template ${selectedTemplate} Preview`}
                      className="w-full h-auto rounded-xl shadow-2xl border-2 border-white/50 object-contain max-h-[60vh] mx-auto"
                      style={{ 
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse shadow-lg">
                        <Eye className="w-4 h-4 inline mr-2" />
                        Preview
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                
                {/* Template Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat">
                      Template Features
                    </h3>
                    <ul className="space-y-2 text-gray-600 font-poppins">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Professional layout</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>ATS-optimized</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Clean typography</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Responsive design</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat">
                      Perfect For
                    </h3>
                    <p className="text-gray-600 font-poppins mb-4">
                      {selectedTemplate === 1 ? 'Creative professionals, designers, and artists looking to showcase their portfolio and creative skills.' :
                       selectedTemplate === 2 ? 'Corporate executives, managers, and business professionals seeking a sophisticated and authoritative look.' :
                       selectedTemplate === 3 ? 'Technology professionals, developers, and IT specialists who want to highlight technical skills and achievements.' :
                       selectedTemplate === 4 ? 'Marketing professionals, content creators, and communications specialists focusing on brand and campaign work.' :
                       selectedTemplate === 5 ? 'Sales professionals, account managers, and business development specialists emphasizing results and relationships.' :
                       'General professionals across various industries looking for a clean, modern, and versatile design.'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-orange-400 fill-current" />
                      <span className="text-sm text-gray-600 font-poppins">Rating: 4.{selectedTemplate + 2}/5</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 font-montserrat animate-float">
                    <Download className="w-4 h-4 inline mr-2" />
                    Use This Template
                  </button>
                  <button 
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 font-montserrat"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
