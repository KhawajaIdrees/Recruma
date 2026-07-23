"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200/80 pt-16 pb-12 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 5 Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Brand Column (Col 1: 4/12 span) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              AI-powered resume builder to help you create professional resumes that get you hired.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-montserrat">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/templates" className="hover:text-slate-900 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-slate-900 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-slate-900 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/make" className="hover:text-slate-900 transition-colors">
                  AI Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-montserrat">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-slate-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#careers" className="hover:text-slate-900 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-montserrat">
              Resources
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <a href="#tips" className="hover:text-slate-900 transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#cover-letter" className="hover:text-slate-900 transition-colors">
                  Cover Letter
                </a>
              </li>
              <li>
                <a href="#career-advice" className="hover:text-slate-900 transition-colors">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-slate-900 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-montserrat">
              Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <a href="#privacy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-slate-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-slate-900 transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="border-t border-slate-200/80 pt-6 flex justify-center text-center">
          <p className="text-slate-400 text-xs font-poppins">
            © 2026 Recruma. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
 