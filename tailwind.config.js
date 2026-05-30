export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.10)',
        glow: '0 0 0 1px rgba(16, 185, 129, 0.18), 0 20px 60px rgba(16, 185, 129, 0.12)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(16,185,129,0.18), transparent 30%), radial-gradient(circle at top right, rgba(59,130,246,0.20), transparent 30%), linear-gradient(135deg, rgba(15,23,42,0.02), rgba(255,255,255,0.95))'
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        }
      }
    }
  },
  plugins: []
};