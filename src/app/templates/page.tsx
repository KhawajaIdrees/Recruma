"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { 
  Star, 
  Download, 
  ArrowRight, 
  LayoutGrid, 
  Smartphone, 
  Palette, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  List, 
  Filter, 
  X, 
  ArrowDown, 
  FileText, 
  Check 
} from "lucide-react";
import Link from "next/link";

interface TemplateItem {
  id: number;
  numberStr: string;
  name: string;
  category: "Modern" | "Professional" | "Creative" | "Simple";
  experience: "Entry Level" | "Mid Level" | "Senior Level";
  industry: string;
  rating: number;
  tag: string;
  image: string;
  description: string;
}

const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 1,
    numberStr: "01",
    name: "Modern Professional",
    category: "Modern",
    experience: "Mid Level",
    industry: "Technology",
    rating: 4.3,
    tag: "Best For Corporate",
    image: "/template1.png",
    description: "Clean, structured layout tailored for modern corporate environments."
  },
  {
    id: 2,
    numberStr: "02",
    name: "Executive Classic",
    category: "Professional",
    experience: "Senior Level",
    industry: "Executive",
    rating: 4.4,
    tag: "Corporate",
    image: "/template2.png",
    description: "Traditional executive design with strong visual sectioning."
  },
  {
    id: 3,
    numberStr: "03",
    name: "Creative Modern",
    category: "Creative",
    experience: "Mid Level",
    industry: "Design",
    rating: 4.5,
    tag: "Creative",
    image: "/template3.png",
    description: "Bold header block and stylish column layout for creatives."
  },
  {
    id: 4,
    numberStr: "04",
    name: "Minimal Professional",
    category: "Simple",
    experience: "Entry Level",
    industry: "Business",
    rating: 4.6,
    tag: "Minimal",
    image: "/template4.png",
    description: "Sleek and straightforward template focusing on key content."
  },
  {
    id: 5,
    numberStr: "05",
    name: "Bold Sidebar",
    category: "Modern",
    experience: "Mid Level",
    industry: "Marketing",
    rating: 4.7,
    tag: "Modern",
    image: "/template5.png",
    description: "Distinct blue sidebar highlights contact details and skills."
  },
  {
    id: 6,
    numberStr: "06",
    name: "Elegant Purple",
    category: "Creative",
    experience: "Entry Level",
    industry: "Creative",
    rating: 4.8,
    tag: "Creative",
    image: "/template6.png",
    description: "Vibrant accent headers designed to catch recruiters' eyes."
  },
  {
    id: 7,
    numberStr: "07",
    name: "Tech Specialist",
    category: "Modern",
    experience: "Mid Level",
    industry: "Technology",
    rating: 4.9,
    tag: "Developer",
    image: "/template1.png",
    description: "Optimized for technical skills and project highlights."
  },
  {
    id: 8,
    numberStr: "08",
    name: "Corporate Leader",
    category: "Professional",
    experience: "Senior Level",
    industry: "Executive",
    rating: 4.5,
    tag: "Management",
    image: "/template2.png",
    description: "Commanding typography designed for leadership roles."
  },
  {
    id: 9,
    numberStr: "09",
    name: "Clean Minimalist",
    category: "Simple",
    experience: "Entry Level",
    industry: "Business",
    rating: 4.6,
    tag: "Clean",
    image: "/template3.png",
    description: "Crisp white space with refined typography hierarchy."
  },
  {
    id: 10,
    numberStr: "10",
    name: "Portfolio Accent",
    category: "Creative",
    experience: "Mid Level",
    industry: "Design",
    rating: 4.4,
    tag: "Portfolio",
    image: "/template4.png",
    description: "Ideal for designers showcasing accomplishments & portfolio links."
  },
  {
    id: 11,
    numberStr: "11",
    name: "Contemporary Slate",
    category: "Modern",
    experience: "Mid Level",
    industry: "Technology",
    rating: 4.7,
    tag: "Contemporary",
    image: "/template5.png",
    description: "Balanced grid layout with subtle slate accents."
  },
  {
    id: 12,
    numberStr: "12",
    name: "Strategic Executive",
    category: "Professional",
    experience: "Senior Level",
    industry: "Executive",
    rating: 4.8,
    tag: "Executive",
    image: "/template6.png",
    description: "Polished and formal layout for C-suite applicants."
  },
  {
    id: 13,
    numberStr: "13",
    name: "Visual Designer",
    category: "Professional",
    experience: "Mid Level",
    industry: "Design",
    rating: 4.6,
    tag: "Visual",
    image: "/template1.png",
    description: "Highlights design expertise and technical proficiencies."
  },
  {
    id: 14,
    numberStr: "14",
    name: "Sleek Mono",
    category: "Professional",
    experience: "Entry Level",
    industry: "Business",
    rating: 4.5,
    tag: "Sleek",
    image: "/template2.png",
    description: "Monochrome elegance with emphasis on clarity and structure."
  },
  {
    id: 15,
    numberStr: "15",
    name: "Vibrant Pro",
    category: "Modern",
    experience: "Mid Level",
    industry: "Marketing",
    rating: 4.7,
    tag: "Vibrant",
    image: "/template3.png",
    description: "Dynamic color highlights for marketing and communications."
  },
  {
    id: 16,
    numberStr: "16",
    name: "Formal Academic",
    category: "Professional",
    experience: "Senior Level",
    industry: "Education",
    rating: 4.8,
    tag: "Academic",
    image: "/template4.png",
    description: "Structured layout for education and academic achievements."
  },
  {
    id: 17,
    numberStr: "17",
    name: "Artistic Flow",
    category: "Modern",
    experience: "Mid Level",
    industry: "Creative",
    rating: 4.9,
    tag: "Artistic",
    image: "/template5.png",
    description: "Expressive layout for creative directors and animators."
  },
  {
    id: 18,
    numberStr: "18",
    name: "Compact Essential",
    category: "Creative",
    experience: "Entry Level",
    industry: "Business",
    rating: 4.4,
    tag: "Compact",
    image: "/template6.png",
    description: "High data density layout for comprehensive work history."
  }
];

