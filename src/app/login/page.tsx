"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up real auth
    console.log("login", { email, password });
    alert("Login submitted (demo)");
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-24 px-4">
      <div className="max-w-md w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 font-montserrat">Welcome back</h1>
        <p className="text-sm text-slate-600 mb-6 font-poppins">Log in to continue to Recruma</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-700 font-poppins">Email</span>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 font-poppins"
                placeholder="you@company.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-slate-700 font-poppins">Password</span>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 font-poppins"
                placeholder="••••••••"
              />
            </div>
          </label>

          <div className="flex items-center justify-between">
            <Link href="/signup" className="text-sm text-slate-600 hover:text-slate-900 font-poppins">
              Create account
            </Link>
            <button
              type="submit"
              className="bg-slate-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-150"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
