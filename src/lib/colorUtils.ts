// colorUtils.ts
export interface ColorScheme {
  border: string;
  text: string;
  bgLight: string;
  accent: string;    // main accent color (hex)
  accentRgb: string; // RGB for gradients (e.g., "157, 78, 221")
}

// Full color map with accents
export const templateColorMap: Record<string, ColorScheme> = {
  purple: { border: 'border-purple-300', text: 'text-purple-600', bgLight: 'bg-purple-50', accent: '#9d4edd', accentRgb: '157, 78, 221' },
  blue: { border: 'border-blue-300', text: 'text-blue-600', bgLight: 'bg-blue-50', accent: '#2563eb', accentRgb: '37, 99, 235' },
  indigo: { border: 'border-indigo-300', text: 'text-indigo-600', bgLight: 'bg-indigo-50', accent: '#4f38e5', accentRgb: '79, 56, 229' },
  orange: { border: 'border-orange-300', text: 'text-orange-600', bgLight: 'bg-orange-50', accent: '#ea580c', accentRgb: '234, 88, 12' },
  amber: { border: 'border-amber-300', text: 'text-amber-600', bgLight: 'bg-amber-50', accent: '#d97706', accentRgb: '217, 119, 6' },
  cyan: { border: 'border-cyan-300', text: 'text-cyan-600', bgLight: 'bg-cyan-50', accent: '#0891b2', accentRgb: '8, 145, 178' },
  gray: { border: 'border-gray-300', text: 'text-gray-600', bgLight: 'bg-gray-50', accent: '#4b5563', accentRgb: '75, 85, 99' },
  rose: { border: 'border-rose-300', text: 'text-rose-600', bgLight: 'bg-rose-50', accent: '#e11d48', accentRgb: '225, 29, 72' },
  violet: { border: 'border-violet-300', text: 'text-violet-600', bgLight: 'bg-violet-50', accent: '#8b5cf6', accentRgb: '139, 92, 246' },
  stone: { border: 'border-stone-300', text: 'text-stone-600', bgLight: 'bg-stone-50', accent: '#78716c', accentRgb: '120, 113, 108' },
};

// Function to get a color scheme safely
export const getTemplateColors = (accentColor: string): ColorScheme => {
  return templateColorMap[accentColor] || templateColorMap.blue;
};

// NEW: Function to get CSS variables for templates
export const getTemplateStyle = (accentColor: string) => {
  const colors = getTemplateColors(accentColor);
  return {
    '--accent': colors.accent,
    '--accent-rgb': colors.accentRgb,
    '--accent-bg': getRgbFromTailwind(colors.bgLight)
  };
};

// NEW: Helper to convert Tailwind bg classes to RGB
const getRgbFromTailwind = (tailwindClass: string): string => {
  const rgbMap: Record<string, string> = {
    'bg-purple-50': 'rgb(250, 245, 255)',
    'bg-blue-50': 'rgb(239, 246, 255)',
    'bg-indigo-50': 'rgb(238, 242, 255)',
    'bg-orange-50': 'rgb(255, 247, 237)',
    'bg-amber-50': 'rgb(255, 251, 235)',
    'bg-cyan-50': 'rgb(236, 254, 255)',
    'bg-gray-50': 'rgb(249, 250, 251)',
    'bg-rose-50': 'rgb(255, 241, 242)',
    'bg-violet-50': 'rgb(245, 243, 255)',
    'bg-stone-50': 'rgb(250, 250, 249)',
    'bg-purple-100': 'rgb(243, 232, 255)',
    'bg-blue-100': 'rgb(219, 234, 254)',
    'bg-indigo-100': 'rgb(224, 231, 255)',
    'bg-orange-100': 'rgb(255, 237, 213)',
    'bg-amber-100': 'rgb(254, 243, 199)',
    'bg-cyan-100': 'rgb(207, 250, 254)',
    'bg-gray-100': 'rgb(243, 244, 246)',
    'bg-rose-100': 'rgb(255, 228, 230)',
    'bg-violet-100': 'rgb(237, 233, 254)',
    'bg-stone-100': 'rgb(245, 245, 244)',
  };
  return rgbMap[tailwindClass] || 'rgb(255, 255, 255)';
};

// Map Tailwind-like classes to RGB for PDF generation
export const colorToRgb: Record<string, string> = {
  'border-purple-300': 'rgb(216, 180, 254)',
  'border-blue-300': 'rgb(147, 197, 253)',
  'border-indigo-300': 'rgb(165, 180, 252)',
  'border-orange-300': 'rgb(253, 186, 116)',
  'border-amber-300': 'rgb(252, 191, 73)',
  'border-cyan-300': 'rgb(165, 243, 252)',
  'border-gray-300': 'rgb(209, 213, 219)',
  'border-rose-300': 'rgb(253, 164, 175)',
  'border-violet-300': 'rgb(197, 181, 253)',
  'border-stone-300': 'rgb(212, 210, 209)',
  
  'text-purple-600': 'rgb(147, 51, 234)',
  'text-blue-600': 'rgb(37, 99, 235)',
  'text-indigo-600': 'rgb(79, 70, 229)',
  'text-orange-600': 'rgb(234, 88, 12)',
  'text-amber-600': 'rgb(217, 119, 6)',
  'text-cyan-600': 'rgb(8, 145, 178)',
  'text-gray-600': 'rgb(75, 85, 99)',
  'text-rose-600': 'rgb(225, 29, 72)',
  'text-violet-600': 'rgb(139, 92, 246)',
  'text-stone-600': 'rgb(120, 113, 108)',
  
  // Add background colors for PDF generation
  'bg-purple-50': 'rgb(250, 245, 255)',
  'bg-blue-50': 'rgb(239, 246, 255)',
  'bg-indigo-50': 'rgb(238, 242, 255)',
  'bg-orange-50': 'rgb(255, 247, 237)',
  'bg-amber-50': 'rgb(255, 251, 235)',
  'bg-cyan-50': 'rgb(236, 254, 255)',
  'bg-gray-50': 'rgb(249, 250, 251)',
  'bg-rose-50': 'rgb(255, 241, 242)',
  'bg-violet-50': 'rgb(245, 243, 255)',
  'bg-stone-50': 'rgb(250, 250, 249)',
  
  // Add badge colors for PDF generation
  'bg-purple-100': 'rgb(243, 232, 255)',
  'bg-blue-100': 'rgb(219, 234, 254)',
  'bg-indigo-100': 'rgb(224, 231, 255)',
  'bg-orange-100': 'rgb(255, 237, 213)',
  'bg-amber-100': 'rgb(254, 243, 199)',
  'bg-cyan-100': 'rgb(207, 250, 254)',
  'bg-gray-100': 'rgb(243, 244, 246)',
  'bg-rose-100': 'rgb(255, 228, 230)',
  'bg-violet-100': 'rgb(237, 233, 254)',
  'bg-stone-100': 'rgb(245, 245, 244)',
};

// NEW: Function to extract Tailwind classes from badgeColor string
export const extractBadgeClasses = (badgeColor: string): { bg: string, text: string, border: string } => {
  const classes = badgeColor.split(' ');
  const bgClass = classes.find(c => c.startsWith('bg-')) || '';
  const textClass = classes.find(c => c.startsWith('text-')) || '';
  const borderClass = classes.find(c => c.startsWith('border-')) || '';
  
  return { bg: bgClass, text: textClass, border: borderClass };
};