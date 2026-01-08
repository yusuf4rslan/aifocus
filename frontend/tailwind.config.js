/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d9488", // Teal-600 (Görseldeki ana renk)
        secondary: "#0f172a", // Slate-900 (Koyu metin rengi)
        light: "#ffffff",   // Beyaz arka plan
        soft: "#f8fafc",    // Çok açık gri/mavi tonlu arka plan
        accent: "#ccfbf1",  // Teal-100 (Hafif vurgular için)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}