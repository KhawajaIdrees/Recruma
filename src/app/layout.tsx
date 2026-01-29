// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins, Montserrat } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "Recruma - AI-Powered Resume Builder",
  description: "Create stunning professional resumes with AI-powered optimization. Choose from beautiful templates and get hired faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body className="font-montserrat min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
        {children}
      </body>
    </html>
  );
}
