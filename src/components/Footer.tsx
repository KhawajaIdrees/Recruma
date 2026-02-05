"use client";

import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat">Recruma</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-poppins text-sm">
              Transform your career with AI-powered resume building. Create professional, ATS-friendly resumes that get you noticed and help you land your dream job.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-200 text-slate-900">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-200 text-slate-900">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-200 text-slate-900">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-200 text-slate-900">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-montserrat">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/templates" className="text-slate-600 hover:text-slate-900 transition-all duration-200 font-poppins hover:underline">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/make" className="text-slate-600 hover:text-slate-900 transition-all duration-200 font-poppins hover:underline">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-all duration-200 font-poppins hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-all duration-200 font-poppins hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-montserrat">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-poppins uppercase">Email</p>
                  <a href="mailto:hello@recruma.com" className="text-slate-600 hover:text-slate-900 font-poppins transition-all duration-200">
                    hello@recruma.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-poppins uppercase">Phone</p>
                  <a href="tel:+15551234567" className="text-slate-600 hover:text-slate-900 font-poppins transition-all duration-200">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-poppins uppercase">Location</p>
                  <p className="text-slate-600 font-poppins">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
       <div className="border-t border-slate-200 pt-8">
  <div className="flex justify-center items-center">
    <div className="text-slate-500 text-sm font-poppins">
      © 2024 Recruma. All rights reserved.
    </div>
  </div>
</div>

      </div>
    </footer>
  );
} 