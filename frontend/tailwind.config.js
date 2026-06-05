export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 20px 50px rgba(15, 23, 42, 0.18)'
      },
      colors: {
        surface: '#111827',
        surfaceSoft: '#1f2937',
        glass: 'rgba(255,255,255,0.08)'
      }
    }
  },
  plugins: []
};
