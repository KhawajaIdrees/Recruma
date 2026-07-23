"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm font-montserrat"
            >
              Home
            </Link>
            <Link 
              href="/templates" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm font-montserrat"
            >
              Templates
            </Link>
            <a 
              href="#features" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm font-montserrat"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm font-montserrat"
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm font-montserrat"
            >
              Pricing
            </a>
            <Link 
              href="/blog" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm font-montserrat"
            >
              Blog
            </Link>
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              <Moon className="w-5 h-5" />
            </button>
            
            <Link
              href="/login"
              className="border border-slate-300 text-slate-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors font-poppins"
            >
              Log In
            </Link>
            
            <Link
              href="/signup"
              className="bg-[#0f172a] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors shadow-sm font-poppins"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              <Moon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            className="block py-2 text-slate-600 hover:text-slate-900 font-medium text-sm font-montserrat"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/templates"
            className="block py-2 text-slate-600 hover:text-slate-900 font-medium text-sm font-montserrat"
            onClick={() => setIsOpen(false)}
          >
            Templates
          </Link>
          <a
            href="#features"
            className="block py-2 text-slate-600 hover:text-slate-900 font-medium text-sm font-montserrat"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block py-2 text-slate-600 hover:text-slate-900 font-medium text-sm font-montserrat"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="block py-2 text-slate-600 hover:text-slate-900 font-medium text-sm font-montserrat"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </a>
          <Link
            href="/blog"
            className="block py-2 text-slate-600 hover:text-slate-900 font-medium text-sm font-montserrat"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <div className="pt-4 flex flex-col space-y-2">
            <Link
              href="/login"
              className="w-full text-center border border-slate-300 text-slate-900 py-2.5 rounded-lg font-medium text-sm font-poppins"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="w-full text-center bg-[#0f172a] text-white py-2.5 rounded-lg font-medium text-sm font-poppins"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

