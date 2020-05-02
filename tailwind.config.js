module.exports = {
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontSize: {
        '6.5xl': '4.5rem',
        '7xl': '5rem',
        '8xl': '6rem',
      },
      borderRadius: {
        '1rem': '1rem',
        '2rem': '2rem',
      },
      borderColor: {
        'main-blue': '#2943df',
        'text-blue': '#192045',
        'main-orange': '#ff9d33',
        'main-white': '#E9E9ED',
      },
      backgroundColor: {
        'main-blue': '#2943df',
        'text-blue': '#192045',
        'text-blue-2': '#19204533',
        'text-blue-4': '#19204566',
        'text-blue-6': '#19204599',
        'text-blue-8': '#192045cc',
        'text-blue-9': '#192045e6',
        'main-orange': '#ff9d33',
        'main-white': '#E9E9ED',
        'main-white-2': '#E9E9ED33',
        'main-white-4': '#E9E9ED66',
        'main-white-6': '#E9E9ED99',
        'main-white-8': '#E9E9EDcc',
        'main-white-9': '#E9E9EDe6',
      },
      textColor: {
        'main-blue': '#2943df',
        'text-blue': '#192045',
        'main-orange': '#ff9d33',
        'main-white': '#E9E9ED',
      },
      spacing: {
        'full': '100%',
        '3/4': '75%',
        '1/4': '25%',
        '1/8': '12.5%',
        'half': '50%',
        'vh-3/4': '75vh',
        'vh-1/4': '25vh',
        'vh-half': '50vh',
        'vw-3/4': '75vw',
        'vw-1/4': '25vw',
        'vw-half': '50vw',
        '16:9': '56.25%',
      },
      width: {
        'fit': 'fit-content',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      }
    },
  },

  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },

  plugins: [],

}