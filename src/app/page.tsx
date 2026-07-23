"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { 
  Sparkles, 
  ShieldCheck, 
  Edit3, 
  Download, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Users, 
  Award, 
  Star, 
  FileText,
  Mail
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const [emailInput, setEmailInput] = useState("");

  const templates = [
    { id: 1, name: "Template 1", image: "/template1.png" },
    { id: 2, name: "Template 2", image: "/template2.png" },
    { id: 3, name: "Template 3", image: "/template3.png" },
    { id: 4, name: "Template 4", image: "/template4.png" },
    { id: 5, name: "Template 5", image: "/template5.png" },
  ];

  const handlePrevTemplate = () => {
    setActiveTemplateIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const handleNextTemplate = () => {
    setActiveTemplateIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const handleUseTemplate = (templateId: number) => {
    router.push(`/make?template=${templateId}`);
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/signup?email=${encodeURIComponent(emailInput)}`);
  };

  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden bg-white text-slate-900 font-poppins">
        {/* Hero Section */}
        <HeroSection />

        {/* ---------------------------------------------------- */}
        {/* SECTION 2: WHY RECRUMA? */}
        {/* ---------------------------------------------------- */}
        <section id="features" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-4">
                WHY RECRUMA?
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat">
                Everything you need to build the perfect resume
              </h2>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              {/* Feature 1 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  AI-Powered Suggestions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get smart content suggestions and improve your resume with AI recommendations.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  ATS Friendly
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our templates are optimized to pass ATS scans and get you noticed.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                  <Edit3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  Beautiful Templates
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Choose from professionally designed templates that stand out.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  Instant Download
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Download your resume in PDF format and apply with confidence.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* SECTION 3: PROFESSIONAL TEMPLATES */}
        {/* ---------------------------------------------------- */}
        <section id="templates" className="py-20 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header with Title on Left, View all on Right */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-3">
                  PROFESSIONAL TEMPLATES
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat mb-2">
                  Designed to make you stand out
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Choose from a variety of modern and professional templates.
                </p>
              </div>

              <Link
                href="/templates"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-900 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 transition-all shrink-0 self-start md:self-auto"
              >
                <span>View all templates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Template Carousel Container */}
            <div className="relative group">
              
              {/* Left Slider Arrow */}
              <button
                onClick={handlePrevTemplate}
                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all"
                aria-label="Previous template"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Templates Showcase Grid/Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {templates.map((tpl, idx) => (
                  <div
                    key={tpl.id}
                    onClick={() => handleUseTemplate(tpl.id)}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer group/card flex flex-col ${
                      idx === activeTemplateIndex
                        ? "border-slate-900 ring-2 ring-slate-900/10 shadow-xl scale-[1.02]"
                        : "border-slate-200/80 shadow-sm hover:shadow-lg hover:border-slate-400"
                    }`}
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                      <img
                        src={tpl.image}
                        alt={tpl.name}
                        className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-lg shadow-md font-montserrat">
                          Use Template
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Slider Arrow */}
              <button
                onClick={handleNextTemplate}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all"
                aria-label="Next template"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {templates.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTemplateIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeTemplateIndex ? "w-6 bg-slate-900" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* SECTION 4: HOW IT WORKS */}
        {/* ---------------------------------------------------- */}
        <section id="how-it-works" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-4">
                HOW IT WORKS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat">
                Create your resume in 3 simple steps
              </h2>
            </div>

            {/* 3 Step Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              
              {/* Horizontal Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-[2px] border-t-2 border-dashed border-slate-200 -z-0" />

              {/* Step 1 */}
              <div className="relative bg-white z-10 text-center flex flex-col items-center p-6">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                    <FileText className="w-7 h-7 text-slate-800" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    1
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  Choose a Template
                </h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Select from our collection of professional templates.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white z-10 text-center flex flex-col items-center p-6">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                    <Edit3 className="w-7 h-7 text-slate-800" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    2
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  Add Your Information
                </h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Fill in your details and let our AI help you optimize your content.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white z-10 text-center flex flex-col items-center p-6">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                    <Download className="w-7 h-7 text-slate-800" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    3
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                  Download & Apply
                </h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Download your resume and start applying to your dream jobs.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* SECTION 5: TRUSTED BY THOUSANDS / TESTIMONIALS & STATS */}
        {/* ---------------------------------------------------- */}
        <section className="py-20 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-slate-100/90 border border-slate-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest font-montserrat mb-4">
                TRUSTED BY THOUSANDS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat">
                Loved by job seekers worldwide
              </h2>
            </div>

            {/* 3 Testimonial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              
              {/* Testimonial 1 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div>
                  <Quote className="w-8 h-8 text-blue-500/30 mb-4 fill-blue-500/10" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    "Recruma helped me create a professional resume that landed me interviews at top companies. Highly recommended!"
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Ayesha Khan"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-montserrat">Ayesha Khan</h4>
                    <p className="text-xs text-slate-500">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div>
                  <Quote className="w-8 h-8 text-blue-500/30 mb-4 fill-blue-500/10" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    "The AI suggestions are amazing! It made my resume so much better and ATS-friendly."
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Usman Ali"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-montserrat">Usman Ali</h4>
                    <p className="text-xs text-slate-500">Data Scientist</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div>
                  <Quote className="w-8 h-8 text-blue-500/30 mb-4 fill-blue-500/10" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    "Beautiful templates and super easy to use. I got my dream job thanks to Recruma!"
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Sara Malik"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-montserrat">Sara Malik</h4>
                    <p className="text-xs text-slate-500">Product Manager</p>
                  </div>
                </div>
              </div>

            </div>

            {/* 4 Stats Cards Below */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <Users className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">
                  10,000+
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  Resumes Created
                </span>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <Users className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">
                  5,000+
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  Happy Users
                </span>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <Award className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">
                  95%
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  ATS Success Rate
                </span>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <Star className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">
                  4.9/5
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  User Rating
                </span>
              </div>

            </div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* SECTION 6: CTA BANNER */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0b1329] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              
              {/* Left Graphic / Icon */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-200 shadow-inner">
                  <Mail className="w-8 h-8 text-amber-200" />
                </div>
              </div>

              {/* Center Text */}
              <div className="space-y-2 text-center lg:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold font-montserrat tracking-tight">
                  Ready to build your perfect resume?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base">
                  Join thousands of successful job seekers.
                </p>
              </div>

              {/* Right Email Form */}
              <form onSubmit={handleCtaSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-slate-800/90 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder:text-slate-400 min-w-[240px]"
                />
                <button
                  type="submit"
                  className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm font-montserrat shadow-md shrink-0"
                >
                  Get Started Free
                </button>
              </form>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
