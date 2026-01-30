"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Target, Users, Zap, Heart, Award, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-montserrat animate-fade-in-up">
                About <span className="bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">Recruma</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-poppins animate-fade-in-up stagger-1">
                We&apos;re on a mission to help professionals create resumes that stand out and get them hired faster.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full mb-6">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700 font-montserrat">Our Mission</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 font-montserrat">
                  Empowering Your Career Journey
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4 font-poppins">
                  At Recruma, we believe that everyone deserves a resume that truly represents their skills, 
                  achievements, and potential. We&apos;ve created an AI-powered platform that makes resume building 
                  easy, accessible, and effective.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-poppins">
                  Our mission is to democratize access to professional resume creation, helping millions of 
                  job seekers create compelling resumes that pass ATS systems and impress hiring managers.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 to-pink-200/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-indigo-50 to-pink-50 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-montserrat">100K+</h3>
                      <p className="text-slate-600 font-poppins">Resumes Created</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-montserrat">95%</h3>
                      <p className="text-slate-600 font-poppins">ATS Pass Rate</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-montserrat">50K+</h3>
                      <p className="text-slate-600 font-poppins">Happy Users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
                Our Values
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-poppins">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-montserrat">Innovation</h3>
                <p className="text-slate-600 font-poppins">
                  We constantly innovate to provide cutting-edge tools and features that give you a competitive edge.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-indigo-50 hover:from-pink-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-montserrat">User-Centric</h3>
                <p className="text-slate-600 font-poppins">
                  Your success is our success. We design every feature with your needs and goals in mind.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-indigo-50 hover:from-amber-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-montserrat">Excellence</h3>
                <p className="text-slate-600 font-poppins">
                  We strive for excellence in every template, feature, and interaction to deliver the best experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700 font-montserrat">Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 font-montserrat">
                How Recruma Was Born
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-slate-600 font-poppins leading-relaxed">
              <p className="mb-6">
                Recruma started with a simple observation: creating a professional resume shouldn&apos;t be difficult 
                or expensive. Too many talented professionals struggle to get their foot in the door because 
                their resume doesn&apos;t effectively showcase their skills and experience.
              </p>
              <p className="mb-6">
                We combined the power of AI with beautiful, ATS-friendly templates to create a platform that 
                makes resume building accessible to everyone. Whether you&apos;re a recent graduate or a seasoned 
                professional, Recruma helps you create a resume that gets noticed.
              </p>
              <p>
                Today, we&apos;re proud to have helped thousands of professionals land their dream jobs. But we&apos;re 
                just getting started. We&apos;re continuously improving our platform, adding new features, and 
                expanding our template library to serve you better.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-3xl p-12 shadow-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 mb-6">
                <Award className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700 font-montserrat">Join Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-montserrat">
                Ready to Transform Your Career?
              </h2>
              <p className="text-lg text-slate-600 mb-8 font-poppins">
                Start building your professional resume today and take the first step towards your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/make"
                  className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat inline-flex items-center justify-center"
                >
                  Start Building Now
                </a>
                <a
                  href="/templates"
                  className="bg-white/90 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 font-montserrat inline-flex items-center justify-center"
                >
                  Browse Templates
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
