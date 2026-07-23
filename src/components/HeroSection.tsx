"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Check, Mail, Phone, MapPin, Briefcase, GraduationCap, User, Code, Layout, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-slate-700" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 font-poppins">
                AI-Powered Resume Builder
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-montserrat">
              Create resumes <br className="hidden sm:inline" />
              that get you hired.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-poppins max-w-xl">
              Build professional, ATS-friendly resumes in minutes with AI guidance and beautiful templates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/make"
                className="bg-[#0f172a] text-white px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base inline-flex items-center gap-2.5 shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all font-poppins group"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/templates"
                className="bg-white text-slate-900 border border-slate-300 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base inline-flex items-center gap-2 hover:bg-slate-50 transition-all font-poppins"
              >
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>View Templates</span>
              </Link>
            </div>

            {/* Feature Checklist */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-600 font-poppins">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>Free Templates</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>AI Optimization</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>Instant Download</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar 1"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar 2"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar 3"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar 4"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-poppins">
                Trusted by <strong className="font-bold text-slate-900">10,000+</strong> job seekers worldwide
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Resume Card Replica */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Soft decorative background glow & dotted pattern */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
            
            {/* Dotted Grid Pattern in Top Right */}
            <div className="absolute -top-6 -right-6 grid grid-cols-6 gap-2 opacity-25 -z-10 hidden sm:grid">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              ))}
            </div>

            {/* Resume Card Container */}
            <div className="w-full max-w-[530px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 text-xs font-poppins relative">
              <div className="grid grid-cols-12 min-h-[580px]">
                
                {/* Left Sidebar (Dark Blue/Navy) */}
                <div className="col-span-2 bg-[#0f172a] text-slate-300 p-3 flex flex-col items-center space-y-6 pt-6">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-white">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
                    <Layout className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
                    <Code className="w-4 h-4" />
                  </div>
                </div>

                {/* Right Resume Content Area */}
                <div className="col-span-10 p-5 sm:p-6 space-y-5 bg-white">
                  
                  {/* Name & Header */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-montserrat">
                      Muhammad Idrees
                    </h2>
                    <p className="text-slate-600 font-medium text-xs sm:text-sm mt-0.5">
                      Full Stack Developer
                    </p>

                    {/* Contact Pills */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-slate-500 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>idrees@example.com</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>+92 300 1234567</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Islamabad, Pakistan</span>
                      </div>
                    </div>
                  </div>

                  {/* About Me Section */}
                  <div>
                    <h3 className="text-[11px] font-bold tracking-wider text-slate-900 uppercase font-montserrat mb-1">
                      ABOUT ME
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Motivated and detail-oriented Full Stack Developer with experience building modern web applications. Passionate about creating efficient solutions and delivering high-quality user experiences.
                    </p>
                  </div>

                  {/* Experience Section */}
                  <div>
                    <h3 className="text-[11px] font-bold tracking-wider text-slate-900 uppercase font-montserrat mb-2">
                      EXPERIENCE
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-xs">Full Stack Developer</span>
                        <span className="text-[10px] text-slate-400">Jun 2023 - Present</span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-600 italic">Tech Solutions Inc.</p>
                      <ul className="text-[11px] text-slate-600 space-y-1 pl-3 list-disc">
                        <li>Developed and maintained responsive web applications.</li>
                        <li>Collaborated with cross-functional teams to deliver projects.</li>
                        <li>Implemented RESTful APIs and optimized performance.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div>
                    <h3 className="text-[11px] font-bold tracking-wider text-slate-900 uppercase font-montserrat mb-1">
                      EDUCATION
                    </h3>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <p className="font-bold text-slate-900 text-xs">BS in Information Technology</p>
                        <p className="text-[11px] text-slate-600">Air University, Islamabad</p>
                      </div>
                      <span className="text-[10px] text-slate-400">2021 - 2025</span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="text-[11px] font-bold tracking-wider text-slate-900 uppercase font-montserrat mb-2">
                      SKILLS
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {["React", "Next.js", "JavaScript", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Prisma"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-medium text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Hand-drawn curly arrow stroke at bottom right */}
            <div className="absolute -bottom-8 -right-4 pointer-events-none text-slate-400 hidden sm:block">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 20 80 Q 50 10, 80 40 T 70 70" />
                <path d="M 60 75 L 70 70 L 75 80" />
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

