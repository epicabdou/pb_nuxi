/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./pages/**/*.{vue,js,ts}", "./components/**/*.{vue,js,ts}", "./layouts/**/*.vue", "./app.vue", "./app/**/*.{vue,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Updated primary to sage/eucalyptus green for natural feel
        primary: {
          50: '#f6f7f4',
          100: '#e9ebe3',
          200: '#d4d9c8',
          300: '#b8c1a3',
          400: '#9ba67e',
          500: '#7d8b5e',  // Main sage green
          600: '#657049',
          700: '#4f583b',
          800: '#424730',
          900: '#383c29',
          950: '#2d301f',
        },
        // Updated secondary to warm clay/terracotta
        secondary: {
          50: '#fdf6f3',
          100: '#fae8e1',
          200: '#f5d4c4',
          300: '#edb69a',
          400: '#e19168',
          500: '#d67341',  // Warm terracotta
          600: '#c85a2f',
          700: '#a74826',
          800: '#883c23',
          900: '#6f3422',
          950: '#562118',
        },
        // Updated background to warmer, more natural tones
        background: {
          50: '#fefdfb',
          100: '#faf8f5',  // Warm white
          200: '#f3ede4',  // Soft cream
          300: '#e6d7c3',
          400: '#d4bb9a',
          500: '#b4a48a',
          600: '#8f8c7f',
          700: '#777469',
          800: '#625f56',
          900: '#504e47',
          950: '#3d3b35',
        },
        // New eucalyptus accent color
        eucalyptus: {
          50: '#f0f9f6',
          100: '#daf1e7',
          200: '#b8e2d1',
          300: '#8ccdb4',
          400: '#5cb496',
          500: '#3d9b7a',
          600: '#307c62',
          700: '#286651',
          800: '#235242',
          900: '#1f4438',
          950: '#0f2117',
        },
        // New cream accent color
        cream: {
          50: '#fefdfb',
          100: '#fefbf3',
          200: '#fcf4e1',
          300: '#f9e9c4',
          400: '#f4d79d',
          500: '#eec374',
          600: '#e0a851',
          700: '#c98d3a',
          800: '#a47130',
          900: '#855c2a',
          950: '#6b4721',
        },
        // Keep neutral as is but add stone variant
        stone: {
          50: '#fafaf9',
          100: '#f4f4f1',
          200: '#e8e7e2',
          300: '#d6d4cc',
          400: '#bfbcb0',
          500: '#a8a499',
          600: '#8f8c7f',
          700: '#777469',
          800: '#625f56',
          900: '#504e47',
          950: '#3d3b35',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        }
      },
      fontFamily: {
        // Updated fonts for natural brand feel
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-3': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'subhead': ['1.5rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        'organic': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'soft': '1.25rem',
        'gentle': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'fancy': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'modern': '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
        'elevated': '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
        'natural': '0 8px 32px rgba(125, 139, 94, 0.15)',
        'warm': '0 6px 24px rgba(214, 115, 65, 0.12)',
        'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'texture-paper': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3Ccircle cx=\"53\" cy=\"53\" r=\"1\"/%3E%3Ccircle cx=\"23\" cy=\"43\" r=\"1\"/%3E%3Ccircle cx=\"37\" cy=\"17\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')",
        'texture-organic': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [
    // Base styles plugin with improved light/dark handling
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          // Light mode variables - updated for natural theme
          '--background-primary': theme('colors.background.50'),
          '--background-secondary': theme('colors.background.100'),
          '--background-tertiary': theme('colors.background.200'),
          '--text-primary': theme('colors.background.900'),
          '--text-secondary': theme('colors.background.700'),
          '--text-tertiary': theme('colors.background.500'),
          '--border-color': theme('colors.background.300'),
        },
        '.dark': {
          // Dark mode variables
          '--background-primary': theme('colors.background.900'),
          '--background-secondary': theme('colors.background.800'),
          '--background-tertiary': theme('colors.background.700'),
          '--text-primary': theme('colors.background.100'),
          '--text-secondary': theme('colors.background.300'),
          '--text-tertiary': theme('colors.background.500'),
          '--border-color': theme('colors.background.700'),
        },
        'html': {
          fontFamily: theme('fontFamily.sans'),
          color: 'var(--text-primary)',
          backgroundColor: 'var(--background-primary)',
        },
        'body': {
          '@apply antialiased': {},
        },
        // Import natural brand fonts
        '@import': [
          "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap')",
          "url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap')",
          "url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap')",
        ],
      });
    }),

    // Typography plugin with natural brand styling
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.heading-1': {
          '@apply font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight': {},
        },
        '.heading-2': {
          '@apply font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight': {},
        },
        '.heading-3': {
          '@apply font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight': {},
        },
        '.heading-4': {
          '@apply font-display text-xl md:text-2xl lg:text-3xl font-bold leading-tight': {},
        },
        '.heading-5': {
          '@apply font-display text-lg md:text-xl font-bold leading-tight': {},
        },
        '.body-large': {
          '@apply text-lg leading-relaxed font-sans': {},
        },
        '.body-regular': {
          '@apply text-base leading-relaxed font-sans': {},
        },
        '.body-small': {
          '@apply text-sm leading-relaxed font-sans': {},
        },
        '.caption': {
          '@apply text-xs leading-normal text-background-600 dark:text-background-400 font-sans': {},
        },
        '.accent-text': {
          '@apply font-accent italic': {},
        },
      });
    }),

    // Natural brand button components
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.btn': {
          '@apply inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer': {},
        },
        '.btn-primary': {
          '@apply btn px-6 py-3 text-white rounded-soft shadow-natural hover:shadow-warm bg-primary-500 hover:bg-primary-600 focus:ring-primary-400': {},
        },
        '.btn-secondary': {
          '@apply btn px-6 py-3 rounded-soft shadow-soft hover:shadow-natural bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400': {},
        },
        '.btn-eucalyptus': {
          '@apply btn px-6 py-3 rounded-soft shadow-soft hover:shadow-natural bg-eucalyptus-500 text-white hover:bg-eucalyptus-600 focus:ring-eucalyptus-400': {},
        },
        '.btn-outline': {
          '@apply btn px-6 py-3 border-2 rounded-soft font-medium border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-400 bg-transparent': {},
        },
        '.btn-ghost': {
          '@apply btn px-4 py-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-800 focus:ring-background-400': {},
        },
        '.btn-organic': {
          '@apply btn px-6 py-3 rounded-organic shadow-natural hover:shadow-warm bg-gradient-to-r from-primary-500 to-eucalyptus-500 text-white hover:from-primary-600 hover:to-eucalyptus-600': {},
        },
        '.btn-sm': {
          '@apply px-4 py-2 text-sm': {},
        },
        '.btn-lg': {
          '@apply px-8 py-4 text-lg': {},
        },
      });
    }),

    // Natural form components
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.input-natural': {
          '@apply w-full px-4 py-3 rounded-soft border focus:ring-2 focus:border-transparent outline-none transition-colors duration-200 bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-primary-400 placeholder-background-500': {},
        },
        '.input-organic': {
          '@apply w-full px-4 py-3 rounded-organic border-2 focus:ring-2 focus:border-transparent outline-none transition-all duration-200 bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-eucalyptus-400 placeholder-background-500': {},
        },
      });
    }),

    // Natural card and layout components
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.card-natural': {
          '@apply rounded-soft p-6 transition-shadow duration-200 hover:shadow-natural bg-background-50 dark:bg-background-800 shadow-soft dark:shadow-none dark:border dark:border-background-700': {},
        },
        '.card-organic': {
          '@apply rounded-organic p-6 transition-shadow duration-200 hover:shadow-warm bg-gradient-to-br from-background-50 to-cream-100 dark:from-background-800 dark:to-background-700 shadow-natural': {},
        },
        '.section-natural': {
          '@apply py-16 md:py-24 lg:py-32 bg-texture-paper': {},
        },
      });
    }),

    // Natural utility classes
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.bg-natural-texture': {
          'background-image': theme('backgroundImage.texture-paper'),
        },
        '.bg-organic-texture': {
          'background-image': theme('backgroundImage.texture-organic'),
        },
        '.border-organic': {
          'border-radius': theme('borderRadius.organic'),
        },
        '.shadow-natural-hover': {
          'transition': 'box-shadow 0.3s ease',
          '&:hover': {
            'box-shadow': theme('boxShadow.natural'),
          },
        },
        '.gradient-sage-eucalyptus': {
          'background': 'linear-gradient(135deg, #7d8b5e 0%, #3d9b7a 100%)',
        },
        '.gradient-cream-clay': {
          'background': 'linear-gradient(135deg, #eec374 0%, #d67341 100%)',
        },
        '.gradient-natural-fade': {
          'background': 'linear-gradient(180deg, rgba(125, 139, 94, 0.1) 0%, rgba(125, 139, 94, 0) 100%)',
        },
      }
      addUtilities(newUtilities)
    }),

    // Modern effects for natural brand
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.transition-natural': {
          '@apply transition-all duration-300 ease-in-out': {},
        },
        '.glass-natural': {
          '@apply backdrop-blur-md bg-background-50/80 dark:bg-background-900/80 border border-background-200/50 dark:border-background-700/50': {},
        },
        '.frosted-natural': {
          '@apply backdrop-blur-lg bg-background-50/30 dark:bg-background-900/30 border border-background-200/50 dark:border-background-800/50 rounded-soft': {},
        },
      });
    }),

    // Text effects with natural gradients
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.text-gradient-natural': {
          '@apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-eucalyptus-600': {},
        },
        '.text-gradient-warm': {
          '@apply bg-clip-text text-transparent bg-gradient-to-r from-secondary-500 to-cream-600': {},
        },
        '.border-natural': {
          '@apply border border-background-300 dark:border-background-600': {},
        },
      });
    }),

    // Responsive navigation for natural brand
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.nav-link-natural': {
          '@apply px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-background-700 dark:text-background-300 hover:bg-primary-100 dark:hover:bg-primary-800/20 hover:text-primary-700 dark:hover:text-primary-300': {},
        },
        '.nav-link-active-natural': {
          '@apply bg-primary-100 dark:bg-primary-800/20 text-primary-700 dark:text-primary-300': {},
        },
      });
    }),

    // Badge components for natural brand
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.badge': {
          '@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium': {},
        },
        '.badge-natural': {
          '@apply badge bg-primary-500 text-white': {},
        },
        '.badge-eucalyptus': {
          '@apply badge bg-eucalyptus-500 text-white': {},
        },
        '.badge-cream': {
          '@apply badge bg-cream-500 text-background-900': {},
        },
        '.badge-organic': {
          '@apply badge bg-gradient-to-r from-primary-500 to-eucalyptus-500 text-white': {},
        },
      });
    }),

    // Grid layouts
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.grid-auto-fit': {
          '@apply grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': {},
        },
        '.grid-auto-fit-lg': {
          '@apply grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3': {},
        },
        '.auto-grid-sm': {
          '@apply grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4': {},
        },
        '.auto-grid-md': {
          '@apply grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6': {},
        },
        '.auto-grid-lg': {
          '@apply grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-8': {},
        },
      });
    }),

    // Responsive utilities
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.responsive-container': {
          '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        },
        '.responsive-padding': {
          '@apply px-4 sm:px-6 lg:px-8': {},
        },
        '.responsive-margin': {
          '@apply my-8 sm:my-12 lg:my-16': {},
        },
        '.content-width': {
          '@apply max-w-3xl': {},
        },
        '.narrow-content': {
          '@apply max-w-xl': {},
        },
      });
    }),

    // Enhanced form components with natural spa theme
