// components/HeroSection.tsx
"use client";

import { ArrowRight, Star, Zap, CheckCircle, FileText, Download, Sparkles, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full border border-green-200 animate-fade-in-up">
                <Star className="w-4 h-4 text-green-600 animate-pulse" />
                <span className="text-sm font-medium text-green-700 font-montserrat">AI-Powered Resume Builder</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight font-montserrat animate-fade-in-up">
                Create stunning resumes with{" "}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-orange-500 bg-clip-text text-transparent animate-gradient">
                  Recruma
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-poppins animate-fade-in-up">
                Transform your career with professional resumes that stand out. 
                Our AI-powered platform helps you create compelling resumes in minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <button className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 hover:scale-105 font-montserrat animate-float">
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 font-montserrat animate-float">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>View Templates</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 font-poppins animate-fade-in-up">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-pulse" />
                <span>Free Templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-pulse" />
                <span>AI Optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-pulse" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>

          {/* Right Side Animation */}
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
            
            {/* Floating Resume Cards */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-200/20">
              <div className="space-y-6">
                {/* Floating Card 1 */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-4 shadow-lg animate-float">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-white" />
                    <div>
                      <h3 className="text-white font-semibold font-montserrat">Professional Resume</h3>
                      <p className="text-white/80 text-sm font-poppins">AI-optimized content</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center space-x-3">
                    <Download className="w-6 h-6 text-white" />
                    <div>
                      <h3 className="text-white font-semibold font-montserrat">Instant Download</h3>
                      <p className="text-white/80 text-sm font-poppins">PDF format ready</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 3 */}
                <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                    <div>
                      <h3 className="text-white font-semibold font-montserrat">ATS Friendly</h3>
                      <p className="text-white/80 text-sm font-poppins">Pass through systems</p>
                    </div>
                  </div>
                </div>

                {/* Sparkles Animation */}
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-8 h-8 text-green-500 animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
