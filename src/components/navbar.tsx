"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[linear-gradient(90deg,#070617,rgba(59,7,91,0.6),rgba(236,72,153,0.08))] shadow-xl fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-95 border-b border-indigo-500/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo + Name */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg border border-indigo-400/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
            </div>
            <Link
              href="/"
              className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat tracking-tight"
            >
              Recruma
            </Link>
          </div>

          {/* Center: Nav Links (Desktop Only) */}
          <div className="hidden lg:flex space-x-8">
            <Link href="/" className="text-indigo-200 hover:text-white transition-all duration-200 font-medium hover:scale-105 font-montserrat">
              Home
            </Link>
            <Link href="/make" className="text-indigo-200 hover:text-white transition-all duration-200 font-medium hover:scale-105 font-montserrat">
              Create Resume
            </Link>
            <Link href="/templates" className="text-indigo-200 hover:text-white transition-all duration-200 font-medium hover:scale-105 font-montserrat">
              Templates
            </Link>
            <Link href="/about" className="text-indigo-200 hover:text-white transition-all duration-200 font-medium hover:scale-105 font-montserrat">
              About
            </Link>
          </div>

          {/* Right: Auth Button (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/login" className="text-indigo-200 hover:text-white transition-all duration-200 font-medium hover:scale-105 font-montserrat">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105 font-montserrat"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-300 hover:text-green-100 focus:outline-none transition-all duration-200 p-2 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[rgba(4,4,12,0.95)] backdrop-blur-sm shadow-xl px-4 pb-6 rounded-b-2xl border-t border-indigo-500/10">
          <div className="py-4 space-y-2">
            <Link href="/" className="block py-3 text-indigo-200 hover:text-white transition-all duration-200 font-medium border-b border-indigo-900 hover:scale-105 font-montserrat" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/make" className="block py-3 text-indigo-200 hover:text-white transition-all duration-200 font-medium border-b border-indigo-900 hover:scale-105 font-montserrat" onClick={() => setIsOpen(false)}>
              Create Resume
            </Link>
            <Link href="/templates" className="block py-3 text-indigo-200 hover:text-white transition-all duration-200 font-medium border-b border-indigo-900 hover:scale-105 font-montserrat" onClick={() => setIsOpen(false)}>
              Templates
            </Link>
            <Link href="/about" className="block py-3 text-indigo-200 hover:text-white transition-all duration-200 font-medium border-b border-indigo-900 hover:scale-105 font-montserrat" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </div>
          <div className="flex flex-col space-y-3 pt-4">
            <Link href="/login" className="text-center py-3 text-indigo-200 hover:text-white transition-all duration-200 font-medium hover:scale-105 font-montserrat" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link href="/signup" className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-center px-4 py-3 rounded-full hover:from-indigo-700 hover:to-pink-700 transition-all duration-200 font-semibold hover:scale-105 font-montserrat" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