export default function TemplatesPage() {
  const router = useRouter();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("All Templates");
  const [selectedExpLevels, setSelectedExpLevels] = useState<string[]>(["All Levels"]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All Industries");
  const [sortBy, setSortBy] = useState<string>("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Accordion Expand/Collapse States for Sidebar
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [isExpOpen, setIsExpOpen] = useState<boolean>(true);
  const [isIndustryOpen, setIsIndustryOpen] = useState<boolean>(true);

  // Mobile Filter Drawer / Toggle state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const handleUseTemplate = (templateNumber: number) => {
    router.push(`/make?template=${templateNumber}`);
  };

  const handleExpToggle = (level: string) => {
    if (level === "All Levels") {
      setSelectedExpLevels(["All Levels"]);
      return;
    }

    let updated = selectedExpLevels.filter(item => item !== "All Levels");
    if (updated.includes(level)) {
      updated = updated.filter(item => item !== level);
    } else {
      updated.push(level);
    }

    if (updated.length === 0) {
      setSelectedExpLevels(["All Levels"]);
    } else {
      setSelectedExpLevels(updated);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All Templates");
    setSelectedExpLevels(["All Levels"]);
    setSelectedIndustry("All Industries");
    setSortBy("Popular");
    setVisibleCount(6);
  };

  // Filter & Sort Logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== "All Templates" && item.category !== selectedCategory) {
        return false;
      }
      // Experience filter
      if (!selectedExpLevels.includes("All Levels")) {
        if (!selectedExpLevels.includes(item.experience)) {
          return false;
        }
      }
      // Industry filter
      if (selectedIndustry !== "All Industries" && item.industry !== selectedIndustry) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "Rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "Newest") {
        return b.id - a.id;
      }
      // Default: Popular (id order)
      return a.id - b.id;
    });
  }, [selectedCategory, selectedExpLevels, selectedIndustry, sortBy]);

  const categoryCounts = useMemo(() => {
    return {
      "All Templates": 18,
      Modern: 6,
      Professional: 6,
      Creative: 4,
      Simple: 2
    };
  }, []);

  const displayedTemplates = filteredTemplates.slice(0, visibleCount);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-white font-poppins">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-slate-50/80 via-white to-white py-12 sm:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Hero Details */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight font-montserrat tracking-tight">
                  Find the Perfect <br className="hidden sm:inline" />
                  Resume Template
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                  Professional templates designed to showcase your skills and help you land your dream job.
                </p>

                {/* Feature Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {/* Feature 1 */}
                  <div className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-sm">
                    <div className="p-2.5 bg-slate-100/90 rounded-lg text-slate-900 shrink-0">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-montserrat">Modern Designs</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Clean and professional layouts</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-sm">
                    <div className="p-2.5 bg-slate-100/90 rounded-lg text-slate-900 shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-montserrat">ATS Friendly</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Optimized to pass ATS scans</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-sm">
                    <div className="p-2.5 bg-slate-100/90 rounded-lg text-slate-900 shrink-0">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-montserrat">Easy Customization</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Fully customizable to match your style</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview Graphics */}
              <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
                {/* Dot background pattern */}
                <div className="absolute -top-6 -right-6 w-32 h-32 opacity-20 pointer-events-none hidden sm:block">
                  <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
                    <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="2" className="text-slate-400" fill="currentColor" />
                    </pattern>
                    <rect width="120" height="120" fill="url(#dot-pattern)" />
                  </svg>
                </div>

                {/* Overlapping Resume Cards Mockup */}
                <div className="relative w-full max-w-sm sm:max-w-md h-64 sm:h-80 flex items-center justify-center">
                  {/* Background Resume Card */}
                  <div className="absolute transform translate-x-6 -translate-y-3 rotate-6 w-52 sm:w-64 h-64 sm:h-80 bg-white rounded-xl shadow-md border border-slate-200/80 p-3 overflow-hidden transition-transform hover:rotate-3 duration-300">
                    <img 
                      src="/template2.png" 
                      alt="Resume Background Preview" 
                      className="w-full h-full object-cover object-top opacity-90 rounded"
                    />
                  </div>

                  {/* Foreground Resume Card */}
                  <div className="absolute transform -translate-x-4 translate-y-2 -rotate-3 w-56 sm:w-68 h-64 sm:h-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 overflow-hidden transition-transform hover:rotate-0 duration-300 z-10">
                    <img 
                      src="/template1.png" 
                      alt="Resume Preview Main" 
                      className="w-full h-full object-cover object-top rounded"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MAIN TEMPLATES & FILTER SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Top Control Bar (Count, Sort, Grid/List view toggle, Mobile Filter Toggle) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-slate-800 font-semibold text-sm sm:text-base font-montserrat">
                Showing {filteredTemplates.length} templates
              </span>

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{isMobileFilterOpen ? "Hide Filters" : "Filter Templates"}</span>
              </button>
            </div>

            {/* Right Controls: Sort & View Toggle */}
            <div className="flex items-center space-x-3 self-end sm:self-auto">
              <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm">
                <span className="text-slate-500 font-normal">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-900 font-medium cursor-pointer focus:outline-none pr-1"
                >
                  <option value="Popular">Popular</option>
                  <option value="Rating">Highest Rated</option>
                  <option value="Newest">Newest</option>
                </select>
              </div>

              {/* View Mode Toggle Buttons */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/80">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid" 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "list" 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid: Sidebar + Templates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
            <aside 
              className={`lg:col-span-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-6 ${
                isMobileFilterOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <h3 className="text-xs font-extrabold text-slate-900 tracking-wider uppercase font-montserrat">
                  FILTER TEMPLATES
                </h3>
                {isMobileFilterOpen && (
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="lg:hidden text-slate-500 hover:text-slate-900 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Accordion 1: Categories */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-montserrat">Categories</span>
                  {isCategoryOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isCategoryOpen && (
                  <div className="space-y-1 pt-1">
                    {Object.entries(categoryCounts).map(([cat, count]) => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setVisibleCount(6);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                            isSelected
                              ? "bg-slate-900 text-white font-medium shadow-sm"
                              : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-normal"
                          }`}
                        >
                          <span>{cat}</span>
                          <span 
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              isSelected ? "bg-slate-800 text-white" : "text-slate-400 bg-slate-100"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 2: Experience Level */}
              <div className="space-y-3 pt-2 border-t border-slate-200/60">
                <button
                  onClick={() => setIsExpOpen(!isExpOpen)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-montserrat">Experience Level</span>
                  {isExpOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpOpen && (
                  <div className="space-y-2 pt-1">
                    {["All Levels", "Entry Level", "Mid Level", "Senior Level"].map((level) => {
                      const isChecked = selectedExpLevels.includes(level);
                      return (
                        <label
                          key={level}
                          className="flex items-center space-x-2.5 cursor-pointer text-xs sm:text-sm text-slate-700 hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleExpToggle(level)}
                            className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 accent-slate-900 cursor-pointer"
                          />
                          <span className={isChecked ? "font-semibold text-slate-900" : "font-normal text-slate-600"}>
                            {level}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 3: Industries */}
              <div className="space-y-3 pt-2 border-t border-slate-200/60">
                <button
                  onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-montserrat">Industries</span>
                  {isIndustryOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isIndustryOpen && (
                  <div className="pt-1">
                    <select
                      value={selectedIndustry}
                      onChange={(e) => {
                        setSelectedIndustry(e.target.value);
                        setVisibleCount(6);
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-slate-400 font-medium cursor-pointer"
                    >
                      <option value="All Industries">All Industries</option>
                      <option value="Technology">Technology</option>
                      <option value="Executive">Executive</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Creative">Creative</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Reset Filters Button */}
              <div className="pt-4 border-t border-slate-200/80">
                <button
                  onClick={handleResetFilters}
                  className="w-full bg-white hover:bg-slate-100 text-slate-700 font-medium py-2.5 px-4 rounded-xl border border-slate-200/90 transition-colors text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Filters</span>
                </button>
              </div>

            </aside>

            {/* RIGHT SIDE: TEMPLATES SHOWCASE GRID */}
            <div className="lg:col-span-9 space-y-8">
              
              {displayedTemplates.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-800 font-montserrat">No templates found</h3>
                  <p className="text-slate-500 text-sm mt-1">Try resetting your filters to view all templates.</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                /* GRID VIEW (3 Columns on Desktop) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    >
                      {/* Image Preview Box */}
                      <div className="bg-slate-50/70 p-4 relative border-b border-slate-100 flex justify-center items-center h-72 sm:h-80 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200/70 overflow-hidden flex items-center justify-center relative">
                          <img
                            src={template.image}
                            alt={template.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/template1.png';
                            }}
                          />
                        </div>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                          <button
                            onClick={() => handleUseTemplate(template.id)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 text-sm"
                          >
                            <span>Use Template</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Card Content Footer */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title & Rating */}
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-montserrat truncate">
                              <span className="text-slate-400 font-semibold mr-1.5">{template.numberStr}</span>
                              {template.name}
                            </h3>
                            <div className="flex items-center space-x-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                              <span className="text-xs font-bold text-slate-800">{template.rating.toFixed(1)}</span>
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            </div>
                          </div>
                        </div>

                        {/* Tag Pill */}
                        <div className="pt-2">
                          <span className="inline-block bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200/60">
                            {template.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* LIST VIEW */
                <div className="space-y-4">
                  {displayedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-6"
                    >
                      <div className="w-full sm:w-44 h-48 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shrink-0 relative">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 space-y-2 text-left w-full">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900 font-montserrat">
                            <span className="text-slate-400 font-semibold mr-2">{template.numberStr}</span>
                            {template.name}
                          </h3>
                          <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                            <span className="text-xs font-bold text-slate-800">{template.rating.toFixed(1)}</span>
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {template.description}
                        </p>
                        <div className="flex items-center space-x-2 pt-1">
                          <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md border border-slate-200/60 font-medium">
                            {template.category}
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md border border-slate-200/60 font-medium">
                            {template.tag}
                          </span>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center space-x-2"
                        >
                          <span>Use Template</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {visibleCount < filteredTemplates.length && (
                <div className="pt-6 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredTemplates.length))}
                    className="inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200/80 transition-all text-sm shadow-xs cursor-pointer"
                  >
                    <span>Load More Templates</span>
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* BOTTOM CTA BANNER SECTION */}
          <div className="mt-16 bg-slate-100/80 border border-slate-200/70 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-800 shrink-0 shadow-xs">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-montserrat">
                  Still can't find what you're looking for?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                  Create your resume from scratch with our AI-powered builder.
                </p>
              </div>
            </div>

            <Link
              href="/make"
              className="w-full md:w-auto bg-[#0f172a] hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm shrink-0 text-sm font-poppins"
            >
              <span>Create Your Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
