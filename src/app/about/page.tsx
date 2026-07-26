"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Target, 
  Users, 
  Zap, 
  Heart, 
  Award, 
  Lightbulb, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  FileText,
  Star,
  Compass
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-20 bg-white text-slate-900 font-poppins overflow-x-hidden">
        
        {/* ---------------------------------------------------- */}
        {/* HERO SECTION */}
        {/* ---------------------------------------------------- */}
        <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
          
          {/* Decorative background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Dotted Grid Pattern in Top Right */}
          <div className="absolute top-8 right-12 grid grid-cols-6 gap-2 opacity-20 -z-10 hidden sm:grid">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            ))}
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl lg:max-w-5xl mx-auto space-y-6">
              
              {/* Top Pill Badge */}
              <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat">
                ABOUT RECRUMA
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-montserrat">
                We help job seekers build dream careers.
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-poppins max-w-3xl mx-auto">
                Recruma was built with a single goal: to empower job seekers around the globe with simple, AI-powered tools and ATS-friendly resume templates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/make"
                  className="bg-[#0f172a] text-white px-7 py-3.5 rounded-xl font-medium text-sm sm:text-base inline-flex items-center gap-2.5 shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all font-poppins group"
                >
                  <span>Start Building Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/templates"
                  className="bg-white text-slate-900 border border-slate-300 px-7 py-3.5 rounded-xl font-medium text-sm sm:text-base inline-flex items-center gap-2 hover:bg-slate-50 transition-all font-poppins"
                >
                  <Sparkles className="w-4 h-4 text-slate-700" />
                  <span>Browse Templates</span>
                </Link>
              </div>

              {/* Quick Highlight Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs sm:text-sm text-slate-600 font-poppins">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>AI Content Suggestions</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>100% ATS Optimized</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Instant PDF Export</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* OUR MISSION SECTION */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Details Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-4">
                    OUR MISSION
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat leading-tight mb-4">
                    Empowering your professional journey with precision & simplicity
                  </h2>

                  <p className="text-slate-600 text-base leading-relaxed font-poppins mb-4">
                    At Recruma, we believe everyone deserves a resume that accurately reflects their unique talent, experience, and ambition. Crafting a standout resume shouldn&apos;t feel overwhelming or take hours of design tweak work.
                  </p>

                  <p className="text-slate-600 text-base leading-relaxed font-poppins">
                    We built our platform using modern AI technologies combined with professionally designed templates to democratize career growth. Whether you are a college graduate or an experienced senior leader, Recruma gives you the edge you need.
                  </p>
                </div>

                {/* Focused Impact & ATS Compliance Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-3.5 bg-slate-50/90 p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
                    <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-montserrat">Focused Impact</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-normal">Layouts optimized for hiring manager attention.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 bg-slate-50/90 p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
                    <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-montserrat">ATS Compliance</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-normal">Guaranteed seamless applicant tracking scans.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Stat Cards Container */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="bg-slate-50/80 rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xs h-full flex flex-col justify-between space-y-5">
                  
                  {/* Stat Card 1 */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">10,000+</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium font-poppins">Resumes Created Worldwide</p>
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">95%</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium font-poppins">ATS Screen Pass Rate</p>
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">5,000+</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium font-poppins">Happy Job Seekers</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* OUR CORE VALUES */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-14">
              <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-3">
                OUR VALUES
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat">
                The principles that guide everything we do
              </h2>
            </div>

            {/* 4 Cards Grid (Matching Home Features Section Design) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Value 1 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-montserrat mb-2.5 text-center">
                  Innovation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-poppins text-center">
                  We constantly innovate with cutting-edge tools to give you a competitive advantage in job hunting.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-montserrat mb-2.5 text-center">
                  User-Centric
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-poppins text-center">
                  Your success is our success. We design every feature with your specific career goals in mind.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-montserrat mb-2.5 text-center">
                  Excellence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-poppins text-center">
                  We strive for perfection in template typography, speed, and real-time interactive resume building.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-montserrat mb-2.5 text-center">
                  Accessibility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-poppins text-center">
                  Professional resume tools should be easy to access for anyone, anywhere, with zero friction.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* OUR STORY SECTION */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header with Brief Subtitle Description */}
            <div className="text-center max-w-4xl mx-auto mb-14">
              <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-3">
                OUR STORY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat">
                How Recruma Was Born
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-normal font-poppins max-w-2xl mx-auto mt-3">
                The journey behind our platform and why we are passionate about transforming career success for job seekers worldwide.
              </p>
            </div>

            {/* 3 Story Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Card 1 */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white mb-5 shrink-0 mx-auto">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-montserrat mb-1 text-center">
                    The Observation
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 font-montserrat uppercase tracking-wider mb-3 text-center">
                    Identifying the Resume Gap
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed font-poppins text-center">
                    Creating a standout resume shouldn&apos;t be complex or expensive. Many qualified candidates miss out simply due to poor formatting and non-ATS-compliant templates.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white mb-5 shrink-0 mx-auto">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-montserrat mb-1 text-center">
                    The Solution
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 font-montserrat uppercase tracking-wider mb-3 text-center">
                    Smart AI & Recruiter Templates
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed font-poppins text-center">
                    We combined AI-driven writing assistance with recruiter-tested templates so you can build, refine, and export professional PDFs in minutes.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white mb-5 shrink-0 mx-auto">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-montserrat mb-1 text-center">
                    Looking Forward
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 font-montserrat uppercase tracking-wider mb-3 text-center">
                    Empowering Global Careers
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed font-poppins text-center">
                    Recruma has helped thousands land their dream jobs worldwide. We continuously update our templates to keep you ahead in today&apos;s job market.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CTA BANNER SECTION */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0b1329] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              
              {/* Left Graphic Icon */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-200 shadow-inner">
                  <Award className="w-8 h-8 text-amber-200" />
                </div>
              </div>

              {/* Center Text */}
              <div className="space-y-2 text-center lg:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold font-montserrat tracking-tight">
                  Ready to transform your career?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-poppins">
                  Start building your professional resume today and take the first step towards your dream job.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 justify-center">
                <Link
                  href="/make"
                  className="bg-white text-slate-900 font-bold px-6 py-3.5 rounded-xl hover:bg-slate-100 transition-colors text-sm font-montserrat shadow-md inline-flex items-center justify-center gap-2"
                >
                  <span>Start Building Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/templates"
                  className="bg-slate-800/90 text-white border border-slate-700 px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-colors text-sm font-montserrat inline-flex items-center justify-center"
                >
                  Browse Templates
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
