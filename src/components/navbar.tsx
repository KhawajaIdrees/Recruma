"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo + Name */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg border border-white">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
            <Link
              href="/"
              className="text-slate-900 text-2xl sm:text-3xl lg:text-4xl font-black font-montserrat tracking-tight"
            >
              Recruma
            </Link>
          </div>

          {/* Center: Nav Links (Desktop Only) */}
          <div className="hidden lg:flex space-x-6">
            <Link href="/" className="text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium hover:scale-105 font-montserrat text-base">
              Home
            </Link>
            <Link href="/make" className="text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium hover:scale-105 font-montserrat text-base">
              Create Resume
            </Link>
            <Link href="/templates" className="text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium hover:scale-105 font-montserrat text-base">
              Templates
            </Link>
            <Link href="/about" className="text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium hover:scale-105 font-montserrat text-base">
              About
            </Link>
          </div>

          {/* Right: Auth Button (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/login" className="text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium hover:scale-105 font-montserrat text-base">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all duration-200 font-semibold shadow font-montserrat text-base"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 hover:text-slate-700 focus:outline-none transition-all duration-200 p-2 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-xl px-4 pb-6 rounded-b-2xl border-t border-slate-200">
          <div className="py-4 space-y-2">
            <Link href="/" className="block py-3 text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium border-b border-slate-200 hover:scale-105 font-montserrat text-base" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/make" className="block py-3 text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium border-b border-slate-200 hover:scale-105 font-montserrat text-base" onClick={() => setIsOpen(false)}>
              Create Resume
            </Link>
            <Link href="/templates" className="block py-3 text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium border-b border-slate-200 hover:scale-105 font-montserrat text-base" onClick={() => setIsOpen(false)}>
              Templates
            </Link>
            <Link href="/about" className="block py-3 text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium border-b border-slate-200 hover:scale-105 font-montserrat text-base" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </div>
          <div className="flex flex-col space-y-3 pt-4">
            <Link href="/login" className="text-center py-3 text-slate-900 hover:text-slate-700 transition-all duration-200 font-medium hover:scale-105 font-montserrat text-base" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link href="/signup" className="bg-slate-900 text-white text-center px-4 py-3 rounded-full hover:bg-slate-800 transition-all duration-200 font-semibold hover:scale-105 font-montserrat text-base" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