plugin(function({ addComponents, theme }) {
  addComponents({
    // Base input styles
    '.input-base': {
      '@apply w-full transition-all duration-200 outline-none font-sans': {},
    },
    
    // Primary input style (enhanced version of your existing)
    '.input-primary': {
      '@apply input-base px-4 py-3 rounded-soft border-2 focus:ring-2 focus:border-transparent bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-primary-400 focus:border-primary-500 placeholder-background-500 dark:placeholder-background-400': {},
      '&:hover': {
        '@apply border-primary-400 dark:border-primary-500': {},
      },
      '&:focus': {
        '@apply transform scale-[1.01] shadow-natural': {},
      },
      '&:disabled': {
        '@apply bg-background-200 dark:bg-background-700 cursor-not-allowed opacity-60': {},
      },
    },

    // Natural style input
    '.input-natural': {
      '@apply input-base px-4 py-3 rounded-gentle border-2 focus:ring-2 focus:border-transparent bg-gradient-to-br from-background-50 to-eucalyptus-50/30 dark:from-background-800 dark:to-eucalyptus-900/20 border-eucalyptus-200 dark:border-eucalyptus-700 text-background-900 dark:text-white focus:ring-eucalyptus-400 focus:border-eucalyptus-500 placeholder-eucalyptus-600 dark:placeholder-eucalyptus-400': {},
      '&:hover': {
        '@apply border-eucalyptus-300 dark:border-eucalyptus-600 shadow-soft': {},
      },
      '&:focus': {
        '@apply shadow-natural bg-gradient-to-br from-background-50 to-eucalyptus-50/50 dark:from-background-800 dark:to-eucalyptus-900/30': {},
      },
    },

    // Organic style input with curved borders
    '.input-organic': {
      '@apply input-base px-5 py-3 rounded-organic border-2 focus:ring-2 focus:border-transparent bg-background-50 dark:bg-background-800 border-primary-300 dark:border-primary-600 text-background-900 dark:text-white focus:ring-primary-400 focus:border-primary-500 placeholder-background-500 dark:placeholder-background-400': {},
      '&:hover': {
        '@apply border-primary-400 dark:border-primary-500 transform rotate-1': {},
      },
      '&:focus': {
        '@apply transform rotate-0 scale-105 shadow-warm': {},
      },
    },

    // Floating label input
    '.input-floating': {
      '@apply input-base px-4 pt-6 pb-2 rounded-soft border-2 focus:ring-2 focus:border-transparent bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-primary-400 focus:border-primary-500': {},
      '&:focus + .floating-label, &:not(:placeholder-shown) + .floating-label': {
        '@apply transform -translate-y-2 scale-75 text-primary-600 dark:text-primary-400': {},
      },
    },

    // Search input style
    '.input-search': {
      '@apply input-base pl-10 pr-4 py-3 rounded-full border-2 focus:ring-2 focus:border-transparent bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-eucalyptus-400 focus:border-eucalyptus-500 placeholder-background-500 dark:placeholder-background-400': {},
      '&:focus': {
        '@apply shadow-natural': {},
      },
    },

    // Large input for hero sections
    '.input-large': {
      '@apply input-base px-6 py-4 text-lg rounded-gentle border-2 focus:ring-2 focus:border-transparent bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-primary-400 focus:border-primary-500 placeholder-background-500 dark:placeholder-background-400': {},
      '&:focus': {
        '@apply shadow-warm transform scale-[1.02]': {},
      },
    },

    // Small input for compact forms
    '.input-small': {
      '@apply input-base px-3 py-2 text-sm rounded-lg border-2 focus:ring-2 focus:border-transparent bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 text-background-900 dark:text-white focus:ring-primary-400 focus:border-primary-500 placeholder-background-500 dark:placeholder-background-400': {},
    },

    // Textarea styles
    '.textarea-primary': {
      '@apply input-primary resize-y min-h-[100px]': {},
    },

    '.textarea-natural': {
      '@apply input-natural resize-y min-h-[120px]': {},
    },

    // Select styles
    '.select-primary': {
      '@apply input-primary appearance-none bg-no-repeat bg-right bg-[length:16px_16px] pr-10': {},
      'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    },

    '.select-natural': {
      '@apply input-natural appearance-none bg-no-repeat bg-right bg-[length:16px_16px] pr-10': {},
      'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233d9b7a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    },

    // Checkbox and radio styles
    '.checkbox-primary': {
      '@apply w-4 h-4 text-primary-600 bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-background-800 focus:ring-2 transition-all duration-200': {},
      '&:checked': {
        '@apply bg-primary-600 border-primary-600': {},
      },
    },

    '.checkbox-natural': {
      '@apply w-4 h-4 text-eucalyptus-600 bg-background-50 dark:bg-background-800 border-eucalyptus-300 dark:border-eucalyptus-600 rounded-md focus:ring-eucalyptus-500 focus:ring-2 transition-all duration-200': {},
      '&:checked': {
        '@apply bg-eucalyptus-600 border-eucalyptus-600 transform scale-110': {},
      },
    },

    '.radio-primary': {
      '@apply w-4 h-4 text-primary-600 bg-background-50 dark:bg-background-800 border-background-300 dark:border-background-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-background-800 focus:ring-2 transition-all duration-200': {},
    },

    // Toggle switch styles
    '.toggle-primary': {
      '@apply relative inline-flex h-6 w-11 items-center rounded-full bg-background-300 dark:bg-background-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer': {},
      '&[data-checked="true"]': {
        '@apply bg-primary-500': {},
      },
      '&[data-checked="true"] .toggle-thumb': {
        '@apply translate-x-6 bg-white': {},
      },
    },

    '.toggle-thumb': {
      '@apply inline-block h-4 w-4 transform rounded-full bg-background-100 transition-transform': {},
    },

    // File input styles
    '.file-input': {
      '@apply block w-full text-sm text-background-500 dark:text-background-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 dark:file:bg-primary-900/20 file:text-primary-700 dark:file:text-primary-300 hover:file:bg-primary-100 dark:hover:file:bg-primary-900/30 file:cursor-pointer cursor-pointer': {},
    },

    // Range input styles
    '.range-primary': {
      '@apply w-full h-2 bg-background-200 dark:bg-background-700 rounded-lg appearance-none cursor-pointer': {},
      '&::-webkit-slider-thumb': {
        '@apply appearance-none w-5 h-5 bg-primary-500 rounded-full cursor-pointer hover:bg-primary-600 transition-colors': {},
      },
      '&::-moz-range-thumb': {
        '@apply w-5 h-5 bg-primary-500 rounded-full cursor-pointer border-0 hover:bg-primary-600 transition-colors': {},
      },
    },
  });
}),

// Input group components
plugin(function({ addComponents, theme }) {
  addComponents({
    // Input group container
    '.input-group': {
      '@apply relative flex items-stretch w-full': {},
    },

    // Input with icon
    '.input-with-icon': {
      '@apply relative': {},
    },

    '.input-icon-left': {
      '@apply absolute left-3 top-1/2 transform -translate-y-1/2 text-background-500 dark:text-background-400 pointer-events-none': {},
    },

    '.input-icon-right': {
      '@apply absolute right-3 top-1/2 transform -translate-y-1/2 text-background-500 dark:text-background-400 pointer-events-none': {},
    },

    '.input-with-icon-left': {
      '@apply pl-10': {},
    },

    '.input-with-icon-right': {
      '@apply pr-10': {},
    },

    // Input with button
    '.input-with-button': {
      '@apply flex rounded-soft overflow-hidden border-2 border-background-300 dark:border-background-600 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-400': {},
    },

    '.input-with-button input': {
      '@apply flex-1 px-4 py-3 border-0 bg-background-50 dark:bg-background-800 text-background-900 dark:text-white placeholder-background-500 dark:placeholder-background-400 focus:outline-none': {},
    },

    '.input-with-button button': {
      '@apply px-4 py-3 bg-primary-500 text-white hover:bg-primary-600 transition-colors font-medium': {},
    },

    // Floating label styles
    '.floating-label': {
      '@apply absolute left-4 top-3 text-background-500 dark:text-background-400 transition-all duration-200 origin-left pointer-events-none': {},
    },

    '.floating-label-active': {
      '@apply transform -translate-y-2 scale-75 text-primary-600 dark:text-primary-400': {},
    },
  });
}),

// Input validation states
plugin(function({ addComponents, theme }) {
  addComponents({
    // Success state
    '.input-success': {
      '@apply border-success-500 focus:border-success-500 focus:ring-success-400': {},
    },

    // Error state
    '.input-error': {
      '@apply border-error-500 focus:border-error-500 focus:ring-error-400': {},
    },

    // Warning state
    '.input-warning': {
      '@apply border-yellow-500 focus:border-yellow-500 focus:ring-yellow-400': {},
    },

    // Info state
    '.input-info': {
      '@apply border-blue-500 focus:border-blue-500 focus:ring-blue-400': {},
    },
  });
}),

// Input helper text and labels
plugin(function({ addComponents, theme }) {
  addComponents({
    // Label styles
    '.input-label': {
      '@apply block text-sm font-medium text-background-700 dark:text-background-300 mb-2': {},
    },

    '.input-label-required': {
      '@apply input-label after:content-["*"] after:ml-0.5 after:text-error-500': {},
    },

    // Helper text
    '.input-help': {
      '@apply mt-1 text-sm text-background-600 dark:text-background-400': {},
    },

    '.input-error-text': {
      '@apply mt-1 text-sm text-error-600 dark:text-error-400': {},
    },

    '.input-success-text': {
      '@apply mt-1 text-sm text-success-600 dark:text-success-400': {},
    },

    // Character count
    '.input-count': {
      '@apply text-xs text-background-500 dark:text-background-400 text-right mt-1': {},
    },

    // Form group
    '.form-group': {
      '@apply space-y-2 mb-6': {},
    },

    '.form-row': {
      '@apply grid grid-cols-1 md:grid-cols-2 gap-4': {},
    },

    '.form-section': {
      '@apply space-y-6 p-6 bg-background-50 dark:bg-background-800 rounded-soft border border-background-200 dark:border-background-700': {},
    },
  });
}),

// Advanced input components
plugin(function({ addComponents, theme }) {
  addComponents({
    // Newsletter signup input
    '.newsletter-input': {
      '@apply input-group max-w-md mx-auto': {},
    },

    '.newsletter-input input': {
      '@apply flex-1 px-4 py-3 rounded-l-full border-2 border-r-0 border-primary-300 dark:border-primary-600 bg-background-50 dark:bg-background-800 text-background-900 dark:text-white placeholder-background-500 dark:placeholder-background-400 focus:outline-none focus:border-primary-500 focus:ring-0': {},
    },

    '.newsletter-input button': {
      '@apply px-6 py-3 bg-primary-500 text-white rounded-r-full border-2 border-primary-500 hover:bg-primary-600 hover:border-primary-600 transition-colors font-medium': {},
    },

    // Search bar
    '.search-bar': {
      '@apply relative max-w-lg mx-auto': {},
    },

    '.search-bar input': {
      '@apply input-search': {},
    },

    '.search-bar .search-icon': {
      '@apply absolute left-3 top-1/2 transform -translate-y-1/2 text-background-500 dark:text-background-400 w-5 h-5': {},
    },

    // Quantity input
    '.quantity-input': {
      '@apply flex items-center border-2 border-background-300 dark:border-background-600 rounded-lg overflow-hidden bg-background-50 dark:bg-background-800': {},
    },

    '.quantity-input button': {
      '@apply px-3 py-2 bg-background-100 dark:bg-background-700 text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-600 transition-colors font-medium select-none': {},
    },

    '.quantity-input input': {
      '@apply flex-1 px-3 py-2 text-center border-0 bg-transparent text-background-900 dark:text-white focus:outline-none min-w-0': {},
    },

    // Price input
    '.price-input': {
      '@apply relative': {},
    },

    '.price-input input': {
      '@apply input-primary pl-8': {},
    },

    '.price-input .currency': {
      '@apply absolute left-3 top-1/2 transform -translate-y-1/2 text-background-600 dark:text-background-400 font-medium': {},
    },

    // Phone input
    '.phone-input': {
      '@apply flex rounded-soft border-2 border-background-300 dark:border-background-600 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-400 overflow-hidden': {},
    },

    '.phone-input select': {
      '@apply px-3 py-3 bg-background-100 dark:bg-background-700 border-0 text-background-900 dark:text-white focus:outline-none': {},
    },

    '.phone-input input': {
      '@apply flex-1 px-4 py-3 border-0 bg-background-50 dark:bg-background-800 text-background-900 dark:text-white placeholder-background-500 dark:placeholder-background-400 focus:outline-none': {},
    },
  });
}),
  ],
};