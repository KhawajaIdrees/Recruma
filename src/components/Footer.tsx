"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat">Recruma</h3>
            </div>
            <p className="text-gray-300 leading-relaxed font-poppins">
              Transform your career with AI-powered resume building. Create professional resumes that stand out and get you hired faster.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-montserrat">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/templates" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ai-optimizer" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  AI Optimizer
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-montserrat">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-300 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-montserrat">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 font-poppins">hello@recruma.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 font-poppins">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 font-poppins">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm font-poppins">
              © 2024 Recruma. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-green-100 transition-all duration-200 font-poppins hover:scale-105">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 