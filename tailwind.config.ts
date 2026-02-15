import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        serif: ['var(--font-merriweather)'],
      },
      colors: {
        primary: '#1A202C',
        secondary: '#2D3748',
        accent: '#3182CE',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0AEC0',
        'gray-800': '#1f2937',
        'gray-700': '#374151',
        'gray-600': '#4b5563',
      }
    }
  },
  plugins: []
} satisfies Config