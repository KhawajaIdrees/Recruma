export interface ColorScheme {
  border: string;
  text: string;
  bgLight: string;
}

export const templateColorMap: Record<string, ColorScheme> = {
  purple: { border: 'border-purple-300', text: 'text-purple-600', bgLight: 'bg-purple-50' },
  blue: { border: 'border-blue-300', text: 'text-blue-600', bgLight: 'bg-blue-50' },
  indigo: { border: 'border-indigo-300', text: 'text-indigo-600', bgLight: 'bg-indigo-50' },
  orange: { border: 'border-orange-300', text: 'text-orange-600', bgLight: 'bg-orange-50' },
  amber: { border: 'border-amber-300', text: 'text-amber-600', bgLight: 'bg-amber-50' },
  cyan: { border: 'border-cyan-300', text: 'text-cyan-600', bgLight: 'bg-cyan-50' },
  gray: { border: 'border-gray-300', text: 'text-gray-600', bgLight: 'bg-gray-50' },
  rose: { border: 'border-rose-300', text: 'text-rose-600', bgLight: 'bg-rose-50' },
  violet: { border: 'border-violet-300', text: 'text-violet-600', bgLight: 'bg-violet-50' },
  stone: { border: 'border-stone-300', text: 'text-stone-600', bgLight: 'bg-stone-50' },
};

export const getTemplateColors = (accentColor: string): ColorScheme => {
  return templateColorMap[accentColor] || templateColorMap.blue;
};

export const colorToRgb: Record<string, string> = {
  'border-purple-300': 'rgb(216, 180, 254)',
  'border-blue-300': 'rgb(147, 197, 253)',
  'border-indigo-300': 'rgb(165, 180, 252)',
  'border-orange-300': 'rgb(253, 186, 116)',
  'border-amber-300': 'rgb(252, 191, 73)',
  'border-cyan-300': 'rgb(165, 243, 252)',
  'border-gray-300': 'rgb(209, 213, 219)',
  'text-purple-600': 'rgb(147, 51, 234)',
  'text-blue-600': 'rgb(37, 99, 235)',
  'text-indigo-600': 'rgb(79, 70, 229)',
  'text-orange-600': 'rgb(234, 88, 12)',
  'text-amber-600': 'rgb(217, 119, 6)',
  'text-cyan-600': 'rgb(8, 145, 178)',
  'text-gray-600': 'rgb(75, 85, 99)',
  'bg-purple-100': 'rgb(245, 240, 255)',
  'bg-blue-100': 'rgb(239, 246, 255)',
  'bg-indigo-100': 'rgb(238, 242, 255)',
  'bg-orange-100': 'rgb(255, 237, 213)',
  'bg-amber-100': 'rgb(254, 243, 199)',
  'bg-cyan-100': 'rgb(207, 250, 254)',
  'bg-gray-100': 'rgb(243, 244, 246)',
  'text-purple-700': 'rgb(126, 34, 206)',
  'text-blue-700': 'rgb(29, 78, 216)',
  'text-indigo-700': 'rgb(67, 56, 202)',
  'text-orange-700': 'rgb(194, 65, 12)',
  'text-amber-700': 'rgb(180, 83, 9)',
  'text-cyan-700': 'rgb(14, 116, 144)',
  'text-gray-700': 'rgb(55, 65, 81)',
};
