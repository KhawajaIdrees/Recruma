export interface TemplateInfo {
  id: number;
  name: string;
  description: string;
  category: string;
  colorScheme: string;
  accentColor: string;
  badgeColor: string;
  imageIndex: number;
  seoKeywords: string[];
  rating: number;
  hasProfile: boolean;
}

export const templates: TemplateInfo[] = [
  {
    id: 1,
    name: "Executive Timeline",
    description: "Navy header with sidebar and timeline layout",
    category: "Executive",
    colorScheme: "from-slate-700 to-slate-900",
    accentColor: "blue",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    imageIndex: 1,
    seoKeywords: ["creative resume", "designer resume", "portfolio resume", "artistic resume template"],
    rating: 4.3,
    hasProfile: true,
  },
  {
    id: 2,
    name: "Modern Two-Column",
    description: "Slate blue header with photo overlap design",
    category: "Corporate",
    colorScheme: "from-slate-600 to-slate-800",
    accentColor: "blue",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-300",
    imageIndex: 2,
    seoKeywords: ["executive resume", "corporate resume", "manager resume", "business resume template"],
    rating: 4.4,
    hasProfile: true,
  },
  {
    id: 3,
    name: "Creative Director",
    description: "Charcoal header with arched profile photo",
    category: "Creative",
    colorScheme: "from-gray-700 to-gray-900",
    accentColor: "gray",
    badgeColor: "bg-gray-100 text-gray-700 border-gray-300",
    imageIndex: 3,
    seoKeywords: ["tech resume", "developer resume", "programmer resume", "IT resume template"],
    rating: 4.5,
    hasProfile: true,
  },
  {
    id: 4,
    name: "Classic Timeline",
    description: "Clean header with vertical timeline sections",
    category: "Professional",
    colorScheme: "from-slate-600 to-slate-800",
    accentColor: "gray",
    badgeColor: "bg-gray-100 text-gray-700 border-gray-300",
    imageIndex: 4,
    seoKeywords: ["marketing resume", "communications resume", "content creator resume", "advertising resume"],
    rating: 4.6,
    hasProfile: false,
  },
  {
    id: 5,
    name: "Blue Sidebar",
    description: "Bold blue sidebar with skill progress bars",
    category: "Design",
    colorScheme: "from-blue-500 to-blue-700",
    accentColor: "blue",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-300",
    imageIndex: 5,
    seoKeywords: ["sales resume", "business development resume", "account manager resume", "B2B resume"],
    rating: 4.7,
    hasProfile: true,
  },
  {
    id: 6,
    name: "Elegant Single Column",
    description: "Centered purple-accent single column layout",
    category: "Universal",
    colorScheme: "from-purple-500 to-violet-600",
    accentColor: "purple",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-300",
    imageIndex: 6,
    seoKeywords: ["general resume", "universal resume", "all-purpose resume", "professional resume template"],
    rating: 4.8,
    hasProfile: false,
  },
];

